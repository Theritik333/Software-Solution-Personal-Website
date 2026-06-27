import { useEffect, useState } from "react";
import { Trash2, Eye, Download, ExternalLink } from "lucide-react";
import useApplyStore from "../../stores/useApplyStore";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import { format } from "date-fns";

const STATUSES = ["all", "pending", "reviewed", "shortlisted", "rejected"];
const STATUS_BADGE = {
  pending:     "badge-amber",
  reviewed:    "badge-cyan",
  shortlisted: "badge-green",
  rejected:    "badge-red",
};

export default function Apply() {
  const { applications, total, unread, loading, fetchApplications, updateStatus, deleteApplication, exportToExcel, page, statusFilter } = useApplyStore();
  const [deleteId, setDeleteId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => { fetchApplications(1, "all"); }, []);

  const handleExport = async () => {
    setExporting(true);
    await exportToExcel();
    setExporting(false);
  };

  return (
    <div>
      <PageHeader
        title="Apply Now Queries"
        subtitle={`${total} total · ${unread} unread`}
        action={
          <button onClick={handleExport} disabled={exporting} className="btn-secondary">
            <Download size={16} /> {exporting ? "Exporting..." : "Export Excel"}
          </button>
        }
      />

      {/* Status filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {STATUSES.map((s) => (
          <button key={s} onClick={() => fetchApplications(1, s)}
            className={statusFilter === s ? "btn-primary text-xs py-1.5 px-3" : "btn-secondary text-xs py-1.5 px-3"}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>

      {loading && !applications.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#252936]">
                  {["Applicant", "Email", "Phone", "Role", "Applied On", "Status", "Resume", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs text-slate-500 font-medium uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {applications.map((a) => (
                  <tr key={a._id} className={`border-b border-[#1a1e28] hover:bg-[#1a1e28]/50 transition-colors ${!a.isRead ? "bg-indigo-600/3" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!a.isRead && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />}
                        <span className={`font-medium ${!a.isRead ? "text-white" : "text-slate-300"}`}>{a.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{a.email}</td>
                    <td className="px-4 py-3 text-slate-400">{a.number}</td>
                    <td className="px-4 py-3 text-slate-300">{a.applyingFor || "—"}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{format(new Date(a.createdAt), "dd MMM yyyy")}</td>
                    <td className="px-4 py-3">
                      <select
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border bg-transparent cursor-pointer outline-none ${STATUS_BADGE[a.status]}`}
                      >
                        {["pending","reviewed","shortlisted","rejected"].map((s) => (
                          <option key={s} value={s} className="bg-[#13161d] text-slate-100">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <a href={a.resume?.url} target="_blank" rel="noreferrer" className="btn-secondary p-1.5 text-xs inline-flex">
                        <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => setViewing(a)} className="btn-secondary p-1.5"><Eye size={14} /></button>
                        <button onClick={() => setDeleteId(a._id)} className="btn-danger p-1.5"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {total > 15 && (
            <div className="flex gap-2 p-4 justify-center border-t border-[#252936]">
              {Array.from({ length: Math.ceil(total / 15) }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => fetchApplications(n, statusFilter)}
                  className={n === page ? "btn-primary px-3 py-1 text-xs" : "btn-secondary px-3 py-1 text-xs"}>{n}</button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View Detail Modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Application Detail" size="md">
        {viewing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="label">Name</p><p className="text-white">{viewing.name}</p></div>
              <div><p className="label">Email</p><p className="text-white">{viewing.email}</p></div>
              <div><p className="label">Phone</p><p className="text-white">{viewing.number}</p></div>
              <div><p className="label">Applying For</p><p className="text-white">{viewing.applyingFor || "—"}</p></div>
              <div><p className="label">Status</p><span className={STATUS_BADGE[viewing.status]}>{viewing.status}</span></div>
              <div><p className="label">Applied On</p><p className="text-white">{format(new Date(viewing.createdAt), "dd MMM yyyy, hh:mm a")}</p></div>
            </div>
            {viewing.message && (
              <div>
                <p className="label">Message</p>
                <div className="bg-[#0d0f14] border border-[#252936] rounded-lg p-4 text-slate-300 text-sm">{viewing.message}</div>
              </div>
            )}
            <a href={viewing.resume?.url} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center">
              <ExternalLink size={15} /> View Resume
            </a>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteApplication(deleteId); setDeleteId(null); }}
        title="Delete Application?" message="This will permanently delete this application and resume." />
    </div>
  );
}
