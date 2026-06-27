// import { useState } from "react";
// import { Save, User, Lock, Eye, EyeOff, Camera } from "lucide-react";
// import useAuthStore from "../../stores/useAuthStore";
// import PageHeader from "../../components/ui/PageHeader";
// import Spinner from "../../components/ui/Spinner";

// export default function Profile() {
//   const { admin, updateProfile, loading } = useAuthStore();
//   const [imgFile, setImgFile]   = useState(null);
//   const [imgPrev, setImgPrev]   = useState(null);
//   const [showCur, setShowCur]   = useState(false);
//   const [showNew, setShowNew]   = useState(false);
//   const [showCon, setShowCon]   = useState(false);
//   const [saving, setSaving]     = useState(false);

//   const [info, setInfo] = useState({ name: admin?.name || "", email: admin?.email || "" });
//   const [pwd,  setPwd]  = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
//   const [pwdErr, setPwdErr] = useState("");

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setImgFile(file);
//     const reader = new FileReader();
//     reader.onload = () => setImgPrev(reader.result);
//     reader.readAsDataURL(file);
//   };

//   const handleInfo = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     const fd = new FormData();
//     fd.append("name", info.name);
//     fd.append("email", info.email);
//     if (imgFile) fd.append("profileImage", imgFile);
//     await updateProfile(fd);
//     setSaving(false);
//   };

//   const handlePassword = async (e) => {
//     e.preventDefault();
//     setPwdErr("");
//     if (pwd.newPassword !== pwd.confirmPassword) {
//       setPwdErr("New passwords do not match");
//       return;
//     }
//     if (pwd.newPassword.length < 8) {
//       setPwdErr("Password must be at least 8 characters");
//       return;
//     }
//     setSaving(true);
//     const fd = new FormData();
//     fd.append("currentPassword", pwd.currentPassword);
//     fd.append("newPassword",     pwd.newPassword);
//     const ok = await updateProfile(fd);
//     if (ok) setPwd({ currentPassword: "", newPassword: "", confirmPassword: "" });
//     setSaving(false);
//   };

//   const avatarSrc = imgPrev || admin?.profileImage?.url;

//   return (
//     <div>
//       <PageHeader title="My Profile" subtitle="Manage your admin account" />

//       <div className="max-w-2xl space-y-6">

//         {/* Avatar + basic info */}
//         <div className="card p-6">
//           <h3 className="font-display font-bold text-white text-lg flex items-center gap-2 mb-5">
//             <User size={18} className="text-indigo-400" /> Profile Info
//           </h3>

//           {/* Avatar */}
//           <div className="flex items-center gap-5 mb-6">
//             <div className="relative">
//               <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border-2 border-indigo-600/30 overflow-hidden flex items-center justify-center">
//                 {avatarSrc
//                   ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
//                   : <span className="text-indigo-400 font-display font-bold text-3xl">{admin?.name?.[0]?.toUpperCase()}</span>
//                 }
//               </div>
//               <label className="absolute -bottom-2 -right-2 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors">
//                 <Camera size={13} className="text-white" />
//                 <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
//               </label>
//             </div>
//             <div>
//               <p className="font-display font-bold text-white text-xl">{admin?.name}</p>
//               <p className="text-slate-400 text-sm">{admin?.email}</p>
//               <span className="badge-indigo mt-1">{admin?.role}</span>
//             </div>
//           </div>

//           <form onSubmit={handleInfo} className="space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="label">Full Name</label>
//                 <input
//                   required className="input"
//                   value={info.name}
//                   onChange={(e) => setInfo({ ...info, name: e.target.value })}
//                 />
//               </div>
//               <div>
//                 <label className="label">Email Address</label>
//                 <input
//                   required type="email" className="input"
//                   value={info.email}
//                   onChange={(e) => setInfo({ ...info, email: e.target.value })}
//                 />
//               </div>
//             </div>
//             <button type="submit" disabled={saving} className="btn-primary">
//               {saving ? <Spinner size={16} /> : <Save size={16} />}
//               {saving ? "Saving..." : "Update Profile"}
//             </button>
//           </form>
//         </div>

