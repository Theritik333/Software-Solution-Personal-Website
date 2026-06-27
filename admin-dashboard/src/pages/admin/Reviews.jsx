import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import useReviewStore from "../../stores/useReviewStore";
import Modal from "../../components/ui/Modal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ImageUpload from "../../components/ui/ImageUpload";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

const EMPTY = { name: "", rating: 5, text: "", designation: "", company: "" };

export default function Reviews() {
  const { reviews, loading, fetchReviews, createReview, updateReview, deleteReview } = useReviewStore();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [imgFile, setImgFile] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { fetchReviews(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setImgFile(null); setModal(true); };
  // const openEdit   = (r) => { setEditing(r); setForm(r); setImgFile(null); setModal(true); };

  const openEdit = (r) => {
  setEditing(r);

  setForm({
    name: r.name,
    rating: r.rating,
    text: r.text,
    designation: r.designation,
    company: r.company,
  });

  setImgFile(null);
  setModal(true);
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imgFile) fd.append("roundImage", imgFile);
    const ok = editing ? await updateReview(editing._id, fd) : await createReview(fd);
    if (ok) setModal(false);
  };

  return (
    <div>
      <PageHeader title="Client Reviews" subtitle={`${reviews.length} reviews`} action={
        <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Add Review</button>
      } />

      {loading && !reviews.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r._id} className="card p-5 hover:border-[#2e3344] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <img src={r.roundImage?.url} alt={r.name} className="w-12 h-12 rounded-full object-cover border border-[#252936]" />
                <div>
                  <p className="font-semibold text-white text-sm">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.designation}{r.company ? ` · ${r.company}` : ""}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1,2,3,4,5].map((s) => <Star key={s} size={11} className={s <= r.rating ? "text-amber-400 fill-amber-400" : "text-slate-600"} />)}
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm line-clamp-4">{r.text}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(r)} className="btn-secondary flex-1 justify-center"><Pencil size={14} /> Edit</button>
                <button onClick={() => setDeleteId(r._id)} className="btn-danger px-3"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Review" : "Add Review"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ImageUpload label="Round Profile Image" value={editing?.roundImage?.url} onChange={setImgFile} />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Name *</label>
              <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label">Rating *</label>
              <select required className="input" value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>
                {[5,4,3,2,1].map((n) => <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Designation</label>
              <input className="input" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
            </div>
            <div>
              <label className="label">Company</label>
              <input className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Review Text * (100–500 words)</label>
            <textarea required rows={5} className="input resize-none" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <Spinner size={16} /> : null}
              {editing ? "Update Review" : "Add Review"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteReview(deleteId); setDeleteId(null); }}
        title="Delete Review?" message="This will permanently delete this review." />
    </div>
  );
}
