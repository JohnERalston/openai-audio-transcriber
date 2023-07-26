import { Configuration, OpenAIApi } from "openai";
import { ITranscription } from "./components/ITranscription";
import db, { getTranscriptionByFileName, uploadFile } from "./utils/db";
import { Readable } from "stream";
import { redirect } from "next/navigation";

function verifyFile(file: File) {
  console.log({ file });
  if (!file || file.size === 0) {
    throw Error("Please provide a file");
  }
}

export async function transcribeItem(data: FormData) {
  "use server";

  const transcribeEnabled = true;

  const file = data.get("file") as File;
  const override = data.get("override") as string;
  // const prompt = String(data.get("prompt"));
  verifyFile(file);

  const transcription: ITranscription = {
    fileName: file.name,
    url: "",
    id: "",
    minutes: 0,
    size: file.size,
    transcribedDate: new Date().toISOString(),
    transcription: "",
    complete: false,
  };

  const existingTranscription = await getTranscriptionByFileName(file.name);
  let url = existingTranscription?.url || "";
  if (!existingTranscription) {
    url = await uploadFile(file);
  }
  transcription.url = url;
  if (existingTranscription && !override) {
    throw Error("File already transcribed");
  }

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const fileBuffer = await file.arrayBuffer();
  const fileStream = Readable.from(Buffer.from(fileBuffer));
  // @ts-expect-error Workaround till OpenAI fixed the sdk
  fileStream.path = file.name;

  let transcript = "openai turned off";

  if (transcribeEnabled) {
    const openai = new OpenAIApi(configuration);
    const resp = await openai.createTranscription(
      fileStream as unknown as File,
      "whisper-1"
    );
    // console.log(resp);
    transcript = resp.data.text;
    transcription.transcribedDate = new Date().toISOString();
  }
  transcription.transcription = transcript;

  if (existingTranscription) {
    transcription.id = existingTranscription.id;
    await db.collection("transcriptions").doc(transcription.id).update({
      transcription: transcription.transcription,
      transcribedDate: new Date().toISOString(),
    });
    redirect(`/spiel/${transcription.id}`);
  } else {
    const { id } = await db.collection("transcriptions").add(transcription);
    redirect(`/spiel/${id}`);
  }
}
