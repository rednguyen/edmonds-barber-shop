"use client";

import { serviceCategories } from "@/lib/services";
import { useBooking } from "@/components/BookingProvider";

export default function Services() {
  const { openBooking } = useBooking();

  return (
    <section id="services" className="bg-cream-alt px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl text-espresso">Services & Pricing</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <div key={category.id} className="rounded-2xl bg-white/60 p-6 shadow-sm">
              <h3 className="font-display text-xl text-espresso-light">{category.title}</h3>
              <ul className="mt-4 space-y-3">
                {category.services.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => openBooking(service.id)}
                      className="flex w-full items-center justify-between border-b border-gold/20 pb-2 text-left transition hover:text-gold-dark"
                    >
                      <span>{service.name}</span>
                      <span className="font-semibold">${service.price}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
