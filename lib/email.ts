import { Resend } from "resend";
import { businessInfo } from "@/lib/business-info";
import { formatDisplayDate, formatTimeLabel } from "@/lib/timeSlots";
import type { Service } from "@/lib/services";

export interface BookingDetails {
  service: Service;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  comments?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getOwnerCcEmails(): string[] {
  return [process.env.OWNER_EMAIL_2, process.env.OWNER_EMAIL_3].filter(
    (email): email is string => Boolean(email)
  );
}

function getFromEmail(): string {
  return process.env.BOOKING_FROM_EMAIL || "booking@edmondsbarbershop.com";
}

function bookingEmailHtml(b: BookingDetails): string {
  return `
    <h2>Booking request confirmed</h2>
    <p>Hi ${escapeHtml(b.firstName)}, thanks for booking with ${businessInfo.name}! Here's what was requested:</p>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(b.firstName)} ${escapeHtml(b.lastName)}</li>
      <li><strong>Service:</strong> ${escapeHtml(b.service.name)} ($${b.service.price})</li>
      <li><strong>Date:</strong> ${formatDisplayDate(b.date)}</li>
      <li><strong>Time:</strong> ${formatTimeLabel(b.time)}</li>
      <li><strong>Email:</strong> ${escapeHtml(b.email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(b.phone)}</li>
    </ul>
    ${
      b.comments
        ? `<p><strong>Comments:</strong><br/>${escapeHtml(b.comments).replace(/\n/g, "<br/>")}</p>`
        : ""
    }
    <p>We'll reach out if we need to confirm or adjust anything. See you soon!</p>
    <p>${businessInfo.name}<br/>${businessInfo.phone}<br/>${businessInfo.address.line1}, ${businessInfo.address.line2}</p>
  `;
}

export async function sendBookingEmails(booking: BookingDetails): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Email is not configured (missing RESEND_API_KEY).");
  }

  const primaryOwnerEmail = process.env.OWNER_EMAIL_1;
  if (!primaryOwnerEmail) {
    throw new Error("Email is not configured (missing OWNER_EMAIL_1).");
  }
  const ownerCcEmails = getOwnerCcEmails();

  const resend = new Resend(apiKey);
  const from = getFromEmail();

  const { error } = await resend.emails.send({
    from,
    to: [primaryOwnerEmail, booking.email],
    ...(ownerCcEmails.length > 0 ? { cc: ownerCcEmails } : {}),
    subject: `Booking request: ${booking.firstName} ${booking.lastName} — ${booking.service.name}`,
    html: bookingEmailHtml(booking),
  });

  if (error) {
    throw new Error("Failed to send the booking confirmation email.");
  }
}
