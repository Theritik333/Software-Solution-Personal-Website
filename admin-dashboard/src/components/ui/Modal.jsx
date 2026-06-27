// import { X } from "lucide-react";
// import { useEffect } from "react";

// export default function Modal({ open, onClose, title, children, size = "md" }) {
//   useEffect(() => {
//     if (open) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "";
//     return () => { document.body.style.overflow = ""; };
//   }, [open]);

//   if (!open) return null;

//   const sizes = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl", xl: "max-w-5xl" };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
//       <div className={`relative w-full ${sizes[size]} bg-[#13161d] border border-[#252936] rounded-2xl shadow-2xl animate-fade-in max-h-[90vh] flex flex-col`}>
//         <div className="flex items-center justify-between px-6 py-4 border-b border-[#252936]">
//           <h3 className="font-display text-lg font-bold text-white">{title}</h3>
//           <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[#1a1e28] text-slate-400 hover:text-white transition-colors">
//             <X size={18} />
//           </button>
//         </div>
//         <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
//       </div>
//     </div>
//   );
// }


import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ open, onClose, title, children, size = "md" }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const sizes = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ padding: "1rem" }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box — always centered */}
      <div
        className={`
          relative w-full ${sizes[size]}
          bg-[#13161d] border border-[#252936]
          rounded-2xl shadow-2xl
          flex flex-col
          animate-fade-in
        `}
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252936] flex-shrink-0">
          <h3 className="font-display text-lg font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#1a1e28] text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
