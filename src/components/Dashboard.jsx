import React from 'react';
import { BarChart3, Users, Crown, CheckCircle2 } from 'lucide-react';

const accentClasses = {
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
  },
  sky: {
    bg: 'bg-sky-50',
    text: 'text-sky-700',
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
  },
};

const StatCard = ({ icon: Icon, label, value, accent = 'indigo' }) => {
  const classes = accentClasses[accent] || accentClasses.indigo;
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${classes.bg} ${classes.text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl font-semibold tracking-tight">{value}</p>
        </div>
      </div>
    </div>
  );
};

const Badge = ({ children, color = 'emerald' }) => {
  const classes = accentClasses[color] || accentClasses.emerald;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full ${classes.bg} px-2 py-1 text-xs font-medium ${classes.text}`}>
      <CheckCircle2 className="h-3.5 w-3.5" />
      {children}
    </span>
  );
};

const Dashboard = ({ user }) => {
  const isAdmin = user?.role === 'admin';

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Welcome{user ? `, ${user.name}` : ''}</h1>
          <p className="text-sm text-gray-600">This is your unified overview. Track usage, subscriptions, and team activity.</p>
        </div>
        {user?.plan && (
          <Badge color={user.plan === 'Pro' ? 'indigo' : 'emerald'}>
            {user.plan} Plan
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Active Users" value={isAdmin ? '1,248' : '23'} accent="indigo" />
        <StatCard icon={BarChart3} label="API Calls" value={isAdmin ? '324,901' : '1,203'} accent="sky" />
        <StatCard icon={Crown} label="Plan" value={user?.plan || 'Free'} accent="amber" />
        <StatCard icon={CheckCircle2} label="Uptime" value="99.99%" accent="emerald" />
      </div>

      {isAdmin && (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Admin Insights</h2>
            <span className="text-xs text-gray-500">Internal only</span>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">MRR</p>
              <p className="text-lg font-semibold">$42,380</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">Churn</p>
              <p className="text-lg font-semibold">2.1%</p>
            </div>
            <div className="rounded-lg border p-3">
              <p className="text-xs text-gray-500">Trial Conversions</p>
              <p className="text-lg font-semibold">38%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
