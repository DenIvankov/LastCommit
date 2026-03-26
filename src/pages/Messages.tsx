import { useState } from "react";
import { IconPhoto } from "@tabler/icons-react";

interface UploadedImage {
  id: number;
  url: string;
  name: string;
}

function Messages() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const apiUrl = import.meta.env.VITE_UPLOAD_URL ?? "http://localhost:3001";

      const response = await fetch(`${apiUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      setImages((prev) => [
        ...prev,
        {
          id: Date.now(),
          url: `${apiUrl}${data.url}`,
          name: file.name,
        },
      ]);
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("Failed to upload image");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen theme-surface">
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>

        {/* Upload Form */}
        <div className="mb-6 p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Upload Photo</h2>

          <label className="flex items-center gap-2 cursor-pointer">
            <div className="h-10 w-10 rounded-full bg-sky-500 flex items-center justify-center hover:bg-sky-600 transition-colors">
              <IconPhoto size={20} className="text-white" />
            </div>
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {isUploading ? "Uploading..." : "Select image"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
            />
          </label>

          {uploadError && (
            <p className="mt-2 text-sm text-red-500">{uploadError}</p>
          )}
        </div>

        {/* Uploaded Images */}
        {images.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Uploaded Photos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800"
                >
                  <img
                    src={image.url}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemoveImage(image.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
                    title="Remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {images.length === 0 && (
          <p className="text-neutral-500 dark:text-neutral-400 text-center py-8">
            No photos uploaded yet
          </p>
        )}
      </div>
    </div>
  );
}

export default Messages;