//         {/* Change Password */}
//         <div className="card p-6">
//           <h3 className="font-display font-bold text-white text-lg flex items-center gap-2 mb-5">
//             <Lock size={18} className="text-indigo-400" /> Change Password
//           </h3>

//           <form onSubmit={handlePassword} className="space-y-4">
//             {/* Current */}
//             <div>
//               <label className="label">Current Password</label>
//               <div className="relative">
//                 <input
//                   required type={showCur ? "text" : "password"}
//                   className="input pr-10"
//                   value={pwd.currentPassword}
//                   onChange={(e) => setPwd({ ...pwd, currentPassword: e.target.value })}
//                   placeholder="••••••••"
//                 />
//                 <button type="button" onClick={() => setShowCur(!showCur)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
//                   {showCur ? <EyeOff size={16} /> : <Eye size={16} />}
//                 </button>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               {/* New */}
//               <div>
//                 <label className="label">New Password</label>
//                 <div className="relative">
//                   <input
//                     required type={showNew ? "text" : "password"}
//                     className="input pr-10"
//                     value={pwd.newPassword}
//                     onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
//                     placeholder="Min 8 characters"
//                   />
//                   <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
//                     {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm */}
//               <div>
//                 <label className="label">Confirm New Password</label>
//                 <div className="relative">
//                   <input
//                     required type={showCon ? "text" : "password"}
//                     className="input pr-10"
//                     value={pwd.confirmPassword}
//                     onChange={(e) => setPwd({ ...pwd, confirmPassword: e.target.value })}
//                     placeholder="Repeat new password"
//                   />
//                   <button type="button" onClick={() => setShowCon(!showCon)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
//                     {showCon ? <EyeOff size={16} /> : <Eye size={16} />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {pwdErr && (
//               <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
//                 {pwdErr}
//               </p>
//             )}

//             <button type="submit" disabled={saving} className="btn-primary">
//               {saving ? <Spinner size={16} /> : <Lock size={16} />}
//               {saving ? "Updating..." : "Change Password"}
//             </button>
//           </form>
//         </div>

