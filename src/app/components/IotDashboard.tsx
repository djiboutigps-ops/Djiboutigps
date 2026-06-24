import { useState, useEffect, useRef } from "react";
import {
  Wifi, MapPin, Gauge, Thermometer, Battery, Signal,
  Camera, AlertTriangle, CheckCircle, Activity, Navigation
} from "lucide-react";

// --- Geo projection (equirectangular) ---
// Map bounding box: lon 36–52°E, lat 5–17°N
const MAP_LON_MIN = 36, MAP_LON_MAX = 52;
const MAP_LAT_MIN = 5,  MAP_LAT_MAX = 17;
const W = 500, H = 300;

function project(lon: number, lat: number): [number, number] {
  const x = ((lon - MAP_LON_MIN) / (MAP_LON_MAX - MAP_LON_MIN)) * W;
  const y = H - ((lat - MAP_LAT_MIN) / (MAP_LAT_MAX - MAP_LAT_MIN)) * H;
  return [x, y];
}

function pts(coords: [number, number][]): string {
  return coords.map(([lon, lat]) => project(lon, lat).join(",")).join(" ");
}

// --- Country outlines (simplified but geographically accurate) ---
// Djibouti
const DJIBOUTI: [number, number][] = [
  [43.42, 11.62],[43.90, 12.63],[42.60, 12.86],[41.76, 11.83],[41.76, 11.10],
  [42.07, 10.93],[42.31, 11.03],[42.48, 11.38],[42.85, 11.15],[43.10, 11.39],[43.42, 11.62]
];

// Eritrea (simplified north border)
const ERITREA: [number, number][] = [
  [36.52, 14.25],[38.41, 14.54],[39.97, 15.33],[41.18, 14.96],[42.36, 13.34],
  [43.08, 12.70],[42.60, 12.86],[41.66, 11.84],[41.00, 11.50],[40.00, 13.00],
  [38.50, 14.00],[36.52, 14.25]
];

// Ethiopia (simplified)
const ETHIOPIA: [number, number][] = [
  [38.00, 14.85],[40.02, 15.33],[41.18, 14.96],[42.36, 13.34],[43.08, 12.70],
  [42.60, 12.86],[41.76, 11.83],[41.76, 11.10],[42.07, 10.93],[42.00, 9.00],
  [41.50, 8.00],[41.00, 6.50],[40.00, 5.30],[38.50, 5.30],[36.80, 6.20],
  [35.50, 8.00],[34.80, 10.00],[36.00, 11.50],[37.00, 12.50],[38.00, 14.85]
];

// Somalia (simplified)
const SOMALIA: [number, number][] = [
  [41.76, 11.83],[41.76, 11.10],[42.07, 10.93],[42.00, 9.00],[41.50, 8.00],
  [41.00, 6.50],[40.00, 5.30],[41.80, 5.00],[44.00, 5.00],[46.00, 5.50],
  [48.00, 6.50],[49.50, 8.00],[50.50, 9.50],[51.50, 11.50],[51.10, 12.00],
  [50.80, 12.50],[48.70, 12.80],[45.50, 11.00],[44.50, 11.50],[44.00, 11.50],
  [43.42, 11.62],[43.10, 11.39],[42.85, 11.15],[42.48, 11.38],[42.31, 11.03],[41.76, 11.83]
];

// Gulf of Aden coastline approximation (for visual water fill)
const GULF_ADEN: [number, number][] = [
  [43.42, 11.62],[44.50, 11.50],[45.50, 11.00],[44.00, 11.50],[43.08, 12.70],
  [42.60, 12.86],[43.90, 12.63],[43.42, 11.62]
];

// Route: Djibouti City → Dire Dawa → Addis Ababa → Mekelle → Asmara → retour → Hargeisa
const ROUTE_GEO: [number, number][] = [
  [43.14, 11.59],  // Djibouti City
  [42.70, 11.60],
  [42.07, 10.93],
  [41.87, 9.59],   // Dire Dawa, Éthiopie
  [40.50, 9.10],
  [39.50, 9.00],
  [38.75, 9.02],   // Addis Abeba, Éthiopie
  [38.90, 10.50],
  [39.30, 11.80],
  [39.48, 13.50],  // Mekelle, Éthiopie
  [39.20, 14.50],
  [38.93, 15.34],  // Asmara, Érythrée
  [39.47, 15.62],  // Massawa, Érythrée
  [39.90, 14.80],
  [40.50, 13.50],
  [41.50, 12.00],
  [41.87, 9.59],   // Dire Dawa (retour)
  [42.50, 9.40],
  [43.30, 9.20],
  [44.07, 9.56],   // Hargeisa, Somaliland
];

