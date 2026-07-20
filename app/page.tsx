import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import HoursLocation from "@/components/HoursLocation";
import Footer from "@/components/Footer";
import BookNowButton from "@/components/BookNowButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-1 flex-col pb-24 sm:pb-0">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <HoursLocation />
      </main>
      <Footer />
      <BookNowButton />
    </div>
  );
}
