import svgPaths from "./svg-eahsw16lgr";
import imgSpotify2 from "figma:asset/0979768883529258405cdc7801b7394aa91fd515.png";
import imgSpotify from "figma:asset/068b40dc2e7f081570e8678eff1ba7760e88c576.png";
import imgAaaa1 from "figma:asset/8d979c149ac4e7972bb74e32328669c603196295.png";

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="22">
      <div className="absolute flex h-[1509.769px] items-center justify-center left-[-690px] top-[-428px] w-[2152.298px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-[7.36deg]">
          <div className="h-[1263px] relative w-[2007px]">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2007 1263">
              <path d={svgPaths.p1ba9e900} fill="var(--fill-0, #0C131F)" id="Vector 604" />
            </svg>
          </div>
        </div>
      </div>
      <p className="absolute font-['Avenir:Heavy',sans-serif] h-[245px] leading-[normal] left-[calc(50%-876px)] not-italic text-[83px] text-white top-[70px] tracking-[-0.83px] w-[965px]">Playlist</p>
      <div className="absolute left-[701px] size-[476px] top-[436px]" data-name="SPOTIFY-2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSpotify2} />
      </div>
      <div className="absolute left-[184px] size-[476px] top-[436px]" data-name="SPOTIFY">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSpotify} />
      </div>
      <div className="absolute h-[1201px] left-[1318px] top-[163px] w-[497px]" data-name="AAAA 1">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img alt="" className="absolute h-[117.2%] left-[-149.95%] max-w-none top-[-17.2%] w-[377.16%]" src={imgAaaa1} />
        </div>
      </div>
    </div>
  );
}