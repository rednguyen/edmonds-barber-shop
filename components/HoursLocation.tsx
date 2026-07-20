import { businessInfo, hours } from "@/lib/business-info";

export default function HoursLocation() {
  return (
    <section id="hours" className="bg-cream-alt px-5 py-16">
      <div className="mx-auto grid max-w-4xl gap-10 sm:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl text-espresso">Hours</h2>
          <table className="mt-4 w-full text-sm">
            <tbody>
              {hours.map((row) => (
                <tr key={row.day} className="border-b border-gold/20">
                  <td className="py-2 font-medium text-espresso">{row.day}</td>
                  <td
                    className={`py-2 text-right ${
                      row.hours === "Closed" ? "text-espresso-light/60" : "text-espresso-light"
                    }`}
                  >
                    {row.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h2 className="font-display text-2xl text-espresso">Location</h2>
          <p className="mt-4 text-espresso-light">
            {businessInfo.address.line1}
            <br />
            {businessInfo.address.line2}
          </p>
          <a
            href={businessInfo.address.mapUrl}
            className="mt-4 inline-block rounded-full border border-espresso/20 px-5 py-2 text-sm font-semibold text-espresso transition hover:border-espresso"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
