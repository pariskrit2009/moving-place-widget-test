import {
  Truck,
  Users,
  Check,
  CircleDollarSign,
  Clock,
  Headset,
} from "lucide-react";
import { useNavigateWithParams } from "@/hooks";
import WidgetLayout from "@/components/layout/WidgetLayout";
import { useWidgetStore } from "@/store";
import type { MoveOption, MoveOptionData } from "@/features/move-option";

const MOVE_OPTIONS: MoveOptionData[] = [
  {
    id: "movers-truck",
    label: "Movers + Truck",
    description:
      "Licensed and vetted professional movers handle loading, transport, and unloading for a full-service move.",
    moversAvailable: 6,
    startingPrice: 694,
  },
  {
    id: "movers-only",
    label: "Movers Only",
    description:
      "Vetted, professional moving labor handle loading and unload of your truck or container.",
    moversAvailable: 13,
    startingPrice: 468,
  },
];

const TRUST_BADGES = [
  {
    icon: CircleDollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees, backed by our Best Price Guarantee",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Free cancellation or rescheduling up to 48 hours before your move",
  },
  {
    icon: Headset,
    title: "Expert Support",
    description: "End-to-end help from our Moving Specialists, 7 days a week",
  },
];

function OptionIcon({ optionId }: { optionId: MoveOption }) {
  const iconSize = 30;
  if (optionId === "movers-truck") {
    return <Truck size={iconSize} className="text-[#2d6671]" />;
  }
  return <Users size={iconSize} className="text-[#2d6671]" />;
}

function MoveOptionCard({
  option,
  isSelected,
  onSelect,
}: {
  option: MoveOptionData;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        w-full text-left rounded-2xl p-4 flex gap-3 items-start transition-colors
        ${
          isSelected
            ? "bg-[#f1faf9] border border-[#3290a2]"
            : "bg-white border border-[#b1bbc8]"
        }
      `}
      role="radio"
      aria-checked={isSelected}
    >
      <div className="flex items-center justify-center rounded-full p-3 shrink-0 bg-[#f1faf9]">
        <OptionIcon optionId={option.id} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-3">
        <div className="flex flex-col">
          <p className="font-bold text-[18px] text-[#2e343e]">{option.label}</p>
          <p className="text-sm font-normal text-[#677890] leading-relaxed">
            {option.description}
          </p>
        </div>

        <div className="border-t border-[#d5dae2] flex items-start justify-between pt-2">
          <div className="flex items-center gap-1">
            <Check size={15} className="text-[#2d6671] shrink-0" />
            <span className="text-sm text-[#2e343e] whitespace-nowrap">
              {option.moversAvailable} movers available
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#2e343e] text-sm whitespace-nowrap">
            <span className="font-normal">Starting at </span>
            <span className="font-bold">${option.startingPrice}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center w-6 h-6 shrink-0 mt-0.5">
        <div
          className={`w-5 h-5 rounded-full border-2 transition-colors ${
            isSelected
              ? "border-[#3799a3] bg-[#3799a3] flex items-center justify-center"
              : "border-[rgba(1,6,47,0.17)] bg-white"
          }`}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>
    </button>
  );
}

function TrustBadges() {
  return (
    <div className="border-t border-[#eceef2] pt-6">
      <div className="flex gap-6">
        {TRUST_BADGES.map((badge) => (
          <div
            key={badge.title}
            className="flex-1 flex flex-col items-center gap-1.5 px-4"
          >
            <badge.icon size={24} className="text-[#2e343e] shrink-0" />
            <p className="text-sm font-bold text-[#2e343e] whitespace-nowrap">
              {badge.title}
            </p>
            <p className="text-xs font-normal text-[#2e343e] text-center leading-relaxed">
              {badge.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MoveOptionPage() {
  const { navigateWithParams } = useNavigateWithParams();
  const selectedMoveOption = useWidgetStore((s) => s.selectedMoveOption);
  const setSelectedMoveOption = useWidgetStore((s) => s.setSelectedMoveOption);

  const handleContinue = () => {
    if (!selectedMoveOption) return;
    navigateWithParams("/quote");
  };

  const navigateBack = () => {
    navigateWithParams("/moving");
  };

  return (
    <WidgetLayout onContinue={handleContinue} navigateBack={navigateBack}>
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-[28px] font-bold text-[#2e343e] leading-[34px]">
            Choose a move option
          </h2>

          <div className="flex flex-col gap-4">
            {MOVE_OPTIONS.map((option) => (
              <MoveOptionCard
                key={option.id}
                option={option}
                isSelected={selectedMoveOption === option.id}
                onSelect={() => setSelectedMoveOption(option.id)}
              />
            ))}
          </div>

          <TrustBadges />
        </div>
      </div>
    </WidgetLayout>
  );
}
