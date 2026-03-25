export function News() {
  const news = [
    { new: "US and Israel Strike Iranian Energy Sites Despite Trump's Pause" },
    { new: "US and Israel Strike Iranian Energy Sites Despite Trump's Pause" },
    { new: "US and Israel Strike Iranian Energy Sites Despite Trump's Pause" },
  ];

  return (
    <div className="theme-surface-gray rounded-2xl p-4 mb-4">
      <h3 className="text-[21px] leading-9 font-bold tracking-tight mb-3">
        Today's News
      </h3>
      {news.map((item, i) => (
        <NewsItem key={i} text={item.new} />
      ))}
    </div>
  );
}

function NewsItem({ text }: { text: string }) {
  return (
    <div className="py-2 x-hover-row px-0 rounded cursor-pointer text-[15px] leading-5 font-semibold">
      {text}
    </div>
  );
}
