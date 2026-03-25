import { clearAccessToken, emitUnauthorized, getAccessToken } from "@/shared/auth/session";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

let interceptorInstalled = false;

function hasAuthorizationHeader(init?: RequestInit) {
  const headers = new Headers(init?.headers);
  return Boolean(headers.get("Authorization"));
}

export function withAuth(options?: RequestInit): RequestInit {
  const token = getAccessToken();
  const headers = new Headers(options?.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return {
    ...options,
    headers: Object.fromEntries(headers.entries()),
  };
}

export function installApi401Interceptor() {
  if (interceptorInstalled) return;
  interceptorInstalled = true;

  const originalFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await originalFetch(input, init);

    const requestUrl =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.toString()
          : input.url;

    if (
      response.status === 401 &&
      hasAuthorizationHeader(init) &&
      requestUrl.startsWith(API_BASE_URL)
    ) {
      clearAccessToken();
      emitUnauthorized();
    }

    return response;
  };
}
