import { useEffect, useState } from "react";
import { Save, Shield } from "lucide-react";
import usePrivacyStore from "../../stores/usePrivacyStore";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";
import { format } from "date-fns";

export default function Privacy() {
  const { policy, loading, fetchPolicy, updatePolicy } = usePrivacyStore();
  const [form, setForm]   = useState({ title: "", description: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchPolicy(); }, []);
  useEffect(() => {
    if (policy) setForm({ title: policy.title || "", description: policy.description || "" });
  }, [policy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await updatePolicy(form);
    setSaving(false);
  };

  if (loading && !policy)
    return <div className="flex justify-center py-20"><Spinner size={32} /></div>;

  return (
    <div>
      <PageHeader
        title="Privacy & Policy"
        subtitle={
          policy?.lastUpdated
            ? `Last updated: ${format(new Date(policy.lastUpdated), "dd MMM yyyy, hh:mm a")}`
            : "Not set yet"
        }
      />

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
        <div className="card p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/15 border border-indigo-600/20 flex items-center justify-center">
              <Shield size={18} className="text-indigo-400" />
            </div>
            <p className="text-slate-400 text-sm">
              Write your Privacy Policy content below. This will be displayed on the public website.
            </p>
          </div>

          <div>
            <label className="label">Page Title *</label>
            <input
              required
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Privacy Policy"
            />
          </div>

          <div>
            <label className="label">Content *</label>
            <textarea
              required
              rows={20}
              className="input resize-y font-mono text-xs leading-relaxed"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder={`1. Introduction\nWe are committed to protecting your personal information...\n\n2. Data We Collect\n...`}
            />
            <p className="text-xs text-slate-600 mt-1">
              You can use plain text or paste HTML. Supports line breaks.
            </p>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? <Spinner size={16} /> : <Save size={16} />}
          {saving ? "Saving..." : "Save Privacy Policy"}
        </button>
      </form>
    </div>
  );
}
