import React, { useState } from 'react';
import { Mail, Shield, Crown, Save } from 'lucide-react';

const Input = ({ label, icon: Icon, ...props }) => (
  <label className="flex flex-col gap-1 text-sm">
    <span className="text-gray-600">{label}</span>
    <div className="flex items-center gap-2 rounded-md border bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
      {Icon && <Icon className="h-4 w-4 text-gray-500" />}
      <input className="w-full outline-none placeholder:text-gray-400" {...props} />
    </div>
  </label>
);

const PlanCard = ({ name, price, features, active, onSelect }) => (
  <div className={`flex flex-col rounded-xl border p-4 ${active ? 'ring-2 ring-indigo-500' : ''}`}>
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? 'bg-indigo-50 text-indigo-700' : 'bg-gray-50 text-gray-600'}`}>
          <Crown className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-gray-500">${price}/mo</p>
        </div>
      </div>
      {active && (
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">Current</span>
      )}
    </div>
    <ul className="mb-3 list-disc pl-6 text-xs text-gray-600">
      {features.map((f) => (
        <li key={f}>{f}</li>
      ))}
    </ul>
    <button
      onClick={onSelect}
      className={`mt-auto rounded-md px-3 py-2 text-sm ${active ? 'bg-gray-900 text-white hover:bg-black' : 'border text-gray-700 hover:bg-gray-50'}`}
    >
      {active ? 'Manage' : 'Choose Plan'}
    </button>
  </div>
);

const Settings = ({ user, onUpdateUser }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  const changePlan = (plan) => {
    onUpdateUser({ ...user, plan });
  };

  const onSave = (e) => {
    e.preventDefault();
    onUpdateUser({ ...user, name, email });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Account Settings</h2>
        <p className="text-sm text-gray-600">Manage your profile, security, and subscription.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <form onSubmit={onSave} className="space-y-4 rounded-xl border bg-white p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Profile</p>
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-sm text-white hover:bg-black">
              <Save className="h-4 w-4" /> Save
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Email" type="email" icon={Mail} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="rounded-md bg-amber-50 p-3 text-xs text-amber-800">
            <p>Tip: Connect authentication to your identity provider to persist changes.</p>
          </div>
        </form>

        <div className="space-y-4 rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-semibold">Security</p>
            <Shield className="h-4 w-4 text-gray-500" />
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-between rounded-md border p-3">
              <span>Password</span>
              <button className="rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50">Change</button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-3">
              <span>Two-factor auth</span>
              <button className="rounded-md border px-3 py-1.5 text-xs hover:bg-gray-50">Enable</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-4 shadow-sm lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Subscription</p>
              <p className="text-xs text-gray-600">Choose the plan that fits your needs.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PlanCard
              name="Free"
              price={0}
              features={["Basic analytics", "Community support"]}
              active={(user?.plan || 'Free') === 'Free'}
              onSelect={() => changePlan('Free')}
            />
            <PlanCard
              name="Pro"
              price={29}
              features={["Advanced analytics", "Priority support", "Custom roles"]}
              active={user?.plan === 'Pro'}
              onSelect={() => changePlan('Pro')}
            />
          </div>
        </div>
        <div className="space-y-3 rounded-xl border bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold">Plan Details</p>
          <div className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">
            <p><span className="font-medium">Current:</span> {user?.plan || 'Free'}</p>
            <p><span className="font-medium">Seat limit:</span> {user?.plan === 'Pro' ? 'Unlimited' : '3'}</p>
            <p><span className="font-medium">Role control:</span> {user?.plan === 'Pro' ? 'Advanced' : 'Basic'}</p>
          </div>
          <button className="w-full rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">Manage billing portal</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
