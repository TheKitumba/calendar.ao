import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { pt, ptBR } from "date-fns/locale";
import { ArrowLeft, ArrowRight, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const daysOfTheWeek = getDaysOfTheWeekPT();

  useEffect(() => {
    const savedTheme = localStorage.getItem("calendar-theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      setIsDarkMode(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("calendar-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

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

  const handleToday = () => {
    setDate(new Date());
  };

  const getCalendarDays = () => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const startDate = startOfWeek(start, { locale: pt });
    const endDate = endOfWeek(end, { locale: pt });

    return eachDayOfInterval({ start: startDate, end: endDate });
  };

  const calendarDays = getCalendarDays();

  return (
    <div
      className={`h-full flex flex-col gap-8 py-10 min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-slate-50 to-slate-100"
      }`}
    >
      {/* Header */}
      <div className="flex items-center flex-col lg:flex-row gap-4 justify-between px-6 md:px-10">
        <h1
          className={`text-3xl md:text-6xl font-black text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
            isDarkMode
              ? "from-blue-400 to-purple-400"
              : "from-blue-600 to-purple-600"
          }`}
        >
          Calendário.ao
        </h1>
        <div className="flex w-full items-center justify-between gap-4">
          <button
            className={`text-lg md:text-xl capitalize cursor-pointer h-12 md:h-14 flex items-center justify-center backdrop-blur-sm px-4 md:px-6 border rounded-full shadow-sm hover:shadow-md transition-all duration-200 font-medium ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-600 text-gray-200 hover:bg-gray-700/80"
                : "bg-white/80 border-gray-200 text-gray-800 hover:bg-white"
            }`}
          >
            {format(date, "MMMM yyyy", {
              locale: pt,
            })}
          </button>

          <button
            onClick={toggleTheme}
            className={`size-12 md:size-14 backdrop-blur-sm flex items-center justify-center rounded-full border cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 text-yellow-400"
                : "bg-white/80 border-gray-200 hover:bg-white text-gray-600"
            }`}
          >
            {isDarkMode ? (
              <Sun className="size-5 md:size-6" />
            ) : (
              <Moon className="size-5 md:size-6" />
            )}
          </button>

          <button
            onClick={handlePrevMonth}
            className={`size-12 md:size-14 backdrop-blur-sm flex items-center justify-center rounded-full border cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 text-gray-200"
                : "bg-white/80 border-gray-200 hover:bg-white text-gray-600"
            }`}
          >
            <ArrowLeft className="size-5 md:size-6" />
          </button>

          <button
            onClick={handleToday}
            className={`px-4 md:px-6 h-12 md:h-14 backdrop-blur-sm flex items-center justify-center rounded-full border cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 font-medium ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 text-gray-200"
                : "bg-white/80 border-gray-200 hover:bg-white text-gray-600"
            }`}
          >
            <span className="text-sm md:text-base font-semibold">Hoje</span>
          </button>

          <button
            onClick={handleNextMonth}
            className={`size-12 md:size-14 backdrop-blur-sm flex items-center justify-center rounded-full border cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 ${
              isDarkMode
                ? "bg-gray-800/80 border-gray-600 hover:bg-gray-700/80 text-gray-200"
                : "bg-white/80 border-gray-200 hover:bg-white text-gray-600"
            }`}
          >
            <ArrowRight className="size-5 md:size-6" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col mx-auto w-full px-4 md:px-8">
        <div className="grid grid-cols-7 gap-2 md:gap-4 mb-4">
          {daysOfTheWeek.map((day, index) => (
            <div
              key={index}
              className={`w-full backdrop-blur-sm border rounded-xl h-12 md:h-16 flex items-center justify-center shadow-sm ${
                isDarkMode
                  ? "bg-gray-800/80 border-gray-600"
                  : "bg-white/80 border-gray-200"
              }`}
            >
              <span
                className={`text-sm md:text-lg font-semibold capitalize ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                <span className="hidden md:inline">{day}</span>
                <span className="md:hidden">{day.charAt(0)}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4 flex-1">
          {calendarDays.map((day, index) => {
            const isCurrentMonth = day.getMonth() === date.getMonth();
            const isCurrentDay = isToday(day);

            return (
              <div
                key={index}
                className={`aspect-square rounded-2xl shadow-sm border cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                  isCurrentDay
                    ? "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg scale-105 border-red-400"
                    : isCurrentMonth
                    ? isDarkMode
                      ? "bg-gray-800/90 border-gray-600 hover:bg-gray-700/90"
                      : "bg-white/90 border-gray-200 hover:bg-white"
                    : isDarkMode
                    ? "bg-gray-900/50 border-gray-700 text-gray-500"
                    : "bg-gray-100/50 border-gray-200 text-gray-400"
                }`}
              >
                <div className="h-full flex flex-col p-2 md:p-3">
                  <div className="flex-1 flex items-start justify-end">
                    <span
                      className={`text-sm md:text-lg font-bold ${
                        isCurrentDay
                          ? "text-white"
                          : isCurrentMonth
                          ? isDarkMode
                            ? "text-gray-200"
                            : "text-gray-800"
                          : isDarkMode
                          ? "text-gray-500"
                          : "text-gray-400"
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                  </div>
                  {isCurrentDay && (
                    <div className="flex justify-center mt-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
