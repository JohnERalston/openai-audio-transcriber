import { TranscribedFiles } from "@/components/TranscribedFiles";
import { getFileInfo, transcribe } from "@/utils/files";

export const revalidate = 0;

export default async function Home() {
  const fileInfo = await getFileInfo();
  return (
    <>
      <h1 className="text-center mb-5 text-2xl font-bold">Files Transcribed</h1>
      <hr className="mb-6" />
      <TranscribedFiles files={fileInfo} transcribe={transcribe} />
    </>
  );
}
