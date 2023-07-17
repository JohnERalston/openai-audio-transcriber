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
    const buffer = new Buffer(fileBuffer);
    await bucket.file(file.name).save(buffer, {
      resumable: true, // Set to true for large file uploads
    });
    return file.name;
  } catch (error) {
    console.error("Error uploading file:", error);
    return "";
  }
}

export default admin.firestore();
