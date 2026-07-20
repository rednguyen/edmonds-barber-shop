// Central place for all business details. Replace the TODO values below
// with the real logo, story, address, contact info, and social links.
export const businessInfo = {
  name: "Edmonds Barber Shop",
  tagline: "Edmonds' Home for Great Haircuts", // e.g. "Classic cuts, modern style."
  story: `Edmonds Barber Shop is a locally owned barbershop proudly serving the Edmonds, Washington community since July 2026. We specialize in quality haircuts, fades, beard trims, and classic grooming services for men and boys. Our goal is to provide every customer with a clean, precise cut in a friendly, welcoming atmosphere—so you leave looking sharp and feeling confident.`,
  logoSrc: "/logo-placeholder.png", // TODO: replace with real logo file in /public
  address: {
    line1: "23632 Highway 99 STE R", // TODO: replace with real street address
    line2: "Edmonds, WA 98026", // TODO: replace with real city, state, and ZIP code  
    mapUrl: "https://maps.app.goo.gl/yw15AUa28czyTCkP8", // TODO: replace with a Google Maps link
  },
  phone: "425-245-8372", // TODO: replace, e.g. "(425) 555-0123"
  email: "edmondsbarbershop@gmail.com", // TODO: replace with real business email
  facebookUrl: "#", // TODO: replace with real Facebook page URL
  instagramUrl: "#", // TODO: replace with real Instagram profile URL
};

export const hours: { day: string; hours: string }[] = [
  { day: "Monday", hours: "9:00 AM – 7:00 PM" },
  { day: "Tuesday", hours: "Closed" },
  { day: "Wednesday", hours: "9:00 AM – 7:00 PM" },
  { day: "Thursday", hours: "9:00 AM – 7:00 PM" },
  { day: "Friday", hours: "9:00 AM – 7:00 PM" },
  { day: "Saturday", hours: "9:00 AM – 6:00 PM" },
  { day: "Sunday", hours: "10:00 AM – 5:00 PM" },
];
