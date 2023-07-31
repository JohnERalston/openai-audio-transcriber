import React, { FC } from "react";
import { ITranscription } from "./ITranscription";
import Link from "next/link";

type Props = {
  transcriptions: ITranscription[];
};

export const Transcriptions: FC<Props> = ({ transcriptions }: Props) => {
  if (transcriptions.length === 0) {
    return (
      <div className="italic text-center">There are no transcriptions</div>
    );
  }

  return (
    <div id="transcriptionGrid" className="transcriptionGrid">
      {transcriptions.map(
        ({ id, fileName, size, transcribedDate, complete }) => (
          <React.Fragment key={id}>
            <div>{complete ? "Y" : "N"}</div>
            <div>
              <Link href={`/spiel/${id}`}>{fileName}</Link>
            </div>
            <div>{size}</div>
            <div className="text-right">{transcribedDate}</div>
          </React.Fragment>
        )
      )}
    </div>
  );
};
