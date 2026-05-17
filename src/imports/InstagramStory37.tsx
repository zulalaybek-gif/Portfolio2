import svgPaths from "./svg-jwjs7pcctk";
import imgDownload12 from "figma:asset/3b9648be09ea60b1d9990360846fbfad3eb0808d.png";
import imgDownload13 from "figma:asset/b8dbeba0f966fbcdd378595f889bb2f54b30dae3.png";
import imgDownload14 from "figma:asset/f5de8856b81c621f737d721d9f4b01c46418e740.png";

function FoundationArrowUp() {
  return (
    <div className="relative size-[75px]" data-name="foundation:arrow-up">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 75 75">
        <g id="foundation:arrow-up">
          <path d={svgPaths.p2e2277f0} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[467.54px] top-[1102px]">
      <p className="-translate-x-1/2 absolute font-['Founders_Grotesk:Medium',sans-serif] leading-[normal] left-[calc(50%+105.54px)] not-italic text-[52px] text-center text-white top-[1123px] whitespace-nowrap">Lire notre article</p>
      <div className="absolute flex items-center justify-center left-[859.91px] size-[75px] top-[1102px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <FoundationArrowUp />
        </div>
      </div>
    </div>
  );
}

export default function InstagramStory() {
  return (
    <div className="bg-[#5ac0cb] relative size-full" data-name="Instagram story - 37">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1880px] left-[calc(50%-0.5px)] rounded-[12px] top-1/2 w-[1035px]" data-name="download 12">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
          <div className="absolute inset-0 overflow-hidden rounded-[12px]">
            <img alt="" className="absolute h-[183.22%] left-[-226.42%] max-w-none top-[-57.38%] w-[476.09%]" src={imgDownload12} />
          </div>
          <img alt="" className="absolute max-w-none object-cover rounded-[12px] size-full" src={imgDownload13} />
          <img alt="" className="absolute max-w-none object-cover rounded-[12px] size-full" src={imgDownload14} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[rgba(66,149,158,0.34)] h-[1745.119px] left-[calc(50%-0.5px)] rounded-bl-[8px] rounded-br-[8px] top-[87.44px] w-[900.889px]" />
      <div className="absolute bg-[#4ea0a8] h-[190.434px] left-[132.81px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[748.95px] w-[813.389px]" />
      <p className="-translate-x-1/2 absolute font-['Founders_Grotesk:Medium',sans-serif] h-[132.236px] leading-[0] left-[538.63px] not-italic text-[64px] text-center text-white top-[778.05px] uppercase w-[792.553px]">
        <span className="leading-[119.35999298095703%]">{`eau potable pour `}</span>
        <span className="leading-[114.79999542236328%]">chambellan</span>
      </p>
      <p className="-translate-x-1/2 absolute font-['Founders_Grotesk:Medium',sans-serif] h-[56.549px] leading-[114.79999542236328%] left-1/2 lowercase not-italic text-[64px] text-center text-white top-[960px] w-[792.553px]">une initiative pour s’inspirer</p>
      <Group />
    </div>
  );
}