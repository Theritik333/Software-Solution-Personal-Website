// import { useEffect, useState } from "react";
// import { Plus, Pencil, Trash2, MapPin, Briefcase } from "lucide-react";
// import useCareerStore from "../../stores/useCareerStore";
// import Modal from "../../components/ui/Modal";
// import ConfirmDialog from "../../components/ui/ConfirmDialog";
// import TagInput from "../../components/ui/TagInput";
// import PageHeader from "../../components/ui/PageHeader";
// import Spinner from "../../components/ui/Spinner";

// const EMPTY = { role: "", location: "", jobDescription: "", requirements: [], mustHaveSkills: [], jobType: "full-time", experienceLevel: "junior", salary: "", isActive: true };

// const JOB_TYPES = ["full-time", "part-time", "contract", "internship", "remote"];
// const EXP_LEVELS = ["fresher", "junior", "mid", "senior"];

// export default function Careers() {
//   const { careers, loading, fetchCareers, createCareer, updateCareer, deleteCareer } = useCareerStore();
//   const [modal, setModal] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState(EMPTY);
//   const [deleteId, setDeleteId] = useState(null);

//   useEffect(() => { fetchCareers(); }, []);

//   const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true); };
//   const openEdit   = (c) => { setEditing(c); setForm({ ...c, requirements: c.requirements || [], mustHaveSkills: c.mustHaveSkills || [] }); setModal(true); };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const ok = editing ? await updateCareer(editing._id, form) : await createCareer(form);
//     if (ok) setModal(false);
//   };

//   const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

//   return (
//     <div>
//       <PageHeader title="Careers" subtitle={`${careers.length} job posts`} action={
//         <button onClick={openCreate} className="btn-primary"><Plus size={16} /> Post Job</button>
//       } />

//       {loading && !careers.length ? (
//         <div className="flex justify-center py-20"><Spinner size={32} /></div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {careers.map((c) => (
//             <div key={c._id} className="card p-5 hover:border-[#2e3344] transition-colors">
//               <div className="flex items-start justify-between mb-3">
//                 <div>
//                   <h3 className="font-display font-bold text-white text-lg">{c.role}</h3>
//                   <div className="flex items-center gap-3 mt-1">
//                     <span className="flex items-center gap-1 text-xs text-slate-500"><MapPin size={11} />{c.location}</span>
//                     <span className="flex items-center gap-1 text-xs text-slate-500"><Briefcase size={11} />{c.jobType}</span>
//                   </div>
//                 </div>
//                 <span className={c.isActive ? "badge-green" : "badge-red"}>{c.isActive ? "Active" : "Closed"}</span>
//               </div>

//               <p className="text-slate-400 text-sm line-clamp-2 mb-3">{c.jobDescription}</p>

//               <div className="flex flex-wrap gap-1 mb-3">
//                 {c.mustHaveSkills?.slice(0, 4).map((s, i) => <span key={i} className="badge-indigo">{s}</span>)}
//                 {c.mustHaveSkills?.length > 4 && <span className="badge-indigo">+{c.mustHaveSkills.length - 4}</span>}
//               </div>

//               <div className="flex items-center justify-between">
//                 {c.salary && <span className="text-green-400 text-sm font-medium">{c.salary}</span>}
//                 <div className="flex gap-2 ml-auto">
//                   <button onClick={() => openEdit(c)} className="btn-secondary"><Pencil size={14} /> Edit</button>
//                   <button onClick={() => setDeleteId(c._id)} className="btn-danger px-3"><Trash2 size={14} /></button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Job" : "Post Job"} size="lg">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="label">Role *</label>
//               <input required className="input" value={form.role} onChange={f("role")} placeholder="Frontend Developer" />
//             </div>
//             <div>
//               <label className="label">Location *</label>
//               <input required className="input" value={form.location} onChange={f("location")} placeholder="Delhi, Remote, etc." />
//             </div>
//           </div>

//           <div className="grid grid-cols-3 gap-4">
//             <div>
//               <label className="label">Job Type</label>
//               <select className="input" value={form.jobType} onChange={f("jobType")}>
//                 {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="label">Experience</label>
//               <select className="input" value={form.experienceLevel} onChange={f("experienceLevel")}>
//                 {EXP_LEVELS.map((l) => <option key={l}>{l}</option>)}
//               </select>
//             </div>
//             <div>
//               <label className="label">Salary</label>
//               <input className="input" value={form.salary} onChange={f("salary")} placeholder="5-8 LPA" />
//             </div>
//           </div>

