import imgPlanDeTravail14 from "figma:asset/edbe296e1771ef90c3c1104350e173acfbc03e9e.png";
import imgPlanDeTravail25 from "figma:asset/a482d7f9718ca2e04a1977f65d5b924b530f28a9.png";
import imgPlanDeTravail32 from "figma:asset/e40ef5803418bf97e54030fd41ac147b6b213cf8.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[543px] left-[26px] top-[16px] w-[434px]" data-name="Plan de travail 1 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail14} />
      </div>
      <div className="absolute h-[543px] left-[423px] top-[52px] w-[434px]" data-name="Plan de travail 2 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail25} />
      </div>
      <div className="absolute h-[543px] left-[857px] top-[52px] w-[434px]" data-name="Plan de travail 3 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail32} />
      </div>
    </div>
  );
}