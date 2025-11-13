
import React, { useState, useLayoutEffect, useRef } from 'react';
import { TourStep } from '../types';

interface AIGuidedTourProps {
  steps: TourStep[];
  onComplete: () => void;
}

const AIGuideIcon = () => (
    <div className="w-12 h-12 rounded-full bg-brand-secondary flex items-center justify-center flex-shrink-0 border-2 border-brand-surface shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M9.5 2.5a2.5 2.5 0 0 1 5 0" />
            <path d="M12 6V3" />
            <path d="M12 18v-6" />
            <path d="M12 21v-3" />
            <path d="M17.5 6.5a2.5 2.5 0 1 0-5 0" />
            <path d="M6.5 17.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
            <path d="M12 12h6" />
            <path d="M12 12H6" />
            <path d="m5 2.5 3.5 3.5" />
            <path d="m19 2.5-3.5 3.5" />
        </svg>
    </div>
);

export default function AIGuidedTour({ steps, onComplete }: AIGuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const step = steps[currentStep];

  useLayoutEffect(() => {
    const targetElement = document.querySelector(step.selector);
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setTargetRect(rect);
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  }, [currentStep, step.selector]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handlePrev = () => {
      if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
      }
  }

  const getPopoverPosition = () => {
    if (!targetRect || !popoverRef.current) return { top: '-9999px', left: '-9999px' };

    const popover = popoverRef.current.getBoundingClientRect();
    const spacing = 16;
    let top = 0, left = 0;

    switch (step.placement) {
      case 'bottom':
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width / 2) - (popover.width / 2);
        break;
      case 'top':
        top = targetRect.top - popover.height - spacing;
        left = targetRect.left + (targetRect.width / 2) - (popover.width / 2);
        break;
      case 'left':
        top = targetRect.top + (targetRect.height / 2) - (popover.height / 2);
        left = targetRect.left - popover.width - spacing;
        break;
      case 'right':
         top = targetRect.top + (targetRect.height / 2) - (popover.height / 2);
         left = targetRect.right + spacing;
         break;
      case 'center':
        top = window.innerHeight / 2 - popover.height / 2;
        left = window.innerWidth / 2 - popover.width / 2;
        break;
      default: // bottom
        top = targetRect.bottom + spacing;
        left = targetRect.left + (targetRect.width / 2) - (popover.width / 2);
    }
    
    // Boundary checks
    if (top < 0) top = spacing;
    if (left < 0) left = spacing;
    if (left + popover.width > window.innerWidth) left = window.innerWidth - popover.width - spacing;
    if (top + popover.height > window.innerHeight) top = window.innerHeight - popover.height - spacing;


    return { top: `${top}px`, left: `${left}px` };
  };

  if (!targetRect) return null;

  return (
    <div className="fixed inset-0 z-50 animate-fade-in">
        {/* Overlay */}
        <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-all duration-500"
            style={{ 
                clipPath: step.placement !== 'center' 
                    ? `path(evenodd, 'M0 0 H ${window.innerWidth} V ${window.innerHeight} H 0 Z M ${targetRect.x - 8} ${targetRect.y - 8} H ${targetRect.right + 8} V ${targetRect.bottom + 8} H ${targetRect.x - 8} Z')` 
                    : 'none'
            }}
        ></div>
         {/* Highlight border */}
         {step.placement !== 'center' && (
            <div 
                className="fixed rounded-lg border-2 border-brand-primary shadow-[0_0_20px_5px] shadow-brand-primary/50 transition-all duration-500 pointer-events-none"
                style={{
                    top: targetRect.y - 4,
                    left: targetRect.x - 4,
                    width: targetRect.width + 8,
                    height: targetRect.height + 8,
                }}
            />
        )}
        {/* Popover */}
        <div
            ref={popoverRef}
            className="fixed z-10 w-80 max-w-[90vw] bg-brand-surface border border-brand-border rounded-lg shadow-2xl p-4 animate-pop-in"
            style={{ ...getPopoverPosition() }}
        >
            <div className="flex items-start space-x-4">
                <AIGuideIcon />
                <div>
                    <h3 className="text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm text-brand-text">{step.content}</p>
                </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-brand-text-secondary">{currentStep + 1} / {steps.length}</span>
                <div className="space-x-2">
                    {currentStep > 0 && (
                        <button onClick={handlePrev} className="px-3 py-1 text-sm bg-brand-border text-brand-text rounded-md hover:bg-brand-text-secondary/50">
                            Prev
                        </button>
                    )}
                    <button onClick={handleNext} className="px-4 py-1 text-sm bg-brand-primary text-brand-bg font-bold rounded-md hover:bg-brand-primary/80">
                        {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}