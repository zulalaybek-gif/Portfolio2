import svgPaths from "./svg-22fcy3xq5c";
import imgHeader15 from "figma:asset/c4568749e2a6d74e302a151176b5449e9f58a281.png";
import imgPlaceholderImage from "figma:asset/56c8c02df349c7951ad5723961716ef16e2f0551.png";
import imgPlaceholderImage1 from "figma:asset/93e3dfbe7242f4a25632973f9412def4d6578577.png";
import imgPlaceholderImage2 from "figma:asset/101cb46ceebe142e0da349d7869ac50a6fc51400.png";
import imgPlaceholderImage3 from "figma:asset/d25631d28eb430b9d9e4b69a606a26b989409a7a.png";
import imgPlaceholderImage4 from "figma:asset/5f4cd59a0c842898c2a431e9e3018681b66eeb85.png";
import imgPlaceholderImage5 from "figma:asset/8edde2323bd93fdec66a18ca98f61f587aa228f1.png";
import imgPlaceholderImage6 from "figma:asset/8e61138d17983b8606db0af4da65de96eb9e460c.png";
import imgPlaceholderImage7 from "figma:asset/a40eb04718903e72a7f0a0cd7f6f7c4cbcd5d56f.png";
import imgPlaceholderImage8 from "figma:asset/91cf6bf5a942e7a31a7c9773ab94664bfb4de75c.png";
import imgAvatarImage from "figma:asset/ed4d00270f5f294438a03167090a2f4327cd3a03.png";
import imgAvatarImage1 from "figma:asset/ed4d00270f5f294438a03167090a2f4327cd3a03.png";
import imgAvatarImage2 from "figma:asset/ed4d00270f5f294438a03167090a2f4327cd3a03.png";
import imgCta3 from "figma:asset/c4dd26f56b6f9eede110af991af36f71de6828fd.png";
import imgPlaceholderImage9 from "figma:asset/26ac23474136bdd71a4d24dde90a187f5b1b8947.png";
import imgPlaceholderImage10 from "figma:asset/ad052b82956fc20534cd224a1e9b1766657aad38.png";
import imgPlaceholderImage11 from "figma:asset/308a63bb24e2825872e00eaa113c25aa1866791a.png";
import imgPlaceholderImage12 from "figma:asset/d23be7eaf690dbb7fd55d6e89036415b11808e80.png";
import imgPlaceholderImage13 from "figma:asset/15109db3091c9d8d55870a89617242da5fc42c21.png";
import imgPlaceholderImage14 from "figma:asset/1a5ec711b8abb60c6f594f167ce42518ea691609.png";
import imgPlaceholderImage15 from "figma:asset/e751f85ba6d3ef9987d7a08b17e0c6869660fd86.png";
import imgPlaceholderImage16 from "figma:asset/6d92e3599555d52263a506cf8201c7feec8ba958.png";

function Logo() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start pl-[6px] relative" data-name="Logo">
      <div className="flex h-[23px] items-center justify-center relative shrink-0 w-[30px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-[30px] relative w-[23px]" data-name="logo">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 30">
              <g id="logo">
                <path d={svgPaths.p1c75c600} fill="var(--fill-0, white)" />
                <path d={svgPaths.p2f6c5f80} fill="var(--fill-0, white)" />
                <path d={svgPaths.p395c1900} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex h-[87px] items-center justify-center relative shrink-0 w-[8px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <p className="capitalize font-['GRIFTER:Bold',sans-serif] leading-[8px] not-italic relative text-[20px] text-white whitespace-nowrap">kittyhub</p>
        </div>
      </div>
    </div>
  );
}

function NavLinkDropdown() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0" data-name="Nav Link Dropdown">
      <div className="flex flex-col font-['Gilroy-SemiBold:☞',sans-serif] h-full justify-end leading-[0] not-italic relative shrink-0 text-[16px] text-white w-[66px]">
        <p className="leading-[normal]">Releases</p>
      </div>
    </div>
  );
}

