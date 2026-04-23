import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'center', paddingTop: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--tp-green-light)', padding: '1.5rem', borderRadius: '50%' }}>
          <Leaf size={48} color="var(--tp-green-dark)" />
        </div>
      </div>
      
      <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--tp-red)', marginBottom: '1rem', lineHeight: 1.2 }}>
        Sustainability Strategy Selector
      </h1>
      
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3rem', lineHeight: 1.6 }}>
        Welcome! This interactive tool is designed to help illustrate different design decisions 
        and sustainability strategies for your site. By progressing through each system, 
        we'll build a tailored profile that balances environmental, social, and economic goals.
      </p>

      <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--border-radius)', marginBottom: '3rem', display: 'inline-block', textAlign: 'left', minWidth: '300px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>
          <span>Estimated Time</span>
        </div>
        <div style={{ color: 'var(--text-muted)' }}>~10 minutes to complete</div>
      </div>

      <br />

      <button className="btn-primary" onClick={() => navigate('/system/0')} style={{ fontSize: '1.1rem', padding: '1rem 2.5rem' }}>
        Begin Selector
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
