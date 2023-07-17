import { ITranscription } from "@/components/ITranscription";
import db from "./db";
import { format } from "date-fns";

export async function getTranscriptions(): Promise<ITranscription[]> {
  const docs = (
    await db
      .collection("transcriptions")
      .orderBy("transcribedDate", "desc")
      .get()
  ).docs;
  return docs.map((doc) => {
    const data = doc.data() as ITranscription;
    data.id = doc.id;
    data.transcribedDate = format(
      new Date(data.transcribedDate),
      "MMM, dd, yyyy"
    );
    return data;
  });
}
