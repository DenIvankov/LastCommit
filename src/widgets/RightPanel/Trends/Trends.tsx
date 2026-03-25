export function Trends() {
  return (
    <div className="theme-surface-gray rounded-2xl p-4 mb-4">
      <h3 className="text-[21px] leading-9 font-bold tracking-tight mb-3">
        Trends for you
      </h3>
      {["React", "Tailwind", "Vite"].map((t) => (
        <TrendItem key={t} tag={t} />
      ))}
    </div>
  );
}

function TrendItem({ tag }: { tag: string }) {
  return (
    <div className="py-2 x-hover-row px-0 rounded cursor-pointer text-[15px] leading-5 font-semibold">
      #{tag}
    </div>
  );
}
