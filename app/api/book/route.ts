import { NextRequest, NextResponse } from "next/server";
import { getServiceById } from "@/lib/services";
import { isValidBookingDate, isValidTimeSlot } from "@/lib/timeSlots";
import { isValidEmail, isValidUSPhone } from "@/lib/validation";
import { sendBookingEmails } from "@/lib/email";

export const runtime = "nodejs";

interface BookingRequestBody {
  serviceId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  comments?: string;
}

const MAX_COMMENTS_LENGTH = 1000;

export async function POST(req: NextRequest) {
  let body: BookingRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { serviceId, firstName, lastName, email, phone, date, time, comments } = body;
  const service = getServiceById(serviceId);

  const errors: string[] = [];
  if (!service) errors.push("Please select a valid service.");
  if (!firstName?.trim()) errors.push("First name is required.");
  if (!lastName?.trim()) errors.push("Last name is required.");
  if (!email || !isValidEmail(email)) errors.push("A valid email is required.");
  if (!phone || !isValidUSPhone(phone)) errors.push("A valid US phone number is required.");
  if (!date || !isValidBookingDate(date)) {
    errors.push("Please choose a Tuesday–Sunday date, today or later.");
  }
  if (!time || !isValidTimeSlot(time)) errors.push("Please choose a valid appointment time.");
  if (comments && comments.length > MAX_COMMENTS_LENGTH) {
    errors.push(`Comments must be ${MAX_COMMENTS_LENGTH} characters or fewer.`);
  }

  if (errors.length > 0) {
    return NextResponse.json({ ok: false, error: errors.join(" ") }, { status: 400 });
  }

  try {
    await sendBookingEmails({
      service: service!,
      firstName: firstName!.trim(),
      lastName: lastName!.trim(),
      email: email!.trim(),
      phone: phone!.trim(),
      date: date!,
      time: time!,
      comments: comments?.trim() || undefined,
    });
  } catch (err) {
    console.error("Failed to send booking emails:", err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't confirm your booking by email. Please call us directly to book your appointment.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
