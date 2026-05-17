import svgPaths from "./svg-krc94engah";
import imgDownload12 from "figma:asset/68a7a892febcc95f0ce1d44fb3cc2994ea2e3201.png";

export default function InstagramStory() {
  return (
    <div className="bg-white relative size-full" data-name="Instagram story - 41">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1941px] left-1/2 rounded-[12px] top-[calc(50%+10.5px)] w-[1080px]" data-name="download 12">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[12px]">
          <div className="absolute inset-0 overflow-hidden rounded-[12px]">
            <img alt="" className="absolute h-[115.03%] left-[-110.73%] max-w-none top-[-0.15%] w-[298.91%]" src={imgDownload12} />
          </div>
          <div className="absolute bg-[rgba(72,16,14,0.24)] inset-0 rounded-[12px]" />
        </div>
      </div>
      <div className="absolute bg-[#eb5c57] h-[116.266px] left-[303.71px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[155px] w-[520.37px]" />
      <p className="absolute font-['Lexend:Bold',sans-serif] font-bold leading-[normal] left-[77px] text-[64px] text-white top-[476px] whitespace-nowrap">Et le droit à l’éducation</p>
      <p className="absolute font-['Lexend:Bold',sans-serif] font-bold leading-[normal] left-[77px] text-[112px] text-white top-[177.67px] uppercase whitespace-nowrap">
        Les 5 actus
        <br aria-hidden="true" />
        sur Haïti
      </p>
      <div className="absolute h-[58px] left-[909px] top-[1692px] w-[107px]" data-name="Vector">
        <div className="absolute inset-[-1.72%_-0.93%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 60">
            <path d={svgPaths.p36612a00} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, white)" />
          </svg>
        </div>
      </div>
      <p className="absolute font-['Founders_Grotesk:Bold',sans-serif] leading-[125px] left-[77px] not-italic text-[#edeaf4] text-[112px] top-[1547px] uppercase whitespace-nowrap">
        ÉTÉ
        <br aria-hidden="true" />
        2023
      </p>
    </div>
  );
}