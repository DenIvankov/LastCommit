import {
  IconBell,
  IconBellFilled,
  IconBookmarks,
  IconBookmarksFilled,
  IconBrandX,
  IconHome,
  IconHomeFilled,
  IconMail,
  IconMailFilled,
  IconSearch,
  IconSearchFilled,
  IconUser,
  IconUserFilled,
} from "@tabler/icons-react";
import { cloneElement, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { ThemeToggle } from "../../shared/theme/ThemeToggle";

type SidebarProps = Record<string, never>;

export default function Sidebar({}: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const iconSize = 28;
  const [isMobileBarTransparent, setIsMobileBarTransparent] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) < 2) return;

      if (delta > 0 && currentScrollY > 8) {
        setIsMobileBarTransparent(true);
      } else if (delta < 0 || currentScrollY <= 8) {
        setIsMobileBarTransparent(false);
      }

      lastScrollY = currentScrollY;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const navBar = [
    {
      id: 1,
      name: "Home",
      path: "/Home",
      icon: <IconHome stroke={1.5} />,
      icon_active: <IconHomeFilled />,
    },
    {
      id: 2,
      name: "Explore",
      path: "/Explore",
      icon: <IconSearch stroke={1.5} />,
      icon_active: <IconSearchFilled />,
    },
    {
      id: 3,
      name: "Notifications",
      path: "/Notifications",
      icon: <IconBell stroke={1.5} />,
      icon_active: <IconBellFilled />,
    },
    {
      id: 4,
      name: "Messages",
      path: "/Messages",
      icon: <IconMail stroke={1.5} />,
      icon_active: <IconMailFilled />,
    },
    {
      id: 5,
      name: "Bookmarks",
      path: "/Bookmarks",
      icon: <IconBookmarks stroke={1.5} />,
      icon_active: <IconBookmarksFilled />,
    },
    {
      id: 6,
      name: "Profile",
      path: "/Profile",
      icon: <IconUser stroke={1.5} />,
      icon_active: <IconUserFilled />,
    },
  ];

  return (
    <>
      <div
        className="
          hidden sm:flex
          flex-col
          w-[68px] xl:w-[275px]
          px-2 xl:px-4
          sticky top-0 h-screen
        "
      >
        <div className="mt-1 flex h-14 w-14 items-center justify-center rounded-full p-3 hover:bg-neutral-100">
          <IconBrandX stroke={1.2} className="text-current" size={34} />
        </div>

        <nav className="mt-2 flex flex-col gap-2 text-xl">
          {navBar.map((item) => (
            <div
              key={item.id}
              className="
                flex items-center gap-4
                x-hover-row
                rounded-full
                px-3 py-3
                cursor-pointer
              "
              onClick={() => {
                navigate(item.path);
              }}
            >
              <span>
                {cloneElement(
                  location.pathname === item.path
                    ? item.icon_active
                    : item.icon,
                  {
                    size: iconSize,
                  },
                )}
              </span>
              <span
                className={`hidden xl:inline text-xl leading-6 ${location.pathname === item.path ? "font-bold" : "font-normal"}`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </nav>

        <button className="x-button-post">
          <span className="hidden rounded-full xl:inline">Post</span>
          <span className="xl:hidden">+</span>
        </button>
        <ThemeToggle />
      </div>

      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 border-t x-divider  transition-colors duration-300 sm:hidden ${
          isMobileBarTransparent
            ? "bg-white/15 dark:bg-neutral-900/55"
            : "bg-white/95 dark:bg-neutral-900/95"
        }`}
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navBar.slice(0, 5).map((item) => (
            <button
              key={item.id}
              type="button"
              aria-label={item.name}
              onClick={() => navigate(item.path)}
              className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {cloneElement(
                location.pathname === item.path ? item.icon_active : item.icon,
                {
                  size: 24,
                },
              )}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
