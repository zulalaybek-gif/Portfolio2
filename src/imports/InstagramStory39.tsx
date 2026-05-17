import svgPaths from "./svg-qm0ifk9t4x";
import imgDownload12 from "figma:asset/3b9648be09ea60b1d9990360846fbfad3eb0808d.png";
import imgDownload13 from "figma:asset/b8dbeba0f966fbcdd378595f889bb2f54b30dae3.png";
import imgDownload14 from "figma:asset/9f56cf3aa0ae000f7b27290f6eb0af1181919e56.png";

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
    <div className="bg-[#bcd176] relative size-full" data-name="Instagram story - 39">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1880px] left-[calc(50%-0.5px)] rounded-[12px] top-1/2 w-[1035px]" data-name="download 12">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
          <div className="absolute inset-0 overflow-hidden rounded-[12px]">
            <img alt="" className="absolute h-[183.22%] left-[-226.42%] max-w-none top-[-57.38%] w-[476.09%]" src={imgDownload12} />
          </div>
          <img alt="" className="absolute max-w-none object-cover rounded-[12px] size-full" src={imgDownload13} />
          <div className="absolute inset-0 overflow-hidden rounded-[12px]">
            <img alt="" className="absolute h-full left-[-66.02%] max-w-none top-0 w-[272.13%]" src={imgDownload14} />
          </div>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[rgba(145,168,76,0.34)] h-[1745.119px] left-[calc(50%-0.5px)] rounded-bl-[8px] rounded-br-[8px] top-[87.44px] w-[900.889px]" />
      <div className="absolute bg-[#a4bd5a] h-[204.855px] left-[132.81px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[752.04px] w-[813.389px]" />
      <p className="-translate-x-1/2 absolute font-['Founders_Grotesk:Medium',sans-serif] h-[145.297px] leading-[122.94999694824219%] left-[calc(50%-0.5px)] not-italic text-[64px] text-center text-shadow-[0px_1px_6px_rgba(0,0,0,0.1)] text-white top-[781.82px] uppercase w-[825px]">un programme de formation gratuite</p>
      <Group />
    </div>
  );
}