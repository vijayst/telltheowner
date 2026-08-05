export function ReviewInstructions() {
  return (
    <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
      <h3 className="font-semibold text-blue-900 mb-2">
        How to leave a review:
      </h3>
      <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
        <li>Click &quot;Start Recording&quot; to begin</li>
        <li>Speak clearly into your microphone</li>
        <li>Review your recording or discard and try again</li>
        <li>Click &quot;Submit Review&quot; when you&apos;re happy with it</li>
      </ol>
    </div>
  );
}
