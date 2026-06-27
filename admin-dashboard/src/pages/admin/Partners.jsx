import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import usePartnerStore from "../../stores/usePartnerStore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUpload from "../../components/ui/ImageUpload";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const EMPTY = { name: "", websiteUrl: "", order: 0 };

export default function Partners() {
  const { partners, loading, fetchPartners, createPartner, updatePartner, deletePartner } = usePartnerStore();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [logoFile, setLogoFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchPartners(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setLogoFile(null); setModal(true); };
  const openEdit   = (p) => { setEditing(p); setForm(p); setLogoFile(null); setModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("websiteUrl", form.websiteUrl || "");
    fd.append("order", form.order || 0);
    if (logoFile) fd.append("logo", logoFile);
    const ok = editing ? await updatePartner(editing._id, fd) : await createPartner(fd);
    if (ok) setModal(false);
  };

  return (
    <div>
      <PageHeader title="Partners" subtitle={`${partners.length} partners`} action={
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Add Partner</button>
      } />

      {loading && !partners.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {partners.map((p) => (
            <div key={p._id} className="card p-4 flex flex-col items-center gap-3 hover:border-[#2e3344] transition-colors">
              <img src={p.logo?.url} alt={p.name} className="w-16 h-16 object-contain" />
              <p className="text-sm font-semibold text-white text-center truncate w-full">{p.name}</p>
              {p.websiteUrl && (
                <a href={p.websiteUrl} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300">
                  <ExternalLink size={14} />
                </a>
              )}
              <div className="flex gap-2 w-full">
                <button onClick={() => openEdit(p)} className="btn-secondary flex-1 justify-center p-1.5 text-xs"><Pencil size={12} /></button>
                <button onClick={() => setDeleteId(p._id)} className="btn-danger flex-1 justify-center p-1.5 text-xs"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Partner" : "Add Partner"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload label="Partner Logo" value={editing?.logo?.url} onChange={setLogoFile} />
          <div>
            <label className="label">Partner Name *</label>
            <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Website URL</label>
            <input className="input" value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} placeholder="https://..." />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <Spinner size={16} /> : null}
              {editing ? "Update" : "Add Partner"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deletePartner(deleteId); setDeleteId(null); }}
        title="Delete Partner?" message="This will permanently delete the partner and logo." />
    </div>
  );
}
