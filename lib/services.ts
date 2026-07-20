export interface Service {
  id: string;
  name: string;
  price: number;
  priceCash: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "men",
    title: "Men",
    services: [
      { id: "regular", name: "Regular", price: 30, priceCash: 27 },
      { id: "zero-fade", name: "Zero Fade", price: 35, priceCash: 32 },
      { id: "beard-trim-shave", name: "Beard Trim/Shave", price: 23, priceCash: 20 },
      { id: "hot-towel-shave", name: "Hot Towel Shave", price: 35, priceCash: 32 },
      { id: "buzz-cut", name: "Buzz Cut (One Length)", price: 25, priceCash: 22 },
    ],
  },
  {
    id: "kid-seniors",
    title: "Kids (12 & Under) & Seniors (65+)",
    services: [
      { id: "regular-kid-seniors", name: "Regular", price: 25, priceCash: 22 },
      { id: "zero-fade-kid-seniors", name: "Zero Fade", price: 30, priceCash: 27 },
      { id: "buzz-fade-kid-seniors", name: "Buzz Fade (One Length)", price: 23, priceCash: 20 },
    ],
  },
];

export const allServices: Service[] = serviceCategories.flatMap(
  (category) => category.services
);

export function getServiceById(id: string | undefined | null): Service | undefined {
  if (!id) return undefined;
  return allServices.find((service) => service.id === id);
}