function Column() {
  return (
    <div className="content-stretch flex gap-[32px] h-[24px] items-end overflow-clip relative shrink-0" data-name="Column">
      <div className="flex flex-col font-['Gilroy-SemiBold:☞',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Collections</p>
      </div>
      <div className="flex flex-col font-['Gilroy-SemiBold:☞',sans-serif] justify-end leading-[0] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">
        <p className="leading-[normal]">Finance</p>
      </div>
      <NavLinkDropdown />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex gap-[64px] items-end justify-end relative shrink-0" data-name="Content">
      <div className="flex h-[36px] items-center justify-center relative shrink-0 w-[120px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "38" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Logo />
        </div>
      </div>
      <Column />
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[16px] items-center justify-center relative shrink-0" data-name="Actions">
      <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative rounded-[8px] shrink-0" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-0.5px] pointer-events-none rounded-[8.5px]" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Sign Up
        </p>
      </div>
      <div className="bg-[#8823f8] content-stretch flex items-center justify-center px-[20px] py-[8px] relative rounded-[8px] shrink-0" data-name="Style=Primary, Small=True, Dark mode=False, Icon position=No icon">
        <p className="font-['Gilroy-Bold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Log In</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="Content">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between px-[64px] relative size-full">
          <Content1 />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function Column1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Column">
      <p className="font-['GRIFTER:Bold',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[56px] text-white w-full">Discover Rare Collectibles</p>
    </div>
  );
}

function Actions1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pt-[16px] relative shrink-0" data-name="Actions">
      <div className="bg-[#8823f8] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Style=Primary, Small=False, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-[#8823f8] border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Explore</p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Style=Secondary, Small=False, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Sign Up</p>
      </div>
    </div>
  );
}

function Column2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start justify-center relative shrink-0 w-full" data-name="Column">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[18px] text-white w-[min-content]">Join our community of collectors and explore a wide range of unique collectibles from around the world.</p>
      <Actions1 />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-col gap-[80px] items-end relative shrink-0 w-[678px]" data-name="Content">
      <Column1 />
      <Column2 />
    </div>
  );
}

function Content3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 w-full" data-name="Content">
      <p className="font-['GRIFTER:Bold',sans-serif] leading-[1.2] relative shrink-0 text-[48px] w-full">Featured</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] relative shrink-0 text-[18px] w-full">Explore our selection of popular collection products.</p>
    </div>
  );
}

function SectionTitle() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 text-white w-[768px]" data-name="Section Title">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] relative shrink-0 text-[16px] whitespace-nowrap">Discover</p>
      <Content3 />
    </div>
  );
}

function Title() {
  return (
    <div className="content-stretch flex items-end justify-between relative shrink-0 w-full" data-name="Title">
      <SectionTitle />
      <div className="bg-[#fd6136] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0 w-[104px]" data-name="Style=Secondary, Small=False, Dark mode=False, Icon position=No icon">
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">View all</p>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Dark Cubone</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 10</p>
    </div>
  );
}

function Content6() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage} />
      </div>
      <Content6 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Bulbasaur</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 9</p>
    </div>
  );
}

function Content7() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header1 />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage1} />
      </div>
      <Content7 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Eevee</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 10</p>
    </div>
  );
}

function Content8() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header2 />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage2} />
      </div>
      <Content8 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Charmander</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 10 Edit 1999 Shiny</p>
    </div>
  );
}

function Content9() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header3 />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage3} />
      </div>
      <Content9 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content5() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <Product />
      <Product1 />
      <Product2 />
      <Product3 />
    </div>
  );
}

function Header4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Snivy</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 9</p>
    </div>
  );
}

function Content11() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header4 />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative rounded-[16px] shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage4} />
      </div>
      <Content11 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Dunsparce</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 10</p>
    </div>
  );
}

