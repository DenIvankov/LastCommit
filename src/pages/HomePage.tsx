import { News, Search, Suggestions, Trends } from "@/widgets/RightPanel";
import { Post, PostBox, TopBar } from "@/widgets/Feed";
import Sidebar from "@/widgets/Sidebar/SideBar";

function HomePage() {
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
          <TopBar />
          <PostBox />

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
            <div className="mb-4">
              <Search />
            </div>

            <Trends />
            <News />
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
