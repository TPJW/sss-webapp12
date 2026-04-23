import React from 'react';
import projectInfo from '../data/projectInfo.json';
import { Building2, UserCircle2, Mail, Phone } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="sidebar no-print">
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--tp-red)' }}>TowerPinkster</h1>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Sustainability Strategy
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Project</h2>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Building2 size={24} color="var(--tp-green)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.25rem', lineHeight: 1.2 }}>{projectInfo.projectName}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Project #{projectInfo.projectNumber}</div>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Client</h2>
          <div style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--text-main)' }}>
            {projectInfo.clientName}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Landscape Architect</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <UserCircle2 size={24} color="var(--tp-red)" />
            <div style={{ fontWeight: 500 }}>{projectInfo.architect.name}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
            <Mail size={16} />
            <a href={`mailto:${projectInfo.architect.email}`} style={{ textDecoration: 'underline' }}>{projectInfo.architect.email}</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Phone size={16} />
            {projectInfo.architect.phone}
          </div>
        </div>
      </div>

    </aside>
  );
}
