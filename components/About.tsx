import { businessInfo } from "@/lib/business-info";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-3xl px-5 pt-8 pb-16 text-center">
      <h2 className="font-display text-3xl text-espresso">Our Story</h2>
      <p className="mt-4 whitespace-pre-line text-espresso-light">{businessInfo.story}</p>
    </section>
  );
}
