"use client";
import React, { useState, useCallback } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setSelectedEvent({ id: 0, title: '', start, end });
      setIsModalOpen(true);
    },
    []
  );

  const handleSelectEvent = useCallback((event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  }, []);

  const handleSaveEvent = useCallback((event: Event) => {
    if (event.id === 0) {
      const newEvent = { ...event, id: Date.now() };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    } else {
      setEvents((prevEvents) =>
        prevEvents.map((e) => (e.id === event.id ? event : e))
      );
    }
    setIsModalOpen(false);
  }, []);

  const handleDeleteEvent = useCallback((eventId: number) => {
    setEvents((prevEvents) => prevEvents.filter((e) => e.id !== eventId));
    setIsModalOpen(false);
  }, []);

  return (
    <div className="min-h-0 px-4 pb-5 h-full flex flex-col flex-grow bg-blue-50">
      <div className="flex-1 min-h-0 bg-blue-500 rounded-md shadow-sm">
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', backgroundColor: 'white', color: '#334155' }}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          defaultView={Views.MONTH}
          toolbar={true}
        />
      </div>
    </div>
  );
};

export default Calendar;
