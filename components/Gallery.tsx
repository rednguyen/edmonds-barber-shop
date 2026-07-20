import { galleryImages } from "@/lib/gallery";

export default function Gallery() {
  return (
    <section id="gallery" className="px-5 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-display text-3xl text-espresso">Gallery</h2>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {galleryImages.map((image) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className="aspect-4/3 w-full rounded-xl object-cover shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
