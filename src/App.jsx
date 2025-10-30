import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

const App = () => {
  const [active, setActive] = useState('dashboard');
  const [user, setUser] = useState(null);

  const canView = useMemo(() => {
    if (!user) return { dashboard: true, settings: false, admin: false };
    return {
      dashboard: true,
      settings: true,
      admin: user.role === 'admin',
    };
  }, [user]);

  const signIn = () => {
    // In a real app, connect to your backend OAuth/session here.
    // We simulate two roles to demonstrate RBAC.
    const role = Math.random() > 0.5 ? 'admin' : 'member';
    setUser({ id: 'u_123', name: role === 'admin' ? 'Alex Admin' : 'Mia Member', email: `${role}@acme.io`, role, plan: 'Free' });
    setActive('dashboard');
  };

  const signOut = () => {
    setUser(null);
    setActive('dashboard');
  };

  const updateUser = (next) => setUser(next);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-gray-900">
      <Navbar user={user} onSignIn={signIn} onSignOut={signOut} active={active} setActive={setActive} />

      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-[16rem_1fr]">
        <Sidebar user={user} active={active} setActive={setActive} />

        <main className="min-h-[calc(100vh-56px)] p-4 md:p-6">
          {!user ? (
            <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 text-center shadow-sm">
              <div className="mx-auto mb-3 h-10 w-10 rounded-xl bg-indigo-50 text-indigo-700 grid place-items-center">🚀</div>
              <h1 className="mb-1 text-lg font-semibold tracking-tight">Welcome to your SaaS starter</h1>
              <p className="mb-4 text-sm text-gray-600">Sign in to access the dashboard, manage your subscription, and adjust account settings.</p>
              <div className="flex items-center justify-center gap-2">
                <button onClick={signIn} className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black">Sign in</button>
              </div>
              <p className="mt-3 text-xs text-gray-500">Tip: Each sign-in randomly assigns an Admin or Member role to preview access control.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {active === 'dashboard' && canView.dashboard && <Dashboard user={user} />}
              {active === 'settings' && canView.settings && <Settings user={user} onUpdateUser={updateUser} />}
              {active === 'admin' && canView.admin && (
                <div className="rounded-xl border bg-white p-4 shadow-sm">
                  <h2 className="mb-1 text-sm font-semibold">Admin Panel</h2>
                  <p className="text-sm text-gray-600">Only admins can see this area. Extend this with team management, usage limits, and audit logs.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <footer className="border-t bg-white/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-xs text-gray-600 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} SaaS Starter. All rights reserved.</p>
          <p>Built with React + Tailwind. Ready for auth & billing integrations.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
