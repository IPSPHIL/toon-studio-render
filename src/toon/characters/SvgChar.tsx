import React from 'react';

export const SvgChar: React.FC<{ pose?: number; x?: number; y?: number; scale?: number }> = ({ pose = 0, x = 0, y = 0, scale = 1 }) => {
  const poses = [
    { armL: -0.2, armR: 0.2, legL: -0.1, legR: 0.1, head: 0 },   // idle
    { armL: -0.5, armR: 0.8, legL: 0.3, legR: -0.3, head: 0.05 }, // walking
    { armL: 0.3, armR: 0.1, legL: -0.05, legR: 0.05, head: 0.1 },  // thinking
    { armL: 1.2, armR: 1.2, legL: 0, legR: 0, head: 0.15 },         // surprised
    { armL: 0.5, armR: -0.3, legL: -0.05, legR: 0.05, head: 0 },   // talking
    { armL: 0.2, armR: -0.2, legL: 0.2, legR: -0.2, head: -0.05 }, // sitting
  ];
  const p = poses[pose] || poses[0];

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Shadow */}
      <ellipse cx={0} cy={10} rx={25} ry={6} fill="rgba(0,0,0,0.2)" />
      
      {/* Legs */}
      <rect x={-12} y={-5} width={8} height={60} rx={4} fill="#1a3a5c" transform={`rotate(${p.legL * 20}, -8, -5)`} />
      <rect x={4} y={-5} width={8} height={60} rx={4} fill="#1a3a5c" transform={`rotate(${p.legR * 20}, 8, -5)`} />
      
      {/* Shoes */}
      <ellipse cx={-8} cy={55} rx={12} ry={6} fill="#ffffff" />
      <ellipse cx={8} cy={55} rx={12} ry={6} fill="#ffffff" />
      
      {/* Body (hoodie) */}
      <rect x={-20} y={-65} width={40} height={65} rx={8} fill="#87CEEB" />
      
      {/* SO3 text on chest */}
      <text x={0} y={-40} textAnchor="middle" fill="#ff0000" fontSize={14} fontWeight="bold" fontFamily="Arial">SO3</text>
      
      {/* Arms */}
      <rect x={-35} y={-60} width={12} height={45} rx={6} fill="#87CEEB" transform={`rotate(${p.armL * 40}, -29, -60)`} />
      <rect x={23} y={-60} width={12} height={45} rx={6} fill="#87CEEB" transform={`rotate(${p.armR * 40}, 29, -60)`} />
      
      {/* Hands */}
      <circle cx={-29} cy={-15} r={6} fill="#f5d6b8" />
      <circle cx={29} cy={-15} r={6} fill="#f5d6b8" />
      
      {/* Head */}
      <circle cx={0} cy={-80} r={18} fill="#f5d6b8" />
      
      {/* Hair */}
      <path d="M -18,-90 Q -15,-100 0,-102 Q 15,-100 18,-90 L 18,-80 Q 10,-85 0,-85 Q -10,-85 -18,-80 Z" fill="#8B4513" />
      
      {/* Eyes */}
      <circle cx={-6} cy={-82} r={3} fill="#333" />
      <circle cx={6} cy={-82} r={3} fill="#333" />
      
      {/* Mouth */}
      <path d="M -5,-72 Q 0,-68 5,-72" stroke="#333" strokeWidth={1.5} fill="none" />
    </g>
  );
};
