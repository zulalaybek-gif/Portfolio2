import svgPaths from "./svg-2v8xa02ixj";
import imgIPhone15Pro from "figma:asset/e3698eafc47dc71549bbf28183debb005645d3ef.png";

function TeenyiconsLinkSolid() {
  return (
    <div className="relative shrink-0 size-[62px]" data-name="teenyicons:link-solid">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 62 62">
        <g clipPath="url(#clip0_53_2391)" id="teenyicons:link-solid">
          <path clipRule="evenodd" d={svgPaths.p2be5c00} fill="var(--fill-0, #0C131F)" fillRule="evenodd" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_53_2391">
            <rect fill="white" height="62" width="62" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[31px] items-center justify-center left-[125px] p-[8px] top-[395px]">
      <TeenyiconsLinkSolid />
      <a className="block font-['Avenir:Black',sans-serif] leading-[0] not-italic relative shrink-0 text-[#0c131f] text-[60px] tracking-[10.2px] whitespace-nowrap" href="https://www.figma.com/proto/9fFptVMiCn1Ii1uscH6An4/SNCF-CONNECT-%26-TECH?page-id=25%3A15&type=design&node-id=169-11&viewport=1361%2C-4156%2C0.51&t=Rmcq2HiEwYtPmDTR-1&scaling=scale-down&starting-point-node-id=349%3A5509&show-proto-sidebar=1&mode=design">
        <p className="cursor-pointer leading-[normal]">Prototype Figma</p>
      </a>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-[#8ee9ff] relative size-full" data-name="10">
      <Frame />
      <div className="absolute flex h-[186px] items-center justify-center left-[-290px] top-[598px] w-[2293px]">
        <div className="-scale-y-100 flex-none rotate-180">
          <div className="h-[186px] relative w-[2293px]">
            <div className="absolute inset-[-1.07%_0_-1.08%_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2293.66 189.999">
                <path d={svgPaths.pc14f100} id="Vector 605" stroke="var(--stroke-0, #0C131F)" strokeWidth="4" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[1052px] left-[634px] top-0 w-[1404px]" data-name="iPhone 15 Pro">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone15Pro} />
      </div>
    </div>
  );
}