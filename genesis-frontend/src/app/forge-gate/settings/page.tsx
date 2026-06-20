export default function SettingsPlaceholder() {
  return (
    <div className="p-10 max-w-[1400px] mx-auto">
      <div className="mb-8 border-b border-blueprint-dark pb-6">
        <h1 className="text-3xl font-serif text-white uppercase tracking-tight mb-2">System Settings</h1>
        <p className="font-mono text-xs text-gray-500 uppercase tracking-widest">Global Configuration & Access Management</p>
      </div>
      
      <div className="border border-blueprint-dark bg-black/50 p-10 text-center">
        <span className="font-mono text-xs text-sovereign uppercase tracking-widest animate-pulse">
          [ MODULE OFFLINE: PENDING EPIC ACTIVATION ]
        </span>
      </div>
    </div>
  );
}
