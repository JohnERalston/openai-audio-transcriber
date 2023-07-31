"use client";
import { writeFile } from "@/utils/files";
import React, { FC, useState } from "react";
import { SavableTextArea } from "./SavableTextArea";
import { copyToClipboard } from "@/utils/copyToClipboard";

type Props = {
  fileId: string;
  transcript: string;
  transcriptFilePath: string;
  log: string;
  logFilePath: string;
};

export const CFileDetails: FC<Props> = ({
  fileId,
  transcript,
  log,
  transcriptFilePath,
  logFilePath,
}: Props) => {
  const [title, setTitle] = useState("");
  const [showTranscript, setShowTranscript] = useState(true);
  const [transcriptValue, setTranscriptValue] = useState(transcript);
  const [logValue, setLogValue] = useState(log);

  const saveTranscript = async () => {
    writeFile(transcriptFilePath, transcriptValue);
  };
  const saveLog = async () => {
    writeFile(logFilePath, logValue);
  };
  const getTranscriptInc = () => {
    return `{% include "transcriptions/${fileId}.txt" %}`;
  };
  const getAudioFile = () => {
    return `${fileId}.m4a`;
  };

  return (
    <div>
      <div className="flex">
        <button
          onClick={toggleDisplay}
          className="border-white border rounded p-2"
        >
          Transcript
        </button>
        <button
          onClick={toggleDisplay}
          className="border-white border rounded p-2"
        >
          Log
        </button>
      </div>
      <h1 className="text-center text-2xl font-bold">
        {showTranscript ? <span>Transcript</span> : <span>Log</span>}
      </h1>
      {showTranscript && (
        <SavableTextArea
          save={saveTranscript}
          setValue={setTranscriptValue}
          value={transcriptValue}
        />
      )}
      {!showTranscript && (
        <SavableTextArea
          save={saveLog}
          setValue={setLogValue}
          value={logValue}
        />
      )}
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
            copyToClipboard(title, getAudioFile(), getTranscriptInc())
          }
        >
          CCB
        </button>
      </div>
    </div>
  );

  function toggleDisplay() {
    setShowTranscript(!showTranscript);
  }
};
