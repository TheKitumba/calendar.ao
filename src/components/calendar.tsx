import { format } from "date-fns/format";
import { getDay } from "date-fns/getDay";
import { pt } from "date-fns/locale/pt";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { useState } from "react";
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  Views,
  type DateRange,
  type View,
} from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const DnDCalendar = withDragAndDrop(BigCalendar);

const localize = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: {
    "pt-PT": pt,
  },
});

const formats = {
  dateFormat: "d",
  dayFormat: "d",
  monthHeaderFormat: "MMMM yyyy",
  dayHeaderFormat: "d MMMM",
  timeGutterFormat: "HH:mm",
  dayRangeHeaderFormat: ({ start, end }: DateRange) =>
    `${format(start, "d MMMM", { locale: pt })} - ${format(end, "d MMMM yyyy", {
      locale: pt,
    })}`,
};

const messages = {
  today: "Hoje",
  previous: "Anterior",
  next: "Próximo",
  month: "Mês",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  showMore: (total: number) => `+ Ver mais (${total})`,
};

export function Calendar() {
  const [view, setView] = useState<View>(Views.MONTH);
  const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="min-h-[600px] h-full max-w-5xl mx-auto w-full">
      <DnDCalendar
        culture={"pt-PT"}
        localizer={localize}
        view={view}
        onView={setView}
        date={date}
        min={new Date()}
        onNavigate={setDate}
        formats={formats}
        messages={messages}
        className="h-full min-h-[600px] w-full max-w-full px-4 py-4 text-inherit"
        popup
        eventPropGetter={() => {
          return {
            className: "event-item",
          };
        }}
        dayPropGetter={() => {
          return {
            className: "bg-blue-50",
            style: {
              margin: 0,
              padding: 0,
            },
          };
        }}
      />
    </div>
  );
}
