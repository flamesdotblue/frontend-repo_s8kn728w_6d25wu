import React from 'react';
import { Home, Settings, User, LogIn, LogOut, Rocket } from 'lucide-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ user, onSignIn, onSignOut, active, setActive }) => {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-500 text-white shadow">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-tight">SaaS Starter</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {items.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={classNames(
                  'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors',
                  active === key
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="hidden sm:flex items-center gap-2 rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-600">
                  <User className="h-3.5 w-3.5" />
                  <span className="font-medium">{user.name}</span>
                  <span className="inline-flex items-center rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-indigo-700">
                    {user.role}
                  </span>
                  <span className="inline-flex items-center rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    {user.plan}
                  </span>
                </div>
                <button
                  onClick={onSignOut}
                  className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            ) : (
              <button
                onClick={onSignIn}
                className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
