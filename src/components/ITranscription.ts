export interface ITranscription {
  id: string;
  transcribedDate: string;
  fileName: string;
  url: string;
  transcript: string;
  size: number;
  minutes: number;
  complete: boolean;
}
