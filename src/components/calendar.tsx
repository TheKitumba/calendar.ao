export function Calendar() {
  return (
    <div className="grid grid-cols-7  gap-2 px-3 md:px-10 pb-10">
      {Array.from({ length: 42 }).map((_, index) => (
        <button className="aspect-square bg-white border flex items-start p-2 md:p-5 text-base md:text-4xl font-black">
          {index}
        </button>
      ))}
    </div>
  );
}
