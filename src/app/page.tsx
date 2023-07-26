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
          <input
            type="checkbox"
            name="override"
            id="override"
            className="ml-5"
          />
          <label htmlFor="override" className="ml-1">
            Transcribe again
          </label>
          <div>
            <h4>Prompt</h4>
            <textarea
              name="prompt"
              className="w-full"
              defaultValue={process.env.NEXT_PUBLIC_PROMPT}
            ></textarea>
          </div>
        </form>
      </div>
      <hr className="mb-6" />
      <Transcriptions transcriptions={transcriptions} />
    </>
  );
}