//           <div>
//             <label className="label">Job Description *</label>
//             <textarea required rows={4} className="input resize-none" value={form.jobDescription} onChange={f("jobDescription")} />
//           </div>

//           <TagInput label="Requirements" value={form.requirements} onChange={(v) => setForm({ ...form, requirements: v })} placeholder="Add requirement..." />
//           <TagInput label="Must Have Skills" value={form.mustHaveSkills} onChange={(v) => setForm({ ...form, mustHaveSkills: v })} placeholder="React, Node.js..." />

//           <div className="flex items-center gap-3">
//             <label className="label mb-0">Active (visible on website)</label>
//             <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
//           </div>

//           <div className="flex gap-3 pt-2">
//             <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
//             <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
//               {loading ? <Spinner size={16} /> : null}
//               {editing ? "Update Job" : "Post Job"}
//             </button>
//           </div>
//         </form>
//       </Modal>

//       <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
//         onConfirm={async () => { await deleteCareer(deleteId); setDeleteId(null); }}
//         title="Delete Job Post?" message="This will permanently delete this career listing." />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  Plus, Pencil, Trash2, MapPin, Briefcase,
  DollarSign, Users, Eye, EyeOff, CalendarDays,
  ChevronDown, ChevronUp, Search, FileText, X,
} from "lucide-react";
import useCareerStore from "../../stores/useCareerStore";
import useApplyStore  from "../../stores/useApplyStore";
import Modal          from "../../components/ui/Modal";
import ConfirmDialog  from "../../components/ui/ConfirmDialog";
import TagInput       from "../../components/ui/TagInput";
import PageHeader     from "../../components/ui/PageHeader";
import Spinner        from "../../components/ui/Spinner";

const EMPTY = {
  role: "", location: "", jobDescription: "",
  requirements: [], mustHaveSkills: [],
  jobType: "full-time", experienceLevel: "junior",
  salary: "", isActive: true, lastDate: "",
};

const JOB_TYPES  = ["full-time", "part-time", "contract", "internship", "remote"];
const EXP_LEVELS = ["fresher", "junior", "mid", "senior"];

const TYPE_COLOR = {
  "full-time":  "badge-green",
  "part-time":  "badge-amber",
  "contract":   "badge-cyan",
  "internship": "badge-indigo",
  "remote":     "badge-indigo",
};
const EXP_COLOR = {
  fresher: "badge-cyan", junior: "badge-indigo",
  mid: "badge-amber",    senior: "badge-green",
};

