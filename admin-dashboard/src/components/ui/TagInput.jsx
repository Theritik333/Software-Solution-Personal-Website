import { useState } from "react";
import { X, Plus } from "lucide-react";

export default function TagInput({ label, value = [], onChange, placeholder = "Add item..." }) {
  const [input, setInput] = useState("");

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput("");
  };

  const remove = (idx) => onChange(value.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
          className="input flex-1"
          placeholder={placeholder}
        />
        <button type="button" onClick={add} className="btn-secondary px-3">
          <Plus size={16} />
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {value.map((tag, i) => (
          <span key={i} className="badge-indigo gap-1">
            {tag}
            <button type="button" onClick={() => remove(i)}><X size={10} /></button>
          </span>
        ))}
      </div>
    </div>
  );
}
