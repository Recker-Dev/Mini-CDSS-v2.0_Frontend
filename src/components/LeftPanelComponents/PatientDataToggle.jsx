import { customScrollbar } from "../../util/scrollbar";

export default function PatientDataToggle({
  initialPatientData,
  setInitialPatientData,
}) {
  return (
    <div
      className="
        absolute md:-top-1/2 sm:top-1/2 md:-right-1/2 sm:right-1 transform -translate-y-1/2 translate-x-1/2 mt-3
        w-64 h-56
        md:w-lg md:h-80
        rounded-xl border
        bg-secondary-slate/95
        border-primary-slate-text/25
        shadow-xl
        backdrop-blur-sm
        z-50
        overflow-hidden  // Prevents overflow outside the container
      "
    >
      {/* Editable Textarea Section */}
      <textarea
        className={`
          w-full h-full resize-none
          max-h-80  // Max height for the textarea
          bg-transparent
          p-4
          text-sm/6 font-medium text-primary-slate-text tracking-tight
          placeholder:text-primary-slate-text/40
          focus:outline-none
          overflow-auto  // Enables scrolling once content exceeds max-height
          ${customScrollbar}
        `}
        value={initialPatientData}
        onChange={(e) => setInitialPatientData(e.target.value)}
        placeholder="Enter patient's initial clinical encouter data; like age, sex, gender, ailments, complaints and any past history etc."
      />
    </div>
  );
}
