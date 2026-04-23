import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useSelection } from '../context/SelectionContext';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import clsx from 'clsx'; // Assuming clsx is installed, if not we can use vanilla strings.

export default function SiteSystem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { siteSystems, selections, setSelection } = useSelection();

  const systemIndex = parseInt(id, 10);
  
  // Guard
  if (isNaN(systemIndex) || systemIndex < 0 || systemIndex >= siteSystems.length) {
    return <Navigate to="/review" />;
  }

  const currentSystem = siteSystems[systemIndex];
  const selectedOption = selections[currentSystem.systemName];

  const handleSelect = (option) => {
    setSelection(currentSystem.systemName, option);
  };

  const handleNext = () => {
    if (systemIndex < siteSystems.length - 1) {
      navigate(`/system/${systemIndex + 1}`);
    } else {
      navigate('/review');
    }
  };

  const handleBack = () => {
    if (systemIndex > 0) {
      navigate(`/system/${systemIndex - 1}`);
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          System {systemIndex + 1} of {siteSystems.length}
        </h2>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
          {currentSystem.systemName}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
          How do we want to approach {currentSystem.systemName.toLowerCase()}?
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {currentSystem.options.map((option, idx) => {
          const isSelected = selectedOption?.name === option.name;
          return (
            <div 
              key={idx}
              onClick={() => handleSelect(option)}
              style={{
                background: 'var(--surface-color)',
                borderRadius: 'var(--border-radius)',
                padding: '2rem',
                cursor: 'pointer',
                border: `2px solid ${isSelected ? 'var(--tp-green)' : 'var(--border-color)'}`,
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                transition: 'all 0.2s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                if(!isSelected) e.currentTarget.style.borderColor = 'var(--text-muted)';
              }}
              onMouseLeave={(e) => {
                if(!isSelected) e.currentTarget.style.borderColor = 'var(--border-color)';
              }}
            >
              {isSelected && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--tp-green)' }}>
                  <CheckCircle2 size={24} fill="currentColor" color="#fff" />
                </div>
              )}

              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--tp-red)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                {option.type}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', paddingRight: '2rem' }}>
                {option.name}
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', flex: 1 }}>
                {option.description}
              </p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>Pros</span>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {option.pros.map((p, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{p}</li>)}
                  </ul>
                </div>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>Cons</span>
                  <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {option.cons.map((c, i) => <li key={i} style={{ marginBottom: '0.25rem' }}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
        <button className="btn-secondary" onClick={handleBack}>
          <ArrowLeft size={20} />
          Back
        </button>
        <button 
          className="btn-primary" 
          onClick={handleNext}
          disabled={!selectedOption}
          style={{ opacity: selectedOption ? 1 : 0.5, cursor: selectedOption ? 'pointer' : 'not-allowed' }}
        >
          {systemIndex === siteSystems.length - 1 ? 'Go to Review' : 'Next System'}
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
