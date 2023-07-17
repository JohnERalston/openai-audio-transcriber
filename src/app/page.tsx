import { Transcriptions } from "@/components/Transcriptions";
import { transcribeItem } from "@/transcribe";
import { getTranscriptions } from "@/utils/getTranscriptions";
import { revalidatePath } from "next/cache";

async function doTranscribe(data: FormData) {
  "use server";
  await transcribeItem(data);
  revalidatePath(".");
}

export default async function Home() {
  const transcriptions = await getTranscriptions();
  return (
    <main className="w-full mx-24">
      <h1>Yo</h1>
      <form action={doTranscribe}>
        <input type="file" name="file" />
        <button type="submit">Transcribe</button>
      </form>
      <Transcriptions transcriptions={transcriptions} />
    </main>
  );
}
