import svgPaths from "./svg-hweyv4xdry";
import imgRectangle1801 from "figma:asset/4d995de4944a977502b49e4a9ca6e9bd3e60a7f4.png";

function LogoSncfconnect() {
  return (
    <div className="absolute inset-[25.33%_12.06%_25.33%_12.07%]" data-name="logo_sncfconnect">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 318.761 98.68">
        <g id="logo_sncfconnect">
          <path d={svgPaths.p6783ef0} fill="var(--fill-0, #8DE8FE)" id="BOUTON" />
          <path d={svgPaths.p1d22fa00} fill="var(--fill-0, #8DE8FE)" id="SNCF" />
          <path d={svgPaths.p372a7f80} fill="var(--fill-0, white)" id="BOUTON BLEU BLANC" />
          <path d={svgPaths.p5276400} fill="var(--fill-0, white)" id="connect" />
          <path d={svgPaths.p3c0ffd70} fill="var(--fill-0, #0C131F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#0c131f] relative size-full" data-name="1">
      <div className="-translate-x-1/2 absolute left-1/2 size-[1586px] top-[-75px]">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgRectangle1801} />
      </div>
      <div className="-translate-x-1/2 absolute bottom-[30.09%] left-[calc(50%+45px)] overflow-clip top-[43.43%] w-[604px]" data-name="dark/logo_sncf_connect_officiel">
        <LogoSncfconnect />
      </div>
      <div className="absolute flex h-[961.52px] items-center justify-center left-[-283px] top-[388px] w-[676.498px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[-15.97deg]">
          <div className="h-[870px] relative w-[454.617px]">
            <div className="absolute inset-[-0.23%_-0.44%_-0.24%_-0.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 458.645 874.133">
                <path d={svgPaths.p20d6e000} fill="var(--fill-0, #8DE8FE)" id="Vector 617" stroke="var(--stroke-0, #8DE8FE)" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute flex h-[890.093px] items-center justify-center left-[1520.03px] top-[-339px] w-[445.19px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[178.52deg]">
          <div className="h-[879.452px] relative w-[422.573px]">
            <div className="absolute inset-[-0.23%_-0.47%_-0.24%_-0.48%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 426.601 883.542">
                <path d={svgPaths.p183de900} fill="var(--fill-0, #8DE8FE)" id="Vector 618" stroke="var(--stroke-0, #8DE8FE)" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="absolute font-['Avenir:Heavy',sans-serif] leading-[normal] left-[55px] not-italic text-[#091320] text-[33px] top-[986px] tracking-[-0.33px] whitespace-nowrap">Groupe 4</p>
    </div>
  );
}