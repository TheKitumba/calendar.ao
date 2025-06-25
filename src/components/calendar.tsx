import {
  addMonths,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDaysInMonth,
  startOfWeek,
} from "date-fns";
import { pt, ptBR } from "date-fns/locale";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

function getDaysOfTheWeekPT(): string[] {
  const hoje = new Date();
  const startWeek = startOfWeek(hoje, { locale: pt });
  const weekend = endOfWeek(hoje, { locale: pt });

  const days = eachDayOfInterval({
    start: startWeek,
    end: weekend,
  });

  return days.map((dia) => format(dia, "EEEE", { locale: ptBR }));
}

export function Calendar() {
  const [date, setDate] = useState(new Date());
  const daysInMonth = getDaysInMonth(date);
  const daysOfTheWeek = getDaysOfTheWeekPT();

  const handlePrevMonth = () => {
    setDate((prev) => {
      return addMonths(prev, -1);
    });
  };

  const handleNextMonth = () => {
    setDate((prev) => {
      return addMonths(prev, 1);
    });
  };

  return (
    <div className="h-full flex flex-col gap-6 py-10">
      <div className="flex items-center justify-between px-10">
        <h1 className="text-4xl md:text-7xl font-black text-center">
          Caledário.ao - {date.getFullYear()} -{" "}
          {format(date, "MMMM", { locale: pt })}
        </h1>
        <div className="flex items-center justify-between gap-3">
          <button className="text-xl capitalize cursor-pointer h-14 flex items-center justify-center bg-neutral-300 px-6 border rounded-full">
            {format(date, "MMMM", {
              locale: pt,
            })}
          </button>
          <button
            onClick={handlePrevMonth}
            className="size-14 bg-neutral-300 flex items-center justify-center rounded-full border cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNextMonth}
            className="size-14 bg-neutral-300 flex items-center justify-center rounded-full border cursor-pointer"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
      <hr />

      <div>
        <div className="grid grid-cols-7 border-collapse gap-4 px-3 md:px-10 pb-10">
          {daysOfTheWeek.map((item) => (
            <button className="w-full bg-neutral-200 border rounded-full h-14">
              {item}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-7 border-collapse gap-4 px-3 md:px-10 pb-10">
          {Array.from({ length: daysInMonth }).map((_, index) => (
            <button
              key={index}
              className={`aspect-square hover:scale-105 hover:shadow-2xl duration-75 transition-all rounded-2xl shadow-sm bg-neutral-200 bg-gradient-to-b from-neutral-200 to-neutral-400 cursor-pointer border flex items-start p-2 md:p-5 text-base md:text-4xl font-black`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
