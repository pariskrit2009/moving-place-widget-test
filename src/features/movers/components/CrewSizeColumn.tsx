import { Icon } from "@/components/ui/icon";

export function CrewSizeColumn({
  movers,
  hours,
}: {
  movers: number;
  hours: number;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-gray-50 py-2">
      <span className="text-[10px] text-gray-500">Crew size</span>
      <div className="flex gap-2">
        <div className="flex flex-col items-center gap-0">
          <div className="flex size-6 items-center justify-center rounded-[5px]">
            <Icon name="person-dolly" size={20} className="text-gray-800" />
          </div>
          <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
            {movers} movers
          </span>
        </div>
        <div className="flex flex-col items-center gap-0">
          <div className="flex size-6 items-center justify-center rounded-[5px]">
            <Icon name="clock" size={20} className="text-gray-800" />
          </div>
          <span className="text-xs font-bold text-gray-800 whitespace-nowrap">
            {hours} hours
          </span>
        </div>
      </div>
      <div className="flex items-center gap-0.5">
        <span className="text-[10px] font-normal text-teal-600 whitespace-nowrap">
          Equipment included
        </span>
        <Icon name="circle-info" size={12.5} className="text-gray-500" />
      </div>
    </div>
  );
}
