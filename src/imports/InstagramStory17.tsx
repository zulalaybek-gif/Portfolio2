import svgPaths from "./svg-3lua1n9wnj";
import imgDownload12 from "figma:asset/cff2c457be731d193311f5e604f800876541297c.png";

function Group1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[86.943px] left-[calc(50%-406.42px)] top-[calc(50%-717.47px)] w-[267.163px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267.162 86.9429">
        <g id="Group">
          <path d={svgPaths.p1aa00f40} fill="var(--fill-0, #5AC0CB)" id="Vector" />
          <path d={svgPaths.p5ab7200} fill="var(--fill-0, #5AC0CB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[86.993px] left-[calc(50%-406.42px)] top-[calc(50%-806.97px)] w-[267.163px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267.162 86.9928">
        <g id="Group">
          <path d={svgPaths.p2d014500} fill="var(--fill-0, #5AC0CB)" id="Vector" />
          <path d={svgPaths.p2747d380} fill="var(--fill-0, #5AC0CB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[86.993px] left-[calc(50%-406.42px)] top-[calc(50%-896.5px)] w-[267.163px]" data-name="Group">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 267.162 86.9928">
        <g id="Group">
          <path d={svgPaths.p36e42b80} fill="var(--fill-0, #5AC0CB)" id="Vector" />
          <path d={svgPaths.p3881cdf0} fill="var(--fill-0, #5AC0CB)" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute contents left-[calc(50%-406.42px)] top-[calc(50%-807px)]" data-name="Group">
      <Group1 />
      <Group2 />
      <Group3 />
    </div>
  );
}

export default function InstagramStory() {
  return (
    <div className="bg-[#5ac0cb] relative size-full" data-name="Instagram story - 17">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[1880px] left-[calc(50%-0.5px)] rounded-[12px] top-1/2 w-[1035px]" data-name="download 12">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgDownload12} />
      </div>
      <div className="absolute bg-[#4ea0a8] h-[80px] left-[165px] shadow-[0px_1px_6px_0px_rgba(0,0,0,0.1)] top-[1031px] w-[638px]" />
      <div className="absolute font-['Lexend:Bold',sans-serif] font-bold leading-[normal] left-[178px] text-[64px] text-white top-[1048.5px] uppercase whitespace-nowrap">
        <p className="mb-0">environnement</p>
        <p className="mb-0">{`& changement`}</p>
        <p>climatique</p>
      </div>
      <Group />
    </div>
  );
}