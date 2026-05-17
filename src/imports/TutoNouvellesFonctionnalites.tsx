import svgPaths from "./svg-niix3vfbov";

function ZeroFrame() {
  return <div className="h-0 shrink-0 w-[108px]" data-name="zero-frame" />;
}

function Frame() {
  return (
    <div className="absolute inset-[17.86%_13.18%_15.71%_59.8%]" data-name="Frame">
      <div className="absolute inset-[0_0_0_-1.15%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131.5 151.458">
          <g id="Frame">
            <path d={svgPaths.p1c191f40} id="Vector 89" stroke="var(--stroke-0, #C099FF)" strokeLinecap="round" strokeWidth="3" />
            <path d={svgPaths.pf93ad00} fill="var(--fill-0, #C099FF)" id="Ellipse" />
            <g id="FANION">
              <mask height="67" id="mask0_54_2996" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="94" x="38" y="16">
                <path d={svgPaths.p2a719980} fill="var(--fill-0, #C4C4C4)" id="Vector 312" />
              </mask>
              <g mask="url(#mask0_54_2996)">
                <rect fill="var(--fill-0, #C099FF)" height="21.3997" id="Rectangle 1674" width="21.2327" x="41.9253" y="15.7745" />
                <rect fill="var(--fill-0, #C099FF)" height="21.3997" id="Rectangle 1676" width="21.2327" x="84.3881" y="15.7744" />
                <rect fill="var(--fill-0, #C099FF)" height="21.3997" id="Rectangle 1680" width="21.2327" x="63.1566" y="37.1741" />
                <rect fill="var(--fill-0, #C099FF)" height="21.3997" id="Rectangle 1681" width="21.2327" x="105.622" y="37.1741" />
                <rect fill="var(--fill-0, #C099FF)" height="21.3997" id="Rectangle 1682" width="21.2327" x="41.9253" y="58.573" />
                <rect fill="var(--fill-0, #C099FF)" height="21.3997" id="Rectangle 1683" width="21.2327" x="84.388" y="58.573" />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="absolute inset-[12.86%_65.2%_27.14%_19.59%]" data-name="Frame">
      <div className="absolute inset-[0_-4.88%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 80.2592 136.8">
          <g id="Frame">
            <g id="Frame 3838">
              <path d={svgPaths.p2cfc1a80} id="Ellipse 222" stroke="var(--stroke-0, #7BBFFD)" strokeWidth="3" />
              <ellipse cx="40.129" cy="37.708" fill="var(--fill-0, #7BBFFD)" id="Ellipse 223" rx="9.80945" ry="9.64616" />
            </g>
            <path d={svgPaths.pda1b300} fill="var(--fill-0, #7BBFFD)" id="Ellipse" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function TutoNouvellesFonctionnalites() {
  return (
    <div className="bg-[#0c131f] overflow-clip relative rounded-[40px] size-full" data-name="TUTO NOUVELLES FONCTIONNALITES">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Avenir:Heavy',sans-serif] justify-center leading-[0] left-[16px] not-italic text-[30px] text-white top-[605.5px] whitespace-nowrap">
        <p className="leading-[normal]">Créez vos routines !</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Avenir:Roman',sans-serif] justify-center leading-[0] left-[17px] not-italic text-[#9ea1a8] text-[20px] top-[702px] w-[363px]">
        <p className="leading-[26px]">Définissez des routines pour chaque moment de la journée. Recevez des alertes en temps opportun pour vous rappeler quand partir, quel transport prendre et où aller.</p>
      </div>
      <div className="absolute bg-[#8de8fe] h-[11px] left-[16px] rounded-[15px] top-[862px] w-[27px]" />
      <div className="absolute left-[54px] size-[11px] top-[862px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11 11">
          <circle cx="5.5" cy="5.5" fill="var(--fill-0, #D9D9D9)" id="Ellipse 20" r="5.5" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[#8de8fe] content-stretch flex flex-col items-center left-[calc(75%+13.5px)] max-w-[288px] px-[24px] py-[13px] rounded-[24px] top-[calc(50%+402px)]" data-name="app/button">
        <ZeroFrame />
        <div className="flex flex-col font-['Avenir:Heavy',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0c131f] text-[16px] text-center whitespace-nowrap">
          <p className="leading-[22px]">Découvrir</p>
        </div>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[228px] left-[calc(50%-0.5px)] overflow-clip top-[calc(50%-57px)] w-[481px]" data-name="app/moment/route_dark">
        <div className="absolute inset-[68.57%_3.04%_17.14%_3.38%]">
          <div className="absolute inset-[-4.6%_-0.33%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 453.125 35.5752">
              <path d={svgPaths.p1c76adc0} id="Vector 588" stroke="var(--stroke-0, #7BBFFD)" strokeLinecap="round" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <Frame />
        <Frame1 />
      </div>
    </div>
  );
}