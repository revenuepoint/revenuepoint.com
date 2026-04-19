'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import type { ExpressionSpecification } from 'maplibre-gl';
import {
  Map,
  Source,
  Layer,
  NavigationControl,
  Popup,
  type MapLayerMouseEvent,
  type MapRef,
} from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

const DARK_STYLE = 'https://tiles.openfreemap.org/styles/dark';

const STATUS_COLORS: Record<string, string> = {
  green: '#22c55e',
  amber: '#eab308',
  red: '#ef4444',
  blue: '#3b82f6',
  grey: '#6b7280',
};

type MarkerStatus = 'green' | 'amber' | 'red' | 'blue';

type DemoMarker = {
  id: string;
  name: string;
  lng: number;
  lat: number;
  status: MarkerStatus;
  metricLabel: string;
  metricValue: string;
};

// 15 demo markers around lower + midtown Manhattan, centered on 200 Vesey Street.
// RevenuePoint HQ (200 Vesey Street) is the anchor, in blue. 7 green / 5 amber / 2 red.
const DEMO_MARKERS: DemoMarker[] = [
  { id: 'hq',  name: 'RevenuePoint HQ · 200 Vesey',     lat: 40.7143, lng: -74.0134, status: 'blue',  metricLabel: '',         metricValue: '200 Vesey Street' },
  { id: 'm01', name: 'WTC Corridor Capital',             lat: 40.7127, lng: -74.0134, status: 'green', metricLabel: 'Revenue',  metricValue: '$2.4M' },
  { id: 'm02', name: 'Brookfield Suppliers',             lat: 40.7137, lng: -74.0155, status: 'amber', metricLabel: 'AR',       metricValue: '$18K · 42d' },
  { id: 'm03', name: 'Battery Partners',                 lat: 40.7033, lng: -74.0170, status: 'red',   metricLabel: 'AR',       metricValue: '$47.2K · 62d' },
  { id: 'm04', name: 'Wall Street Holdings',             lat: 40.7068, lng: -74.0113, status: 'green', metricLabel: 'Revenue',  metricValue: '$1.8M' },
  { id: 'm05', name: 'Financial District Inc',           lat: 40.7075, lng: -74.0090, status: 'green', metricLabel: 'Revenue',  metricValue: '$1.4M' },
  { id: 'm06', name: 'Tribeca Logistics',                lat: 40.7195, lng: -74.0089, status: 'amber', metricLabel: 'AR',       metricValue: '$12K · 38d' },
  { id: 'm07', name: 'SoHo Supply Co.',                  lat: 40.7243, lng: -74.0018, status: 'green', metricLabel: 'Revenue',  metricValue: '$920K' },
  { id: 'm08', name: 'East Village Retail',              lat: 40.7265, lng: -73.9815, status: 'green', metricLabel: 'Revenue',  metricValue: '$780K' },
  { id: 'm09', name: 'Union Square Distribution',        lat: 40.7359, lng: -73.9911, status: 'amber', metricLabel: 'AR',       metricValue: '$8K · 34d' },
  { id: 'm10', name: 'Madison Square Metals',            lat: 40.7423, lng: -73.9881, status: 'green', metricLabel: 'Revenue',  metricValue: '$1.1M' },
  { id: 'm11', name: 'Chelsea Fabrication',              lat: 40.7465, lng: -74.0014, status: 'amber', metricLabel: 'AR',       metricValue: '$22K · 45d' },
  { id: 'm12', name: 'Hudson Yards Trading',             lat: 40.7540, lng: -74.0014, status: 'green', metricLabel: 'Revenue',  metricValue: '$3.2M' },
  { id: 'm13', name: 'Times Sq Wholesale',               lat: 40.7580, lng: -73.9855, status: 'red',   metricLabel: 'AR',       metricValue: '$34K · 58d' },
  { id: 'm14', name: 'Midtown Industries',               lat: 40.7580, lng: -73.9819, status: 'amber', metricLabel: 'AR',       metricValue: '$14K · 36d' },
];

const CENTER_LAT = 40.7143;
const CENTER_LNG = -74.0134;

