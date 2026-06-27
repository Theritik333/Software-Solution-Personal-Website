import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import useProjectStore from "../../stores/useProjectStore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUpload from "../../components/ui/ImageUpload";
import TagInput from "../../components/ui/TagInput";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const EMPTY = { title: "", category: "", description: "", keyFeatures: [], technologies: [], liveUrl: "", githubUrl: "", order: 0 };

export default function Projects() {
  const { projects, total, loading, fetchProjects, createProject, updateProject, deleteProject } = useProjectStore();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imageFile, setImageFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => { fetchProjects(page); }, [page]);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setImageFile(null); setModal(true); };
  const openEdit   = (p) => { setEditing(p); setForm({ ...p, keyFeatures: p.keyFeatures || [], technologies: p.technologies || [] }); setImageFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => {
      if (Array.isArray(v)) fd.append(k, JSON.stringify(v));
      else fd.append(k, v);
    });
    if (imageFile) fd.append("image", imageFile);
    const ok = editing ? await updateProject(editing._id, fd) : await createProject(fd);
    if (ok) setModal(false);
  };

  return (
    <div>
      <PageHeader title="Projects" subtitle={`${total} total`} action={
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Add Project</button>
      } />

      {loading && !projects.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p._id} className="card overflow-hidden hover:border-[#2e3344] transition-colors">
              <div className="aspect-video bg-[#0d0f14] overflow-hidden">
                <img src={p.image?.url} alt={p.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="badge-indigo">{p.category}</span>
                  <span className={p.isVisible ? "badge-green" : "badge-red"}>
                    {p.isVisible ? <Eye size={10} /> : <EyeOff size={10} />}
                    {p.isVisible ? "Visible" : "Hidden"}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white mt-2 truncate">{p.title}</h3>
                <p className="text-slate-500 text-sm line-clamp-2 mt-1">{p.description}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => openEdit(p)} className="btn-secondary flex-1 justify-center"><Pencil size={14} /> Edit</button>
                  <button onClick={() => setDeleteId(p._id)} className="btn-danger px-3"><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {total > 10 && (
        <div className="flex gap-2 justify-center mt-6">
          {Array.from({ length: Math.ceil(total / 10) }, (_, i) => i + 1).map((n) => (
            <button key={n} onClick={() => setPage(n)}
              className={n === page ? "btn-primary px-3 py-1.5 text-xs" : "btn-secondary px-3 py-1.5 text-xs"}>
              {n}
            </button>
          ))}
        </div>
      )}

      {/* Create / Edit Modal */}
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Project" : "Add Project"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload label="Project Image" value={editing?.image?.url} onChange={setImageFile} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Title *</label>
              <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="label">Category *</label>
              <input required className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Web App, Mobile, etc." />
            </div>
          </div>
          <div>
            <label className="label">Description *</label>
            <textarea required rows={3} className="input resize-none" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <TagInput label="Key Features" value={form.keyFeatures} onChange={(v) => setForm({ ...form, keyFeatures: v })} placeholder="Add feature..." />
          <TagInput label="Technologies" value={form.technologies} onChange={(v) => setForm({ ...form, technologies: v })} placeholder="React, Node.js..." />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Live URL</label>
              <input className="input" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
            </div>
            <div>
              <label className="label">GitHub URL</label>
              <input className="input" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="label mb-0">Visible on website</label>
            <input type="checkbox" checked={form.isVisible ?? true} onChange={(e) => setForm({ ...form, isVisible: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <Spinner size={16} /> : null}
              {editing ? "Update Project" : "Create Project"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteProject(deleteId); setDeleteId(null); }}
        title="Delete Project?" message="This will permanently delete the project and its image."
      />
    </div>
  );
}
