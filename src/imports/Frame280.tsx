import imgPlanDeTravail14 from "figma:asset/892c24aa169d995fb9202bf89e13dacbb1d92bf3.png";
import imgPlanDeTravail25 from "figma:asset/ff1e8f545b80713cdec99b470646171f3f89930c.png";
import imgPlanDeTravail32 from "figma:asset/dd4252cee6bc487528b57fa3b99bc3855f28a77f.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full">
      <div className="absolute h-[506px] left-[-27px] top-[156px] w-[405px]" data-name="Plan de travail 1 4">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail14} />
      </div>
      <div className="absolute h-[506px] left-[393px] top-[156px] w-[405px]" data-name="Plan de travail 2 5">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail25} />
      </div>
      <div className="absolute h-[506px] left-[798px] top-[156px] w-[405px]" data-name="Plan de travail 3 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgPlanDeTravail32} />
      </div>
    </div>
  );
}