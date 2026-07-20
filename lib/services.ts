export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface ServiceCategory {
  id: string;
  title: string;
  services: Service[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "barber",
    title: "Barber Services",
    services: [
      { id: "classic-haircut", name: "Classic Haircut", price: 40 },
      { id: "skin-fade", name: "Skin Fade", price: 45 },
      { id: "buzz-cut", name: "Buzz Cut", price: 28 },
      { id: "scissor-cut", name: "Scissor Cut", price: 45 },
      { id: "long-hair-cut", name: "Long Hair Cut", price: 50 },
      { id: "kids-haircut", name: "Kids Haircut (12 & Under)", price: 35 },
      { id: "senior-haircut", name: "Senior Haircut (65+)", price: 35 },
    ],
  },
  {
    id: "beard",
    title: "Beard Services",
    services: [
      { id: "beard-trim", name: "Beard Trim", price: 20 },
      { id: "beard-shape-lineup", name: "Beard Shape & Line-Up", price: 25 },
      { id: "hot-towel-beard-trim", name: "Hot Towel Beard Trim", price: 30 },
    ],
  },
  {
    id: "combo",
    title: "Combo Packages",
    services: [
      { id: "haircut-beard-trim", name: "Haircut + Beard Trim", price: 60 },
      { id: "skin-fade-beard", name: "Skin Fade + Beard", price: 65 },
      {
        id: "deluxe-grooming",
        name: "Deluxe Grooming (Haircut + Beard + Hot Towel + Shampoo)",
        price: 75,
      },
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
