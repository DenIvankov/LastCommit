import { useEffect, useState } from "react";

import { profileApi } from "@/shared/api";
import type { UserProfile } from "@/shared/api/generated/models";
import { EditProfileModal } from "@/features/Profile/ui/EditProfileModal/EditProfileModal";
import { Post, TopBar } from "@/widgets/Feed";
import {
  IconArrowLeft,
  IconCalendarEvent,
  IconLocation,
} from "@tabler/icons-react";

export function ProfileHeader() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await profileApi.profileControllerFindOne();
        console.log("[PROFILE] Загружен профиль:", response.data);
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
        // Игнорируем ошибки загрузки профиля — показываем дефолтные данные
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
  };

  const displayName =
    profile?.first_name || profile?.last_name
      ? `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim()
      : profile?.user?.name || "User";

  const handle = profile?.user?.email
    ? `@${profile.user.email.split("@")[0]}`
    : "@user";

  if (isLoading) {
    return (
      <section className="theme-surface">
        <div className="sticky top-0 z-10 border-b x-divider bg-white/70 backdrop-blur-md dark:bg-neutral-900/70">
          <div className="flex items-center gap-6 h-11 px-4">
            <div className="h-5 w-20 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          </div>
        </div>
        <div className="h-[200px] bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="px-4 pb-4">
          <div className="flex items-start justify-between">
            <div className="-mt-[68px] h-[134px] w-[134px] rounded-full border-4 border-white bg-neutral-200 dark:bg-neutral-800" />
            <div className="mt-3 h-9 w-24 rounded-full bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="mt-3 h-6 w-48 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          <div className="mt-2 h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        </div>
      </section>
    );
  }

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
              <h1 className="text-[20px] leading-6 font-bold">{displayName}</h1>
              <p className="text-[13px] leading-4 text-[#536471] dark:text-neutral-400">
                0 posts
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="h-[200px] bg-cover bg-center"
        style={{
          backgroundImage: `url('${profile?.background_url || "https://png.pngtree.com/thumb_back/fh260/background/20240717/pngtree-new-nature-beautiful-background-pictures-image_16017682.jpg"}')`,
        }}
      />

      <div className="px-4 pb-4">
        <div className="flex items-start justify-between">
          <div
            className="-mt-[68px] h-[134px] w-[134px] rounded-full border-4 border-white bg-cover bg-center dark:border-neutral-900"
            style={{
              backgroundImage: profile?.avatar_url
                ? `url('${profile.avatar_url}')`
                : `url('https://png.pngtree.com/png-clipart/20241018/original/pngtree-cartoon-skull-grinning-with-big-eyes-3d-illustration-clipart-png-image_16374217.png')`,
            }}
          />
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="mt-3 h-9 rounded-full border border-[#cfd9de] px-4 text-[17px] leading-5 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
            style={{ fontWeight: "600" }}
          >
            Edit profile
          </button>
        </div>

        <div className="mt-3">
          <h2 className="text-[20px] leading-9 font-extrabold tracking-tight">
            {displayName}
          </h2>
          <p className="text-md leading-6 text-gray-600 dark:text-neutral-400">
            {handle}
          </p>
        </div>

        {profile?.bio && (
          <p className="mt-3 text-md leading-6 text-gray-900 dark:text-neutral-100">
            {profile.bio}
          </p>
        )}

        <div className="mt-3 flex items-center gap-4 text-gray-600 dark:text-neutral-400">
          {profile?.location && (
            <div className="flex items-center gap-2">
              <IconLocation size={18} stroke={2} />
              <span className="text-md leading-6">{profile.location}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <IconCalendarEvent size={18} stroke={2} />
            <span className="text-md leading-6">
              Joined{" "}
              {new Date(profile?.user?.created_at ?? Date.now()).toLocaleString(
                "en-US",
                {
                  month: "long",
                  year: "numeric",
                },
              )}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-5 text-md leading-6">
          <button className="hover:underline hover:underline-offset-2 hover:decoration-1">
            <span className="font-semibold text-black dark:text-white">0</span>{" "}
            <span className="text-[#536471] dark:text-neutral-400">
              Following
            </span>
          </button>
          <button className="hover:underline hover:underline-offset-2 hover:decoration-1">
            <span className="font-semibold text-black dark:text-white">0</span>{" "}
            <span className="text-[#536471] dark:text-neutral-400">
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

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        onSuccess={handleSaveProfile}
      />
    </section>
  );
}
