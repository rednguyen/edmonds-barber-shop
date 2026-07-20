"use client";

import { useBooking } from "@/components/BookingProvider";

export default function BookNowButton() {
  const { openBooking } = useBooking();

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:p-0">
      <button
        type="button"
        onClick={() => openBooking()}
        className="block w-full rounded-full bg-gold px-6 py-4 text-center text-base font-semibold text-espresso shadow-xl shadow-espresso/20 ring-2 ring-cream transition hover:bg-gold-dark active:scale-[0.98] sm:w-auto sm:px-8"
      >
        Book Now
      </button>
    </div>
  );
}