// Température ambiante moyenne par étape (°C) — basée sur climat réel de chaque région
// Djibouti côtier chaud → montagnes éthiopiennes fraîches → Érythrée → Somaliland semi-aride
const ROUTE_TEMPS: number[] = [
  38,  // Djibouti City — côte, désert, très chaud
  37,
  35,
  33,  // Dire Dawa — semi-aride, chaud
  28,
  22,
  18,  // Addis Abeba — 2 400 m d'altitude, tempéré
  19,
  21,
  22,  // Mekelle — 2 100 m, tempéré-chaud
  20,
  17,  // Asmara — 2 325 m, le plus frais
  34,  // Massawa — port en mer Rouge, très chaud
  30,
  28,
  31,
  33,  // Dire Dawa (retour)
  30,
  27,
  25,  // Hargeisa — 1 300 m, semi-aride modéré
];

function getRegionTemp(progress: number): number {
  const total = ROUTE_TEMPS.length - 1;
  const scaled = progress * total;
  const idx = Math.min(Math.floor(scaled), total - 1);
  const t = scaled - idx;
  return lerp(ROUTE_TEMPS[idx], ROUTE_TEMPS[idx + 1], t);
}

// Noms des étapes clés pour afficher la région
const ROUTE_LABELS: { progress: number; name: string }[] = [
  { progress: 0.00, name: "Djibouti City" },
  { progress: 0.15, name: "Dire Dawa, ETH" },
  { progress: 0.30, name: "Addis Abeba, ETH" },
  { progress: 0.45, name: "Mekelle, ETH" },
  { progress: 0.55, name: "Asmara, ERI" },
  { progress: 0.60, name: "Massawa, ERI" },
  { progress: 0.80, name: "Dire Dawa, ETH" },
  { progress: 1.00, name: "Hargeisa, SOM" },
];

function getCurrentRegionLabel(progress: number): string {
  let label = ROUTE_LABELS[0].name;
  for (const step of ROUTE_LABELS) {
    if (progress >= step.progress) label = step.name;
  }
  return label;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function getGeoPos(progress: number): [number, number] {
  const total = ROUTE_GEO.length - 1;
  const scaled = progress * total;
  const idx = Math.min(Math.floor(scaled), total - 1);
  const t = scaled - idx;
  return [
    lerp(ROUTE_GEO[idx][0], ROUTE_GEO[idx + 1][0], t),
    lerp(ROUTE_GEO[idx][1], ROUTE_GEO[idx + 1][1], t),
  ];
}

function getAngleDeg(progress: number): number {
  const total = ROUTE_GEO.length - 1;
  const scaled = progress * total;
  const idx = Math.min(Math.floor(scaled), total - 1);
  const [x1, y1] = project(ROUTE_GEO[idx][0], ROUTE_GEO[idx][1]);
  const [x2, y2] = project(ROUTE_GEO[idx + 1][0], ROUTE_GEO[idx + 1][1]);
  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

function AnimatedValue({ value, unit, min, max }: { value: number; unit: string; min?: number; max?: number }) {
  const [displayed, setDisplayed] = useState(value);
  useEffect(() => {
    const id = setInterval(() => {
      setDisplayed((v) => {
        const next = Math.round((v + (Math.random() - 0.5) * 3) * 10) / 10;
        if (min !== undefined && max !== undefined) return Math.min(max, Math.max(min, next));
        return next;
      });
    }, 2000);
    return () => clearInterval(id);
  }, [min, max]);
  return <span>{displayed}<span className="text-xs ml-0.5 opacity-70">{unit}</span></span>;
}

function PulsingDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`}></span>
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${color}`}></span>
    </span>
  );
}

