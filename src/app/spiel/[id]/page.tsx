import React, { FC } from "react";
import { ITranscription } from "@/components/ITranscription";
import db from "@/utils/db";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import Link from "next/link";

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
      <div className="mb-5">
        <h1 className="text-center text-2xl font-bold">
          {transcription.fileName}
        </h1>
        <div className="flex justify-around">
          <Link href="/">&lt;&lt; Transcriptions</Link>
          <div className="ml-auto text-sm italic">
            {transcription.transcribedDate}
          </div>
        </div>
      </div>
      <input type="hidden" name="id" value={transcription.id} />
      <textarea
        className="w-full h-screen whitespace-pre-wrap p-1 rounded-lg"
        name="updatedTranscription"
        defaultValue={transcription.transcription}
      ></textarea>
      <div className="mt-1 text-right">
        <button
          type="submit"
          className="border-white border rounded p-2 w-full"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Spiel;
