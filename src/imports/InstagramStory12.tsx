import svgPaths from "./svg-gogfr2uyx9";
import imgDownload12 from "figma:asset/3b9648be09ea60b1d9990360846fbfad3eb0808d.png";

function Group() {
  return (
    <div className="absolute inset-[1.04%_75.22%_85.1%_0]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267.652 266">
        <g id="Group">
          <path d={svgPaths.p2f083c00} fill="var(--fill-0, #A595C7)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p36e8f2f0} fill="var(--fill-0, #A595C7)" id="Vector_2" />
            <path d={svgPaths.pc11c700} fill="var(--fill-0, #A595C7)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default function InstagramStory() {
  return (
    <div className="bg-[#a595c7] relative size-full" data-name="Instagram story - 12">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1880px] left-[calc(50%-0.5px)] rounded-[12px] top-1/2 w-[1035px]" data-name="download 12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[12px]">
          <img alt="" className="absolute h-[183.22%] left-[-226.42%] max-w-none top-[-57.38%] w-[476.09%]" src={imgDownload12} />
        </div>
      </div>
      <Group />
      <div className="absolute bg-[#a595c7] h-[80px] left-[165px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[1031px] w-[581px]" />
      <div className="absolute font-['Lexend:Bold',sans-serif] font-bold leading-[normal] left-[185px] text-[64px] text-white top-[1048px] uppercase whitespace-nowrap">
        <p className="mb-0">Contribution</p>
        <p className="mb-0">à la Modernisation</p>
        <p>du Système Educatif</p>
      </div>
    </div>
  );
}