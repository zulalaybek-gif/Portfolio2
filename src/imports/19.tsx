import svgPaths from "./svg-usdxk5uhep";

function Group() {
  return (
    <div className="h-[704.571px] relative w-[1037.808px]">
      <div className="absolute inset-[-19.16%_-13.01%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1307.81 974.571">
          <g filter="url(#filter0_df_54_6403)" id="Group 21">
            <path d={svgPaths.p1f0c4f00} fill="url(#paint0_linear_54_6403)" fillOpacity="0.5" id="Subtract" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="974.571" id="filter0_df_54_6403" width="1307.81" x="-1.74894e-06" y="-5.79243e-06">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="57" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.572549 0 0 0 0 0.180392 0 0 0 0 0.364706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_54_6403" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_6403" mode="normal" result="shape" />
              <feGaussianBlur result="effect2_foregroundBlur_54_6403" stdDeviation="67.5" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_54_6403" x1="1172.81" x2="253.219" y1="285.979" y2="918.091">
              <stop stopColor="#8DE8FE" />
              <stop offset="1" stopColor="#0C131F" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#0c131f] relative size-full" data-name="19">
      <div className="absolute flex h-[1095.014px] items-center justify-center left-[-48px] top-[350px] w-[2015.393px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-14.91deg]">
          <div className="h-[622px] relative w-[1920px]">
            <div className="absolute inset-[-0.32%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1920.86 625.996">
                <path d={svgPaths.pa546600} id="Vector 614" stroke="var(--stroke-0, #8DE8FE)" strokeOpacity="0.1" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[1509.769px] items-center justify-center left-[-690px] top-[-454px] w-[2152.298px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[7.36deg]">
          <div className="h-[1263px] relative w-[2007px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2007 1263">
              <path d={svgPaths.p25554300} fill="var(--fill-0, #8DE8FE)" id="Vector 604" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[883.577px] items-center justify-center left-[342.12px] top-[181.23px] w-[1149.775px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[10.61deg]">
          <Group />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute font-['Avenir:Heavy',sans-serif] h-[163px] leading-[0] left-1/2 not-italic text-[#f3f3f4] text-[0px] text-[43px] text-center top-[calc(50%-34px)] w-[1252px]">
        <p className="leading-[100.0199966430664%] mb-0">{`L'application SNCF Connect est la plateforme incontournable`}</p>
        <p>
          <span className="leading-[100.0199966430664%]">{`pour la gestion des trajets quotidiens en `}</span>
          <span className="font-['Avenir:Black',sans-serif] leading-[100.0199966430664%] not-italic">1 an</span>
        </p>
      </div>
      <p className="absolute font-['Avenir:Heavy',sans-serif] h-[245px] leading-[normal] left-[calc(50%-896px)] not-italic text-[#0c131f] text-[83px] top-[40px] tracking-[-0.83px] w-[810px]">Notoriété</p>
    </div>
  );
}