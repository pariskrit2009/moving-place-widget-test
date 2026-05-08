export type MoveOption = "movers-truck" | "movers-only";

export interface MoveOptionData {
  id: MoveOption;
  label: string;
  description: string;
  moversAvailable: number;
  startingPrice: number;
}
