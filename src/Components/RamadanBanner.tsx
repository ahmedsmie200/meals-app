import { useEffect, useRef } from 'react';
import './RamadanBanner.css';

// ─── Ramadan dates - عدّل هنا كل سنة ───
const RAMADAN_DATES: Record<number, { start: Date; end: Date }> = {
  2025: { start: new Date('2025-03-01'), end: new Date('2025-03-30') },
  2026: { start: new Date('2026-02-18'), end: new Date('2026-03-19') },
  2027: { start: new Date('2027-02-07'), end: new Date('2027-03-08') },
  2028: { start: new Date('2028-01-27'), end: new Date('2028-02-25') },
};

const LANTERN_COLORS = ['#f0c060', '#e05555', '#00b4a6', '#c084fc'];

function isRamadan(): boolean {
  const today = new Date();
  const dates = RAMADAN_DATES[today.getFullYear()];
  if (!dates) return false;
  return today >= dates.start && today <= dates.end;
}

function LanternSVG({ color }: { color: string }) {
  return (
    <svg
      className="lantern-svg"
      viewBox="0 0 40 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: `drop-shadow(0 0 8px ${color})` }}
    >
      {/* String */}
      <line x1="20" y1="0" x2="20" y2="8" stroke={color} strokeWidth="1.5" />
      {/* Top cap */}
      <rect x="10" y="8" width="20" height="5" rx="2" fill={color} opacity="0.9" />
      {/* Body */}
      <path
        d="M13 13 Q5 30 8 50 Q14 58 20 58 Q26 58 32 50 Q35 30 27 13 Z"
        fill={color}
        opacity="0.25"
      />
      <path
        d="M13 13 Q5 30 8 50 Q14 58 20 58 Q26 58 32 50 Q35 30 27 13 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
      />
      {/* Ribs */}
      <line x1="9"  y1="25" x2="31" y2="25" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <line x1="7"  y1="37" x2="33" y2="37" stroke={color} strokeWidth="0.8" opacity="0.6" />
      <line x1="8"  y1="48" x2="32" y2="48" stroke={color} strokeWidth="0.8" opacity="0.6" />
      {/* Glow */}
      <ellipse cx="20" cy="35" rx="8" ry="12" fill={color} opacity="0.3" />
      {/* Tassel */}
      <line x1="20" y1="58" x2="20" y2="65" stroke={color} strokeWidth="1.5" />
      <circle cx="20" cy="67" r="2" fill={color} />
    </svg>
  );
}

export default function RamadanBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isRamadan() || !bannerRef.current) return;

    bannerRef.current.style.display = 'block';

    // Simple CSS animation fallback (no GSAP needed in React)
    bannerRef.current.animate(
      [
        { transform: 'translateY(-100%)', opacity: '0' },
        { transform: 'translateY(0)',     opacity: '1' },
      ],
      { duration: 800, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'forwards' }
    );
  }, []);

  // لو مش رمضان، مترندرش خالص
  if (!isRamadan()) return null;

  // 8 فوانيس - الـ colors بتتكرر
  const lanterns = Array.from({ length: 8 }, (_, i) => LANTERN_COLORS[i % LANTERN_COLORS.length]);

  return (
    <div ref={bannerRef} className="ramadan-banner" style={{ display: 'none' }}>
      {/* Stars bg via CSS */}
      <div className="ramadan-rope" />

      <span className="moon-deco moon-left">🌙</span>
      <span className="moon-deco moon-right">✨</span>

      <div className="ramadan-lanterns">
        {lanterns.map((color, i) => (
          <div
            key={i}
            className="lantern-wrap"
            style={{ animationDelay: `${i % 2 === 0 ? 0 : -1.5}s` }}
          >
            <LanternSVG color={color} />
          </div>
        ))}
      </div>

      <div className="ramadan-greeting">
        <h2>رمضان كريم 🌙</h2>
        <p>أعاده الله عليكم بالخير واليُمن والبركات</p>
      </div>
    </div>
  );
}