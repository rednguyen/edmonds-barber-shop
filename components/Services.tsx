import { Fragment } from "react";
import { serviceCategories } from "@/lib/services";

export default function Services() {
  return (
    <section id="services" className="bg-cream-alt px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl text-espresso">Services & Pricing</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((category) => (
            <div key={category.id} className="rounded-2xl bg-white/60 p-6 shadow-sm">
              <h3 className="font-display text-xl text-espresso-light">{category.title}</h3>

              <div className="mt-4 grid grid-cols-[1fr_auto_auto] items-center gap-x-4 gap-y-3">
                <div />
                <div className="text-right text-xs font-semibold tracking-wide text-espresso-light uppercase">
                  With Card
                </div>
                <div className="text-right text-xs font-semibold tracking-wide text-gold-dark uppercase">
                  Cash Discount
                </div>
                <div className="col-span-3 border-b border-gold/20" />

                {category.services.map((service) => (
                  <Fragment key={service.id}>
                    <div>{service.name}</div>
                    <div className="text-right font-semibold">${service.price}</div>
                    <div className="text-right font-semibold text-gold-dark">
                      ${service.priceCash}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
