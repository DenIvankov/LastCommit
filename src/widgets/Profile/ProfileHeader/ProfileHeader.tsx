import { Post, TopBar } from "@/widgets/Feed";
import {
  IconArrowLeft,
  IconCalendarEvent,
} from "@tabler/icons-react";

interface ProfileHeaderProps {
  name?: string;
  handle?: string;
  postsCount?: number;
  joinedText?: string;
  followingCount?: number;
  followersCount?: number;
}

export function ProfileHeader({
  name = "Имя Фамилия",
  handle = "@Denis71154",
  postsCount = 0,
  joinedText = "Joined September 2025",
  followingCount = 1,
  followersCount = 0,
}: ProfileHeaderProps) {
  return (
    <section className="theme-surface">
      <div className="sticky top-0 z-10 border-b x-divider bg-white/70 backdrop-blur-md dark:bg-neutral-900/70">
        <div className="flex items-center justify-between px-4 py-1">
          <div className="flex items-center gap-6 h-11">
            <button
              type="button"
              className="h-9 w-9 rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Back"
            >
              <IconArrowLeft size={20} stroke={2} className="mx-auto" />
            </button>
            <div>
              <h1 className="text-[20px] leading-6 font-bold">{name}</h1>
              <p className="text-[13px] leading-4 text-[#536471] dark:text-neutral-400">
                {postsCount} posts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-[200px] bg-[#cfd9de] dark:bg-neutral-700" />

      <div className="px-4 pb-4">
        <div className="flex items-start justify-between">
          <div className="-mt-[68px] h-[134px] w-[134px] rounded-full border-4 border-white bg-[#c21869] hover:bg-[#6c133d] dark:border-neutral-900" />
          <button
            type="button"
            className="mt-3 h-9 rounded-full border border-[#cfd9de] px-4 text-[17px] leading-5 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            style={{ fontWeight: "600" }}
          >
            Edit profile
          </button>
        </div>

        <div className="mt-3">
          <h2 className="text-[20px] leading-9 font-extrabold tracking-tight">
            {name}
          </h2>
          <p className="text-md leading-6 text-gray-600 dark:text-neutral-400">
            {handle}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-gray-600 dark:text-neutral-400">
          <IconCalendarEvent size={18} stroke={2} />
          <button
            className="text-md leading-6 hover:underline
      hover:underline-offset-2
      hover:decoration-1"
          >
            {joinedText}
          </button>
        </div>

        <div className="mt-3 flex items-center gap-5 text-md leading-6">
          <button
            className="hover:underline
      hover:underline-offset-2
      hover:decoration-1"
          >
            <span className="font-semibold text-black dark:text-white">
              {followingCount}
            </span>{" "}
            <span className="text-[#536471] dark:text-neutral-400">
              Following
            </span>
          </button>
          <button
            className="hover:underline
      hover:underline-offset-2
      hover:decoration-1
    "
          >
            <span className="font-semibold text-black dark:text-white">
              {followersCount}
            </span>{" "}
            <span
              className="text-[#536471] dark:text-neutral-400 
    "
            >
              Followers
            </span>
          </button>
        </div>
      </div>
      <div>
        <TopBar
          tabs={[
            "Posts",
            "Replies",
            "Highlights",
            "Articles",
            "Media",
            "Likes",
          ]}
        />
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </section>
  );
}
