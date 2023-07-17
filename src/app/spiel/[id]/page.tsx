import React, { FC } from "react";
import { ITranscription } from "@/components/ITranscription";
import db from "@/utils/db";
import { format } from "date-fns";
import { redirect } from "next/navigation";

async function getTranscription(id: string) {
  const doc = await db.collection("transcriptions").doc(id).get();
  const data = doc.data() as ITranscription;
  data.id = doc.id;
  data.transcribedDate = format(
    new Date(data.transcribedDate),
    "MMM, dd, yyyy"
  );
  return data;
}

async function updateTranscription(values: FormData) {
  "use server";
  const updatedTranscription = values.get("updatedTranscription");
  const id = values.get("id")! as string;
  await db.collection("transcriptions").doc(id).update({
    transcription: updatedTranscription,
    transcribedDate: new Date().toISOString(),
  });
  redirect("/");
}

type Props = {
  params: {
    id: string;
  };
};

const Spiel: FC<Props> = async ({ params }: Props) => {
  const transcription = await getTranscription(params.id);
  return (
    <form action={updateTranscription}>
      <h3>{transcription.fileName}</h3>
      <h4>{transcription.transcribedDate}</h4>
      <input type="hidden" name="id" value={transcription.id} />
      <textarea
        name="updatedTranscription"
        defaultValue={transcription.transcription}
      ></textarea>
      <button type="submit">Save</button>
    </form>
  );
};

export default Spiel;
