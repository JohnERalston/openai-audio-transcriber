"use client";
import React, { FC, useState, useTransition } from "react";
import { IFile } from "@/utils/files";
import Link from "next/link";

type Props = {
  files: IFile[];
  transcribe: (name: string) => Promise<void>;
};

export const TranscribedFiles: FC<Props> = ({ files, transcribe }: Props) => {
  const [transcribing, setTranscribing] = useState("");

  const doTranscribe = async (name: string) => {
    setTranscribing(name);
    await transcribe(name);
    console.log(`${name} written!`);
    setTranscribing("");
  };

  if (files.length === 0) {
    return (
      <div className="italic text-center">There are no transcriptions</div>
    );
  }
  return (
    <div id="transcriptionFileGrid">
      {files.map(({ name, transcribed, complete }) => {
        const isTranscribing = name === transcribing;
        return (
          <React.Fragment key={name}>
            {transcribed && <Link href={`/file/${name}`}>{name}</Link>}
            {!transcribed && <div>{name}</div>}
            <div className="text-center">
              {transcribed ? "Transcribed" : "N"}
            </div>
            <div className="text-right">{complete ? "Complete" : "N"}</div>
            <div className="text-right">
              <button
                disabled={isTranscribing}
                // onClick={() => startTransition(() => doTranscribe(name))}
                onClick={() => doTranscribe(name)}
                className="border-white border rounded p-1"
              >
                {isTranscribing ? (
                  <span>Transcribing...</span>
                ) : (
                  <span>Transcribe</span>
                )}
              </button>
            </div>
            {/* <div>
              <Link href={`/spiel/${id}`}>{fileName}</Link>
            </div> */}
          </React.Fragment>
        );
      })}
    </div>
  );
};
