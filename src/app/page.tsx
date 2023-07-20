import { Transcriptions } from "@/components/Transcriptions";
import { transcribeItem } from "@/transcribe";
import { getTranscriptions } from "@/utils/getTranscriptions";
import { revalidatePath } from "next/cache";

export const revalidate = 0;

async function doTranscribe(data: FormData) {
  "use server";
  await transcribeItem(data);
  revalidatePath(".");
}

export default async function Home() {
  const transcriptions = await getTranscriptions();
  return (
    <>
      <h1 className="text-center mb-5 text-2xl font-bold">Transcriptions</h1>
      <div className="mb-6">
        <form action={doTranscribe}>
          <button
            type="submit"
            className="border-white border rounded p-2 mr-10"
          >
            Transcribe
          </button>
          <input type="file" name="file" accept="audio/*" />
        </form>
      </div>
      <hr className="mb-6" />
      <Transcriptions transcriptions={transcriptions} />
    </>
  );
}
