"use-client";

import React, { useState } from "react";
import AsyncSelect from "react-select/async";
import { useLazyQuery } from "@apollo/client";
import { CHARACTERS_QUERY } from "@/lib/queries";
import Image from "next/image";
import { ITicket } from "@/components/templates/BoardsContainer/types";
import { SingleValue } from "react-select";

type TOption = { value: ITicket; label: string };

const AddTicketForm = ({
  onSubmit,
}: {
  onSubmit: (item: ITicket) => void;
}): React.ReactNode => {
  // --- Hooks -----------------------------------------------------------------
  const [fetchCharacters, { loading, error, data }] =
    useLazyQuery(CHARACTERS_QUERY);

  // --- END: Hooks ------------------------------------------------------------

  // --- Local state -----------------------------------------------------------
  const [option, setOption] = useState<TOption | null>(null);
  // --- END: Local state ------------------------------------------------------

  // --- Refs ------------------------------------------------------------------
  // --- END: Refs -------------------------------------------------------------

  // --- Redux -----------------------------------------------------------------
  // --- END: Redux ------------------------------------------------------------

  // --- Side effects ----------------------------------------------------------
  // --- END: Side effects -----------------------------------------------------

  // --- Data and handlers -----------------------------------------------------
  const handleSelect = (newValue: SingleValue<TOption | null>) =>
    setOption(newValue);

  const handleFetch = async () => {
    const items = await fetchCharacters();
    return items.data.characters.results.map((item: ITicket) => ({
      value: item,
      label: item.name,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(option?.value as ITicket);
  };
  // --- END: Data and handlers ------------------------------------------------

  return (
    <form className="add-ticket-form" onSubmit={handleSubmit}>
      <div className="form-question w-full">
        <Image
          src="https://i.pinimg.com/originals/94/ae/fc/94aefc0b4cc029fb9ae73faa95c906d2.png"
          height={500}
          width={500}
          alt="R&M"
        />
        <div className="text-center text-lg m-auto w-full font-extrabold">
          {"Who will survive Season 8?"}
        </div>
      </div>
      <AsyncSelect
        className="character-selector text-lg"
        cacheOptions
        loadOptions={handleFetch}
        defaultOptions
        onChange={handleSelect}
        defaultValue={option}
      />

      <button
        disabled={option === null}
        className="form-submit-button bg-[#08bae3] pulsate-fwd hover:bg-[#0880e3] text-white font-bold py-2 px-4 rounded-full pulsate-fwd w-72 h-10 text-xl my-5"
        type="submit"
      >
        Add Character
      </button>
    </form>
  );
};

export default AddTicketForm;
