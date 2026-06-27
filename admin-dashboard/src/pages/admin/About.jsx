// import { useEffect, useState } from "react";
// import useAboutStore from "../../stores/useAboutStore";
// import ImageUpload from "../../components/ui/ImageUpload";
// import PageHeader from "../../components/ui/PageHeader";
// import Spinner from "../../components/ui/Spinner";
// import { Save, Plus, Trash2 } from "lucide-react";

// export default function About() {
//   const { about, loading, fetchAbout, updateAbout } = useAboutStore();
//   const [form, setForm] = useState({ title: "", description: "", mission: "", vision: "", stats: [] });
//   const [imgFile, setImgFile] = useState(null);
//   const [saving, setSaving] = useState(false);

//   useEffect(() => { fetchAbout(); }, []);
//   useEffect(() => { if (about) setForm({ title: about.title || "", description: about.description || "", mission: about.mission || "", vision: about.vision || "", stats: about.stats || [] }); }, [about]);

//   const addStat = () => setForm({ ...form, stats: [...form.stats, { label: "", value: "" }] });
//   const removeStat = (i) => setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) });
//   const updateStat = (i, key, val) => setForm({ ...form, stats: form.stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s) });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     const fd = new FormData();
//     fd.append("title", form.title);
//     fd.append("description", form.description);
//     fd.append("mission", form.mission);
//     fd.append("vision", form.vision);
//     fd.append("stats", JSON.stringify(form.stats));
//     if (imgFile) fd.append("image", imgFile);
//     await updateAbout(fd);
//     setSaving(false);
//   };

//   if (loading && !about) return <div className="flex justify-center py-20"><Spinner size={32} /></div>;

//   return (
//     <div>
//       <PageHeader title="About" subtitle="Manage your about page content" />
//       <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
//         <div className="card p-6 space-y-4">
//           <ImageUpload label="About Image" value={about?.image?.url} onChange={setImgFile} />
//           <div>
//             <label className="label">Title *</label>
//             <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
//           </div>
//           <div>
//             <label className="label">Description *</label>
//             <textarea required rows={5} className="input resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="label">Mission</label>
//               <textarea rows={3} className="input resize-none" value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} />
//             </div>
//             <div>
//               <label className="label">Vision</label>
//               <textarea rows={3} className="input resize-none" value={form.vision} onChange={(e) => setForm({ ...form, vision: e.target.value })} />
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="card p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-display font-bold text-white">Stats / Achievements</h3>
//             <button type="button" onClick={addStat} className="btn-secondary text-xs py-1.5"><Plus size={13} /> Add Stat</button>
//           </div>
//           <div className="space-y-3">
//             {form.stats.map((s, i) => (
//               <div key={i} className="flex gap-3 items-center">
//                 <input className="input" placeholder="Label (e.g. Projects Done)" value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} />
//                 <input className="input w-32" placeholder="Value (e.g. 200+)" value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} />
//                 <button type="button" onClick={() => removeStat(i)} className="btn-danger p-2"><Trash2 size={14} /></button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <button type="submit" disabled={saving} className="btn-primary">
//           {saving ? <Spinner size={16} /> : <Save size={16} />}
//           {saving ? "Saving..." : "Save About"}
//         </button>
//       </form>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Save, Eye, EyeOff } from "lucide-react";
import useAboutStore from "../../stores/useAboutStore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUpload from "../../components/ui/ImageUpload";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const EMPTY = {
  title: "", description: "", mission: "", vision: "",
  stats: [], isVisible: true, order: 0,
};

