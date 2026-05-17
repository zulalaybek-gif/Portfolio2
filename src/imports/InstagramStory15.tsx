import svgPaths from "./svg-5ll5yqgwlz";
import imgDownload10 from "figma:asset/696cb7a86f28ff04f82114d9515d7871273fbd62.png";
import imgDownload11 from "figma:asset/888243aa2c11b520abbf789617ecab3b679ae767.png";

function Group() {
  return (
    <div className="absolute inset-[2.08%_75.27%_84.06%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267.079 266">
        <g id="Group">
          <path d={svgPaths.p1929f80} fill="var(--fill-0, #BCD176)" id="Vector" />
          <path d={svgPaths.p14b19b00} fill="var(--fill-0, #BCD176)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

export default function InstagramStory() {
  return (
    <div className="bg-[#bcd176] relative size-full" data-name="Instagram story - 15">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1880px] left-[calc(50%-0.5px)] rounded-[12px] top-1/2 w-[1031px]" data-name="download 10">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
          <img alt="" className="absolute max-w-none object-cover rounded-[12px] size-full" src={imgDownload10} />
          <img alt="" className="absolute max-w-none object-cover rounded-[12px] size-full" src={imgDownload11} />
        </div>
      </div>
      <div className="absolute bg-[#a4bd5a] h-[80px] left-[133.54px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[1005.63px] w-[509px]" />
      <p className="absolute font-['Lexend:Bold',sans-serif] font-bold leading-[normal] left-[146.54px] text-[64px] text-white top-[1023.13px] uppercase whitespace-nowrap">
        Agriculture
        <br aria-hidden="true" />
        responsable
      </p>
      <Group />
    </div>
  );
}