import React from 'react';

export const HumanChar: React.FC<{
  pose?: string;
  x?: number;
  y?: number;
  scale?: number;
  face?: { open?: number; wide?: number; brow?: number; mouthOpen?: number; smile?: number };
  alive?: number;
}> = ({ pose = 'idle', x = 0, y = 0, scale = 1, face = {}, alive = 1 }) => {
  const isIdle = pose === 'idle';
  const isWalk = pose === 'walk';
  const isThink = pose === 'think' || pose === 'thinking';
  const isPoint = pose === 'point';
  const isWhatif = pose === 'whatif';
  const isTalk = pose === 'talk' || pose === 'talking';

  const armL = isWalk ? -0.5 : isPoint ? 0.3 : isWhatif ? -0.8 : isThink ? 0.3 : 0.1;
  const armR = isWalk ? 0.8 : isPoint ? 1.2 : isWhatif ? 0.8 : isThink ? 0.1 : -0.1;
  const legL = isWalk ? 0.3 : 0;
  const legR = isWalk ? -0.3 : 0;
  const headTilt = isThink ? 0.1 : isWhatif ? 0.15 : 0;

  const mouthOpen = face.mouthOpen ?? (isTalk ? 0.5 : 0.1);
  const smile = face.smile ?? (isIdle ? 0.3 : 0);
  const wide = face.wide ?? 0;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      {/* Shadow */}
      <ellipse cx={0} cy={12} rx={35} ry={8} fill="rgba(0,0,0,0.15)" />

      {/* Legs (jeans) */}
      <rect x={-14} y={-8} width={12} height={70} rx={6} fill="#2a4a6c"
        transform={`rotate(${legL * 15}, -8, -8)`} />
      <rect x={2} y={-8} width={12} height={70} rx={6} fill="#2a4a6c"
        transform={`rotate(${legR * 15}, 8, -8)`} />

      {/* Knees detail */}
      <rect x={-12} y={20} width={8} height={3} rx={1} fill="#1a3a5c"
        transform={`rotate(${legL * 15}, -8, -8)`} />
      <rect x={4} y={20} width={8} height={3} rx={1} fill="#1a3a5c"
        transform={`rotate(${legR * 15}, 8, -8)`} />

      {/* Shoes (white sneakers) */}
      <ellipse cx={-8} cy={62} rx={16} ry={8} fill="#ffffff" />
      <ellipse cx={8} cy={62} rx={16} ry={8} fill="#ffffff" />
      {/* Shoe sole */}
      <ellipse cx={-8} cy={66} rx={14} ry={4} fill="#cccccc" />
      <ellipse cx={8} cy={66} rx={14} ry={4} fill="#cccccc" />
      {/* Shoe laces */}
      <line x1={-12} y1={58} x2={-4} y2={58} stroke="#888" strokeWidth={1} />
      <line x1={4} y1={58} x2={12} y2={58} stroke="#888" strokeWidth={1} />

      {/* Body (hoodie) */}
      <rect x={-28} y={-75} width={56} height={75} rx={10} fill="#87CEEB" />
      {/* Hoodie pocket */}
      <rect x={-18} y={-25} width={36} height={18} rx={4} fill="#5BA3C9" />
      <rect x={-15} y={-22} width={30} height={12} rx={3} fill="#7BB8D4" />
      {/* Hoodie strings */}
      <line x1={-6} y1={-70} x2={-8} y2={-50} stroke="#5BA3C9" strokeWidth={2} />
      <line x1={6} y1={-70} x2={8} y2={-50} stroke="#5BA3C9" strokeWidth={2} />
      <circle cx={-8} cy={-48} r={2} fill="#5BA3C9" />
      <circle cx={8} cy={-48} r={2} fill="#5BA3C9" />

      {/* SO3 text on chest */}
      <text x={0} y={-45} textAnchor="middle" fill="#ff0000" fontSize={16} fontWeight="bold" fontFamily="Arial, sans-serif">SO3</text>

      {/* Arms (hoodie sleeves) */}
      <rect x={-45} y={-70} width={18} height={55} rx={8} fill="#87CEEB"
        transform={`rotate(${armL * 35}, -36, -70)`} />
      <rect x={27} y={-70} width={18} height={55} rx={8} fill="#87CEEB"
        transform={`rotate(${armR * 35}, 36, -70)`} />

      {/* Hands (skin) */}
      <circle cx={-36} cy={-15 + armL * 10} r={8} fill="#f5d6b8"
        transform={`rotate(${armL * 35}, -36, -70)`} />
      <circle cx={36} cy={-15 + armR * 10} r={8} fill="#f5d6b8"
        transform={`rotate(${armR * 35}, 36, -70)`} />

      {/* Neck */}
      <rect x={-6} y={-85} width={12} height={12} rx={4} fill="#f5d6b8" />

      {/* Head */}
      <ellipse cx={0} cy={-100} rx={22} ry={24} fill="#f5d6b8"
        transform={`rotate(${headTilt * 10}, 0, -100)`} />

      {/* Hair */}
      <path d="M -22,-115 Q -20,-130 0,-132 Q 20,-130 22,-115 L 22,-105 Q 15,-112 0,-112 Q -15,-112 -22,-105 Z"
        fill="#5a3825" transform={`rotate(${headTilt * 10}, 0, -100)`} />
      {/* Hair sideburns */}
      <path d="M -20,-100 Q -22,-95 -20,-90" stroke="#5a3825" strokeWidth={3} fill="none"
        transform={`rotate(${headTilt * 10}, 0, -100)`} />
      <path d="M 20,-100 Q 22,-95 20,-90" stroke="#5a3825" strokeWidth={3} fill="none"
        transform={`rotate(${headTilt * 10}, 0, -100)`} />

      {/* Eyes */}
      <g transform={`rotate(${headTilt * 10}, 0, -100)`}>
        <ellipse cx={-8} cy={-102} rx={4 + wide * 2} ry={3 + wide * 1} fill="#fff" />
        <ellipse cx={8} cy={-102} rx={4 + wide * 2} ry={3 + wide * 1} fill="#fff" />
        <circle cx={-8} cy={-102} r={2.5} fill="#3a2a1a" />
        <circle cx={8} cy={-102} r={2.5} fill="#3a2a1a" />
        <circle cx={-7} cy={-103} r={1} fill="#fff" />
        <circle cx={9} cy={-103} r={1} fill="#fff" />
        {/* Eyebrows */}
        <path d={`M -12,-108 Q -8,-${110 + (face.brow ?? 0) * 3} -4,-108`} stroke="#5a3825" strokeWidth={2} fill="none" />
        <path d={`M 4,-108 Q 8,-${110 + (face.brow ?? 0) * 3} 12,-108`} stroke="#5a3825" strokeWidth={2} fill="none" />
      </g>

      {/* Nose */}
      <path d="M 0,-98 L 2,-94 L 0,-93" stroke="#d4a574" strokeWidth={1.5} fill="none"
        transform={`rotate(${headTilt * 10}, 0, -100)`} />

      {/* Mouth */}
      <g transform={`rotate(${headTilt * 10}, 0, -100)`}>
        {mouthOpen > 0.3 ? (
          <ellipse cx={0} cy={-88} rx={5} ry={3 + mouthOpen * 3} fill="#c0392b" />
        ) : (
          <path d={`M -5,-88 Q 0,${-88 + smile * 4} 5,-88`} stroke="#c0392b" strokeWidth={2} fill="none" />
        )}
      </g>

      {/* Breathing animation */}
      <animateTransform attributeName="transform" type="scale" values={`1;${1 + alive * 0.02};1`} dur="3s" repeatCount="indefinite" additive="sum" />
    </g>
  );
};
