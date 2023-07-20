export interface ITranscription {
  id: string;
  transcribedDate: string;
  fileName: string;
  url: string;
  transcription: string;
  size: number;
  minutes: number;
  complete: boolean;
}
