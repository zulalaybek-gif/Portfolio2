import svgPaths from "./svg-j1sagoh3v7";
import imgSubtract from "figma:asset/ea89ab1623f79c20ad0b3235e79950367dabef26.png";
import imgSubtract1 from "figma:asset/747793273de256c5fec929aae0e54e9ecb7591a7.png";

function Group1() {
  return (
    <div className="absolute contents left-[1169px] top-[345px]">
      <div className="absolute h-[380px] left-[1169px] top-[345px] w-[514.083px]" data-name="Subtract">
        <img alt="" className="absolute block max-w-none size-full" height="380" src={imgSubtract} width="514.083" />
      </div>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[369px] top-[339px]">
      <div className="absolute h-[386px] left-[369px] top-[339px] w-[495.436px]" data-name="Subtract">
        <img alt="" className="absolute block max-w-none size-full" height="386" src={imgSubtract1} width="495.436" />
      </div>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#8de8fe] relative size-full" data-name="18">
      <Group1 />
      <Group />
      <div className="absolute font-['Avenir:Heavy',sans-serif] leading-[0] left-[219px] not-italic text-[#0c131f] text-[33px] top-[741px] tracking-[-0.33px] w-[705px]">
        <p className="leading-[normal] mb-0">&nbsp;</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[49.5px]">
            <span className="font-['Avenir:Book',sans-serif] leading-[normal] not-italic">68K Instagram / 130K YouTube / 12K TikTok</span>
          </li>
          <li className="mb-0 ms-[49.5px]">
            <span className="font-['Avenir:Book',sans-serif] leading-[normal] not-italic">Organisation / Recettes / Adresses</span>
          </li>
          <li className="ms-[49.5px]">
            <span className="font-['Avenir:Book',sans-serif] leading-[normal] not-italic">Rdv pro / Cours</span>
          </li>
        </ul>
      </div>
      <div className="absolute font-['Avenir:Heavy',sans-serif] leading-[0] left-[1004px] not-italic text-[#0c131f] text-[33px] top-[741px] tracking-[-0.33px] whitespace-nowrap">
        <p className="leading-[normal] mb-0">&nbsp;</p>
        <ul className="list-disc">
          <li className="mb-0 ms-[49.5px]">
            <span className="font-['Avenir:Book',sans-serif] leading-[normal] not-italic">82K Instagram / 69K YouTube / 88K TikTok</span>
          </li>
          <li className="ms-[49.5px]">
            <span className="font-['Avenir:Book',sans-serif] leading-[normal] not-italic">Organisation / Mindset / Upcycling / Beauté</span>
          </li>
        </ul>
      </div>
      <p className="absolute font-['Avenir:Heavy',sans-serif] leading-[normal] left-[1022px] not-italic text-[#0c131f] text-[43px] top-[682px] tracking-[-0.43px] whitespace-nowrap">{`@Rosabonheur `}</p>
      <p className="absolute font-['Avenir:Heavy',sans-serif] leading-[normal] left-[235px] not-italic text-[#0c131f] text-[43px] top-[682px] tracking-[-0.43px] whitespace-nowrap">@Lenadorable_</p>
      <div className="absolute flex h-[1509.769px] items-center justify-center left-[-690px] top-[-454px] w-[2152.298px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[7.36deg]">
          <div className="h-[1263px] relative w-[2007px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2007 1263">
              <path d={svgPaths.p2c43ad80} fill="var(--fill-0, #0C131F)" id="Vector 604" />
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Avenir:Heavy',sans-serif] leading-[normal] left-[calc(50%-876px)] not-italic text-[#8de8fe] text-[83px] top-[57px] tracking-[-0.83px] w-[653px]">{`Influenceuses `}</p>
    </div>
  );
}