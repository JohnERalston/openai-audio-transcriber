import { ITranscription } from "./components/ITranscription";
import db, { uploadFile } from "./utils/db";

export async function transcribeItem(data: FormData) {
  "use server";
  const file = data.get("file") as File;
  await uploadFile(file);
  const transcription: ITranscription = {
    fileName: file.name,
    id: "",
    minutes: 0,
    size: file.size,
    transcribedDate: new Date().toISOString(),
    transcription: "",
  };
  const { id } = await db.collection("transcriptions").add(transcription);
  /*
  const { id } = await db
        .collection(DB_EVENT_LOG)
        .add({ spiel, day, modified: now, created: now });
  */

  // send for transcription
}