//         {/* Last login info */}
//         {admin?.lastLogin && (
//           <div className="card p-4 flex items-center gap-3">
//             <div className="w-2 h-2 rounded-full bg-green-400" />
//             <p className="text-slate-400 text-sm">
//               Last login: <span className="text-slate-200">{new Date(admin.lastLogin).toLocaleString("en-IN")}</span>
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { Save, User, Lock, Eye, EyeOff, Camera, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/useAuthStore";
import PageHeader from "../../components/ui/PageHeader";
import Spinner from "../../components/ui/Spinner";

export default function Profile() {
  const { admin, updateProfile, logout, loading } = useAuthStore();
  const navigate = useNavigate();
  const [imgFile, setImgFile]   = useState(null);
  const [imgPrev, setImgPrev]   = useState(null);
  const [showCur, setShowCur]   = useState(false);
  const [showNew, setShowNew]   = useState(false);
  const [showCon, setShowCon]   = useState(false);
  const [saving, setSaving]     = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [info, setInfo] = useState({ name: admin?.name || "", email: admin?.email || "" });
  const [pwd,  setPwd]  = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwdErr, setPwdErr] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = () => setImgPrev(reader.result);
    reader.readAsDataURL(file);
  };

  const handleInfo = async (e) => {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    fd.append("name", info.name);
    fd.append("email", info.email);
    if (imgFile) fd.append("profileImage", imgFile);
    await updateProfile(fd);
    setSaving(false);
  };

  const handlePassword = async (e) => {
    e.preventDefault();
    setPwdErr("");
    if (pwd.newPassword !== pwd.confirmPassword) {
      setPwdErr("New passwords do not match");
      return;
    }
    if (pwd.newPassword.length < 8) {
      setPwdErr("Password must be at least 8 characters");
      return;
    }
    setSaving(true);
    const fd = new FormData();
    fd.append("currentPassword", pwd.currentPassword);
    fd.append("newPassword",     pwd.newPassword);
    const ok = await updateProfile(fd);
    if (ok) setPwd({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setSaving(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    await logout();
    navigate("/login");
  };

  const avatarSrc = imgPrev || admin?.profileImage?.url;

  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Manage your admin account"
        action={
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="btn-danger"
          >
            {loggingOut ? <Spinner size={15} /> : <LogOut size={15} />}
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        }
      />

      <div className="max-w-2xl space-y-6">

        {/* Avatar + basic info */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2 mb-5">
            <User size={18} className="text-indigo-400" /> Profile Info
          </h3>

          {/* Avatar */}
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border-2 border-indigo-600/30 overflow-hidden flex items-center justify-center">
                {avatarSrc
                  ? <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                  : <span className="text-indigo-400 font-display font-bold text-3xl">{admin?.name?.[0]?.toUpperCase()}</span>
                }
              </div>
              <label className="absolute -bottom-2 -right-2 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 transition-colors">
                <Camera size={13} className="text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <div>
              <p className="font-display font-bold text-white text-xl">{admin?.name}</p>
              <p className="text-slate-400 text-sm">{admin?.email}</p>
              <span className="badge-indigo mt-1">{admin?.role}</span>
            </div>
          </div>

          <form onSubmit={handleInfo} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  required className="input"
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                />
              </div>
              <div>
                <label className="label">Email Address</label>
                <input
                  required type="email" className="input"
                  value={info.email}
                  onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
              </div>
            </div>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Spinner size={16} /> : <Save size={16} />}
              {saving ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>

        {/* Change Password */}
        <div className="card p-6">
          <h3 className="font-display font-bold text-white text-lg flex items-center gap-2 mb-5">
            <Lock size={18} className="text-indigo-400" /> Change Password
          </h3>

          <form onSubmit={handlePassword} className="space-y-4">
            <div>
              <label className="label">Current Password</label>
              <div className="relative">
                <input
                  required type={showCur ? "text" : "password"}
                  className="input pr-10"
                  value={pwd.currentPassword}
                  onChange={(e) => setPwd({ ...pwd, currentPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowCur(!showCur)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showCur ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">New Password</label>
                <div className="relative">
                  <input
                    required type={showNew ? "text" : "password"}
                    className="input pr-10"
                    value={pwd.newPassword}
                    onChange={(e) => setPwd({ ...pwd, newPassword: e.target.value })}
                    placeholder="Min 8 characters"
                  />
                  <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="label">Confirm New Password</label>
                <div className="relative">
                  <input
                    required type={showCon ? "text" : "password"}
                    className="input pr-10"
                    value={pwd.confirmPassword}
                    onChange={(e) => setPwd({ ...pwd, confirmPassword: e.target.value })}
                    placeholder="Repeat new password"
                  />
                  <button type="button" onClick={() => setShowCon(!showCon)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                    {showCon ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            {pwdErr && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {pwdErr}
              </p>
            )}

            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Spinner size={16} /> : <Lock size={16} />}
              {saving ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>

        {/* Last login + logout */}
        <div className="card p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
            <p className="text-slate-400 text-sm">
              {admin?.lastLogin
                ? <>Last login: <span className="text-slate-200">{new Date(admin.lastLogin).toLocaleString("en-IN")}</span></>
                : <span className="text-slate-500">No previous login recorded</span>
              }
            </p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="btn-danger flex-shrink-0"
          >
            {loggingOut ? <Spinner size={14} /> : <LogOut size={14} />}
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>

      </div>
    </div>
  );
}
