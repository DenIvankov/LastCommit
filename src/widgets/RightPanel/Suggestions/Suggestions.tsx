import { IconUser } from "@tabler/icons-react";

export function Suggestions() {
  return (
    <div className="theme-surface-gray rounded-2xl py-4">
      <h3 className="text-[21px] leading-9 font-bold tracking-tight mb-3 px-4">
        Who to follow
      </h3>
      {[1, 2, 3].map((i) => (
        <UserItem key={i} id={i} />
      ))}
    </div>
  );
}

function UserItem({ id }: { id: number }) {
  return (
    <div className="flex items-center justify-between py-2 px-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-300">
      <div className="flex items-center gap-2">
        <div className="avatar flex items-center justify-center">
          <IconUser size={32} stroke={1} />
        </div>
        <span className="text-[15px] leading-5 font-normal hover:underline underline-offset-2">
          User {id}
        </span>
      </div>
      <button className="x-button-follow">Follow</button>
    </div>
  );
}
