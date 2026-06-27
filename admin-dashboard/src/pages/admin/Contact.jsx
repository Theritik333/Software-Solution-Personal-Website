import { useEffect, useState } from "react";
import { Trash2, Eye, Mail, Download, Filter } from "lucide-react";
import useContactStore from "../../stores/useContactStore";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import { format } from "date-fns";

const FILTERS = ["all", "unread", "read"];

export default function Contact() {
  const { contacts, total, unread, loading, fetchContacts, markAsRead, deleteContact, exportToExcel, page, filter } = useContactStore();
  const [deleteId, setDeleteId] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => { fetchContacts(1, "all"); }, []);

  const handleView = (c) => {
    setViewing(c);
    if (!c.isRead) markAsRead(c._id);
  };

  const handleExport = async () => {
    setExporting(true);
    await exportToExcel();
    setExporting(false);
  };

  return (
    <div>
      <PageHeader
        title="Contact Queries"
        subtitle={`${total} total · ${unread} unread`}
        action={
          <button onClick={handleExport} disabled={exporting} className="btn-secondary">
            <Download size={16} /> {exporting ? "Exporting..." : "Export Excel"}
          </button>
        }
      />

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => fetchContacts(1, f)}
            className={filter === f ? "btn-primary text-xs py-1.5 px-3" : "btn-secondary text-xs py-1.5 px-3"}>
            <Filter size={12} />
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading && !contacts.length ? (
        <div className="flex justify-center py-20"><Spinner size={32} /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#252936]">
                  {["Name", "Email", "Phone", "Service", "Date", "Status", "Actions"].map((h) => (
                    <th key={h} className="text-left text-xs text-slate-500 font-medium uppercase tracking-wide px-4 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className={`border-b border-[#1a1e28] hover:bg-[#1a1e28]/50 transition-colors ${!c.isRead ? "bg-indigo-600/3" : ""}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {!c.isRead && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />}
                        <span className={`font-medium ${!c.isRead ? "text-white" : "text-slate-300"}`}>{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{c.email}</td>
                    <td className="px-4 py-3 text-slate-400">{c.countryCode} {c.phoneNumber}</td>
                    <td className="px-4 py-3"><span className="badge-indigo">{c.serviceNeeded || "—"}</span></td>
                    <td className="px-4 py-3 text-slate-500 text-xs">{format(new Date(c.createdAt), "dd MMM yyyy")}</td>
                    <td className="px-4 py-3">
                      <span className={c.isRead ? "badge-green" : "badge-amber"}>
                        {c.isRead ? "Read" : "Unread"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleView(c)} className="btn-secondary p-1.5 text-xs"><Eye size={14} /></button>
                        <button onClick={() => setDeleteId(c._id)} className="btn-danger p-1.5 text-xs"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {total > 15 && (
            <div className="flex gap-2 p-4 justify-center border-t border-[#252936]">
              {Array.from({ length: Math.ceil(total / 15) }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => fetchContacts(n, filter)}
                  className={n === page ? "btn-primary px-3 py-1 text-xs" : "btn-secondary px-3 py-1 text-xs"}>{n}</button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* View Detail Modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Contact Detail" size="md">
        {viewing && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="label">Name</p><p className="text-white">{viewing.name}</p></div>
              <div><p className="label">Email</p><p className="text-white">{viewing.email}</p></div>
              <div><p className="label">Phone</p><p className="text-white">{viewing.countryCode} {viewing.phoneNumber}</p></div>
              <div><p className="label">Business</p><p className="text-white">{viewing.businessName || "—"}</p></div>
              <div><p className="label">Service Needed</p><p className="text-white">{viewing.serviceNeeded || "—"}</p></div>
              <div><p className="label">Date</p><p className="text-white">{format(new Date(viewing.createdAt), "dd MMM yyyy, hh:mm a")}</p></div>
            </div>
            <div>
              <p className="label">Message</p>
              <div className="bg-[#0d0f14] border border-[#252936] rounded-lg p-4 text-slate-300 text-sm leading-relaxed">{viewing.message}</div>
            </div>
            <div className="flex gap-3">
              <a href={`mailto:${viewing.email}`} className="btn-primary flex-1 justify-center"><Mail size={15} /> Reply via Email</a>
              <button onClick={() => { setDeleteId(viewing._id); setViewing(null); }} className="btn-danger px-4"><Trash2 size={15} /></button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)}
        onConfirm={async () => { await deleteContact(deleteId); setDeleteId(null); }}
        title="Delete Contact?" message="This will permanently delete this contact query." />
    </div>
  );
}
