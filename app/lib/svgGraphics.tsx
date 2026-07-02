'use client';

// SVG Icons dan Shapes untuk visual design
export function HeroGraphic() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient */}
      <defs>
        <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="1" />
          <stop offset="50%" stopColor="#1a1a1a" stopOpacity="1" />
          <stop offset="100%" stopColor="#0A0A0A" stopOpacity="1" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E8FF00" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#E8FF00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background */}
      <rect width="1200" height="800" fill="url(#heroGradient)" />

      {/* Decorative circles */}
      <circle cx="200" cy="150" r="80" fill="none" stroke="#E8FF00" strokeWidth="2" opacity="0.3" />
      <circle cx="200" cy="150" r="60" fill="none" stroke="#E8FF00" strokeWidth="1" opacity="0.2" />

      <circle cx="1000" cy="700" r="120" fill="none" stroke="#E8FF00" strokeWidth="2" opacity="0.3" />
      <circle cx="1000" cy="700" r="90" fill="none" stroke="#E8FF00" strokeWidth="1" opacity="0.2" />

      {/* Glow effects */}
      <circle cx="600" cy="400" r="200" fill="url(#glow)" />

      {/* Geometric shapes */}
      <g opacity="0.15">
        <line x1="100" y1="100" x2="300" y2="100" stroke="#E8FF00" strokeWidth="2" />
        <line x1="100" y1="100" x2="100" y2="300" stroke="#E8FF00" strokeWidth="2" />
        <line x1="300" y1="100" x2="300" y2="300" stroke="#E8FF00" strokeWidth="2" />
        <line x1="100" y1="300" x2="300" y2="300" stroke="#E8FF00" strokeWidth="2" />
      </g>

      {/* Diagonal lines - tech feel */}
      <line x1="0" y1="0" x2="400" y2="400" stroke="#E8FF00" strokeWidth="1" opacity="0.1" />
      <line x1="800" y1="0" x2="1200" y2="400" stroke="#E8FF00" strokeWidth="1" opacity="0.1" />
      <line x1="1200" y1="400" x2="800" y2="800" stroke="#E8FF00" strokeWidth="1" opacity="0.1" />
      <line x1="400" y1="800" x2="0" y2="400" stroke="#E8FF00" strokeWidth="1" opacity="0.1" />

      {/* Floating particles effect */}
      <circle cx="150" cy="200" r="3" fill="#E8FF00" opacity="0.6" />
      <circle cx="1050" cy="250" r="2" fill="#E8FF00" opacity="0.4" />
      <circle cx="300" cy="600" r="4" fill="#E8FF00" opacity="0.5" />
      <circle cx="900" cy="400" r="2.5" fill="#E8FF00" opacity="0.3" />
      <circle cx="600" cy="150" r="3" fill="#E8FF00" opacity="0.4" />
    </svg>
  );
}

export function SectionDivider() {
  return (
    <svg
      className="w-full h-16"
      viewBox="0 0 1200 100"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,30 Q300,60 600,30 T1200,30 L1200,100 L0,100 Z"
        fill="#E8FF00"
        opacity="0.1"
      />
    </svg>
  );
}

export function ProductPlaceholder({ index }: { index: number }) {
  const colors = ['#8C8C8C', '#CCCCCC', '#3D3D3D', '#8C8C8C', '#CCCCCC', '#3D3D3D'];

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 400 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`productGrad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[index % colors.length]} stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="400" height="500" fill={`url(#productGrad${index})`} />
      <rect x="24" y="24" width="352" height="452" rx="24" fill="none" stroke="#E8FF00" strokeOpacity="0.25" strokeWidth="2" />

      {/* Clothing hanger icon */}
      <g transform="translate(200, 150)">
        {/* Hanger */}
        <path
          d="M -50,0 Q 0,-30 50,0"
          stroke="#E8FF00"
          strokeWidth="3"
          fill="none"
        />
        {/* Hook */}
        <circle cx="0" cy="0" r="4" fill="#E8FF00" />

        {/* Garment shape - jacket/shirt */}
        <path
          d="M -50,20 L -50,150 Q -50,180 -20,180 L 20,180 Q 50,180 50,150 L 50,20"
          stroke="#E8FF00"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        {/* Sleeves */}
        <line x1="-50" y1="50" x2="-100" y2="80" stroke="#E8FF00" strokeWidth="2" opacity="0.5" />
        <line x1="50" y1="50" x2="100" y2="80" stroke="#E8FF00" strokeWidth="2" opacity="0.5" />
      </g>

      {/* Corner accent */}
      <g opacity="0.3">
        <rect x="10" y="10" width="50" height="50" fill="none" stroke="#E8FF00" strokeWidth="2" />
        <line x1="10" y1="10" x2="60" y2="60" stroke="#E8FF00" strokeWidth="1" />
      </g>

      {/* Bottom accent line */}
      <line x1="20" y1="480" x2="380" y2="480" stroke="#E8FF00" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

export function StatIcon({ type }: { type: 'pieces' | 'satisfaction' | 'delivery' }) {
  const icons = {
    pieces: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#E8FF00" strokeWidth="2" />
        <text x="50" y="60" textAnchor="middle" fontSize="24" fill="#E8FF00" fontWeight="bold">
          ◆
        </text>
      </svg>
    ),
    satisfaction: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#E8FF00" strokeWidth="2" />
        <circle cx="35" cy="40" r="5" fill="#E8FF00" />
        <circle cx="65" cy="40" r="5" fill="#E8FF00" />
        <path d="M 35,65 Q 50,75 65,65" stroke="#E8FF00" strokeWidth="2" fill="none" />
      </svg>
    ),
    delivery: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="40" fill="none" stroke="#E8FF00" strokeWidth="2" />
        <path d="M 25,45 L 45,35 L 75,55 L 70,70 L 30,70 Z" fill="none" stroke="#E8FF00" strokeWidth="2" />
        <circle cx="35" cy="70" r="5" fill="none" stroke="#E8FF00" strokeWidth="2" />
        <circle cx="65" cy="70" r="5" fill="none" stroke="#E8FF00" strokeWidth="2" />
      </svg>
    ),
  };

  return <div className="w-16 h-16">{icons[type]}</div>;
}
