import { StarRating } from "@/components/ui/star-rating";
import { CrewSizeColumn } from "./CrewSizeColumn";
import type { ServiceItem } from "../types";

export function ProviderBlock({ service }: { service: ServiceItem }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-1 flex-col gap-3 min-w-0">
        <div className="flex items-center justify-between whitespace-nowrap text-sm text-gray-800">
          <div className="flex items-center gap-1">
            <span className="font-bold">{service.date}</span>
            <span className="font-bold">·</span>
            <span className="font-normal">{service.location}</span>
          </div>
          <div className="flex flex-col items-end justify-center gap-1 shrink-0">
            <span className="text-xs text-gray-500">Starting at</span>
            <span className="text-base font-bold">
              ${service.startingPrice}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 flex gap-2">
            <div className="flex items-center py-0.5">
              <div className="size-9 rounded-lg bg-gray-100 shrink-0" />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-sm font-bold text-teal-600 truncate">
                {service.provider.name}
              </span>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {service.provider.moves} moves (
                {service.provider.yearsInBusiness} years in business)
              </span>
            </div>
          </div>

          <div className="col-span-8 flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1">
              <StarRating
                rating={service.provider.rating}
                maxStars={5}
                size="sm"
                showValue={false}
              />
              <span className="text-xs text-gray-800">
                {service.provider.rating}
              </span>
              <span className="text-xs text-gray-800">·</span>
              <span className="text-xs text-gray-500">
                {service.provider.reviews} reviews
              </span>
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">
              <span className="font-bold">Summary:</span>{" "}
              {service.provider.summary}{" "}
              <span className="text-teal-600 cursor-pointer">Read more</span>
            </p>
          </div>
        </div>
      </div>

      <CrewSizeColumn movers={service.movers} hours={service.hours} />
    </div>
  );
}