// ── Applications mini modal for one career ──────────────────────────────────
function CareerApplicationsModal({ career, onClose }) {
  const { applications, loading, fetchApplications, updateStatus, deleteApplication } = useApplyStore();

  useEffect(() => {
    fetchApplications(1, "all", career._id);
  }, [career._id]);

  const STATUS_BADGE = {
    pending:     "badge-amber",
    reviewed:    "badge-cyan",
    shortlisted: "badge-green",
    rejected:    "badge-red",
  };

  return (
    <Modal open={true} onClose={onClose} title={`Applications — ${career.role}`} size="xl">
      {loading ? (
        <div className="flex justify-center py-10"><Spinner size={28} /></div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12">
          <FileText size={36} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">No applications yet for this role.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-slate-400 text-sm mb-4">{applications.length} applicant{applications.length !== 1 ? "s" : ""}</p>
          {applications.map((a) => (
            <div key={a._id} className="bg-[#0d0f14] border border-[#252936] rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {!a.isRead && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />}
                    <p className="font-semibold text-white">{a.name}</p>
                  </div>
                  <p className="text-slate-400 text-xs">{a.email} · {a.number}</p>
                  {a.message && (
                    <p className="text-slate-500 text-xs mt-1 line-clamp-2">{a.message}</p>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {/* Status dropdown */}
                  <select
                    value={a.status}
                    onChange={(e) => updateStatus(a._id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full border bg-transparent cursor-pointer outline-none ${STATUS_BADGE[a.status]}`}
                  >
                    {["pending","reviewed","shortlisted","rejected"].map((s) => (
                      <option key={s} value={s} className="bg-[#13161d] text-slate-100">
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </option>
                    ))}
                  </select>

                  <div className="flex gap-2">
                    <a
                      href={a.resume?.url} target="_blank" rel="noreferrer"
                      className="btn-secondary py-1 px-2 text-xs"
                    >
                      <FileText size={12} /> Resume
                    </a>
                    <button
                      onClick={() => deleteApplication(a._id)}
                      className="btn-danger py-1 px-2 text-xs"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}

// ── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, appCount, onEdit, onDelete, onViewApps }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`card overflow-hidden transition-all hover:border-[#2e3344] ${!job.isActive ? "opacity-60" : ""}`}>
      <div className={`h-1 w-full ${job.isActive ? "bg-indigo-600" : "bg-slate-600"}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white text-lg leading-tight truncate">
              {job.role}
            </h3>
            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={11} /> {job.location}
              </span>
              {job.salary && (
                <span className="flex items-center gap-1 text-xs text-green-400 font-medium">
                  <DollarSign size={11} /> {job.salary}
                </span>
              )}
              {job.lastDate && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <CalendarDays size={11} /> Last date: {new Date(job.lastDate).toLocaleDateString("en-IN")}
                </span>
              )}
            </div>
          </div>
          <span className={job.isActive ? "badge-green" : "badge-red"}>
            {job.isActive ? <Eye size={10} /> : <EyeOff size={10} />}
            {job.isActive ? "Active" : "Closed"}
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={TYPE_COLOR[job.jobType] || "badge-indigo"}>
            <Briefcase size={10} /> {job.jobType}
          </span>
          <span className={EXP_COLOR[job.experienceLevel] || "badge-indigo"}>
            <Users size={10} /> {job.experienceLevel}
          </span>
        </div>

        {/* Description */}
        <p className={`text-slate-400 text-sm leading-relaxed mb-3 ${expanded ? "" : "line-clamp-2"}`}>
          {job.jobDescription}
        </p>

        {/* Skills */}
        {job.mustHaveSkills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {job.mustHaveSkills.slice(0, expanded ? 999 : 5).map((s, i) => (
              <span key={i} className="badge-indigo text-xs">{s}</span>
            ))}
            {!expanded && job.mustHaveSkills.length > 5 && (
              <span className="badge-indigo text-xs">+{job.mustHaveSkills.length - 5} more</span>
            )}
          </div>
        )}

        {/* Requirements (expanded) */}
        {expanded && job.requirements?.length > 0 && (
          <div className="mb-3 space-y-1.5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">Requirements</p>
            {job.requirements.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                {r}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1a1e28]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Show less" : "Show more"}
          </button>

          <div className="flex gap-2">
            {/* Applications count button */}
            <button
              onClick={() => onViewApps(job)}
              className="btn-secondary py-1.5 px-3 text-xs relative"
            >
              <FileText size={13} /> Applications
              {appCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] flex items-center justify-center font-bold">
                  {appCount > 9 ? "9+" : appCount}
                </span>
              )}
            </button>
            <button onClick={() => onEdit(job)} className="btn-secondary py-1.5 px-3 text-xs">
              <Pencil size={13} /> Edit
            </button>
            <button onClick={() => onDelete(job._id)} className="btn-danger py-1.5 px-3 text-xs">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Careers() {
  const { careers, loading, fetchCareers, createCareer, updateCareer, deleteCareer } = useCareerStore();
  const { applications, fetchApplications } = useApplyStore();

  const [modal, setModal]         = useState(false);
  const [editing, setEditing]     = useState(null);
  const [form, setForm]           = useState(EMPTY);
  const [deleteId, setDeleteId]   = useState(null);
  const [viewingCareer, setViewingCareer] = useState(null); // for applications modal
  const [search, setSearch]       = useState("");
  const [filterType, setFilterType]     = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    fetchCareers();
    // fetch all applications to count per career
    fetchApplications(1, "all");
  }, []);

  // Count applications per careerId
  const appCountMap = applications.reduce((acc, a) => {
    const id = a.careerId?._id || a.careerId;
    if (id) acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit   = (c) => {
    setEditing(c);
    setForm({
      ...c,
      requirements:   c.requirements   || [],
      mustHaveSkills: c.mustHaveSkills  || [],
      lastDate: c.lastDate ? new Date(c.lastDate).toISOString().split("T")[0] : "",
    });
    setModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      requirements:   form.requirements   || [],
      mustHaveSkills: form.mustHaveSkills  || [],
    };
    const ok = editing
      ? await updateCareer(editing._id, payload)
      : await createCareer(payload);
    if (ok) setModal(false);
  };

  const f = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  // Filters
  const filtered = careers.filter((c) => {
    const matchSearch = !search ||
      c.role.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchType   = filterType   === "all" || c.jobType === filterType;
    const matchStatus = filterStatus === "all" ||
      (filterStatus === "active" ? c.isActive : !c.isActive);
    return matchSearch && matchType && matchStatus;
  });

  const activeCount = careers.filter((c) => c.isActive).length;
  const totalApps   = applications.length;

  return (
    <div>
      <PageHeader
        title="Careers"
        subtitle={`${careers.length} posts · ${activeCount} active · ${totalApps} applications`}
        action={
          <button onClick={openCreate} className="btn-primary">
            <Plus size={16} /> Post Job
          </button>
        }
      />

      {/* Search + Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="input pl-9 py-2"
            placeholder="Search role or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input w-auto py-2" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="input w-auto py-2" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Posts",    value: careers.length,             color: "text-white" },
          { label: "Active",         value: activeCount,                color: "text-green-400" },
          { label: "Total Applied",  value: totalApps,                  color: "text-indigo-400" },
          { label: "Showing",        value: filtered.length,            color: "text-amber-400" },
        ].map((s) => (
          <div key={s.label} className="card px-4 py-3 flex items-center justify-between">
            <p className="text-slate-500 text-xs">{s.label}</p>
            <p className={`font-display font-bold text-xl ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Job Cards */}
      {loading && !careers.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Briefcase size={36} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500">
            {careers.length === 0 ? "No job posts yet." : "No results match your filter."}
          </p>
          {careers.length === 0 && (
            <button onClick={openCreate} className="btn-primary mx-auto mt-4">
              <Plus size={16} /> Post First Job
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((c) => (
            <JobCard
              key={c._id}
              job={c}
              appCount={appCountMap[c._id] || 0}
              onEdit={openEdit}
              onDelete={setDeleteId}
              onViewApps={setViewingCareer}
            />
          ))}
        </div>
      )}

      {/* ── Create / Edit Modal ── */}
      <Modal open={modal} onClose={() => setModal(false)} title={editing ? "Edit Job Post" : "Post New Job"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Role *</label>
              <input required className="input" value={form.role} onChange={f("role")} placeholder="Full Stack Developer" />
            </div>
            <div>
              <label className="label">Location *</label>
              <input required className="input" value={form.location} onChange={f("location")} placeholder="Noida, Remote, etc." />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Job Type</label>
              <select className="input" value={form.jobType} onChange={f("jobType")}>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Experience</label>
              <select className="input" value={form.experienceLevel} onChange={f("experienceLevel")}>
                {EXP_LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Salary</label>
              <input className="input" value={form.salary} onChange={f("salary")} placeholder="6-10 LPA" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Last Date to Apply</label>
              <input type="date" className="input" value={form.lastDate} onChange={f("lastDate")} />
            </div>
            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox" id="isActive"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 accent-indigo-600"
              />
              <label htmlFor="isActive" className="label mb-0 cursor-pointer">Active (visible on website)</label>
            </div>
          </div>

          <div>
            <label className="label">Job Description *</label>
            <textarea required rows={4} className="input resize-none" value={form.jobDescription} onChange={f("jobDescription")} placeholder="Describe the role and responsibilities..." />
          </div>

          <TagInput label="Requirements" value={form.requirements} onChange={(v) => setForm({ ...form, requirements: v })} placeholder="Add requirement and press Enter..." />
          <TagInput label="Must Have Skills" value={form.mustHaveSkills} onChange={(v) => setForm({ ...form, mustHaveSkills: v })} placeholder="React, Node.js..." />

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(false)} className="btn-secondary flex-1 justify-center">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
              {loading ? <Spinner size={16} /> : null}
              {editing ? "Update Job" : "Post Job"}
            </button>
          </div>
        </form>
      </Modal>

      {/* ── Applications Modal for specific career ── */}
      {viewingCareer && (
        <CareerApplicationsModal
          career={viewingCareer}
          onClose={() => setViewingCareer(null)}
        />
      )}

      <ConfirmDialog
        open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteCareer(deleteId); setDeleteId(null); }}
        title="Delete Job Post?" message="This will permanently delete this career listing." />
    </div>
  );
}