function Content12() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header5 />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage5} />
      </div>
      <Content12 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Torchic</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 8</p>
    </div>
  );
}

function Content13() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header6 />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product6() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage6} />
      </div>
      <Content13 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative" data-name="Header">
      <p className="font-['GRIFTER:Bold',sans-serif] relative shrink-0 text-[18px] w-full">Grookey</p>
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0 text-[14px] w-full">PSA 9</p>
    </div>
  );
}

function Content14() {
  return (
    <div className="content-stretch flex gap-[16px] items-start leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Header7 />
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] whitespace-nowrap">$55</p>
    </div>
  );
}

function Product7() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Product">
      <div className="h-[364.8px] relative rounded-[16px] shrink-0 w-[304px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[16px] size-full" src={imgPlaceholderImage7} />
      </div>
      <Content14 />
      <div className="relative rounded-[8px] shrink-0 w-full" data-name="Style=Secondary, Small=True, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[20px] py-[8px] relative w-full">
            <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content10() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Content">
      <Product4 />
      <Product5 />
      <Product6 />
      <Product7 />
    </div>
  );
}

function Content4() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-[1312px]" data-name="Content">
      <Content5 />
      <Content10 />
    </div>
  );
}

function Content16() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="Content">
      <p className="font-['GRIFTER:Bold',sans-serif] leading-[1.2] relative shrink-0 text-[48px] w-full">Find Your Perfect Collectibles on Kittyhub</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] relative shrink-0 text-[18px] w-full">Explore our vast selection of collectibles and connect with a passionate community. Enjoy secure transactions and a seamless buying and selling experience.</p>
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start not-italic relative shrink-0 text-white w-full" data-name="Section Title">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] relative shrink-0 text-[16px] text-center whitespace-nowrap">Discover</p>
      <Content16 />
    </div>
  );
}

function Actions2() {
  return (
    <div className="content-stretch flex gap-[24px] items-center pt-[16px] relative shrink-0" data-name="Actions">
      <div className="bg-[#8823f8] content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Style=Secondary, Small=False, Dark mode=False, Icon position=No icon">
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn More</p>
      </div>
      <div className="content-stretch flex gap-[8px] items-center justify-center relative shrink-0" data-name="Style=Link, Small=False, Dark mode=False, Icon position=Trailing">
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Sign Up</p>
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / chevron-right">
          <div className="absolute inset-[23.07%_35.77%_29.38%_34.55%]" data-name="icon">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.121 11.414">
              <path d={svgPaths.p34980b80} fill="var(--fill-0, white)" id="icon" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Content">
      <SectionTitle1 />
      <Actions2 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[80px] items-center relative shrink-0 w-full" data-name="Container">
      <Content15 />
      <div className="flex-[1_0_0] h-[640px] min-h-px min-w-px mix-blend-screen opacity-90 relative" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none mix-blend-lighten object-cover pointer-events-none size-full" src={imgPlaceholderImage8} />
      </div>
    </div>
  );
}

function SectionTitle2() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start not-italic relative shrink-0 text-white w-[560px]" data-name="Section Title">
      <p className="font-['GRIFTER:Bold',sans-serif] leading-[1.2] relative shrink-0 text-[48px] w-full">Happy Customers</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] relative shrink-0 text-[18px] w-full">Read what our satisfied customers have to say</p>
    </div>
  );
}

function Stars() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_47_3814)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, #FD6136)" id="Vector" />
          <path d={svgPaths.p2d19d80} fill="var(--fill-0, #FD6136)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, #FD6136)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, #FD6136)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, #FD6136)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_47_3814">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AvatarContent() {
  return (
    <div className="content-stretch flex flex-col font-['Gilroy-SemiBold:☞',sans-serif] items-start leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-name="Avatar Content">
      <p className="relative shrink-0">John Doe</p>
      <p className="relative shrink-0">Collector Verified</p>
    </div>
  );
}

