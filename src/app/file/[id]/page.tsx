import { CFileDetails } from "@/components/CFileDetails";
import fs from "fs";

type Props = {
  params: {
    id: string;
  };
};

const SFileDetails = async ({ params }: Props) => {
  const id = params.id.split("_").slice(0, 3).join("-");

  const transcriptFile = `${process.env.OUTPUT_DIR}/${params.id}.txt`;
  const logFile = `${process.env.LOG_DIR}/${id}.md`;

  const transcript = fs.readFileSync(transcriptFile).toString();
  const log = fs.readFileSync(logFile).toString();

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-center text-2xl font-bold">{params.id}</h1>
      </div>
      <CFileDetails
        fileId={params.id}
        log={log}
        logFilePath={logFile}
        transcript={transcript}
        transcriptFilePath={transcriptFile}
      />
    </div>
  );
};
export default SFileDetails;
