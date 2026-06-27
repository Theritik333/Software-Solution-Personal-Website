import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import useServiceStore from "../../stores/useServiceStore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUpload from "../../components/ui/ImageUpload";
import TagInput from "../../components/ui/TagInput";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const EMPTY = { title: "", description: "", points: [], order: 0 };

export default function Services() {
  const { services, loading, fetchServices, createService, updateService, deleteService } = useServiceStore();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [iconFile, setIconFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchServices(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setIconFile(null); setModal(true); };
  const openEdit   = (s) => { setEditing(s); setForm({ ...s, points: s.points || [] }); setIconFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("points", JSON.stringify(form.points));
    fd.append("order", form.order || 0);
    if (iconFile) fd.append("icon", iconFile);
    const ok = editing ? await updateService(editing._id, fd) : await createService(fd);
    if (ok) setModal(false);
  };

  return (
    <div>
      <PageHeader title="Services" subtitle={`${services.length} services`} action={
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Add Service</button>
      } />

      {loading && !services.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s._id} className="card p-5 hover:border-[#2e3344] transition-colors">
              <div className="flex items-start gap-4 mb-3">
                <img src={s.icon?.url} alt={s.title} className="w-12 h-12 object-contain" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-bold text-white truncate">{s.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mt-0.5">{s.description}</p>
                </div>
              </div>
              {s.points?.length > 0 && (
                <ul className="space-y-1 mb-4">
                  {s.points.slice(0, 3).map((pt, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-400 flex-shrink-0" />{pt}
                    </li>
                  ))}
                  {s.points.length > 3 && <li className="text-xs text-slate-600">+{s.points.length - 3} more</li>}
                </ul>
              )}
              <div className="flex gap-2">
                <button onClick={() => openEdit(s)} className="btn-secondary flex-1 justify-center"><Pencil size={14} /> Edit</button>
                <button onClick={() => setDeleteId(s._id)} className="btn-danger px-3"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Service" : "Add Service"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload label="Service Icon" value={editing?.icon?.url} onChange={setIconFile} />
          <div>
            <label className="label">Title *</label>
            <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="label">Description *</label>
            <textarea required rows={3} className="input resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <TagInput label="Bullet Points" value={form.points} onChange={(v) => setForm({ ...form, points: v })} placeholder="Add bullet point..." />
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <Spinner size={16} /> : null}
              {editing ? "Update Service" : "Create Service"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteService(deleteId); setDeleteId(null); }}
        title="Delete Service?" message="This will permanently delete this service." />
    </div>
  );
}