function Avatar() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Avatar">
      <div className="relative shrink-0 size-[56px]" data-name="Avatar Image">
        <img alt="" className="absolute block max-w-none size-full" height="56" src={imgAvatarImage} width="56" />
      </div>
      <AvatarContent />
    </div>
  );
}

function Column3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-h-px min-w-px overflow-clip relative" data-name="Column">
      <Stars />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] min-w-full relative shrink-0 text-[20px] text-white w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`The kittyhub community...it's really something you can only find here! No need to mention the certificate - Amazing !`}</p>
      <Avatar />
    </div>
  );
}

function Stars1() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_47_3814)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, #FD6136)" id="Vector" />
          <path d={svgPaths.p2d19d80} fill="var(--fill-0, #FD6136)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, #FD6136)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, #FD6136)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, #FD6136)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_47_3814">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AvatarContent1() {
  return (
    <div className="content-stretch flex flex-col font-['Gilroy-SemiBold:☞',sans-serif] items-start leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-name="Avatar Content">
      <p className="relative shrink-0">Jane Smith</p>
      <p className="relative shrink-0">Collector Verified</p>
    </div>
  );
}

function Avatar1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Avatar">
      <div className="relative shrink-0 size-[56px]" data-name="Avatar Image">
        <img alt="" className="absolute block max-w-none size-full" height="56" src={imgAvatarImage1} width="56" />
      </div>
      <AvatarContent1 />
    </div>
  );
}

function Column4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-h-px min-w-px overflow-clip relative" data-name="Column">
      <Stars1 />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] min-w-full relative shrink-0 text-[20px] text-white w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>{`Kittyhub made it possible for me to resell the Pokémon cards I'd collected when I was younger.`}</p>
      <Avatar1 />
    </div>
  );
}

function Stars2() {
  return (
    <div className="h-[18.889px] relative shrink-0 w-[116px]" data-name="Stars">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 116 18.8889">
        <g clipPath="url(#clip0_47_3814)" id="Stars">
          <path d={svgPaths.p23629f00} fill="var(--fill-0, #FD6136)" id="Vector" />
          <path d={svgPaths.p2d19d80} fill="var(--fill-0, #FD6136)" id="Vector_2" />
          <path d={svgPaths.p24418170} fill="var(--fill-0, #FD6136)" id="Vector_3" />
          <path d={svgPaths.p28ff5800} fill="var(--fill-0, #FD6136)" id="Vector_4" />
          <path d={svgPaths.p32177b30} fill="var(--fill-0, #FD6136)" id="Vector_5" />
        </g>
        <defs>
          <clipPath id="clip0_47_3814">
            <rect fill="white" height="18.8889" width="116" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function AvatarContent2() {
  return (
    <div className="content-stretch flex flex-col font-['Gilroy-SemiBold:☞',sans-serif] items-start leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-name="Avatar Content">
      <p className="relative shrink-0">Matis Garcia</p>
      <p className="relative shrink-0">Collector Verified</p>
    </div>
  );
}

function Avatar2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-name="Avatar">
      <div className="relative shrink-0 size-[56px]" data-name="Avatar Image">
        <img alt="" className="absolute block max-w-none size-full" height="56" src={imgAvatarImage2} width="56" />
      </div>
      <AvatarContent2 />
    </div>
  );
}

function Column5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-h-px min-w-px overflow-clip relative" data-name="Column">
      <Stars2 />
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.4] min-w-full relative shrink-0 text-[20px] text-white w-[min-content]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Finally, a site that does it all. Appraisal, certification and resale all in one place. Thank you, team !
      </p>
      <Avatar2 />
    </div>
  );
}

function Content17() {
  return (
    <div className="content-stretch flex gap-[32px] h-[394px] items-start justify-center relative shrink-0 w-full" data-name="Content">
      <Column3 />
      <Column4 />
      <Column5 />
    </div>
  );
}

