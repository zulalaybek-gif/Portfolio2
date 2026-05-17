import svgPaths from "./svg-0hajrz4y61";
import imgDownload12 from "figma:asset/220872f5833c484b0bf2ac122a4d6d96f6d0a5b6.png";

export default function InstagramStory() {
  return (
    <div className="bg-[#c2504c] relative size-full" data-name="Instagram story - 16">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1880px] left-[calc(50%-0.5px)] rounded-[12px] top-1/2 w-[1035px]" data-name="download 12">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgDownload12} />
      </div>
      <div className="absolute bg-[#c2504c] h-[80px] left-[165px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[1031px] w-[329px]" />
      <div className="absolute font-['Lexend:Bold',sans-serif] font-bold leading-[normal] left-[185px] text-[64px] text-white top-[1048px] uppercase whitespace-nowrap">
        <p className="mb-0">
          atelier
          <br aria-hidden="true" />
          répondre
        </p>
        <p className="mb-0">aux défis</p>
        <p className="mb-0">de la coopération</p>
        <p>avec haïti</p>
      </div>
      <div className="absolute inset-[1.04%_75.28%_85.1%_0]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267 266">
          <g id="Vector">
            <path d={svgPaths.p148a2f00} fill="var(--fill-0, #C2504C)" />
            <path d={svgPaths.p3a415300} fill="var(--fill-0, #C2504C)" />
            <path d={svgPaths.p12f54b80} fill="var(--fill-0, #C2504C)" />
            <path d={svgPaths.p1068c500} fill="var(--fill-0, #C2504C)" />
            <path d={svgPaths.p3d774000} fill="var(--fill-0, #C2504C)" />
          </g>
        </svg>
      </div>
    </div>
  );
}