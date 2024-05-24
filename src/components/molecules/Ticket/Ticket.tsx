import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";
import { TTicketProps } from "./types";

const Ticket = (props: TTicketProps): React.ReactNode => {
  const ticket = props.ticket;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      className="ticket-container grid grid-cols-4"
      style={style}
      {...listeners}
      {...attributes}
    >
      <Image
        className="ticket-image"
        alt={ticket?.name}
        src={ticket?.image}
        width={50}
        height={50}
      />
      <div className="ticket-content col-span-2">{ticket?.name}</div>
      {/* <FaRegTrashCan
        type="button"
        className="ticket-icon"
        onClick={handleDeleteTicket}
      /> */}
    </div>
  );
};

export default Ticket;
