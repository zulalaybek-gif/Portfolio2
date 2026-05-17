import svgPaths from "./svg-5xc3v3m1v9";
import imgLogoSncfConnectOfficiel1 from "figma:asset/c33293fbf405bad70ba8bde3c618c10b9264e293.png";
import imgUnsplashWr3ComVzJxU from "figma:asset/e7b7fde63b06c3237218c17f111ee0da4fb4d276.png";
import imgUnsplashDrf9A196D7M from "figma:asset/157b21805fc9d449eab0a2d3bdd0a10f5e62c035.png";
import imgUnsplash4MJ1TbMk8A from "figma:asset/0462e121745d2a2a9c24d2b6a0a86538ddbba7b8.png";

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute flex h-[169px] items-center justify-center left-0 top-0 w-[1920px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="bg-[#0d131f] h-[1920px] w-[169px]" />
        </div>
      </div>
      <div className="absolute h-[103px] left-[61px] top-[34px] w-[262px]" data-name="logo_sncf_connect_officiel 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgLogoSncfConnectOfficiel1} />
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex gap-[31px] items-center left-[calc(10%+52px)] top-[260px]">
      <p className="font-['Montserrat:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[60px] text-black text-right whitespace-nowrap">Le•a prévoyant•e</p>
      <div className="flex h-[89px] items-center justify-center relative shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-0 relative w-[89px]">
            <div className="absolute inset-[-1px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 89 1">
                <line id="Line 1" stroke="var(--stroke-0, black)" x2="89" y1="0.5" y2="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <p className="font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[36px] text-black whitespace-nowrap">#prudence #fiabilité #contrôle</p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="bg-white relative size-full" data-name="9">
      <Group />
      <Frame />
      <div className="absolute h-[567px] left-[calc(40%+63px)] rounded-[5px] top-[386px] w-[564px]" data-name="unsplash:Wr3comVZJxU">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <img alt="" className="absolute max-w-none object-cover rounded-[5px] size-full" src={imgUnsplashWr3ComVzJxU} />
          <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 rounded-[5px] to-[rgba(141,232,254,0.35)]" />
        </div>
      </div>
      <div className="absolute h-[171px] left-[calc(70%+76px)] rounded-[5px] top-[588px] w-[256px]" data-name="unsplash:Drf9a196d7M">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <img alt="" className="absolute max-w-none object-cover rounded-[5px] size-full" src={imgUnsplashDrf9A196D7M} />
          <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 rounded-[5px] to-[rgba(141,232,254,0.46)]" />
        </div>
      </div>
      <div className="absolute h-[168px] left-[calc(70%+76px)] rounded-[5px] top-[785px] w-[256px]" data-name="unsplash:4_mJ1TbMK8A">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[5px]">
          <img alt="" className="absolute max-w-none object-cover rounded-[5px] size-full" src={imgUnsplash4MJ1TbMk8A} />
          <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] inset-0 rounded-[5px] to-[rgba(141,232,254,0.41)]" />
        </div>
      </div>
      <div className="-translate-x-full absolute font-['Montserrat:Medium',sans-serif] font-medium leading-[normal] left-[calc(15%+481px)] text-[22px] text-black text-right top-[383px] whitespace-nowrap">
        <p className="mb-0">Le•a prévoyant•e décide à l’avance de</p>
        <p className="mb-0">précautions, de mesures permettant</p>
        <p className="mb-0">d’assurer le bon déroulement de son</p>
        <p className="mb-0">trajet. Il•elle compare, analyse à l’avance</p>
        <p className="mb-0">et prend les dispositions nécessaires</p>
        <p className="mb-0">pour faire face à une situation nouvelle</p>
        <p className="mb-0">ou imprévue. Il •elle est en quête de</p>
        <p className="mb-0">fiabilité dans sa mobilité et de contrôle.</p>
        <p className="mb-0">Il •elle ne laisse pas de place à</p>
        <p className="mb-0">l’improvisation. L’organisation est son</p>
        <p>maitre mot.</p>
      </div>
      <div className="absolute h-[380.5px] left-[-95px] top-[714px] w-[1175px]">
        <div className="absolute inset-[-0.53%_0_-0.52%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1175.86 384.496">
            <path d={svgPaths.p980e080} id="Vector 614" stroke="var(--stroke-0, #8DE8FE)" strokeWidth="4" />
          </svg>
        </div>
      </div>
    </div>
  );
}