export default function About() {
  const { abouts, loading, fetchAbout, createAbout, updateAbout, deleteAbout } = useAboutStore();
  const [modal, setModal]     = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm]       = useState(EMPTY);
  const [imgFile, setImgFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchAbout(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setImgFile(null); setModal(true); };
  const openEdit   = (a) => {
    setEditing(a);
    setForm({ ...a, stats: a.stats || [] });
    setImgFile(null);
    setModal(true);
  };

  const addStat    = () => setForm({ ...form, stats: [...form.stats, { label: "", value: "" }] });
  const removeStat = (i) => setForm({ ...form, stats: form.stats.filter((_, idx) => idx !== i) });
  const updateStat = (i, key, val) =>
    setForm({ ...form, stats: form.stats.map((s, idx) => idx === i ? { ...s, [key]: val } : s) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title",       form.title);
    fd.append("description", form.description);
    fd.append("mission",     form.mission  || "");
    fd.append("vision",      form.vision   || "");
    fd.append("isVisible",   form.isVisible);
    fd.append("order",       form.order    || 0);
    fd.append("stats",       JSON.stringify(form.stats));
    if (imgFile) fd.append("image", imgFile);

    const ok = editing
      ? await updateAbout(editing._id, fd)
      : await createAbout(fd);
    if (ok) setModal(false);
  };

  return (
    <div>
      <PageHeader
        title="About Sections"
        subtitle={`${abouts.length} section${abouts.length !== 1 ? "s" : ""}`}
        action={
          <button onClick={openCreate} className="btn-primary">
            <Plus size={16} /> Add Section
          </button>
        }
      />

      {loading && !abouts.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : abouts.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-slate-500 mb-4">No about sections yet.</p>
          <button onClick={openCreate} className="btn-primary mx-auto">
            <Plus size={16} /> Add First Section
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {abouts.map((a) => (
            <div key={a._id} className="card p-5 hover:border-[#2e3344] transition-colors">
              <div className="flex items-start gap-5">
                {/* Image */}
                {a.image?.url && (
                  <img
                    src={a.image.url} alt={a.title}
                    className="w-24 h-24 rounded-xl object-cover flex-shrink-0 border border-[#252936]"
                  />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <h3 className="font-display font-bold text-white text-lg">{a.title}</h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={a.isVisible ? "badge-green" : "badge-red"}>
                        {a.isVisible ? <Eye size={10} /> : <EyeOff size={10} />}
                        {a.isVisible ? "Visible" : "Hidden"}
                      </span>
                      <span className="badge-indigo">Order: {a.order}</span>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm line-clamp-2 mb-3">{a.description}</p>

                  {/* Stats */}
                  {a.stats?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {a.stats.map((s, i) => (
                        <div key={i} className="bg-[#0d0f14] border border-[#252936] rounded-lg px-3 py-1 text-center">
                          <p className="text-white font-bold text-sm">{s.value}</p>
                          <p className="text-slate-500 text-xs">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Mission / Vision chips */}
                  <div className="flex gap-2">
                    {a.mission && <span className="badge-cyan">Has Mission</span>}
                    {a.vision  && <span className="badge-amber">Has Vision</span>}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <button onClick={() => openEdit(a)} className="btn-secondary">
                    <Pencil size={14} /> Edit
                  </button>
                  <button onClick={() => setDeleteId(a._id)} className="btn-danger">
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? "Edit About Section" : "Add About Section"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload
            label="Section Image"
            value={editing?.image?.url}
            onChange={setImgFile}
          />

          <div>
            <label className="label">Title *</label>
            <input
              required className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Who We Are"
            />
          </div>

          <div>
            <label className="label">Description *</label>
            <textarea
              required rows={4} className="input resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Brief description about this section..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Mission</label>
              <textarea
                rows={3} className="input resize-none"
                value={form.mission}
                onChange={(e) => setForm({ ...form, mission: e.target.value })}
                placeholder="Our mission statement..."
              />
            </div>
            <div>
              <label className="label">Vision</label>
              <textarea
                rows={3} className="input resize-none"
                value={form.vision}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                placeholder="Our vision statement..."
              />
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="label mb-0">Stats / Achievements</label>
              <button type="button" onClick={addStat} className="btn-secondary text-xs py-1 px-2">
                <Plus size={12} /> Add Stat
              </button>
            </div>
            {form.stats.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className="input"
                  placeholder="Label (e.g. Projects Done)"
                  value={s.label}
                  onChange={(e) => updateStat(i, "label", e.target.value)}
                />
                <input
                  className="input w-32"
                  placeholder="Value (200+)"
                  value={s.value}
                  onChange={(e) => updateStat(i, "value", e.target.value)}
                />
                <button type="button" onClick={() => removeStat(i)} className="btn-danger p-2 flex-shrink-0">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Display Order</label>
              <input
                type="number" className="input"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                id="isVisible"
                checked={form.isVisible}
                onChange={(e) => setForm({ ...form, isVisible: e.target.checked })}
                className="w-4 h-4 accent-indigo-600"
              />
              <label htmlFor="isVisible" className="label mb-0 cursor-pointer">
                Visible on website
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <Spinner size={16} /> : <Save size={16} />}
              {editing ? "Update Section" : "Create Section"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteAbout(deleteId); setDeleteId(null); }}
        title="Delete About Section?"
        message="This will permanently delete this section and its image."
      />
    </div>
  );
}
