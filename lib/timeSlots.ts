// Business hours: Tuesday (2) through Sunday (0), closed Monday (1).
export const OPEN_HOUR = 9; // 9:00 AM
export const CLOSE_HOUR = 18; // 6:00 PM
export const SLOT_MINUTES = 30;
export const CLOSED_WEEKDAY = 1; // JS Date.getDay(): 0 = Sunday, 1 = Monday

/** "09:00", "09:30", ... "17:30" — last slot leaves a full 30 min before closing. */
export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  const totalMinutesOpen = (CLOSE_HOUR - OPEN_HOUR) * 60;
  for (let m = 0; m < totalMinutesOpen; m += SLOT_MINUTES) {
    const hour = OPEN_HOUR + Math.floor(m / 60);
    const minute = m % 60;
    slots.push(`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`);
  }
  return slots;
}

export function formatTimeLabel(time: string): string {
  const [hourStr, minuteStr] = time.split(":");
  const hour = Number(hourStr);
  const minute = Number(minuteStr);
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour}:${String(minute).padStart(2, "0")} ${period}`;
}

export function isValidTimeSlot(time: string): boolean {
  return generateTimeSlots().includes(time);
}

/** Parses a "YYYY-MM-DD" date-only string as a local date (avoids UTC off-by-one). */
export function parseDateOnly(dateStr: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }
  return date;
}

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function isValidBookingDate(dateStr: string): boolean {
  const date = parseDateOnly(dateStr);
  if (!date) return false;
  if (date.getDay() === CLOSED_WEEKDAY) return false;
  return date.getTime() >= startOfToday().getTime();
}

export function formatDisplayDate(dateStr: string): string {
  const date = parseDateOnly(dateStr);
  if (!date) return dateStr;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Minimum value for a <input type="date" min=...> — today, local time. */
export function todayDateString(): string {
  const today = startOfToday();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
