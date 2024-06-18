"use client";
import { useSaveRestoreFlow } from "../store/useSaveRestoreFlow";

export const Header = () => {
  // Using the useSaveRestoreFlow hook to get onSave function and saveResult state
  const { onSave, saveResult } = useSaveRestoreFlow();

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-300 h-[54px] flex items-center justify-between px-4">
      <div className="flex-grow flex justify-center">
        {saveResult.showToast && (
          <div
            className={`rounded-lg ${
              saveResult.success ? "bg-green-400" : "bg-red-400"
            } w-fit px-3 py-2`}
          >
            <p className="text-[12px] font-semibold text-black">
              {saveResult.success ? "Saved successfully" : "Failed to save"}
            </p>
          </div>
        )}
      </div>
      <button
        className="border border-blue-900 text-blue-900 rounded-md px-2 py-1 font-medium text-[12px]"
        onClick={onSave}
      >
        Save Changes
      </button>
    </div>
  );
};