function Content18() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 text-white w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Discover Your Collectible Treasure
      </p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Join Kittyhub and start buying or selling your favorite collectibles today!</p>
    </div>
  );
}

function Actions3() {
  return (
    <div className="content-stretch flex gap-[16px] items-start pt-[16px] relative shrink-0" data-name="Actions">
      <div className="bg-black content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Style=Primary, Small=False, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-black border-solid inset-[-1px] pointer-events-none rounded-[9px]" />
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Sign Up</p>
      </div>
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative rounded-[8px] shrink-0" data-name="Style=Secondary, Small=False, Dark mode=True, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none rounded-[9px]" />
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Learn More</p>
      </div>
    </div>
  );
}

function Column6() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[768px]" data-name="Column">
      <Content18 />
      <Actions3 />
    </div>
  );
}

function Content19() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] relative shrink-0 text-[48px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        Meet Our Team
      </p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">Passionate individuals dedicated to the collectibles community</p>
    </div>
  );
}

function SectionTitle3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 text-white w-[768px]" data-name="Section Title">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] whitespace-nowrap">Connecting</p>
      <Content19 />
    </div>
  );
}

function Title1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Zulâl Aybek</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">Co-founder</p>
    </div>
  );
}

function Content22() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title1 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[16px] w-full">CEO</p>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[100px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[100px] size-full" src={imgPlaceholderImage9} />
      </div>
      <Content22 />
      <SocialIcons />
    </div>
  );
}

function Title2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Adrien Desrames</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">{`Co-founder `}</p>
    </div>
  );
}

function Content23() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title2 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[16px] w-full">Chief Operating Officer</p>
    </div>
  );
}

function SocialIcons1() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[52px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[52px] size-full" src={imgPlaceholderImage10} />
      </div>
      <Content23 />
      <SocialIcons1 />
    </div>
  );
}

function Title3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Evan Remeur</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">Co-founder</p>
    </div>
  );
}

function Content24() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title3 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[16px] w-full">Senior Vice President Operations</p>
    </div>
  );
}

function SocialIcons2() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[100px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgPlaceholderImage11} />
      </div>
      <Content24 />
      <SocialIcons2 />
    </div>
  );
}

function Title4() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Jade Sophie</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">CCO</p>
    </div>
  );
}

function Content25() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title4 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[16px] w-full">Chief Commercial Officer</p>
    </div>
  );
}

function SocialIcons3() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[100px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgPlaceholderImage12} />
      </div>
      <Content25 />
      <SocialIcons3 />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
    </div>
  );
}

function Title5() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Zohra Achour</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">CTO</p>
    </div>
  );
}

function Content26() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title5 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[16px] w-full">Chief Technical Officer</p>
    </div>
  );
}

function SocialIcons4() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[100px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgPlaceholderImage13} />
      </div>
      <Content26 />
      <SocialIcons4 />
    </div>
  );
}

function Title6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Jean Jacques Celeste</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">DEO</p>
    </div>
  );
}

function Content27() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title6 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[16px] w-full">Design Executive Officer</p>
    </div>
  );
}

function SocialIcons5() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[100px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgPlaceholderImage14} />
      </div>
      <Content27 />
      <SocialIcons5 />
    </div>
  );
}

function Title7() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Valentin Zveguinzoff</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">EMC</p>
    </div>
  );
}

function Content28() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title7 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">Expert Marketing Consultant</p>
    </div>
  );
}

function SocialIcons6() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[100px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgPlaceholderImage15} />
      </div>
      <Content28 />
      <SocialIcons6 />
    </div>
  );
}

function Title8() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title">
      <p className="font-['Gilroy-Bold:☞',sans-serif] relative shrink-0 text-[20px] w-full">Chloé Desange</p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[18px] w-full">CM</p>
    </div>
  );
}

