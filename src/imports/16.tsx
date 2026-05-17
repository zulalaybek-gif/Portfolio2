import svgPaths from "./svg-efvbfu1yc2";

function Group() {
  return (
    <div className="h-[547.485px] relative w-[888.688px]">
      <div className="absolute inset-[-24.66%_-15.19%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1158.69 817.485">
          <g filter="url(#filter0_df_54_6394)" id="Group 21">
            <path d={svgPaths.p6ce0a00} fill="url(#paint0_linear_54_6394)" fillOpacity="0.5" id="Subtract" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="817.485" id="filter0_df_54_6394" width="1158.69" x="-2.40416e-06" y="-6.97421e-06">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset />
              <feGaussianBlur stdDeviation="57" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.572549 0 0 0 0 0.180392 0 0 0 0 0.364706 0 0 0 1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_54_6394" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_6394" mode="normal" result="shape" />
              <feGaussianBlur result="effect2_foregroundBlur_54_6394" stdDeviation="67.5" />
            </filter>
            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_54_6394" x1="1023.69" x2="286.923" y1="252.318" y2="810.418">
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
    <div className="bg-[#0c131f] relative size-full" data-name="16">
      <div className="absolute flex h-[1509.769px] items-center justify-center left-[-690px] top-[-454px] w-[2152.298px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[7.36deg]">
          <div className="h-[1263px] relative w-[2007px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2007 1263">
              <path d={svgPaths.p20c6000} fill="var(--fill-0, #8DE8FE)" id="Vector 604" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[701.724px] items-center justify-center left-[435.97px] top-[216.29px] w-[974.285px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[10.61deg]">
          <Group />
        </div>
      </div>
      <p className="-translate-x-1/2 absolute font-['Montserrat:Bold',sans-serif] font-bold h-[273px] leading-[0] left-1/2 text-[0px] text-center text-white top-[440px] w-[1070px] whitespace-pre-wrap">
        <span className="leading-[60px] text-[46px]">Communauté</span>
        <span className="leading-[60px] text-[46px]">{` `}</span>
        <span className="leading-[60px] text-[46px]">{`engagée `}</span>
        <span className="leading-[60px] text-[86px]">
          <br aria-hidden="true" />
        </span>
        <span className="leading-[60px] text-[36px]">{`sur les réseaux sociaux `}</span>
      </p>
      <p className="absolute font-['Avenir:Heavy',sans-serif] h-[245px] leading-[normal] left-[calc(50%-896px)] not-italic text-[#0c131f] text-[83px] top-[40px] tracking-[-0.83px] w-[810px]">Engagement</p>
    </div>
  );
}