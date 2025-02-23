import React from 'react';
import { FileIcon, ImageIcon } from 'lucide-react';

interface Props {
  file: File | undefined;
  previewUrl: string | undefined;
}

export function FilePreview({ file, previewUrl }: Props) {
  if (!file) return null;

  const isImage = file.type.startsWith('image/');

  return (
    <div className="mt-2">
      {isImage && previewUrl ? (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-full h-32 object-cover rounded-md"
        />
      ) : (
        <div className="flex items-center gap-2 text-gray-600">
          {isImage ? <ImageIcon className="h-5 w-5" /> : <FileIcon className="h-5 w-5" />}
          <span>{file.name}</span>
        </div>
      )}
    </div>
  );
}