function Content29() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center leading-[1.5] not-italic relative shrink-0 text-white w-full" data-name="Content">
      <Title8 />
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] relative shrink-0 text-[16px] w-full">Community Manager</p>
    </div>
  );
}

function SocialIcons7() {
  return (
    <div className="content-stretch flex gap-[14px] items-start relative shrink-0" data-name="Social Icons">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Dribble">
        <div className="absolute inset-[12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.pef33100} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Card7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Card">
      <div className="relative rounded-[100px] shrink-0 size-[80px]" data-name="Placeholder Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[100px] size-full" src={imgPlaceholderImage16} />
      </div>
      <Content29 />
      <SocialIcons7 />
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="Row">
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
    </div>
  );
}

function Content21() {
  return (
    <div className="content-stretch flex flex-col gap-[64px] items-start relative shrink-0 w-full" data-name="Content">
      <Row />
      <Row1 />
    </div>
  );
}

function Content31() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-center relative shrink-0 text-white w-[768px]" data-name="Content">
      <p className="font-['Roboto:Bold',sans-serif] font-bold leading-[1.3] relative shrink-0 text-[32px] w-full" style={{ fontVariationSettings: "'wdth' 100" }}>
        We’re hiring!
      </p>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[18px] w-full">{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `}</p>
    </div>
  );
}

function Content30() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0" data-name="Content">
      <Content31 />
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0 w-[155px]" data-name="Style=Secondary, Small=False, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <p className="font-['Roboto:Regular',sans-serif] font-normal leading-[1.5] relative shrink-0 text-[16px] text-white whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Open positions
        </p>
      </div>
    </div>
  );
}

function Content20() {
  return (
    <div className="content-stretch flex flex-col gap-[96px] items-start relative shrink-0 w-full" data-name="Content">
      <Content21 />
      <Content30 />
    </div>
  );
}

function Form() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Form">
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Type=Default">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center p-[12px] relative w-full">
            <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[#666] text-[16px]">Your Email Address</p>
          </div>
        </div>
      </div>
      <div className="bg-white content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0 w-[103px]" data-name="Style=Primary, Small=False, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Subscribe Now</p>
      </div>
    </div>
  );
}

function Actions4() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[16px] relative shrink-0 w-[513px]" data-name="Actions">
      <Form />
      <p className="font-['Gilroy-Regular:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px] text-white w-full">By subscribing, you agree to our Terms and Conditions.</p>
    </div>
  );
}

function Content32() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative" data-name="Content">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[18px] text-white w-[min-content]">Subscribe to our newsletter for the latest updates on collectibles and marketplace features.</p>
      <Actions4 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[80px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Roboto:Bold',sans-serif] font-bold leading-[1.2] min-h-px min-w-px relative text-[48px] text-white" style={{ fontVariationSettings: "'wdth' 100" }}>
        Stay Updated with Kittyhub News
      </p>
      <Content32 />
    </div>
  );
}

function Logo1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start pl-[6px] relative" data-name="Logo">
      <div className="flex h-[23px] items-center justify-center relative shrink-0 w-[30px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <div className="h-[30px] relative w-[23px]" data-name="logo">
            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 30">
              <g id="logo">
                <path d={svgPaths.p1c75c600} fill="var(--fill-0, white)" />
                <path d={svgPaths.p2f6c5f80} fill="var(--fill-0, white)" />
                <path d={svgPaths.p395c1900} fill="var(--fill-0, white)" />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="flex h-[87px] items-center justify-center relative shrink-0 w-[8px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none rotate-90">
          <p className="capitalize font-['GRIFTER:Bold',sans-serif] leading-[8px] not-italic relative text-[20px] text-white whitespace-nowrap">kittyhub</p>
        </div>
      </div>
    </div>
  );
}

