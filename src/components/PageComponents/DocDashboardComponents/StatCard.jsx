export default function StatCard({ label, value, color }) {
  return (
    <div className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-sm lg:text-base font-bold text-primary-slate-text uppercase">
        {label}
      </p>
      <p className={`text-3xl lg:text-4xl font-black ${color}`}>{value}</p>
    </div>
  );
}
