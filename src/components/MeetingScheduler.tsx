import { useMemo, useState } from "react";
import { Clock, Globe2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  getMeetingSlotsForDate,
  MEETING_TIMEZONE,
  MEETING_TIMEZONE_ABBR,
  MEETING_TIMEZONE_LABEL,
  type MeetingSlot,
} from "@/constants";

// Offset (ms) that `timeZone`'s wall clock is ahead of UTC at `date`.
function getTimeZoneOffsetMs(date: Date, timeZone: string) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  const asUTC = Date.UTC(
    Number(parts.year),
    Number(parts.month) - 1,
    Number(parts.day),
    Number(parts.hour),
    Number(parts.minute),
    Number(parts.second)
  );
  return asUTC - date.getTime();
}

// Converts a wall-clock date/time meant in `timeZone` into the real UTC instant it represents.
function zonedTimeToUtc(dateStr: string, timeStr: string, timeZone: string) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute] = timeStr.split(":").map(Number);
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const offset = getTimeZoneOffsetMs(new Date(guess), timeZone);
  return new Date(guess - offset);
}

function toDateKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function fromDateKey(key: string) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const dateLabelFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

function formatTime(utcDate: Date, timeZone: string) {
  return utcDate.toLocaleTimeString("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  });
}

export interface MeetingRequestDetails {
  summary: string;
  date: string;
  time: string;
  timezone: string;
}

interface MeetingSchedulerProps {
  onSlotChange: (details: MeetingRequestDetails | null) => void;
}

const MeetingScheduler = ({ onSlotChange }: MeetingSchedulerProps) => {
  const visitorTimeZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    []
  );
  const showVisitorTime = visitorTimeZone !== MEETING_TIMEZONE;

  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);
  const todayKey = toDateKey(today);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [selectedSlot, setSelectedSlot] = useState<MeetingSlot | null>(null);

  const selectedDateKey = selectedDate ? toDateKey(selectedDate) : "";
  const slotsForDate = useMemo(() => {
    if (!selectedDateKey) return [];
    return getMeetingSlotsForDate(selectedDateKey).filter(
      (slot) =>
        zonedTimeToUtc(slot.date, slot.startTime, MEETING_TIMEZONE).getTime() >
        Date.now()
    );
  }, [selectedDateKey]);

  const handleSelectDate = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
    onSlotChange(null);
  };

  const handleSelectSlot = (slot: MeetingSlot) => {
    setSelectedSlot(slot);
    const startUtc = zonedTimeToUtc(slot.date, slot.startTime, MEETING_TIMEZONE);
    const endUtc = zonedTimeToUtc(slot.date, slot.endTime, MEETING_TIMEZONE);
    const dateLabel = dateLabelFormatter.format(fromDateKey(slot.date));
    const timeLabel = `${formatTime(startUtc, MEETING_TIMEZONE)} - ${formatTime(
      endUtc,
      MEETING_TIMEZONE
    )}`;
    onSlotChange({
      summary: `I'd like to schedule a meeting on ${dateLabel} from ${timeLabel} (${MEETING_TIMEZONE_LABEL}).`,
      date: dateLabel,
      time: timeLabel,
      timezone: MEETING_TIMEZONE_LABEL,
    });
  };

  return (
    <div>
      <div className="flex items-start gap-3 bg-sky-50 border border-sky-100 rounded-lg px-4 py-3 mb-6">
        <Globe2 className="text-portfolio-primary mt-0.5 flex-shrink-0" size={20} />
        <div className="text-sm">
          <p className="text-gray-800">
            All times shown in{" "}
            <span className="font-medium">{MEETING_TIMEZONE_LABEL}</span>
          </p>
          {showVisitorTime && (
            <p className="text-portfolio-gray">
              Your local time zone: {visitorTimeZone}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelectDate}
          defaultMonth={today}
          disabled={(date) => toDateKey(date) < todayKey}
          className="rounded-md border p-3 mx-auto"
        />

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <Clock size={16} />
            {selectedDate ? dateLabelFormatter.format(selectedDate) : "Select a date"}
          </h4>

          {slotsForDate.length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {slotsForDate.map((slot) => {
                const startUtc = zonedTimeToUtc(slot.date, slot.startTime, MEETING_TIMEZONE);
                const endUtc = zonedTimeToUtc(slot.date, slot.endTime, MEETING_TIMEZONE);
                const isSelected =
                  selectedSlot?.date === slot.date &&
                  selectedSlot?.startTime === slot.startTime;
                return (
                  <button
                    key={`${slot.date}-${slot.startTime}`}
                    type="button"
                    onClick={() => handleSelectSlot(slot)}
                    className={`px-3 py-2 rounded-md text-sm border text-left transition-colors ${
                      isSelected
                        ? "bg-portfolio-primary/10 border-portfolio-primary text-portfolio-primary font-medium ring-1 ring-portfolio-primary"
                        : "bg-white border-gray-300 text-gray-700 hover:border-portfolio-primary"
                    }`}
                  >
                    <div>
                      {formatTime(startUtc, MEETING_TIMEZONE)} –{" "}
                      {formatTime(endUtc, MEETING_TIMEZONE)}
                    </div>
                    {showVisitorTime && (
                      <div className="text-xs text-portfolio-gray">
                        {formatTime(startUtc, visitorTimeZone)} –{" "}
                        {formatTime(endUtc, visitorTimeZone)} your time
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-portfolio-gray">
              No times available on this date - pick a highlighted date on the
              calendar.
            </p>
          )}

          {selectedSlot && (
            <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2 mt-4">
              Selected: {dateLabelFormatter.format(selectedDate as Date)} ·{" "}
              {formatTime(
                zonedTimeToUtc(selectedSlot.date, selectedSlot.startTime, MEETING_TIMEZONE),
                MEETING_TIMEZONE
              )}
              {" – "}
              {formatTime(
                zonedTimeToUtc(selectedSlot.date, selectedSlot.endTime, MEETING_TIMEZONE),
                MEETING_TIMEZONE
              )}{" "}
              ({MEETING_TIMEZONE_ABBR})
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MeetingScheduler;