function Form1() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Form">
      <div className="bg-white flex-[1_0_0] min-h-px min-w-px relative" data-name="Type=Default">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center p-[12px] relative w-full">
            <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[16px] text-white">Your email</p>
          </div>
        </div>
      </div>
      <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative shrink-0 w-[119px]" data-name="Style=Secondary, Small=False, Dark mode=False, Icon position=No icon">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-[-1px] pointer-events-none" />
        <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap">Sign up</p>
      </div>
    </div>
  );
}

function Actions5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Actions">
      <Form1 />
      <p className="font-['Gilroy-Regular:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[12px] text-white w-full">By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.</p>
    </div>
  );
}

function Newsletter() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[500px]" data-name="Newsletter">
      <div className="flex h-[36px] items-center justify-center relative shrink-0 w-[120px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "38" } as React.CSSProperties}>
        <div className="-rotate-90 flex-none">
          <Logo1 />
        </div>
      </div>
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] min-w-full not-italic relative shrink-0 text-[16px] text-white w-[min-content]">Stay up to date on the latest features and releases by joining our newsletter.</p>
      <Actions5 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link One</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Two</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Three</p>
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="font-['Gilroy-Light:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white w-[231.333px]">Link Four</p>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Five</p>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link />
      <Link1 />
      <Link2 />
      <Link3 />
      <Link4 />
    </div>
  );
}

function Column7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white w-full">Column One</p>
      <FooterLinks />
    </div>
  );
}

function Link5() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Six</p>
    </div>
  );
}

function Link6() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Seven</p>
    </div>
  );
}

function Link7() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Eight</p>
    </div>
  );
}

function Link8() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Nine</p>
    </div>
  );
}

function Link9() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="Link">
      <p className="flex-[1_0_0] font-['Gilroy-Light:☞',sans-serif] leading-[1.5] min-h-px min-w-px not-italic relative text-[14px] text-white">Link Ten</p>
    </div>
  );
}

function FooterLinks1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link5 />
      <Link6 />
      <Link7 />
      <Link8 />
      <Link9 />
    </div>
  );
}

function Column8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px overflow-clip relative" data-name="Column">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white w-full">Column Two</p>
      <FooterLinks1 />
    </div>
  );
}

function Link10() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Link">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Facebook">
        <div className="absolute inset-[9.34%_8.33%_7.32%_8.33%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path d={svgPaths.p2c56c980} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Gilroy-Light:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Facebook</p>
    </div>
  );
}

function Link11() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Link">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Instagram">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p9b0b480} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Gilroy-Light:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Instagram</p>
    </div>
  );
}

function Link12() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Link">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / X">
        <div className="absolute inset-[17.68%_12.5%_15.66%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 16">
            <path d={svgPaths.pd265900} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Gilroy-Light:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">X</p>
    </div>
  );
}

function Link13() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Link">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / LinkedIn">
        <div className="absolute inset-[13.51%_12.5%_11.49%_12.5%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
            <path clipRule="evenodd" d={svgPaths.p56afe80} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Gilroy-Light:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">LinkedIn</p>
    </div>
  );
}

function Link14() {
  return (
    <div className="content-stretch flex gap-[12px] items-center py-[8px] relative shrink-0 w-full" data-name="Link">
      <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Icon / Youtube">
        <div className="absolute inset-[20.83%_8.33%_20.78%_8.27%]" data-name="Vector">
          <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.0141 14.012">
            <path d={svgPaths.p1fcc3d80} fill="var(--fill-0, white)" id="Vector" />
          </svg>
        </div>
      </div>
      <p className="font-['Gilroy-Light:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">Youtube</p>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Social Links">
      <Link10 />
      <Link11 />
      <Link12 />
      <Link13 />
      <Link14 />
    </div>
  );
}

function Column9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-h-px min-w-px relative" data-name="Column">
      <p className="font-['Gilroy-SemiBold:☞',sans-serif] leading-[1.5] not-italic relative shrink-0 text-[16px] text-white w-full">Follow Us</p>
      <SocialLinks />
    </div>
  );
}

