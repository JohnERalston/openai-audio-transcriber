"use server";
import fs from "fs";
import { revalidatePath } from "next/cache";
import { Configuration, OpenAIApi } from "openai";
import { Readable } from "stream";

export interface IFile {
  name: string;
  transcribed: boolean;
  complete: boolean;
}

async function getFilesInDir(dir: string): Promise<string[]> {
  function getNameNoExt(name: string) {
    const [nameNoExt] = name.split(".");
    return nameNoExt;
  }

  return new Promise((resolve) => {
    fs.readdir(dir, function (err, files) {
      //handling error
      if (err) {
        throw Error("Unable to scan directory: " + err);
      }
      resolve(files.map(getNameNoExt));
    });
  });
}

async function getAudioFiles(): Promise<string[]> {
  return getFilesInDir(process.env.INPUT_DIR!);
}

function getTextFiles(): Promise<string[]> {
  return getFilesInDir(process.env.OUTPUT_DIR!);
}

async function getFileInfo(): Promise<IFile[]> {
  const audio = await getAudioFiles();
  const text = await getTextFiles();
  return audio.map((name) => {
    return {
      name,
      transcribed: text.includes(name),
      complete: false,
    };
  });
}

function writeFile(path: string, content: string) {
  fs.writeFileSync(path, content);
}

async function writeTranscript(nameNoExt: string, transcript: string) {
  const target = `${process.env.OUTPUT_DIR}/${nameNoExt}.txt`;
  return new Promise((resolve) => {
    fs.writeFile(target, transcript, {}, (err: any) => {
      if (err) {
        throw Error("failed to write file " + err);
      }
      resolve(true);
    });
  });
}

async function transcribe(nameNoExt: string) {
  const target = `${process.env.INPUT_DIR}/${nameNoExt}.m4a`;
  const fileBuffer = fs.readFileSync(target);
  const fileStream = Readable.from(Buffer.from(fileBuffer));
  // @ts-expect-error Workaround till OpenAI fixed the sdk
  fileStream.path = target;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const resp = await openai.createTranscription(
    fileStream as unknown as File,
    "whisper-1",
    undefined,
    undefined,
    undefined,
    "en",
    {
      maxBodyLength: Number.MAX_VALUE,
      maxContentLength: Number.MAX_VALUE,
    }
  );
  const transcript = resp.data.text;
  await writeTranscript(nameNoExt, transcript);
  revalidatePath("/files");
}

export { getFileInfo, transcribe, writeFile };
