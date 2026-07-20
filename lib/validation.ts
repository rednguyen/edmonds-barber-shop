export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/** Accepts a formatted or raw 10-digit US phone number. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidUSPhone(value: string): boolean {
  const digits = digitsOnly(value);
  return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}

/** Formats digits as the user types into (XXX) XXX-XXXX. */
export function formatUSPhone(value: string): string {
  const digits = digitsOnly(value).slice(0, 10);
  const len = digits.length;
  if (len === 0) return "";
  if (len < 4) return `(${digits}`;
  if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
