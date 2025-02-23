import React, { useState } from 'react';
import { Upload, Lock, Eye, EyeOff } from 'lucide-react';
import type { CapsuleFormData } from '../types';
import { FilePreview } from './FilePreview';

interface Props {
  onSubmit: (data: CapsuleFormData) => void;
}

export function CapsuleForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<CapsuleFormData>({
    title: '',
    message: '',
    unlockDate: new Date(),
    password: '', // Initialize password
  });
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.password) {
      alert('Please set a password for your SamayCapsule');
      return;
    }
    onSubmit(formData);
    setFormData({ title: '', message: '', unlockDate: new Date(), password: '' });
    setPreviewUrl(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black-500 focus:ring-blue-500"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Message</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password for Protection</label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Set a strong password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">File</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                <span>Upload a file</span>
                <input
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
        <FilePreview file={formData.file} previewUrl={previewUrl} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Unlock Date</label>
        <input
          type="datetime-local"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          onChange={(e) => setFormData({ ...formData, unlockDate: new Date(e.target.value) })}
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Lock className="h-4 w-4" />
        Lock SamayCapsule
      </button>
    </form>
  );
}