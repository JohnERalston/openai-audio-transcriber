"use server";
import db from "@/utils/db";
import { redirect } from "next/navigation";

export async function updateTranscription(values: FormData) {
  const updatedTranscription = values.get("updatedTranscription");
  const id = values.get("id")! as string;
  const complete = values.get("complete");
  await db.collection("transcriptions").doc(id).update({
    transcription: updatedTranscription,
    transcribedDate: new Date().toISOString(),
    complete: !!complete,
  });
  redirect("/");
}
