import { motion } from "framer-motion";
import { memo } from "react";

type Tab = {
  name: string;
  abbreviation: string;
};

export interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  SetActiveTab: (tab: string) => void;
}

function Tab({ tabs, activeTab, SetActiveTab }: TabsProps) {
  return (
    <ul className="flex items-center gap-2">
      {tabs.map((tab) => {
        const active = activeTab.toLowerCase() === tab.name.toLowerCase();
        return (
          <li
            className={`px-4 min-w-16 text-center cursor-pointer py-2 rounded-full relative transition-colors duration-300 ease-in-out delay-150 ${
              active ? "text-white " : "text-gray-100 hover:bg-blue-200"
            } capitalize`}
            key={tab.abbreviation}
            role="tab"
            onClick={() => SetActiveTab(tab.name)}
          >
            <span className="relative z-20">{tab.abbreviation}</span>
            {active && (
              <motion.div
                className="absolute inset-0 bg-blue-300 rounded-full"
                layout="preserve-aspect"
                layoutId="active-tab"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default memo(Tab);
