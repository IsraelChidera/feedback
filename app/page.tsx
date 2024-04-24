import Features from "@/components/widget/landing-page/Features";
import Footer from "@/components/widget/landing-page/Footer";
import Hero from "@/components/widget/landing-page/Hero";
import WhatWeAre from "@/components/widget/landing-page/WhatWeAre";

export default function Home() {

  return (
    <main>
      <Hero />
      <Features />
      <WhatWeAre />
      <Footer />
    </main>
  );
}
