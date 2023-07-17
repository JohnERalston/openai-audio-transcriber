import React, { FC } from "react";
import { ITranscription } from "./ITranscription";
import Link from "next/link";

type Props = {
  transcriptions: ITranscription[];
};

export const Transcriptions: FC<Props> = ({ transcriptions }: Props) => {
  return (
    <div id="transcriptionGrid">
      {transcriptions.map(({ id, fileName, size, transcribedDate }) => (
        <React.Fragment key={id}>
          <div>
            <Link href={`/spiel/${id}`}>{fileName}</Link>
          </div>
          <div>{size}</div>
          <div>{transcribedDate}</div>
        </React.Fragment>
      ))}
    </div>
  );
};
