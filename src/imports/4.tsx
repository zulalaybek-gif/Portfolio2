import svgPaths from "./svg-8jb24ywkbp";
import imgLogoOmio from "figma:asset/3d21d780b13721f30d58f5a95e549ce0dd4f333b.png";
import imgLogoTictactrip from "figma:asset/bded89df9ea4780f236e437fe721a8e2803afa9b.png";
import imgLogoKombo from "figma:asset/6b81414feb31f2b1ba1b4e40b71b5025138c1fbb.png";
import imgTrainlineLogo from "figma:asset/6005478cae1532dae131e6a69fcab01ce8cdfb32.png";
import imgCityMapper from "figma:asset/ea5a757367eb82b9b0106456460b68cd89ed1cb6.png";
import imgImage32 from "figma:asset/33e0b16d7424b69e2010b20e8bfb54db1d103b76.png";

function G() {
  return (
    <div className="absolute inset-[28.33%_76.15%_52.79%_15.05%]" data-name="g5054">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 168.841 203.867">
        <g id="g5054">
          <path d={svgPaths.pc1d9600} fill="var(--fill-0, #4BC0AD)" id="path3264" />
          <path d={svgPaths.p190d0070} fill="var(--fill-0, #4BC0AD)" id="path3266" />
          <path d={svgPaths.p38b39e80} fill="var(--fill-0, #4BC0AD)" id="path3268" />
          <path d={svgPaths.pbad1280} fill="var(--fill-0, #4BC0AD)" id="path3270" />
          <path d={svgPaths.p36127140} fill="var(--fill-0, #4BC0AD)" id="path3272" />
          <path d={svgPaths.p5db5300} fill="var(--fill-0, #4BC0AD)" id="path3274" />
          <path d={svgPaths.p3036ae00} fill="var(--fill-0, #004FA3)" id="path3276" />
          <path d={svgPaths.pcf0baf0} fill="var(--fill-0, white)" id="path3278" />
          <path d={svgPaths.p3fb18380} fill="var(--fill-0, white)" id="path3280" />
        </g>
      </svg>
    </div>
  );
}

function Layer() {
  return (
    <div className="absolute contents inset-[28.33%_76.15%_52.79%_15.05%]" data-name="layer1">
      <G />
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="4">
      <div className="absolute h-[799.5px] left-[-328.18px] top-[463px] w-[2287.678px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2287.68 799.5">
          <path d={svgPaths.p15cb4480} fill="var(--fill-0, #0C131F)" id="Vector 10" />
        </svg>
      </div>
      <div className="absolute h-[280.449px] left-[-64px] top-[-51.5px] w-[1829px]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1829 280.449">
          <path d={svgPaths.p1e620f80} fill="var(--fill-0, #0C131F)" id="Vector 11" />
        </svg>
      </div>
      <Layer />
      <div className="absolute h-[80px] left-[1235px] top-[610px] w-[282px]" data-name="logo omio">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoOmio} />
      </div>
      <div className="absolute h-[423px] left-[336px] top-[438px] w-[425px]" data-name="logo tictactrip">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoTictactrip} />
      </div>
      <div className="absolute h-[76px] left-[835px] top-[612px] w-[303px]" data-name="logo kombo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoKombo} />
      </div>
      <div className="absolute h-[319px] left-[578px] top-[248px] w-[417px]" data-name="trainline logo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgTrainlineLogo} />
      </div>
      <div className="absolute left-[1106px] size-[174px] top-[321px]" data-name="city_mapper">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgCityMapper} />
      </div>
      <div className="absolute h-[161px] left-[1461px] top-[319px] w-[131px]" data-name="image 32">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage32} />
      </div>
    </div>
  );
}