import { useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { FolderKanban, Phone, FileText, Users, Briefcase, Star, Handshake, Cpu } from "lucide-react";
import useDashboardStore from "../../stores/useDashboardStore";
import Spinner from "../../components/ui/Spinner";
import PageHeader from "../../components/ui/PageHeader";

const StatCard = ({ label, value, icon: Icon, color, sub }) => (
  <div className="card p-5 hover:border-[#2e3344] transition-colors">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon size={18} className="text-white" />
      </div>
      {sub !== undefined && (
        <span className="badge-amber text-xs">{sub} unread</span>
      )}
    </div>
    <p className="text-3xl font-display font-bold text-white">{value ?? "—"}</p>
    <p className="text-slate-500 text-sm mt-0.5">{label}</p>
  </div>
);

const monthName = (m) => ["", "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][m];

export default function Dashboard() {
  const { stats, charts, loading, fetchDashboard } = useDashboardStore();

  useEffect(() => { fetchDashboard(); }, []);

  const chartData = charts ? (() => {
    const map = {};
    charts.monthlyContacts?.forEach(({ _id, count }) => {
      const key = `${monthName(_id.month)} ${_id.year}`;
      map[key] = { ...map[key], name: key, contacts: count };
    });
    charts.monthlyApplications?.forEach(({ _id, count }) => {
      const key = `${monthName(_id.month)} ${_id.year}`;
      map[key] = { ...map[key], name: key, applications: count };
    });
    return Object.values(map);
  })() : [];

  if (loading && !stats) {
    return <div className="flex items-center justify-center h-64"><Spinner size={32} /></div>;
  }

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your website data" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Projects"     value={stats?.totalProjects}     icon={FolderKanban} color="bg-indigo-600" />
        <StatCard label="Partners"     value={stats?.totalPartners}     icon={Handshake}    color="bg-cyan-600" />
        <StatCard label="Services"     value={stats?.totalServices}     icon={Briefcase}    color="bg-violet-600" />
        <StatCard label="Reviews"      value={stats?.totalReviews}      icon={Star}         color="bg-amber-600" />
        <StatCard label="Contacts"     value={stats?.contacts?.total}   icon={Phone}        color="bg-green-600"  sub={stats?.contacts?.unread} />
        <StatCard label="Applications" value={stats?.applications?.total} icon={FileText}   color="bg-rose-600"   sub={stats?.applications?.unread} />
        <StatCard label="Careers"      value={stats?.totalCareers}      icon={Users}        color="bg-orange-600" />
        <StatCard label="Technologies" value={stats?.totalTechnologies} icon={Cpu}          color="bg-sky-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="font-display font-bold text-white mb-4">Monthly Contacts</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252936" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#13161d", border: "1px solid #252936", borderRadius: 8 }} />
              <Bar dataKey="contacts" fill="#6c63ff" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-6">
          <h3 className="font-display font-bold text-white mb-4">Monthly Applications</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252936" />
              <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "#13161d", border: "1px solid #252936", borderRadius: 8 }} />
              <Line type="monotone" dataKey="applications" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
