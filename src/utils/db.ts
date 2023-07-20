import * as admin from "firebase-admin";

var serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://audiotranscriberstore.appspot.com/",
  });
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

export default admin.firestore();
