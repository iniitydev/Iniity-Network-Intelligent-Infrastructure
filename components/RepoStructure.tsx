
import React from 'react';
import { REPO_STRUCTURE } from '../constants';
import { FileTreeNode } from '../types';

const FolderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-primary"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path></svg>;
const FileIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-text-secondary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>;
const SubmoduleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-secondary"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;


const TreeNode: React.FC<{ node: FileTreeNode, level: number }> = ({ node, level }) => {
  const isDir = !node.name.includes('(submodule') && node.children && node.children.length > 0;
  const isSubmodule = node.name.includes('(submodule');

  const getIcon = () => {
    if (isSubmodule) return <SubmoduleIcon />;
    if (isDir) return <FolderIcon />;
    return <FileIcon />;
  };

  return (
    <div>
      <div className="flex items-center" style={{ paddingLeft: `${level * 1.5}rem` }}>
        {getIcon()}
        <span className="ml-2 font-mono text-sm">{node.name}</span>
      </div>
      {isDir && node.children?.map((child, index) => (
        <TreeNode key={index} node={child} level={level + 1} />
      ))}
    </div>
  );
};

export default function RepoStructure() {
  return (
    <div className="p-6 rounded-lg bg-brand-surface border border-brand-border">
      <h2 className="text-xl font-bold text-white mb-4">Git Repository Structure</h2>
      <p className="mb-4 text-sm text-brand-text-secondary">
        Refactored to a parent repository with submodules for core components. This allows each component (e.g., `iniity-core`, `agents`) to be developed, versioned, and tested independently.
      </p>
      <div className="space-y-1">
        <TreeNode node={REPO_STRUCTURE} level={0} />
      </div>
    </div>
  );
}