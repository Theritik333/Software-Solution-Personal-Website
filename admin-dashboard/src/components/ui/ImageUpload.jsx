import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";

export default function ImageUpload({ value, onChange, label = "Image", accept = { "image/*": [] } }) {
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((accepted) => {
    const file = accepted[0];
    if (!file) return;
    onChange(file);
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024,
  });

  const displaySrc = preview || value;

  const clear = (e) => {
    e.stopPropagation();
    setPreview(null);
    onChange(null);
  };

  return (
    <div>
      <label className="label">{label}</label>
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
          isDragActive ? "border-indigo-500 bg-indigo-500/5" : "border-[#252936] hover:border-[#2e3344]"
        }`}
      >
        <input {...getInputProps()} />
        {displaySrc ? (
          <div className="relative h-40 flex items-center justify-center">
            <img src={displaySrc} alt="preview" className="h-full w-full object-contain rounded-xl p-2" />
            <button type="button" onClick={clear} className="absolute top-2 right-2 bg-red-600 rounded-full p-1">
              <X size={12} className="text-white" />
            </button>
          </div>
        ) : (
          <div className="h-32 flex flex-col items-center justify-center gap-2 text-slate-500">
            <UploadCloud size={28} />
            <p className="text-xs">{isDragActive ? "Drop here" : "Drag & drop or click to upload"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
