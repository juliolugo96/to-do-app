export interface ITicket {
  name: string;
  id: string;
  image: string;
  board: string;
  onDeleteTicket?: (board: string, idx: number) => void;
}

export interface IBoard {
  [key: string]: ITicket[];
}
