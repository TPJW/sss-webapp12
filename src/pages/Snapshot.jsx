import React, { useMemo } from 'react';
import { useSelection } from '../context/SelectionContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import radarAxes from '../data/radarAxes.json';
import projectInfo from '../data/projectInfo.json';
import { Printer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Snapshot() {
  const { siteSystems, selections, getRadarData } = useSelection();
  const navigate = useNavigate();

  const data = useMemo(() => getRadarData(radarAxes), [selections]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <button className="btn-secondary" onClick={() => navigate('/review')}>
          <ArrowLeft size={16} /> Back
        </button>
        <button className="btn-primary" onClick={handlePrint}>
          <Printer size={16} /> Save as PDF
        </button>
      </div>

      <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', color: '#000' }} className="print-container">
        
        {/* Header */}
        <div style={{ borderBottom: '2px solid var(--tp-green)', paddingBottom: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ color: 'var(--tp-red)', margin: 0, fontSize: '2rem' }}>TowerPinkster</h1>
            <div style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#666' }}>Sustainability Strategy Snapshot</div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{projectInfo.projectName}</div>
            <div>Client: {projectInfo.clientName}</div>
            <div>LA: {projectInfo.architect.name}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem' }}>
          
          {/* Selections column */}
          <div>
            <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Selected Strategies</h3>
            {siteSystems.map((system, idx) => {
               const selection = selections[system.systemName];
               if (!selection) return null;
               return (
                 <div key={idx} style={{ marginBottom: '1.5rem' }}>
                   <div style={{ fontWeight: 'bold', color: 'var(--tp-green-dark)', textTransform: 'uppercase', fontSize: '0.8rem' }}>{system.systemName}</div>
                   <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{selection.name} - <span style={{ color: 'var(--tp-red)' }}>{selection.type}</span></div>
                   <div style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.25rem' }}>{selection.description}</div>
                 </div>
               )
            })}
          </div>

          {/* Radar Chart column */}
          <div style={{ height: '500px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#000', fontSize: '0.75rem', fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar 
                  name="Score" 
                  dataKey="A" 
                  stroke="var(--tp-green-dark)" 
                  strokeWidth={2}
                  fill="var(--tp-green)" 
                  fillOpacity={0.6} 
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          
        </div>

      </div>
    </div>
  );
}
