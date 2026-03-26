import { Post, TopBar } from "@/widgets/Feed";
import { News, Search, Suggestions, Trends } from "@/widgets/RightPanel";
import Sidebar from "@/widgets/Sidebar/SideBar";
import { IconSettings } from "@tabler/icons-react";

function Explore() {
  return (
    <div className="min-h-screen theme-surface flex justify-center transition-colors">
      <div className="w-full max-w-[1265px] flex justify-center xl:justify-start">
        <Sidebar />

        <div
          className="
                w-full
                xl:flex-1
                min-w-0
                border-x x-divider
                max-w-[600px]
              "
        >
          <div className="sticky top-0 z-20 bg-white/40 backdrop-blur-md dark:bg-neutral-900/70 [&_.x-topbar]:bg-transparent [&_.x-topbar]:dark:bg-transparent [&_.x-topbar]:backdrop-blur-none">
            <div className="flex items-center justify-between px-5 py-1 gap-8">
              <Search />
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
                <IconSettings size={22} stroke={2} />
              </button>
            </div>
            <TopBar
              tabs={["For You", "Trending", "News", "Sports", "Entertainment"]}
              stretchTabs
            />
          </div>

          {[...Array(15)].map((_, i) => (
            <Post key={i} />
          ))}
        </div>
        <div
          className="
        hidden lg:block
        w-[350px]
        pl-6 pr-2
      "
        >
          <div className="sticky top-0 pt-2">
            <div className="mx-0 mt-1 mb-4 h-px bg-neutral-200 dark:bg-neutral-800" />

            <Trends />
            <News />
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
