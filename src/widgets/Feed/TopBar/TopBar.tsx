import { useState } from "react";

import { useScrollDirection } from "@/shared/hooks/useScrollDirection";
import { Tab } from "../Tab/Tab";

interface TopBarProps {
  tabs?: string[];
  stretchTabs?: boolean;
}

export function TopBar({
  tabs = ["For you", "Following"],
  stretchTabs = false,
}: TopBarProps) {
  const [activeTab, setActiveTab] = useState(0);
  const direction = useScrollDirection();

  return (
    <div
      className={`
        x-topbar
        sticky top-0 z-50
        bg-white/70 dark:bg-black/70
        backdrop-blur-md
        border-b x-divider
        transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${direction === "down" ? "-translate-y-full sm:translate-y-0" : "translate-y-0"}
      `}
    >
      <div className="flex w-full overflow-x-auto flex-nowrap scrollbar-hide">
        {tabs.map((label, index) => (
          <Tab
            key={label}
            label={label}
            isActive={activeTab === index}
            stretch={stretchTabs}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>
    </div>
  );
}
