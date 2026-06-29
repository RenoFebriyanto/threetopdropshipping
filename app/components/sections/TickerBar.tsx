'use client';

export default function TickerBar() {
  const items = [
    'FREE SHIPPING WORLDWIDE',
    'NEW DROP: COLLECTION 04',
    'AI STYLED',
    'LIMITED PIECES',
  ];

  return (
    <div className="w-full bg-signal text-void py-3 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-8 pr-8">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-center gap-8">
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  {item}
                </span>
                <span className="text-lg">✦</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
