"use client";

import React, { useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  Over,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Modal from "react-modal";
import { IBoard, ITicket } from "./types";
import AddTicketForm from "@/components/organisms/AddTicketForm";
import Board from "@/components/organisms/Board";
import Ticket from "@/components/molecules/Ticket";
import AddItemButton from "@/components/atoms/AddItemButton";
import { findTicketBoard } from "./functions";

Modal.setAppElement("#app");

export default function BoardsContainer(): React.ReactNode {
  // --- Hooks -----------------------------------------------------------------
  const { width, height } = useWindowSize();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [boards, setBoards] = useState<IBoard>({
    todo: [],
    doing: [],
    done: [],
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<ITicket | null>(null);
  const [isExploding, setIsExploding] = React.useState<boolean>(false);

  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Data and handlers -----------------------------------------------------

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const { id } = active;

    const newSelectedTicket: ITicket | undefined = Object.values(boards)
      .flat()
      .find((item) => item.id === id);

    setSelectedTicket(newSelectedTicket ?? null);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const { id } = active;
    const overId = String(over?.id);

    // Find the containers
    const activeContainer: string = findTicketBoard(String(id), boards) ?? "";
    const overContainer: string = findTicketBoard(overId, boards) ?? "";

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    setBoards((prev: IBoard) => {
      // Find the indexes for the items
      const activeIndex: number = prev[activeContainer].findIndex(
        (item: ITicket) => item.id === id
      );
      const overIndex: number = prev[overContainer].findIndex(
        (item: ITicket) => item.id === overId
      );
      const flatPrev = Object.values(prev).flat();

      let newIndex: number;

      if (overId in flatPrev) {
        // We're at the root droppable of a container
        newIndex = prev[overContainer].length + 1;
      } else {
        const isBelowLastItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;
        newIndex =
          overIndex >= 0
            ? overIndex + modifier
            : prev[overContainer].length + 1;
      }
      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item.id !== active.id),
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          {
            ...boards[activeContainer][activeIndex],
            board: overContainer,
          },
          ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        ],
      };
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    const { id } = active;
    const overId = String(over?.id);

    if (id !== overId) {
      setBoards((boards) => {
        const activeContainer = findTicketBoard(String(id), boards) ?? "";
        const overContainer = findTicketBoard(overId, boards) ?? "";

        const activeIndex = boards[activeContainer].findIndex(
          (item) => item.id === active.id
        );
        const overIndex = boards[overContainer].findIndex(
          (item) => item.id === overId
        );

        const newArray = arrayMove(
          boards[overContainer],
          activeIndex,
          overIndex
        );

        newArray[overIndex] = { ...newArray[overIndex], board: overContainer };

        if (overContainer === "done") {
          setIsExploding(true);
          setTimeout(() => {
            setIsExploding(false);
          }, 10000);
        }

        return {
          ...boards,
          [overContainer]: newArray,
        };
      });
    }

    setSelectedTicket(null);
  };

  const addTicket = (item: ITicket) => {
    setBoards({
      ...boards,
      todo: [
        ...boards.todo,
        {
          ...item,
          id: `${item.name}-${Math.floor(Date.now() / 1000)}`,
          board: "todo",
        },
      ],
    });
    setIsOpenModal(false);
  };

  const deleteTicket = (name: string, idx: number): void => {
    const newBoard = boards[name].splice(idx, 1);

    setBoards({ ...boards, [name]: newBoard });
  };

  // --- END: Data and handlers ------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  return (
    <>
      {isExploding && <Confetti width={width} height={height} />}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={() => setIsOpenModal(false)}
        overlayClassName="modal-overlay"
        className="modal"
      >
        <AddTicketForm onSubmit={addTicket} />
      </Modal>
      <AddItemButton onClick={() => setIsOpenModal(true)}>
        Add new character
      </AddItemButton>

      <div className="board-list-container grid grid-cols-1 md:grid-cols-3 gap-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {Object.entries(boards).map(([boardName, tickets]) => (
            <Board
              key={boardName}
              id={boardName}
              items={tickets}
              onDeleteTicket={deleteTicket}
            />
          ))}

          <DragOverlay>
            {selectedTicket ? <Ticket ticket={selectedTicket} /> : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}
