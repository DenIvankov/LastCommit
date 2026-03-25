import { IconSearch } from "@tabler/icons-react";

export function Search() {
  return (
    <div className="relative w-full">
      <IconSearch
        stroke={1.8}
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400"
      />
      <input className="x-search-input" placeholder="Search" />
    </div>
  );
}
