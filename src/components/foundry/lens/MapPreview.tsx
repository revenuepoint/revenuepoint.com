'use client';

import dynamic from 'next/dynamic';

// Lazy-load the MapLibre canvas so the ~210KB maplibre-gl runtime only ships
// when the Map tab is actually viewed. SSR is disabled because maplibre-gl
// touches window/document during module init.
const MapCanvas = dynamic(() => import('./MapCanvas'), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

function MapSkeleton() {
  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #0f1b33 0%, #060b1a 100%)' }}
    >
      <div className="flex flex-col items-center gap-2 text-white/60">
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <p className="text-[11px] tracking-wide">Loading 3D map…</p>
      </div>
    </div>
  );
}

export function MapPreview() {
  return (
    <div
      className="map-preview relative rounded-lg overflow-hidden border border-border shadow-inner"
      style={{ background: '#060b1a', height: 560 }}
    >
      {/* Dark-theme overrides for MapLibre's default attribution control */}
      <style jsx global>{`
        .map-preview .maplibregl-ctrl-attrib {
          background: rgba(0, 0, 0, 0.6) !important;
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          margin: 0 8px 8px 0;
        }
        .map-preview .maplibregl-ctrl-attrib,
        .map-preview .maplibregl-ctrl-attrib a,
        .map-preview .maplibregl-ctrl-attrib .maplibregl-ctrl-attrib-inner {
          color: rgba(255, 255, 255, 0.6) !important;
          font-size: 10px !important;
        }
        .map-preview .maplibregl-ctrl-attrib a:hover {
          color: rgba(255, 255, 255, 0.9) !important;
        }
        .map-preview .maplibregl-ctrl-attrib-button {
          background-color: rgba(0, 0, 0, 0.6) !important;
          border-radius: 4px;
        }
        /* Make sure the navigation control (top-right) also fits the dark theme */
        .map-preview .maplibregl-ctrl-group {
          background: rgba(0, 0, 0, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .map-preview .maplibregl-ctrl-group button {
          background-color: transparent !important;
        }
        .map-preview .maplibregl-ctrl-group button:hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
        }
        .map-preview .maplibregl-ctrl-group button span {
          filter: invert(1);
        }
      `}</style>

      {/* Actual map (lazy-loaded) */}
      <MapCanvas />

      {/* Control bar (top-left overlay) */}
      <div className="absolute top-3 left-3 flex items-center gap-2 z-10 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded border border-white/10 bg-black/60 backdrop-blur-sm text-[10px] text-white/80">
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path
              d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Customer Map · 15 locations</span>
          <span className="text-white/40 ml-1">▾</span>
        </div>
        <span className="px-2 py-1 rounded border border-white/10 bg-black/60 backdrop-blur-sm text-[10px] text-white/70">
          Last 30 Days
        </span>
      </div>

      {/* Legend (bottom-left, opposite corner from attribution) */}
      <div className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/60 backdrop-blur-sm px-3 py-2 text-[10px] text-white/80 flex flex-col gap-1 z-10 pointer-events-none">
        <p className="text-[9px] uppercase tracking-wider text-white/50 mb-0.5">AR status</p>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Current
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-amber-500" />
          30–60d overdue
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          60+d / On Hold
        </span>
        <span className="flex items-center gap-1.5 mt-1 pt-1 border-t border-white/10">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          RevenuePoint HQ
        </span>
      </div>
    </div>
  );
}
