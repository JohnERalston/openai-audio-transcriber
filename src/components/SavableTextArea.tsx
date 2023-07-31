"use client";

import { FC } from "react";

interface Props {
  value: string;
  setValue: (value: string) => void;
  save: () => void;
  //   ref?: React.MutableRefObject<HTMLTextAreaElement>;
}

export const SavableTextArea: FC<Props> = ({ value, setValue, save, ref }) => {
  return (
    <>
      <textarea
        className="w-full h-96 whitespace-pre-wrap p-1 rounded-lg"
        name="fileString"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      ></textarea>
      <div className="mt-1 text-right">
        <button
          type="button"
          onClick={save}
          className="border-white border rounded p-2 w-full"
        >
          Save
        </button>
      </div>
    </>
  );
};
