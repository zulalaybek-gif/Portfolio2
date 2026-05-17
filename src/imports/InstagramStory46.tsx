import svgPaths from "./svg-eam0t1ascu";
import imgTelesant21 from "figma:asset/d5bcad09939f9c2d98e21dafaac61780350e5f7c.png";

export default function InstagramStory() {
  return (
    <div className="bg-[#e3f5f8] relative size-full" data-name="Instagram story - 46">
      <div className="absolute bg-[#5ac0cb] h-[116px] left-[48px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[159px] w-[199px]" />
      <p className="absolute font-['Founders_Grotesk:Semibold',sans-serif] leading-[normal] left-[56px] not-italic text-[#42959e] text-[64px] top-[403px] w-[968px]">Partenariat avec le Groupe Médialternatif et le Collectif Haïti de France.</p>
      <p className="absolute font-['Founders_Grotesk:Medium',sans-serif] leading-[normal] left-[56px] not-italic text-[#42959e] text-[40px] top-[651px] w-[968px]">Le Groupe Médialternatif vise à créer et contribuer à dynamiser des espaces de communication et d’information dans le cadre d’une vision alternative.</p>
      <p className="absolute font-['Founders_Grotesk:Bold',sans-serif] leading-[normal] left-[86px] not-italic text-[124px] text-white top-[177.67px] uppercase whitespace-nowrap">#1</p>
      <div className="absolute h-[58px] left-[909px] top-[1692px] w-[107px]" data-name="Vector">
        <div className="absolute inset-[-1.72%_-0.93%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 60">
            <path d={svgPaths.p36612a00} fill="var(--fill-0, #5AC0CB)" id="Vector" stroke="var(--stroke-0, #5AC0CB)" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[721px] left-[calc(50%-12px)] rounded-[8px] top-[855px] w-[960px]" data-name="Telesant 2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgTelesant21} />
      </div>
    </div>
  );
}