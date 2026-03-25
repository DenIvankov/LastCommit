import { IconPolaroid, IconMoodSmile, IconGif, IconUser } from "@tabler/icons-react";
import { useState } from "react";

export function PostBox() {
  const [text, setText] = useState("");
  const isDisabled = text.trim().length === 0;

  return (
    <div className="flex gap-3 p-4 border-b x-divider">
      <div className="avatar rounded-full flex items-center justify-center">
        <IconUser size={32} stroke={1} />
      </div>
      <div className="flex-1">
        <textarea
          className="w-full min-h-10 bg-transparent outline-none resize-none text-lg leading-6 pt-2 placeholder:text-xl"
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-between items-center mt-2">
          <div>
            <button className="x-button-tool">
              <IconPolaroid color="#1DA1F2" stroke={2} size={20} />
            </button>
            <button className="x-button-tool">
              <IconMoodSmile color="#1DA1F2" stroke={2} size={20} />
            </button>
            <button className="x-button-tool">
              <IconGif color="#1DA1F2" stroke={2} size={20} />
            </button>
          </div>
          <button disabled={isDisabled} className="x-button-primary">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
