export default function ProfileToggle({isOpen}) {
  return (
    <div
      className={`absolute right-0 mt-2 z-50 w-32 bg-white shadow-lg rounded-xl border 
        transform transition-all duration-300 ease-in-out 
        ${isOpen
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }
        origin-top-right
        animate-dropdown`}
    >
      <ul className="text-sm text-slate-700">
        <li className="px-4 py-2 hover:bg-primary-slate cursor-pointer">
          Profile
        </li>
        <li className="px-4 py-2 hover:bg-primary-slate cursor-pointer">
          Settings
        </li>
        <li className="px-4 py-2 text-primary-rose-text hover:bg-secondary-rose cursor-pointer">
          Logout
        </li>
      </ul>
    </div>
  );
}
