import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelection } from '../context/SelectionContext';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import radarAxes from '../data/radarAxes.json';
import { Download, ArrowLeft } from 'lucide-react';

export default function Review() {
  const navigate = useNavigate();
  const { siteSystems, selections, getRadarData } = useSelection();

  const data = useMemo(() => getRadarData(radarAxes), [selections]);

  // Determine an emphasis based on the highest score
  const highestAxis = data.reduce((prev, current) => (prev.A > current.A) ? prev : current, { A: 0 });
  const emphasisAxis = highestAxis.A > 0 ? radarAxes.find(a => a.radarChartName === highestAxis.subject) : null;

  // Render check
  const allAnswered = siteSystems.every(s => selections[s.systemName]);

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Results
          </h2>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)' }}>
            Sustainability Balance
          </h1>
        </div>
        {!allAnswered && (
          <div style={{ padding: '0.75rem 1rem', background: '#fffbeb', color: '#b45309', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600 }}>
            Note: Not all systems have been selected.
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '4rem', alignItems: 'center', marginBottom: '3rem' }}>
        <div className="glass" style={{ height: '500px', borderRadius: 'var(--border-radius)', padding: '2rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="var(--border-color)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-main)', fontSize: '0.75rem', fontWeight: 600 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }}
                itemStyle={{ color: 'var(--tp-green-dark)', fontWeight: 600 }}
              />
              <Radar 
                name="Score" 
                dataKey="A" 
                stroke="var(--tp-green-dark)" 
                strokeWidth={3}
                fill="var(--tp-green)" 
                fillOpacity={0.5} 
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--tp-red)' }}>
            Design Emphasis
          </h3>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Based on your selections, this design leans heavily toward <strong>{emphasisAxis ? emphasisAxis.fullName : 'Balanced Strategies'}</strong>. 
            {emphasisAxis && ` ${emphasisAxis.description}`}
          </p>
          
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: 'var(--border-radius)', boxShadow: 'var(--shadow-sm)' }}>
             <h4 style={{ fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>Core Priorities Achieved</h4>
             <ul style={{ listStyle: 'none', padding: 0 }}>
               {radarAxes.map(axis => {
                 const scoreData = data.find(d => d.subject === axis.radarChartName);
                 const score = scoreData ? scoreData.A : 0;
                 if (score < 40) return null; // Only show strong priorities
                 return (
                   <li key={axis.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                     <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--tp-green)' }}></div>
                     {axis.radarChartName}
                   </li>
                 )
               })}
             </ul>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
        <button className="btn-secondary" onClick={() => navigate(`/system/${siteSystems.length - 1}`)}>
          <ArrowLeft size={20} />
          Go Back
        </button>
        <button 
          className="btn-primary" 
          onClick={() => navigate('/snapshot')}
        >
          View Snapshot
          <Download size={20} />
        </button>
      </div>

    </div>
  );
}
