"use client";

import { useEffect, useMemo, useState } from "react";
import { useBooking } from "@/components/BookingProvider";
import { serviceCategories, getServiceById } from "@/lib/services";
import {
  formatDisplayDate,
  formatTimeLabel,
  generateTimeSlots,
  isValidBookingDate,
  isValidTimeSlot,
  todayDateString,
} from "@/lib/timeSlots";
import { formatUSPhone, isValidEmail, isValidUSPhone } from "@/lib/validation";

type Step = "service" | "details" | "success";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  comments: string;
}

const emptyForm: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  comments: "",
};

const timeSlots = generateTimeSlots();

export default function BookingModal() {
  const { isOpen, preselectedServiceId, closeBooking } = useBooking();
  const [step, setStep] = useState<Step>("service");
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const selectedService = getServiceById(selectedServiceId);
  const minDate = useMemo(() => todayDateString(), []);

  useEffect(() => {
    if (isOpen) {
      setSelectedServiceId(preselectedServiceId);
      setStep(preselectedServiceId ? "details" : "service");
      setForm(emptyForm);
      setErrors({});
      setSubmitError(null);
    }
  }, [isOpen, preselectedServiceId]);

  if (!isOpen) return null;

  function handleClose() {
    closeBooking();
  }

  function handleSelectService(id: string) {
    setSelectedServiceId(id);
    setStep("details");
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) nextErrors.lastName = "Last name is required.";
    if (!isValidEmail(form.email)) nextErrors.email = "Enter a valid email address.";
    if (!isValidUSPhone(form.phone)) nextErrors.phone = "Enter a valid 10-digit US phone number.";
    if (!form.date || !isValidBookingDate(form.date)) {
      nextErrors.date = "Choose a Tuesday–Sunday date, today or later (we're closed Mondays).";
    }
    if (!form.time || !isValidTimeSlot(form.time)) nextErrors.time = "Choose an appointment time.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService) return;
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selectedService.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStep("success");
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "We couldn't submit your booking. Please call us to book directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-espresso/60 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Book an appointment"
      onClick={handleClose}
    >
      <div
        className="w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-cream shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gold/30 bg-cream px-5 py-4">
          <h2 className="font-display text-xl text-espresso">
            {step === "success" ? "You're booked!" : "Book an Appointment"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close booking form"
            className="rounded-full p-2 text-espresso-light hover:bg-cream-alt"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-5">
          {step === "service" && (
            <div className="space-y-6">
              {serviceCategories.map((category) => (
                <div key={category.id}>
                  <h3 className="mb-2 font-display text-base text-espresso-light">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.services.map((service) => (
                      <li key={service.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectService(service.id)}
                          className="flex w-full items-center justify-between rounded-lg border border-gold/30 bg-white/50 px-4 py-3 text-left transition hover:border-gold hover:bg-cream-alt"
                        >
                          <span>{service.name}</span>
                          <span className="flex shrink-0 items-baseline gap-2 text-sm font-semibold text-espresso-light">
                            <span title="Card price">${service.price} Card</span>
                            <span className="text-espresso-light/50">/</span>
                            <span title="Cash price" className="text-gold-dark">
                              ${service.priceCash} Cash
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {step === "details" && selectedService && (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-cream-alt px-4 py-3">
                <div>
                  <p className="text-sm text-espresso-light">Selected service</p>
                  <p className="font-semibold">{selectedService.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-display text-lg text-espresso">
                    ${selectedService.price} <span className="text-sm">Card</span>
                  </p>
                  <p className="text-sm font-semibold text-gold-dark">
                    ${selectedService.priceCash} Cash
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep("service")}
                    className="text-xs text-espresso-light underline"
                  >
                    Change
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="First Name" error={errors.firstName}>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    className={inputClass(!!errors.firstName)}
                    autoComplete="given-name"
                  />
                </Field>
                <Field label="Last Name" error={errors.lastName}>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    className={inputClass(!!errors.lastName)}
                    autoComplete="family-name"
                  />
                </Field>
              </div>

              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={inputClass(!!errors.email)}
                  autoComplete="email"
                />
              </Field>

              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => updateField("phone", formatUSPhone(e.target.value))}
                  placeholder="(425) 555-0123"
                  className={inputClass(!!errors.phone)}
                  autoComplete="tel"
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Date" error={errors.date}>
                  <input
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={(e) => updateField("date", e.target.value)}
                    className={inputClass(!!errors.date)}
                  />
                </Field>
                <Field label="Time" error={errors.time}>
                  <select
                    value={form.time}
                    onChange={(e) => updateField("time", e.target.value)}
                    className={inputClass(!!errors.time)}
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {formatTimeLabel(slot)}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label="Comments (optional)">
                <textarea
                  value={form.comments}
                  onChange={(e) => updateField("comments", e.target.value)}
                  placeholder="Anything you'd like us to know before your appointment?"
                  rows={3}
                  className={inputClass(false)}
                />
              </Field>

              {form.date && !errors.date && (
                <p className="text-sm text-espresso-light">
                  Requesting: {formatDisplayDate(form.date)}
                  {form.time ? ` at ${formatTimeLabel(form.time)}` : ""}
                </p>
              )}

              {submitError && (
                <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-espresso shadow-md transition hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Submitting…" : "Request Appointment"}
              </button>
            </form>
          )}

          {step === "success" && selectedService && (
            <div className="space-y-4 text-center">
              <p className="text-5xl">✂️</p>
              <p className="font-display text-lg">Thanks, {form.firstName}!</p>
              <p className="text-espresso-light">
                We've received your request for <strong>{selectedService.name}</strong> on{" "}
                {formatDisplayDate(form.date)} at {formatTimeLabel(form.time)}. A confirmation
                email is on its way to {form.email}.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-2 w-full rounded-full bg-espresso px-6 py-3 font-semibold text-cream shadow-md transition hover:bg-espresso-light"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-espresso-light">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(hasError: boolean): string {
  return [
    "w-full rounded-lg border bg-white px-3 py-2 text-espresso outline-none transition",
    "focus:ring-2 focus:ring-gold",
    hasError ? "border-red-400" : "border-gold/30",
  ].join(" ");
}
