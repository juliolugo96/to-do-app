import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Ticket from "@/components/molecules/Ticket";
import { TBoardProps } from "./types";

const Board = ({
  id,
  items,
  onDeleteTicket: handleDeleteTicket,
}: TBoardProps): React.ReactNode => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    backgroundColor: isOver ? "rgba(0, 255, 0, 0.3)" : undefined,
  };

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={verticalListSortingStrategy}
    >
      <div
        ref={setNodeRef}
        className="board w-full no-scrollbar min-h-screen md:min-h-0"
        style={style}
      >
        <div className="board-title">{id}</div>
        {items.map((ticket, idx) => (
          <Ticket
            key={ticket.id}
            ticket={ticket}
            onDeleteTicket={() => handleDeleteTicket(id, idx)}
          />
        ))}
      </div>
    </SortableContext>
  );
};

export default Board;