function Links() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[40px] items-start min-h-px min-w-px relative" data-name="Links">
      <Column7 />
      <Column8 />
      <Column9 />
    </div>
  );
}

function Content33() {
  return (
    <div className="content-stretch flex gap-[128px] h-[248px] items-start relative shrink-0 w-full" data-name="Content">
      <Newsletter />
      <Links />
    </div>
  );
}

function FooterLinks2() {
  return (
    <div className="content-stretch flex font-['Gilroy-Regular:☞',sans-serif] gap-[24px] items-start relative shrink-0 underline" data-name="Footer Links">
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0">Privacy Policy</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0">Terms of Service</p>
      <p className="[text-decoration-skip-ink:none] decoration-solid relative shrink-0">Cookies Settings</p>
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex items-start justify-between leading-[1.5] not-italic relative shrink-0 text-[14px] text-white w-full whitespace-nowrap" data-name="Row">
      <p className="font-['Gilroy-Light:☞',sans-serif] relative shrink-0">© 2023 Kittyhub. All rights reserved.</p>
      <FooterLinks2 />
    </div>
  );
}

function Credits() {
  return (
    <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-name="Credits">
      <div className="bg-white h-px relative shrink-0 w-full" data-name="Divider">
        <div aria-hidden="true" className="absolute border border-solid border-white inset-0 pointer-events-none" />
      </div>
      <Row2 />
    </div>
  );
}

function UxWebHome1() {
  return (
    <div className="-translate-x-1/2 absolute content-stretch flex flex-col items-center left-1/2 overflow-clip top-0 w-[1440px]" data-name="[UX] [WEB] Home">
      <div className="bg-[#07020b] content-stretch flex flex-col items-center overflow-clip relative rounded-tl-[30px] rounded-tr-[30px] shrink-0 w-[1440px]" data-name="Navbar / 5 /">
        <Content />
      </div>
      <div className="content-stretch flex flex-col gap-[80px] h-[797px] items-start px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="Header / 15 /">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img alt="" className="absolute max-w-none object-cover size-full" src={imgHeader15} />
          <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0" />
        </div>
        <Content2 />
      </div>
      <div className="bg-[#07020b] content-stretch flex flex-col gap-[80px] items-center overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="Product / 2 /">
        <Title />
        <Content4 />
      </div>
      <div className="bg-[#07020b] content-stretch flex flex-col items-start overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="Layout / 1 /">
        <Container />
      </div>
      <div className="bg-[#07020b] content-stretch flex flex-col gap-[80px] items-start px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="Testimonial / 6 /">
        <SectionTitle2 />
        <Content17 />
      </div>
      <div className="content-stretch flex flex-col items-start overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="CTA / 3 /">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 overflow-hidden">
            <img alt="" className="absolute h-[192.4%] left-0 max-w-none top-[-33.14%] w-full" src={imgCta3} />
          </div>
          <div className="absolute bg-[rgba(0,0,0,0.5)] inset-0" />
        </div>
        <Column6 />
      </div>
      <div className="bg-[#07020b] content-stretch flex flex-col gap-[80px] items-start overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="Team / 3 /">
        <SectionTitle3 />
        <Content20 />
      </div>
      <div className="bg-[#07020b] content-stretch flex flex-col items-start overflow-clip px-[64px] py-[112px] relative shrink-0 w-[1440px]" data-name="CTA / 14 /">
        <Container1 />
      </div>
      <div className="bg-[#07020b] content-stretch flex flex-col gap-[80px] items-start overflow-clip px-[64px] py-[80px] relative shrink-0 w-[1440px]" data-name="Footer / 1 /">
        <Content33 />
        <Credits />
      </div>
    </div>
  );
}

export default function UxWebHome() {
  return (
    <div className="relative size-full" data-name="[UX] [WEB] Home">
      <UxWebHome1 />
    </div>
  );
}