export function IotDashboard() {
  const [progress, setProgress] = useState(0.05);
  const [speed, setSpeed] = useState(68);
  const [alertIdx, setAlertIdx] = useState(0);
  const [tempNoise, setTempNoise] = useState(0);
  const dirRef = useRef(1);

  const ALERTS = [
    { ok: true,  color: "text-green-400",  icon: <CheckCircle size={11} />, text: "Conduite normale" },
    { ok: false, color: "text-red-400",    icon: <AlertTriangle size={11} />, text: "⚠️ Chauffeur s'assoupit — Klaxon activé" },
    { ok: false, color: "text-orange-400", icon: <AlertTriangle size={11} />, text: "🌿 Consommation de khat détectée" },
    { ok: true,  color: "text-green-400",  icon: <CheckCircle size={11} />, text: "Conduite normale" },
    { ok: false, color: "text-yellow-400", icon: <AlertTriangle size={11} />, text: "🚬 Cigarette détectée" },
    { ok: true,  color: "text-green-400",  icon: <CheckCircle size={11} />, text: "Conduite normale" },
    { ok: false, color: "text-red-400",    icon: <AlertTriangle size={11} />, text: "🪢 Ceinture de sécurité non attachée" },
    { ok: true,  color: "text-green-400",  icon: <CheckCircle size={11} />, text: "Conduite normale" },
    { ok: false, color: "text-orange-400", icon: <AlertTriangle size={11} />, text: "⚠️ Fatigue détectée" },
    { ok: true,  color: "text-green-400",  icon: <CheckCircle size={11} />, text: "Conduite normale" },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        const next = p + 0.004 * dirRef.current;
        if (next >= 0.98) dirRef.current = -1;
        if (next <= 0.02) dirRef.current = 1;
        return Math.max(0, Math.min(1, next));
      });
    }, 60);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setSpeed((v) => Math.min(120, Math.max(20, Math.round(v + (Math.random() - 0.5) * 14))));
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setAlertIdx((i) => (i + 1) % ALERTS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTempNoise((Math.random() - 0.5) * 2);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const geoPos = getGeoPos(progress);
  const [vx, vy] = project(geoPos[0], geoPos[1]);
  const angle = getAngleDeg(progress);
  const regionTemp = Math.round((getRegionTemp(progress) + tempNoise) * 10) / 10;
  const regionLabel = getCurrentRegionLabel(progress);
  const tempColor = regionTemp >= 35 ? "text-red-400" : regionTemp >= 25 ? "text-orange-400" : "text-blue-300";
  const tempBarWidth = Math.min(100, Math.max(5, ((regionTemp - 15) / 25) * 100));

  const passedRoute = ROUTE_GEO.slice(0, Math.ceil(progress * (ROUTE_GEO.length - 1)) + 1);
  const lastGeo = getGeoPos(progress);
  if (passedRoute[passedRoute.length - 1] !== lastGeo) passedRoute.push(lastGeo);
  const passedPts = passedRoute.map(([lon, lat]) => project(lon, lat).join(",")).join(" ");

  const startPt = project(ROUTE_GEO[0][0], ROUTE_GEO[0][1]);
  const endPt = project(ROUTE_GEO[ROUTE_GEO.length - 1][0], ROUTE_GEO[ROUTE_GEO.length - 1][1]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-gray-950 text-white p-4 select-none">

      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 rounded-lg p-1.5">
            <Activity size={14} />
          </div>
          <span className="text-sm font-semibold text-gray-200">FleetAI Live Monitor</span>
        </div>
        <div className="flex items-center gap-2">
          <PulsingDot color="bg-green-400" />
          <span className="text-xs text-green-400">EN LIGNE</span>
          <Signal size={14} className="text-blue-400 ml-2" />
          <Wifi size={14} className="text-blue-400" />
        </div>
      </div>

      {/* MAP */}
      <div className="rounded-xl overflow-hidden mb-4 bg-[#0d2137]" style={{ height: 300 }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">

          {/* Ocean background */}
          <rect width={W} height={H} fill="#0d2137" />

          {/* Grid lines */}
          {[39,41,43,45,47,49,51].map(lon => {
            const [x] = project(lon, MAP_LAT_MIN);
            return <line key={lon} x1={x} y1={0} x2={x} y2={H} stroke="#1a3a5c" strokeWidth="0.5" />;
          })}
          {[6,8,10,12,14].map(lat => {
            const [,y] = project(MAP_LON_MIN, lat);
            return <line key={lat} x1={0} y1={y} x2={W} y2={y} stroke="#1a3a5c" strokeWidth="0.5" />;
          })}

          {/* Country fills */}
          <polygon points={pts(ETHIOPIA)} fill="#1e3d2f" stroke="#2d6a4f" strokeWidth="1" />
          <polygon points={pts(SOMALIA)}  fill="#1e2e3d" stroke="#2d4a6a" strokeWidth="1" />
          <polygon points={pts(ERITREA)}  fill="#2a2a1e" stroke="#5a5a2d" strokeWidth="1" />
          <polygon points={pts(DJIBOUTI)} fill="#1e3d4a" stroke="#2d8a9f" strokeWidth="1.5" />

          {/* Country labels */}
          {[
            { label: "ÉTHIOPIE",  lon: 39.5, lat: 9.5,  color: "#4ade80" },
            { label: "SOMALIE",   lon: 46.0, lat: 8.5,  color: "#60a5fa" },
            { label: "ÉRYTHRÉE", lon: 39.5, lat: 14.5, color: "#fbbf24" },
            { label: "DJIBOUTI", lon: 42.8, lat: 11.5, color: "#38bdf8" },
          ].map(({ label, lon, lat, color }) => {
            const [cx, cy] = project(lon, lat);
            return (
              <text key={label} x={cx} y={cy} fill={color} fontSize="9"
                fontFamily="sans-serif" textAnchor="middle" fontWeight="bold" opacity="0.85">
                {label}
              </text>
            );
          })}

          {/* Gulf of Aden label */}
          {(() => { const [cx, cy] = project(45.5, 12.5); return (
            <text x={cx} y={cy} fill="#60a5fa" fontSize="8" fontFamily="sans-serif"
              textAnchor="middle" fontStyle="italic" opacity="0.7">Golfe d'Aden</text>
          ); })()}

          {/* Red Sea label */}
          {(() => { const [cx, cy] = project(40.5, 14.2); return (
            <text x={cx} y={cy} fill="#60a5fa" fontSize="7.5" fontFamily="sans-serif"
              textAnchor="middle" fontStyle="italic" opacity="0.6">Mer Rouge</text>
          ); })()}

          {/* Full route (dashed) */}
          <polyline points={pts(ROUTE_GEO)} fill="none" stroke="#3b82f6"
            strokeWidth="2.5" strokeDasharray="6 4" opacity="0.35" />

          {/* Travelled portion */}
          <polyline points={passedPts} fill="none" stroke="#3b82f6"
            strokeWidth="3" opacity="0.9" strokeLinecap="round" strokeLinejoin="round" />

          {/* Start marker — Djibouti City */}
          <circle cx={startPt[0]} cy={startPt[1]} r="7" fill="#22c55e" opacity="0.25" />
          <circle cx={startPt[0]} cy={startPt[1]} r="4" fill="#22c55e" stroke="white" strokeWidth="1.5" />
          <text x={startPt[0] + 6} y={startPt[1] - 5} fill="#22c55e" fontSize="7.5"
            fontFamily="sans-serif" fontWeight="bold">Djibouti</text>

          {/* Waypoints */}
          {[
            { lon: 41.87, lat: 9.59,  label: "Dire Dawa" },
            { lon: 38.75, lat: 9.02,  label: "Addis Abeba" },
            { lon: 39.48, lat: 13.50, label: "Mekelle" },
            { lon: 38.93, lat: 15.34, label: "Asmara" },
            { lon: 39.47, lat: 15.62, label: "Massawa" },
          ].map(({ lon, lat, label }) => {
            const [cx, cy] = project(lon, lat);
            return (
              <g key={label}>
                <circle cx={cx} cy={cy} r="3.5" fill="#facc15" stroke="white" strokeWidth="1.5" />
                <text x={cx + 5} y={cy - 4} fill="#facc15" fontSize="7" fontFamily="sans-serif">{label}</text>
              </g>
            );
          })}

          {/* End marker — Hargeisa */}
          <circle cx={endPt[0]} cy={endPt[1]} r="7" fill="#ef4444" opacity="0.25" />
          <circle cx={endPt[0]} cy={endPt[1]} r="4" fill="#ef4444" stroke="white" strokeWidth="1.5" />
          <text x={endPt[0] + 6} y={endPt[1] - 5} fill="#ef4444" fontSize="7.5"
            fontFamily="sans-serif" fontWeight="bold">Hargeisa</text>

          {/* Moving vehicle */}
          <g transform={`translate(${vx},${vy}) rotate(${angle})`}>
            <circle r="11" fill="#1d4ed8" opacity="0.2" />
            <rect x="-8" y="-5" width="16" height="10" rx="3" fill="#1d4ed8" />
            <rect x="-3" y="-3.5" width="7" height="7" rx="1.5" fill="#93c5fd" opacity="0.9" />
            <circle cx="-5" cy="5" r="2" fill="#0f172a" />
            <circle cx="5" cy="5" r="2" fill="#0f172a" />
            <circle cx="-5" cy="-5" r="2" fill="#0f172a" />
            <circle cx="5" cy="-5" r="2" fill="#0f172a" />
            <circle cx="8" cy="-3" r="1.5" fill="#fef08a" opacity="0.95" />
            <circle cx="8" cy="3" r="1.5" fill="#fef08a" opacity="0.95" />
          </g>

          {/* Speed bubble near vehicle */}
          <rect x={vx + 12} y={vy - 10} width="38" height="13" rx="4" fill="#1d4ed8" opacity="0.9" />
          <text x={vx + 14} y={vy + 1} fill="white" fontSize="8" fontFamily="monospace">{speed} km/h</text>

          {/* Coordinates HUD */}
          <rect x="4" y="4" width="110" height="16" rx="4" fill="#0f172a" opacity="0.8" />
          <text x="8" y="15" fill="#38bdf8" fontSize="8" fontFamily="monospace">
            {geoPos[1].toFixed(4)}°N  {geoPos[0].toFixed(4)}°E
          </text>
        </svg>
      </div>

      {/* Route bar */}
      <div className="flex items-center justify-between bg-gray-900 rounded-xl px-4 py-2 mb-3 text-xs">
        <span className="flex items-center gap-1.5 text-green-400">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span> Djibouti City
        </span>
        <span className="flex items-center gap-1.5 text-blue-400">
          <Navigation size={11} /> DJ → ETH → ERI → SOM
        </span>
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="w-2 h-2 bg-red-400 rounded-full"></span> Hargeisa
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1 text-gray-400 text-xs"><Gauge size={12} /> Vitesse</div>
          <div className="text-xl font-bold text-blue-400">{speed} <span className="text-xs opacity-70">km/h</span></div>
          <div className="w-full bg-gray-800 rounded-full h-1"><div className="bg-blue-500 h-1 rounded-full transition-all duration-700" style={{ width: `${(speed / 120) * 100}%` }} /></div>
        </div>
        <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1 text-gray-400 text-xs"><Battery size={12} /> Carburant</div>
          <div className="text-xl font-bold text-green-400"><AnimatedValue value={74} unit="%" /></div>
          <div className="w-full bg-gray-800 rounded-full h-1"><div className="bg-green-500 h-1 rounded-full" style={{ width: "74%" }} /></div>
        </div>
        <div className="bg-gray-900 rounded-xl p-3 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1 text-gray-400 text-xs">
            <span className="flex items-center gap-1"><Thermometer size={12} /> Ambiance</span>
          </div>
          <div className={`text-xl font-bold transition-colors duration-700 ${tempColor}`}>
            {regionTemp} <span className="text-xs opacity-70">°C</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1">
            <div className={`h-1 rounded-full transition-all duration-700 ${regionTemp >= 35 ? "bg-red-500" : regionTemp >= 25 ? "bg-orange-500" : "bg-blue-400"}`}
              style={{ width: `${tempBarWidth}%` }} />
          </div>
          <div className="text-gray-500 text-[9px] truncate">{regionLabel}</div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-900 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-gray-400"><MapPin size={11} /> GPS</span>
            <span className="text-green-400 flex items-center gap-1"><PulsingDot color="bg-green-400" /> 4G</span>
          </div>
          <div className="text-xs text-gray-300 font-mono">{geoPos[1].toFixed(4)}°N, {geoPos[0].toFixed(4)}°E</div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Tension</span>
            <span className="text-yellow-400 font-semibold"><AnimatedValue value={12.6} unit="V" min={12.0} max={13.5} /></span>
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-gray-400"><Camera size={11} /> Dashcam IA</span>
            <span className="text-green-400">REC</span>
          </div>
          <div className={`flex items-center gap-1 text-xs ${ALERTS[alertIdx].color} transition-all duration-500`}>
            {ALERTS[alertIdx].icon}
            <span>{ALERTS[alertIdx].text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
