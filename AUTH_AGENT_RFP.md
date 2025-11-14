# Identity & Access Management (IAM) Architectural Specification
## The Foundational Protocol for the `desk.cx` Sovereign Fabric

**DOCUMENT ID:** IAM-SPEC-V1.0  
**STATUS:** Ratified  
**DATE:** 2026-01-12  
**AUTHORS:** `desk.cx` Architecture Group  
**APPLIES TO:** `AuthO.iD` Engineering, `desk.cx` Daemon & UI Teams

---

### **Table of Contents**
1. [Vision & Guiding Principles](#1-vision--guiding-principles)
2. [Core Concepts & Terminology](#2-core-concepts--terminology)
3. [The Identity Lifecycle](#3-the-identity-lifecycle)
   - 3.1. User Identity Lifecycle
   - 3.2. Device Identity Lifecycle
4. [Authentication (AuthN) Protocol](#4-authentication-authn-protocol)
5. [Authorization (AuthZ) & Access Control](#5-authorization-authz--access-control)
6. [Secrets Management](#6-secrets-management)
7. [Identity Data Management](#7-identity-data-management)
8. [Implementation & Task Breakdown](#8-implementation--task-breakdown)

---

### 1. Vision & Guiding Principles

This document specifies the architecture for the identity and access management fabric that underpins the entire `desk.cx` ecosystem. Our north star is **absolute user sovereignty**. The user is the root of trust; their identity is their own, and all access is explicitly granted, never assumed.

-   **Principle of Self-Sovereignty:** Users own and control their own identity. It is not leased from a third-party provider.
-   **Principle of Least Privilege:** All entities (users, devices, services) start with zero access. Permissions must be explicitly granted.
-   **Principle of Zero Trust:** Never trust, always verify. Every interaction must be authenticated and authorized, regardless of its origin.
-   **Principle of Verifiability:** All significant identity and access events must be captured in a verifiable, immutable audit stream.

---

### 2. Core Concepts & Terminology

-   **Principal:** Any entity that can be authenticated. This includes Users, Devices, and Services.
-   **Decentralized Identifier (DID):** A globally unique, persistent identifier for a Principal (e.g., `did:autho:user:alice`). It is the cryptographic anchor of identity.
-   **Verifiable Credential (VC):** A tamper-evident credential containing one or more claims about a Principal, issued by an entity trusted within the fabric.
-   **Identity Agent:** The `AuthO.iD` software that runs on every device, managing its keys, enforcing policies, and attesting to its health.
-   **Identity Fabric:** The collective network of all principals and their relationships, governed by the protocols defined in this document.
-   **Identity Wallet:** A secure key store on a user's device (leveraging TPM/Secure Enclave) that holds the private keys for their DIDs and VCs.

---

### 3. The Identity Lifecycle

This section details the cradle-to-grave management of all identities within the fabric.

#### 3.1. User Identity Lifecycle

1.  **Onboarding (Genesis):**
    -   The very first user of a `desk.cx` instance is the "root" administrator.
    -   During initial setup of the `desk-cx-daemon`, a genesis ceremony is performed. This creates the root user's DID and keys, storing them in the Identity Wallet of the first device. This device is automatically approved.
2.  **Invitation:**
    -   The root user can invite new users (e.g., family members).
    -   The process generates a single-use invitation link containing a temporary cryptographic challenge.
    -   The new user clicks the link, is guided to set up their Identity Wallet on their first device, creates their own DID, and signs the challenge to prove ownership. Their device then appears in the root user's `desk.cx` dashboard in a "Pending Approval" state.
3.  **Authentication:**
    -   See Section 4: Authentication (AuthN) Protocol.
4.  **Profile & Data Management:**
    -   User profile data (name, avatar) is stored as a VC associated with their DID.
    -   Users manage their profile and associated identity data directly from their `desk.cx` dashboard.
5.  **Offboarding & Recovery:**
    -   **Recovery:** A user who loses all devices can recover their identity via a "social recovery" mechanism, where a quorum of pre-designated trusted users (or devices) can approve the creation of a new key pair for the user's DID.
    -   **Decommissioning:** A user can choose to permanently revoke their own DID, which will cascade-revoke all associated devices and permissions. This action is irreversible.

#### 3.2. Device Identity Lifecycle

1.  **Registration:**
    -   A new device with the `AuthO.iD` agent installed broadcasts its presence on the local network.
    -   It generates its own unique DID and key pair.
    -   The user initiates a pairing process (e.g., scanning a QR code) which associates the new device's DID with the user's DID.
2.  **Approval:**
    -   The new device appears in the user's `desk.cx` dashboard with a "Pending Approval" status.
    -   The user must explicitly approve the device. This action creates a VC, issued by the user, stating that this device DID is a trusted endpoint for that user. This event is logged in the Audit Stream.
3.  **Attestation (Live Health):**
    -   The agent must implement a `attestHealth` function.
    -   The `desk-cx-daemon` will periodically challenge the agent to provide a signed attestation of its health (secure boot status, etc.). Failure to respond or a report of tampering will change the device's status to "degraded" or "unhealthy," which can trigger automated policy actions (e.g., quarantine).
4.  **Revocation:**
    -   A user can revoke a device at any time from the `desk.cx` dashboard.
    -   The `desk-cx-daemon` sends a signed `revoke` command to the device's agent.
    -   The agent must securely wipe its keys and cease all function. The device's DID is added to a Fabric-wide revocation list.

---

### 4. Authentication (AuthN) Protocol

Authentication within the fabric is known as the **"Perfect Login"**. It is passwordless and multi-factor by default, requiring two distinct proofs:
1.  **Proof of User Presence:** The user proves they are present by unlocking their Identity Wallet using a platform authenticator (e.g., biometrics, hardware key). This allows the agent to use the user's private key.
2.  **Proof of Device Integrity:** The `AuthO.iD` agent attests that the device it is running on is healthy and has not been tampered with.

An authentication token (a short-lived VC) is only issued when both proofs are successfully verified by the `desk-cx-daemon`. This model mitigates both phishing (stolen credentials are useless without the trusted device) and malware (a compromised device will fail its integrity check).

---

### 5. Authorization (AuthZ) & Access Control

Authorization determines *what* an authenticated principal is allowed to do.

1.  **Policy Engine:** Authorization logic is defined using the OPA (Open Policy Agent) standard. The `PolicyForge` in `desk.cx` serves as the user-friendly interface for generating these policies.
2.  **Policy Structure:** Policies are structured JSON documents following a Subject-Action-Resource model (e.g., "User `Alice` is `allowed` to `read/write` to `Git-Server`").
3.  **Policy Distribution:** The `desk-cx-daemon` is responsible for securely distributing relevant policies to enforcement points via the agent's `syncPolicy` function.
4.  **Enforcement Points:**
    -   **API Gateway:** The primary enforcement point for all network traffic between devices/services.
    -   **On-Device Agent:** For fine-grained local decisions (e.g., "this app can't access the microphone").

---

### 6. Secrets Management

Secrets include cryptographic keys, API tokens, and any sensitive configuration data.

1.  **Key Generation & Storage:**
    -   All private keys (for both users and devices) MUST be generated and stored within a hardware-backed secure keystore (e.g., TPM, Secure Enclave, TEE).
    -   Keys should never be exportable in plaintext. All cryptographic operations are performed within the secure element.
2.  **Data Vault Encryption:**
    -   User data stored in the Data Vault is encrypted at rest using a symmetric key.
    -   This symmetric key is itself encrypted with the user's public key and stored alongside the data. Only the user, by unlocking their Identity Wallet, can decrypt the symmetric key and access the data.
3.  **Service-to-Service Secrets:**
    -   Services running within the fabric (e.g., Git Server, Photo Backup) are principals with their own DIDs.
    -   They authenticate to each other not with static API keys, but with short-lived VCs issued by the `desk-cx-daemon`, which act as bearer tokens.

---

### 7. Identity Data Management

Identity data refers to the collection of DIDs, VCs, and user profile information that constitutes the fabric's state.

1.  **Data Schema:** All identity data will adhere to W3C standards for DIDs and VCs.
2.  **Storage & Replication:**
    -   The canonical source of identity data is a secure, encrypted database managed by the `desk-cx-daemon`.
    -   For resilience, this data is replicated across multiple trusted devices within the fabric. A distributed consensus mechanism (e.g., Raft) will be used to ensure consistency.
3.  **Privacy by Design:** Verifiable Credentials enable selective disclosure. A user can prove a specific claim (e.g., "I am over 18") without revealing their entire identity.

---

### 8. Implementation & Task Breakdown

This architecture will be implemented in a phased approach.

#### 8.1. Component Responsibilities & Code Location

-   **`AuthO.iD Agent` (`modules/identity-agent`):**
    -   Implement the full device lifecycle: registration, attestation, and revocation action hooks.
    -   Implement the `syncPolicy` endpoint to receive and load OPA policies.
    -   Integrate with platform-specific secure keystores (TPM/Secure Enclave).
-   **`desk-cx-daemon` (`services/desk-cx-daemon`):**
    -   Implement the full user and device identity lifecycle logic (invitation, approval, etc.).
    -   Serve as the central authority for issuing VCs.
    -   Orchestrate policy distribution and health attestation checks.
    -   Manage the replicated identity data store.
-   **`desk.cx Dashboard` (`dashboard/`):**
    -   Build the UI components for managing all IAM features: user invites, device approvals, policy forging, and viewing the audit stream.

#### 8.2. Phased Engineering Tasks

-   **Phase 1: Foundational Identity & Onboarding**
    -   [Task] Implement the genesis ceremony for root user creation.
    -   [Task] Build the device registration and QR code pairing flow.
    -   [Task] Develop the "Pending/Approve/Revoke" UI and backend logic in `desk.cx`.
    -   [Task] Implement the basic "Perfect Login" protocol (user presence + device attestation).
-   **Phase 2: Policy Enforcement & Health**
    -   [Task] Integrate OPA into the API Gateway.
    -   [Task] Implement the `syncPolicy` function in the agent and distribution logic in the daemon.
    -   [Task] Implement the `attestHealth` challenge-response mechanism.
    -   [Task] Connect the `SystemHealth` UI to live attestation data from the daemon.
-   **Phase 3: Expanding the Fabric**
    -   [Task] Implement the secure user invitation workflow.
    -   [Task] Design and implement the social recovery mechanism for lost devices.
    -   [Task] Begin work on service-to-service authentication using VCs.
-   **Phase 4: Hardened Secrets & Data**
    -   [Task] Implement the Data Vault encryption scheme using the user's Identity Wallet.
    -   [Task] Finalize the distributed data replication and consensus model for the identity database.
    -   [Task] Conduct a full security audit of the entire IAM stack.

This document will be versioned and updated as the project evolves. All engineering efforts related to identity, auth, and secrets must align with this specification.
