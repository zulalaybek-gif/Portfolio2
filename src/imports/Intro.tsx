import svgPaths from "./svg-i9v2nrlgng";

function LogoSncfconnect() {
  return (
    <div className="absolute inset-[25.33%_12.06%_25.33%_12.07%]" data-name="logo_sncfconnect">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 212.447 65.1289">
        <g id="logo_sncfconnect">
          <path d={svgPaths.p11646800} fill="var(--fill-0, #8DE8FE)" id="BOUTON" />
          <path d={svgPaths.p3841e900} fill="var(--fill-0, #8DE8FE)" id="SNCF" />
          <path d={svgPaths.p700f900} fill="var(--fill-0, white)" id="BOUTON BLEU BLANC" />
          <path d={svgPaths.p3f218800} fill="var(--fill-0, white)" id="connect" />
          <path d={svgPaths.p160f5500} fill="var(--fill-0, #0C131F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Intro() {
  return (
    <div className="bg-[#0c131f] overflow-clip relative rounded-[40px] size-full" data-name="INTRO">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[132px] left-1/2 overflow-clip top-1/2 w-[280px]" data-name="dark/logo_sncf_connect_officiel">
        <LogoSncfconnect />
      </div>
    </div>
  );
}