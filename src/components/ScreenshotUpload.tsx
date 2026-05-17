"use client";

/**
 * ScreenshotUpload — fallback when Mobbin MCP isn't available.
 * Users drag & drop or select screenshots; they get base64-encoded
 * and passed directly to Claude's vision API.
 */

import { useRef, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import type { UploadedImage } from "@/types";

interface ScreenshotUploadProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
}

export default function ScreenshotUpload({ images, onChange }: ScreenshotUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  async function processFiles(files: FileList) {
    const newImages: UploadedImage[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;
      const base64 = await toBase64(file);
      newImages.push({
        name: file.name,
        base64,
        mediaType: file.type as UploadedImage["mediaType"],
      });
    }

    onChange([...images, ...newImages]);
  }

  function toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // strip the data:image/...;base64, prefix
        resolve(result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function remove(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 transition ${
          dragging
            ? "border-brand-500 bg-brand-50"
            : "border-gray-200 bg-gray-50 hover:border-brand-400 hover:bg-brand-50/50"
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
        }}
      >
        <Upload className="h-5 w-5 text-gray-400" />
        <p className="text-sm text-gray-500">
          <span className="font-medium text-brand-600">Upload screenshots</span>{" "}
          or drag & drop
        </p>
        <p className="text-xs text-gray-400">PNG, JPG, WEBP — multiple files OK</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => { if (e.target.files) processFiles(e.target.files); }}
        />
      </div>

      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img, i) => (
            <div
              key={i}
              className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-700"
            >
              <ImageIcon className="h-3.5 w-3.5 text-gray-400" />
              <span className="max-w-[120px] truncate">{img.name}</span>
              <button
                onClick={() => remove(i)}
                className="ml-1 text-gray-400 hover:text-red-500"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
