import { ITicket } from "@/components/templates/BoardsContainer/types";

export type TBoardProps = {
  id: string;
  items: ITicket[];
  onDeleteTicket: (name: string, idx: number) => void;
};
