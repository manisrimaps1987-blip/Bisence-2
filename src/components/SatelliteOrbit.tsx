import React from 'react';

interface SatelliteOrbitProps {
  children: React.ReactNode;
  className?: string;
  showTrack?: boolean;
}

/**
 * SatelliteOrbit
 * Renders a tiny bright red satellite light that smoothly travels around the
 * perimeter of yellow buttons with a subtle red glow and trail.
 *
 * Requirements:
 * - The yellow button inside does NOT blink, move, resize, or change color.
 * - Tiny bright red light orbits the perimeter like a satellite.
 * - Restricted strictly to yellow buttons.
 */
export const SatelliteOrbit: React.FC<SatelliteOrbitProps> = ({
  children,
  className = '',
  showTrack = true
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center p-[2px] ${className}`}>
      {/* Subtle faint orbit track guide */}
      {showTrack && <div className="satellite-orbit-track" aria-hidden="true" />}

      {/* Orbiting Satellite Light with subtle trailing glow */}
      <span className="satellite-dot-trail-2" aria-hidden="true" />
      <span className="satellite-dot-trail-1" aria-hidden="true" />
      <span className="satellite-dot-lead" aria-hidden="true" />

      {/* The untouched button - no blinking, no moving, no resizing, no color changes */}
      {children}
    </div>
  );
};
