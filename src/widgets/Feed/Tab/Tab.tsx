interface TabProps {
  label: string;
  isActive: boolean;
  stretch?: boolean;
  onClick: () => void;
}

export function Tab({ label, isActive, stretch = false, onClick }: TabProps) {
  return (
    <div className={`relative flex ${stretch ? "flex-1" : "flex-none"}`}>
      <button
        type="button"
        onClick={onClick}
        className="
          relative flex h-[53px] w-full items-center justify-center px-4
          transition-colors
          hover:bg-neutral-100 dark:hover:bg-neutral-800
        "
      >
        <span className="relative inline-flex h-full items-center px-3">
          <span
            className={
              isActive
                ? "text-[15px] font-bold text-black dark:text-white"
                : "text-[15px] font-medium text-[#536471] dark:text-neutral-400"
            }
          >
            {label}
          </span>

          {isActive && (
            <span
              className="
                absolute bottom-0 left-1/2 -translate-x-1/2
                h-1 w-full
                rounded-full bg-sky-500
              "
            />
          )}
        </span>
      </button>
    </div>
  );
}
