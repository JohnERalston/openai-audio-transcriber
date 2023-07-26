import { getTranscription } from "@/utils/db";
import React, { FC } from "react";
import { PageClient } from "./PageClient";

type Props = {
  params: {
    id: string;
  };
};

export const revalidate = 0;

const Spiel: FC<Props> = async ({ params }: Props) => {
  const transcription = await getTranscription(params.id);

  return <PageClient transcription={transcription} />;
};

export default Spiel;
