import { zodResolver } from "@hookform/resolvers/zod";
import { IconCamera, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { profileApi } from "@/shared/api";
import type { UserProfile } from "@/shared/api/generated/models";

const profileSchema = z.object({
  first_name: z.string().max(50).optional().or(z.literal("")),
  last_name: z.string().max(50).optional().or(z.literal("")),
  bio: z.string().max(160).optional().or(z.literal("")),
  location: z.string().max(30).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onSuccess: (profile: UserProfile) => void;
}

// Default placeholder images
const DEFAULT_AVATAR =
  "https://png.pngtree.com/png-clipart/20241018/original/pngtree-cartoon-skull-grinning-with-big-eyes-3d-illustration-clipart-png-image_16374217.png";
const DEFAULT_BACKGROUND =
  "https://cdn.iz.ru/sites/default/files/styles/1065xh/public/photo_item-2018-10/TASS_3713798.jpg?itok=lBklsgM2";

export function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSuccess,
}: EditProfileModalProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [backgroundUrl, setBackgroundUrl] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingBackground, setIsUploadingBackground] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      bio: "",
      location: "",
    },
  });

  useEffect(() => {
    if (isOpen && profile) {
      reset({
        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",
        bio: profile.bio ?? "",
        location: profile.location ?? "",
      });
      // Set image URLs from profile if available
      setAvatarUrl(
        (profile as UserProfile & { avatar_url?: string | null }).avatar_url ??
          null,
      );
      setBackgroundUrl(
        (profile as UserProfile & { background_url?: string | null })
          .background_url ?? null,
      );
    }
  }, [isOpen, profile, reset]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "avatar" | "background",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file");
      return;
    }

    const isAvatar = type === "avatar";
    setIsUploadingAvatar(isAvatar);
    setIsUploadingBackground(!isAvatar);
    setUploadError(null);

    try {
      const response = isAvatar
        ? await profileApi.profileControllerUploadAvatar({ file })
        : await profileApi.profileControllerUploadBackground({ file });

      // Сервер возвращает URL строкой или объект с url
      const url = response.data as string | { url?: string } | undefined;
      console.log(`Upload ${type} response:`, url);

      // Загружаем обновлённый профиль с сервера
      const profileResponse = await profileApi.profileControllerFindOne();
      const updatedProfile = profileResponse.data as unknown as UserProfile;

      // Обновляем профиль в родительском компоненте
      onSuccess(updatedProfile);

      // Обновляем локальное состояние для предпросмотра
      const avatarUrlValue =
        typeof updatedProfile.avatar_url === "string"
          ? updatedProfile.avatar_url
          : typeof url === "string"
            ? url
            : null;
      const backgroundUrlValue =
        typeof updatedProfile.background_url === "string"
          ? updatedProfile.background_url
          : typeof url === "string"
            ? url
            : null;

      if (isAvatar) {
        setAvatarUrl(avatarUrlValue);
      } else {
        setBackgroundUrl(backgroundUrlValue);
      }
    } catch (uploadError) {
      console.error("Upload error:", uploadError);
      setUploadError("Failed to upload image");
    } finally {
      setIsUploadingAvatar(false);
      setIsUploadingBackground(false);
      e.target.value = "";
    }
  };

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const dto = {
        first_name: values.first_name || undefined,
        last_name: values.last_name || undefined,
        bio: values.bio || undefined,
        location: values.location || undefined,
      };

      let result: UserProfile;
      if (profile) {
        const response = await profileApi.profileControllerUpdate(dto);
        result = response.data;
      } else {
        const response = await profileApi.profileControllerCreate(dto);
        result = response.data;
      }

      onSuccess(result);
      onClose();
    } catch (error) {
      console.error("Failed to save profile:", error);
    }
  };

  if (!isOpen) return null;

  const currentAvatar = avatarUrl || DEFAULT_AVATAR;
  const currentBackground = backgroundUrl || DEFAULT_BACKGROUND;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-[600px] bg-white dark:bg-neutral-900 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
              aria-label="Close"
            >
              <IconX size={20} stroke={2} />
            </button>
            <h2 className="text-xl font-bold">Edit profile</h2>
          </div>
          <button
            type="submit"
            form="profile-form"
            disabled={isSubmitting}
            className="px-4 py-1.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-bold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Cover photo with upload button */}
        <div
          className="h-32 rounded-t-2xl bg-cover bg-center relative group"
          style={{
            backgroundImage: `url('${currentBackground}')`,
          }}
        >
          <label className="absolute top-3 right-3 cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors">
              <IconCamera size={16} className="text-white" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "background")}
              disabled={isUploadingBackground}
              className="hidden"
            />
          </label>
          {isUploadingBackground && (
            <div className="absolute inset-0 bg-black/50 rounded-t-2xl flex items-center justify-center">
              <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Form */}
        <form
          id="profile-form"
          onSubmit={handleSubmit(onSubmit)}
          className="px-4 pb-4"
        >
          {/* Avatar with upload button */}
          <div className="-mt-16 mb-4 relative">
            <div
              className="h-24 w-24 rounded-full border-4 border-white dark:border-neutral-900 bg-cover bg-center relative group cursor-pointer"
              style={{
                backgroundImage: `url('${currentAvatar}')`,
              }}
            >
              <label className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <IconCamera size={24} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "avatar")}
                  disabled={isUploadingAvatar}
                  className="hidden"
                />
              </label>
              {isUploadingAvatar && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>
          </div>

          {/* Upload error message */}
          {uploadError && (
            <p className="mb-4 text-sm text-red-500">{uploadError}</p>
          )}

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              First Name
            </label>
            <input
              type="text"
              {...register("first_name")}
              placeholder="Enter your first name"
              className="w-full h-12 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
            />
            {errors.first_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              Last Name
            </label>
            <input
              type="text"
              {...register("last_name")}
              placeholder="Enter your last name"
              className="w-full h-12 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
            />
            {errors.last_name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.last_name.message}
              </p>
            )}
          </div>

          {/* Bio */}
          <div className="mb-4">
            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              Bio
            </label>
            <textarea
              {...register("bio")}
              placeholder="Tell us a little bit about yourself"
              rows={3}
              className="w-full rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-[17px] outline-none focus:border-sky-500 resize-none"
            />
            {errors.bio && (
              <p className="mt-1 text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-sm text-neutral-500 dark:text-neutral-400 mb-1">
              Location
            </label>
            <input
              type="text"
              {...register("location")}
              placeholder="Enter your location"
              className="w-full h-12 rounded-md border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 text-[17px] outline-none focus:border-sky-500"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
