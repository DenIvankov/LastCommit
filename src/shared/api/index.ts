// Реэкспорт сгенерированного API с использованием нашего axiosInstance
import { axiosInstance } from "@/shared/api/axios";

// Auth
import { getAuth } from "./generated/auth/auth";
export const authApi = getAuth(axiosInstance);
export { getAuth } from "./generated/auth/auth";

// Profile
import { getProfile } from "./generated/profile/profile";
export const profileApi = getProfile(axiosInstance);
export { getProfile } from "./generated/profile/profile";

// Posts
import { getPosts } from "./generated/posts/posts";
export const postsApi = getPosts(axiosInstance);
export { getPosts } from "./generated/posts/posts";

// Comments
import { getComments } from "./generated/comments/comments";
export const commentsApi = getComments(axiosInstance);
export { getComments } from "./generated/comments/comments";

// Users
import { getUsers } from "./generated/users/users";
export const usersApi = getUsers(axiosInstance);
export { getUsers } from "./generated/users/users";

// Uploads
import { getUploads } from "./generated/uploads/uploads";
export const uploadsApi = getUploads(axiosInstance);
export { getUploads } from "./generated/uploads/uploads";

// Models
export * from "./generated/models";
