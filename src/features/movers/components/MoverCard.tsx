import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { StarRating } from "@/components/ui/star-rating";
import { Info } from "lucide-react";
import type { MoverItem } from "../types";

export function MoverCard({ mover }: { mover: MoverItem }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3">
        {/* Provider info row */}
        <div className="flex items-start gap-2">
          <div className="size-10 rounded-lg bg-gray-100 shrink-0" />
          <div className="flex flex-col gap-0.5 min-w-0 flex-1">
            <span className="text-sm font-bold text-teal-600">
              {mover.provider.name}
            </span>
            <div className="flex items-center gap-1">
              <StarRating
                rating={mover.provider.rating}
                maxStars={5}
                size="sm"
                showValue={false}
              />
              <span className="text-xs text-gray-800">
                {mover.provider.rating}
              </span>
              <span className="text-xs text-gray-800">·</span>
              <span className="text-xs text-gray-500">
                {mover.provider.reviews} reviews
              </span>
            </div>
            <span className="text-xs text-gray-500">
              {mover.provider.moves} moves ({mover.provider.yearsInBusiness}{" "}
              years in business)
            </span>
          </div>
        </div>

        {/* Service details row */}
        <div className="flex items-center gap-4 text-sm text-gray-800">
          <div className="flex items-center gap-1">
            <Icon name="clock" size={16} className="text-gray-500" />
            <span className="font-bold">{mover.hours} hours</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="person-dolly" size={16} className="text-gray-500" />
            <span className="font-bold">{mover.movers} movers</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="circle-info" size={16} className="text-gray-500" />
            <span className={mover.hasTruck ? "font-bold" : "text-gray-500"}>
              {mover.hasTruck ? "Truck included" : "No truck"}
            </span>
          </div>
        </div>

        {/* Included services */}
        <div className="flex items-center gap-1">
          <Icon name="person-dolly" size={14} className="text-teal-600" />
          <span className="text-xs text-gray-500">Equipment included</span>
        </div>

        {/* Notes */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            Mover's minimum crew: {mover.movers} movers &times; {mover.hours}{" "}
            hours
          </span>
          <span className="text-xs text-gray-500">
            You can adjust movers or hours before checkout
          </span>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-800">
                ${mover.price}
              </span>
            </div>
            <span className="text-xs text-gray-500">{mover.priceLabel}</span>
            <button className="flex items-center gap-0.5 mt-0.5">
              <span className="text-xs text-teal-600">Price details</span>
              <Info className="size-3 text-teal-600" />
            </button>
          </div>
          <Button variant="cta" className="px-3 py-2.5">
            Select & Review
          </Button>
        </div>
      </div>
    </div>
  );
}
