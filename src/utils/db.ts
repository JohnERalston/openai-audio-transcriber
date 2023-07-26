import { ITranscription } from "@/components/ITranscription";
import * as admin from "firebase-admin";

import { format } from "date-fns";

var serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://audiotranscriberstore.appspot.com/",
  });
}

const db = admin.firestore();

export async function getTranscriptionByFileName(
  file: string
): Promise<ITranscription | null> {
  const entry = await db
    .collection("transcriptions")
    .where("fileName", "==", file)
    .get();
  if (entry.size === 0) {
    return null;
  }

  const doc = entry.docs[0].data() as ITranscription;
  return {
    ...doc,
    id: entry.docs[0].id,
    transcribedDate: format(new Date(doc.transcribedDate), "MMM, dd, yyyy"),
  };
}

export async function getTranscription(id: string) {
  const doc = await db.collection("transcriptions").doc(id).get();
  const data = doc.data() as ITranscription;
  data.id = doc.id;
  data.transcribedDate = format(
    new Date(data.transcribedDate),
    "MMM, dd, yyyy"
  );
  return data;
}

export async function uploadFile(file: File): Promise<string> {
  try {
    const bucket = admin.storage().bucket();
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);
    await bucket.file(file.name).save(buffer, {
      resumable: true, // Set to true for large file uploads
    });
    await bucket.file(file.name).makePublic();
    const url = bucket.file(file.name).publicUrl();

    //.getSignedUrl({ action: "read", expires: "2050-12-31" });
    return url;
  } catch (error) {
    console.error("Error uploading file:", error);
    return "";
  }
}

export default db;