export default function MapCanvas() {
  const mapRef = useRef<MapRef>(null);
  const [hoverMarker, setHoverMarker] = useState<DemoMarker | null>(null);

  // Convert markers to GeoJSON so they can be rendered as map layers.
  const geojson = useMemo<GeoJSON.FeatureCollection>(
    () => ({
      type: 'FeatureCollection',
      features: DEMO_MARKERS.map((m) => ({
        type: 'Feature' as const,
        geometry: { type: 'Point' as const, coordinates: [m.lng, m.lat] },
        properties: { id: m.id, status: m.status, name: m.name },
      })),
    }),
    []
  );

  // On load: hide flat building layer and add 3D fill-extrusion buildings.
  const handleLoad = useCallback(() => {
    const map = mapRef.current?.getMap();
    if (!map || map.getLayer('3d-buildings')) return;

    if (map.getLayer('building')) {
      map.setLayoutProperty('building', 'visibility', 'none');
    }

    map.addLayer({
      id: '3d-buildings',
      source: 'openmaptiles',
      'source-layer': 'building',
      type: 'fill-extrusion',
      minzoom: 14,
      paint: {
        'fill-extrusion-color': '#1a1a2e',
        'fill-extrusion-height': ['get', 'render_height'],
        'fill-extrusion-base': ['get', 'render_min_height'],
        'fill-extrusion-opacity': 0.35,
      },
    });
  }, []);

  const handleMouseMove = useCallback((e: MapLayerMouseEvent) => {
    const feature = e.features?.[0];
    if (feature) {
      const id = feature.properties?.id;
      const found = DEMO_MARKERS.find((m) => m.id === id);
      setHoverMarker(found ?? null);
    } else {
      setHoverMarker(null);
    }
  }, []);

  const handleMouseLeave = useCallback(() => setHoverMarker(null), []);

  // Status → color match expression (for layer paint).
  const colorExpr: ExpressionSpecification = [
    'match',
    ['get', 'status'],
    'green', STATUS_COLORS.green,
    'amber', STATUS_COLORS.amber,
    'red', STATUS_COLORS.red,
    'blue', STATUS_COLORS.blue,
    STATUS_COLORS.grey,
  ];

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: CENTER_LNG,
        latitude: CENTER_LAT,
        zoom: 14.5,
        pitch: 60,
        bearing: -17.6,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={DARK_STYLE}
      onLoad={handleLoad}
      interactiveLayerIds={['marker-circles', 'marker-ring', 'marker-halo-mid']}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      cursor={hoverMarker ? 'pointer' : 'grab'}
      maxPitch={85}
      attributionControl={{ compact: true }}
    >
      <NavigationControl position="top-right" showCompass showZoom visualizePitch />

      {/* Palantir-style halo markers: outer halo → mid halo → ring → core */}
      <Source id="markers" type="geojson" data={geojson}>
        <Layer
          id="marker-halo-outer"
          type="circle"
          paint={{
            'circle-radius': 32,
            'circle-color': colorExpr,
            'circle-opacity': 0.08,
            'circle-blur': 1,
          }}
        />
        <Layer
          id="marker-halo-mid"
          type="circle"
          paint={{
            'circle-radius': 18,
            'circle-color': colorExpr,
            'circle-opacity': 0.2,
            'circle-blur': 0.6,
          }}
        />
        <Layer
          id="marker-ring"
          type="circle"
          paint={{
            'circle-radius': 9,
            'circle-color': 'transparent',
            'circle-stroke-width': 1.5,
            'circle-stroke-color': colorExpr,
            'circle-stroke-opacity': 0.7,
          }}
        />
        <Layer
          id="marker-circles"
          type="circle"
          paint={{
            'circle-radius': 5,
            'circle-color': colorExpr,
            'circle-opacity': 1,
          }}
        />
      </Source>

      {hoverMarker && (
        <Popup
          longitude={hoverMarker.lng}
          latitude={hoverMarker.lat}
          closeButton={false}
          closeOnClick={false}
          anchor="bottom"
          offset={14}
        >
          <div className="text-xs">
            <p className="font-semibold text-navy">{hoverMarker.name}</p>
            {hoverMarker.metricLabel && (
              <p className="text-mutedText mt-0.5">
                {hoverMarker.metricLabel}: <span className="font-mono text-bodyText">{hoverMarker.metricValue}</span>
              </p>
            )}
            {!hoverMarker.metricLabel && hoverMarker.metricValue && (
              <p className="text-mutedText mt-0.5">{hoverMarker.metricValue}</p>
            )}
          </div>
        </Popup>
      )}
    </Map>
  );
}
