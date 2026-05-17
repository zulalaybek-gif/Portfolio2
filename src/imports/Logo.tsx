import svgPaths from "./svg-xsk7542b73";

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

export default function Logo() {
  return (
    <div className="bg-white relative size-full" data-name="logo">
      <div className="-translate-x-1/2 absolute bottom-[40.26%] left-[calc(50%-197.5px)] overflow-clip top-[13.69%] w-[604px]" data-name="dark/logo_sncf_connect_officiel">
        <LogoSncfconnect />
      </div>
    </div>
  );
}