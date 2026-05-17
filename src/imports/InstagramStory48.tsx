import svgPaths from "./svg-szsh7eiiop";
import imgTelesant21 from "figma:asset/16491a86c3006d109b4416f632a1c07350afbb38.png";

export default function InstagramStory() {
  return (
    <div className="bg-[#f7fbe9] relative size-full" data-name="Instagram story - 48">
      <div className="absolute bg-[#b7d168] h-[116px] left-[48px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[159px] w-[199px]" />
      <p className="absolute font-['Founders_Grotesk:Semibold',sans-serif] leading-[normal] left-[56px] not-italic text-[#91a84c] text-[64px] top-[443px] w-[968px]">Le projet Manman Bèf</p>
      <p className="absolute font-['Founders_Grotesk:Medium',sans-serif] leading-[normal] left-[56px] not-italic text-[#91a84c] text-[40px] top-[533px] w-[968px]">A ce jour, Manman Bèf c’est près de 500 investisseurs solidaires, 700 familles bénéficiaires et 1827 vaches en gardiennage!</p>
      <p className="absolute font-['Founders_Grotesk:Bold',sans-serif] leading-[normal] left-[86px] not-italic text-[124px] text-white top-[177.67px] uppercase whitespace-nowrap">#1</p>
      <div className="absolute h-[58px] left-[909px] top-[1692px] w-[107px]" data-name="Vector">
        <div className="absolute inset-[-1.72%_-0.93%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 109 60">
            <path d={svgPaths.p36612a00} fill="var(--fill-0, #B7D168)" id="Vector" stroke="var(--stroke-0, #B7D168)" />
          </svg>
        </div>
      </div>
      <div className="-translate-x-1/2 absolute h-[721px] left-[calc(50%-12px)] rounded-[8px] top-[812px] w-[960px]" data-name="Telesant 2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgTelesant21} />
      </div>
    </div>
  );
}