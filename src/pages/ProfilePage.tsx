import { Search, Suggestions, Trends } from "@/widgets/RightPanel";
import { ProfileHeader } from "@/widgets/Profile";
import Sidebar from "@/widgets/Sidebar/SideBar";

function ProfilePage() {
  return (
    <div className="min-h-screen theme-surface flex justify-center transition-colors">
      <div className="w-full max-w-[1265px] flex justify-center xl:justify-start">
        <Sidebar />
        {/* центр */}
        <div
          className="
                w-full
                xl:flex-1
                min-w-0
                border-x x-divider
                max-w-[600px]
              "
        >
          <ProfileHeader />
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

            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
