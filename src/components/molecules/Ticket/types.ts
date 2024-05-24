import { ITicket } from "@/components/templates/BoardsContainer/types";

export type TTicketProps = {
  ticket: ITicket;
  onDeleteTicket?: () => void;
};
