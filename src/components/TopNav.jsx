import React from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useSelection } from '../context/SelectionContext';

const steps = [
  { id: 'intro', label: 'Intro', paths: ['/'] },
  { id: 'systems', label: 'Site Systems', paths: ['/system'] },
  { id: 'review', label: 'Review', paths: ['/review'] },
  { id: 'snapshot', label: 'Snapshot', paths: ['/snapshot'] }
];

export default function TopNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active step
  const activeStepIndex = steps.findIndex(step => 
    step.paths.some(path => currentPath.startsWith(path) && (path !== '/' || currentPath === '/'))
  );

  return (
    <nav className="top-nav no-print">
      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', width: '100%' }}>
        {steps.map((step, index) => {
          const isActive = index === activeStepIndex;
          const isPast = index < activeStepIndex;
          
          let color = 'var(--text-muted)';
          let fontWeight = '400';
          
          if (isActive) {
            color = 'var(--tp-green-dark)';
            fontWeight = '600';
          } else if (isPast) {
            color = 'var(--text-main)';
            fontWeight = '500';
          }

          return (
            <React.Fragment key={step.id}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color,
                  fontWeight,
                  transition: 'color 0.3s'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--tp-green)' : isPast ? 'var(--border-color)' : 'transparent',
                  border: `2px solid ${isActive || isPast ? 'transparent' : 'var(--border-color)'}`,
                  color: isActive ? '#fff' : 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
                {step.label}
              </div>
              {index < steps.length - 1 && (
                <ChevronRight size={16} color="var(--text-muted)" style={{ margin: '0 0.25rem' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
