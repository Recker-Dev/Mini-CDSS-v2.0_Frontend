import { customScrollbar } from "../../util/scrollbar";
import usePatientDataStore from "../../store/usePatientDataStore";

export default function PatientDataToggle({ canEdit, isOpen }) {
  const initialPatientData = usePatientDataStore(
    (state) => state.initialPatientData,
  );
  const setInitialPatientData = usePatientDataStore(
    (state) => state.setInitialPatientData,
  );

  return (
    // <div
    //   className={`
    //     absolute
    //     md:-top-[45%] md:-right-[45%]
    //     sm:top-[40%] sm:right-[5%]
    //     transform -translate-y-[60%] translate-x-[50%] mt-3
    //     w-64 h-84
    //     md:w-lg md:h-80
    //     rounded-xl border
    //     bg-secondary-slate/95
    //     border-primary-slate-text/25
    //     shadow-xl
    //     backdrop-blur-sm
    //     transition-all duration-300 ease-in-out
    //     ${
    //       isOpen
    //         ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
    //         : "opacity-0 -translate-x-2 scale-95 pointer-events-none"
    //     }
    //     z-50
    //     overflow-hidden  // Prevents overflow outside the container
    //   `}
    // >
    <div
      className={`
        absolute 
        /* Positioning */
        md:top-0 md:right-0 
        left-0 
        
        /* Box Styling */
        w-64 h-84
        md:w-lg md:h-80
        rounded-xl border
        bg-secondary-slate/95
        border-primary-slate-text/25
        shadow-xl
        backdrop-blur-sm
        z-50
        overflow-hidden
        
        /* Animation Logic */
        transition-all duration-300 ease-in-out 
        ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto [transform:translateY(-65%)] md:[transform:translateX(55%)]"
            : "opacity-0 scale-95 pointer-events-none [transform:translateY(-95%)] md:[transform:translateX(-100%)]"
        }
      `}
    >
      {/* ${
          isOpen
            ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-x-2 scale-95 pointer-events-none"
        } */}
      {/* Editable Textarea Section */}
      <textarea
        disabled={!canEdit}
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
