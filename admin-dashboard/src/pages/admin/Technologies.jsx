import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import useTechnologyStore from "../../stores/useTechnologyStore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUpload from "../../components/ui/ImageUpload";
import TagInput from "../../components/ui/TagInput";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const CATS = ["frontend", "backend", "database", "devops", "mobile", "other"];
const EMPTY = { title: "", docsLink: "", category: "other", benefits: [], order: 0 };

export default function Technologies() {
  const { technologies, loading, fetchTechnologies, createTechnology, updateTechnology, deleteTechnology } = useTechnologyStore();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [iconFile, setIconFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchTechnologies(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setIconFile(null); setModal(true); };
  const openEdit   = (t) => { setEditing(t); setForm({ ...t, benefits: t.benefits || [] }); setIconFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("docsLink", form.docsLink || "");
    fd.append("order", form.order || 0);
    fd.append("benefits", JSON.stringify(form.benefits));
    if (iconFile) fd.append("icon", iconFile);
    const ok = editing ? await updateTechnology(editing._id, fd) : await createTechnology(fd);
    if (ok) setModal(false);
  };

  const catColor = { frontend: "badge-cyan", backend: "badge-green", database: "badge-amber", devops: "badge-red", mobile: "badge-indigo", other: "badge-indigo" };

  return (
    <div>
      <PageHeader title="Technologies" subtitle={`${technologies.length} technologies`} action={
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Add Technology</button>
      } />

      {loading && !technologies.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {technologies.map((t) => (
            <div key={t._id} className="card p-4 flex flex-col items-center gap-3 hover:border-[#2e3344] transition-colors text-center">
              <img src={t.icon?.url} alt={t.title} className="w-12 h-12 object-contain" />
              <div>
                <p className="text-sm font-semibold text-white">{t.title}</p>
                <span className={`${catColor[t.category]} mt-1`}>{t.category}</span>
              </div>
              {t.docsLink && (
                <a href={t.docsLink} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300">
                  <ExternalLink size={13} />
                </a>
              )}
              <div className="flex gap-2 w-full">
                <button onClick={() => openEdit(t)} className="btn-secondary flex-1 justify-center p-1.5 text-xs"><Pencil size={12} /></button>
                <button onClick={() => setDeleteId(t._id)} className="btn-danger flex-1 justify-center p-1.5 text-xs"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Technology" : "Add Technology"} size="md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload label="Technology Icon" value={editing?.icon?.url} onChange={setIconFile} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title *</label>
              <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="label">Category</label>
              <select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                {CATS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="label">Docs Link</label>
            <input className="input" value={form.docsLink} onChange={(e) => setForm({ ...form, docsLink: e.target.value })} placeholder="https://docs.example.com" />
          </div>
          <TagInput label="Benefits" value={form.benefits} onChange={(v) => setForm({ ...form, benefits: v })} placeholder="Add benefit..." />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <Spinner size={16} /> : null}
              {editing ? "Update" : "Add Technology"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteTechnology(deleteId); setDeleteId(null); }}
        title="Delete Technology?" message="This will permanently delete this technology." />
    </div>
  );
}
