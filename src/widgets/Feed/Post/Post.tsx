import {
  IconHeart,
  IconMessageCircle,
  IconChartLine,
  IconBookmark,
  IconShare3,
  IconUser,
} from "@tabler/icons-react";

export function Post() {
  const postActionBar = [
    {
      icon: IconMessageCircle,
      text: "1",
      bg: "group-hover:bg-blue-200/50",
      textcolor: "group-hover:text-blue-500",
    },
    {
      icon: IconHeart,
      text: "2",
      bg: "group-hover:bg-green-200/50",
      textcolor: "group-hover:text-green-500",
    },
    {
      icon: IconChartLine,
      text: "3",
      bg: "group-hover:bg-red-200/50",
      textcolor: "group-hover:text-red-500",
    },
    {
      icon: IconBookmark,
      bg: "group-hover:bg-blue-200/50",
    },
    {
      icon: IconShare3,
      bg: "group-hover:bg-blue-200/50",
    },
  ];
  return (
    <div className="flex gap-3 p-4 border-b x-divider x-hover-row">
      <div className="avatar rounded-full flex items-center justify-center">
        <IconUser size={32} stroke={1} />
      </div>
      <div className="flex-1">
        <div className="flex gap-2 text-sm leading-5 text-neutral-500 dark:text-neutral-400">
          <span className="font-semibold text-black dark:text-white">User</span>
          <span>@user</span>
          <span>·</span>
          <span>1m</span>
        </div>

        <p className="mt-1 text-[15px] leading-5 font-normal">
          This layout now matches X behavior with proper breakpoints and
          spacing.
        </p>
        <div className="w-full mt-3 bg-slate-100 rounded-xl h-50 h-max-300px"></div>
        <div className="flex justify-between mt-2">
          {postActionBar.map((item, index) => (
            <button key={index} className="group flex items-center">
              <item.icon
                size={38}
                strokeWidth={1.5}
                color="#706f6f"
                className={`  p-2 rounded-full ${item.bg} transition-colors duration-300 ease-in-out`}
              />
              {item.text ? (
                <span
                  className={`ml-1 text-gray-500 text-sm font-semibold ${item.textcolor}`}
                >
                  {item.text}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
