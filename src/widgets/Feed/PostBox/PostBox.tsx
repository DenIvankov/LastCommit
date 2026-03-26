import { Link } from "react-router";
import { IconPolaroid, IconMoodSmile, IconGif } from "@tabler/icons-react";
import { useState } from "react";

export function PostBox() {
  const [text, setText] = useState("");
  const isDisabled = text.trim().length === 0;

  return (
    <div className="flex gap-3 p-4 border-b x-divider">
      <Link to="/Profile" className="flex-shrink-0">
        <div
          className="h-10 w-10 rounded-full bg-cover bg-center border border-gray-400  bg-neutral-300 hover:bg-neutral-700"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/png-clipart/20241018/original/pngtree-cartoon-skull-grinning-with-big-eyes-3d-illustration-clipart-png-image_16374217.png')",
          }}
        />
      </Link>
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
