import { IBoard, ITicket } from "./types";

export const findTicketBoard = (id: string, boards: IBoard): string | undefined => {
  if (id in boards) return id;

  const retVal: ITicket | undefined = Object.values(boards)
    .flat()
    .find((item) => item.id === id);

  return retVal?.board;
};