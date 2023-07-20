import { Configuration, OpenAIApi } from "openai";
import { ITranscription } from "./components/ITranscription";
import db, { uploadFile } from "./utils/db";
import { Readable } from "stream";
import { redirect } from "next/navigation";

export async function transcribeItem(data: FormData) {
  "use server";
  const file = data.get("file") as File;
  const url = await uploadFile(file);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const fileBuffer = await file.arrayBuffer();
  const fileStream = Readable.from(Buffer.from(fileBuffer));
  // @ts-expect-error Workaround till OpenAI fixed the sdk
  fileStream.path = file.name;

  const openai = new OpenAIApi(configuration);
  const resp = await openai.createTranscription(
    fileStream as unknown as File,
    "whisper-1"
  );
  const transcript = resp.data.text;

  const transcription: ITranscription = {
    fileName: file.name,
    url,
    id: "",
    minutes: 0,
    size: file.size,
    transcribedDate: new Date().toISOString(),
    transcription: transcript,
    complete: false,
  };
  const { id } = await db.collection("transcriptions").add(transcription);
  redirect(`/spiel/${id}`);
}
