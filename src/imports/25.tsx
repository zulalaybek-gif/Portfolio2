import svgPaths from "./svg-14qdp6g3t0";

function LogoSncfconnect() {
  return (
    <div className="absolute inset-[25.33%_12.06%_25.33%_12.07%]" data-name="logo_sncfconnect">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 458.279 141.113">
        <g id="logo_sncfconnect">
          <path d={svgPaths.p27b000c0} fill="var(--fill-0, #8DE8FE)" id="BOUTON" />
          <path d={svgPaths.p334dcc80} fill="var(--fill-0, #8DE8FE)" id="SNCF" />
          <path d={svgPaths.p144a1f00} fill="var(--fill-0, white)" id="BOUTON BLEU BLANC" />
          <path d={svgPaths.p1cd1d40} fill="var(--fill-0, white)" id="connect" />
          <path d={svgPaths.p287b500} fill="var(--fill-0, #0C131F)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[406px] top-[567px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[408px] left-[calc(50%+548px)] overflow-clip top-[calc(50%+231px)] w-[863px]" data-name="app/moment/nature">
        <div className="absolute inset-[12.86%_11.15%_13.57%_3.21%]" data-name="Vector">
          <div className="absolute inset-[-0.5%_-0.28%_-0.5%_-0.2%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 742.646 303.171">
              <path d={svgPaths.p39def200} id="Vector" stroke="var(--stroke-0, #8DE8FE)" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute h-[267.214px] left-[406px] top-[843.79px] w-[699px]">
        <div className="absolute inset-[-0.56%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 699.629 270.212">
            <path d={svgPaths.p1cc6ee00} id="Vector 613" stroke="var(--stroke-0, #8DE8FE)" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[406px] top-[329px]">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[286px] left-1/2 overflow-clip top-[calc(50%-68px)] w-[604px]" data-name="dark/logo_sncf_connect_officiel">
        <LogoSncfconnect />
      </div>
      <p className="absolute font-['Avenir:Heavy',sans-serif] leading-[normal] left-[calc(50%-403px)] not-italic text-[53px] text-white top-[615px] tracking-[-0.53px] w-[806px]">gardez une longueur d’avance !</p>
      <Group />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#0c131f] relative size-full" data-name="25">
      <Group1 />
    </div>
  );
}