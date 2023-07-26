"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button
        className="border-white border rounded p-1"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
