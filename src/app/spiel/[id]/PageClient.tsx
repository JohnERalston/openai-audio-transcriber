"use client";

import { ITranscription } from "@/components/ITranscription";
import { useState } from "react";
import { updateTranscription } from "./updateTranscription";
import Link from "next/link";
import { Audio } from "@/components/Audio";

interface Props {
  transcription: ITranscription;
}

const path = "/assets/audio/";

function copyToClipboard(
  title: string,
  fileName: string,
  transcription: string
) {
  const html = `
  <audio data-title="${title}" controls>
        <source src="${path}${fileName}" type="audio/m4a" />
        Your browser does not support the audio element.
      </audio>
      <div data-transcript>${transcription}</div>
  `.trim();
  window.navigator.clipboard.writeText(html);
}

export function PageClient({ transcription }: Props) {
  const [title, setTitle] = useState("");
  return (
    <div>
      <form action={updateTranscription}>
        <div className="mb-5">
          <h1 className="text-center text-2xl font-bold">
            {transcription.fileName}
          </h1>

          <div className="flex justify-around mb-5">
            <Link href="/">&lt;&lt; Transcriptions</Link>
            <div className="ml-auto text-sm italic">
              {transcription.transcribedDate}
            </div>
          </div>

          <Audio url={transcription.url} />
        </div>
        <input type="hidden" name="id" value={transcription.id} />
        <textarea
          className="w-full h-96 whitespace-pre-wrap p-1 rounded-lg"
          name="updatedTranscription"
          defaultValue={transcription.transcription}
        ></textarea>
        <div className="text-right my-2">
          <input
            id="complete"
            name="complete"
            type="checkbox"
            defaultChecked={transcription.complete}
          />{" "}
          <label htmlFor="complete">Complete</label>
        </div>
        <div className="mt-1 text-right">
          <button
            type="submit"
            className="border-white border rounded p-2 w-full"
          >
            Save
          </button>
        </div>
      </form>

      <div className="my-6 flex gap-1">
        <input
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="Audio title...."
          className="w-full"
        />
        <button
          className="border-white border rounded p-1"
          onClick={() =>
            copyToClipboard(
              title,
              transcription.fileName,
              transcription.transcription
            )
          }
        >
          CCB
        </button>
      </div>
    </div>
  );
}
