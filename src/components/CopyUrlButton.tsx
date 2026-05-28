"use client";

interface CopyUrlButtonProps {
  url: string;
}

export function CopyUrlButton({ url }: CopyUrlButtonProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("URL copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy:", error);
      alert("Failed to copy URL. Please try again.");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
    >
      Copy
    </button>
  );
}