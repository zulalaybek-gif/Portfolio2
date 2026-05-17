import imgPlanDeTravail25 from "figma:asset/a482d7f9718ca2e04a1977f65d5b924b530f28a9.png";
import imgPlanDeTravail32 from "figma:asset/e40ef5803418bf97e54030fd41ac147b6b213cf8.png";
import imgPlanDeTravail14 from "figma:asset/bcd888905a245dc8b177e96fd0999cc222dc74ea.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[543px] left-[423px] top-[52px] w-[434px]" data-name="Plan de travail 2 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail25} />
      </div>
      <div className="absolute h-[543px] left-[857px] top-[52px] w-[434px]" data-name="Plan de travail 3 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail32} />
      </div>
      <div className="absolute h-[807px] left-[-87px] top-[52px] w-[646px]" data-name="Plan de travail 1 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail14} />
      </div>
    </div>
  );
}