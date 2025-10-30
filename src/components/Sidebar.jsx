import React from 'react';
import { Home, Settings, ShieldCheck } from 'lucide-react';

const Sidebar = ({ user, active, setActive }) => {
  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: Home, roles: ['member', 'admin'] },
    { key: 'settings', label: 'Settings', icon: Settings, roles: ['member', 'admin'] },
    { key: 'admin', label: 'Admin', icon: ShieldCheck, roles: ['admin'] },
  ];

  const visible = navItems.filter((n) => !user || n.roles.includes(user.role));

  return (
    <aside className="hidden h-[calc(100vh-56px)] w-64 flex-col border-r bg-white/60 p-3 md:flex">
      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 px-2 mb-2">Navigation</div>
      <nav className="flex flex-col gap-1">
        {visible.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`inline-flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
              active === key ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="mt-auto rounded-md bg-gradient-to-br from-indigo-500/10 via-sky-500/10 to-emerald-500/10 p-3 text-xs text-gray-600">
        <p><span className="font-semibold">Role-based access</span> is active. Links adapt to the signed-in role.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
