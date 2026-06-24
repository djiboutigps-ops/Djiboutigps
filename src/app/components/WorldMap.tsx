export function WorldMap() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 py-12">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1 text-center">
        Notre présence est <span className="text-cyan-500">internationale</span>
      </h2>
      <p className="text-gray-500 text-sm mb-6 text-center">
        Et s'étend rapidement en Afrique et en Europe
      </p>
      <svg
        viewBox="0 0 1000 500"
        className="w-full max-w-4xl"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* World map - simplified continents */}
        <g fill="#c8d8e8" stroke="#a0b8cc" strokeWidth="0.8">
          {/* North America */}
          <path d="M70 60 L160 55 L200 70 L220 100 L210 140 L190 170 L160 190 L130 200 L100 190 L80 170 L60 140 L50 110 L55 80 Z" />
          {/* Central America */}
          <path d="M150 200 L175 205 L185 225 L170 240 L155 235 L145 215 Z" />
          {/* South America */}
          <path d="M130 250 L185 240 L210 260 L220 300 L215 350 L200 390 L175 410 L155 400 L135 370 L120 330 L115 290 L120 260 Z" />
          {/* Europe */}
          <path d="M430 50 L500 45 L530 55 L545 70 L540 90 L520 105 L500 110 L475 105 L455 95 L440 80 L430 65 Z" />
          {/* Scandinavia */}
          <path d="M460 30 L490 25 L505 35 L500 50 L475 55 L455 45 Z" />
          {/* Africa */}
          <path d="M440 130 L510 120 L545 130 L560 160 L565 210 L555 260 L540 310 L510 350 L480 370 L455 360 L430 330 L415 280 L410 230 L415 180 L425 150 Z" />
          {/* Middle East */}
          <path d="M550 120 L600 115 L620 130 L615 155 L590 165 L560 160 Z" />
          {/* Asia - Russia */}
          <path d="M540 40 L700 30 L800 40 L850 55 L840 75 L780 80 L700 75 L620 70 L560 65 Z" />
          {/* Asia - China/India */}
          <path d="M620 80 L750 75 L800 90 L810 130 L790 165 L750 180 L700 175 L660 165 L630 140 L615 110 Z" />
          {/* India */}
          <path d="M650 170 L700 165 L720 185 L710 225 L685 245 L660 235 L645 205 L645 185 Z" />
          {/* Southeast Asia */}
          <path d="M760 170 L810 160 L830 180 L820 205 L790 210 L765 195 Z" />
          {/* Australia */}
          <path d="M770 310 L860 300 L900 320 L910 365 L890 400 L850 415 L800 410 L760 390 L745 355 L750 320 Z" />
          {/* Japan */}
          <path d="M840 90 L860 85 L870 100 L855 115 L840 108 Z" />
          {/* UK */}
          <path d="M428 60 L440 55 L445 68 L435 75 L425 70 Z" />
          {/* Greenland */}
          <path d="M220 20 L280 15 L310 30 L305 55 L270 65 L235 55 L215 40 Z" />
        </g>
      </svg>
    </div>
  );
}
