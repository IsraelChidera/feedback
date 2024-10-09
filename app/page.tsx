import Features from "@/components/widget/landing-page/Features";
import Footer from "@/components/widget/landing-page/Footer";
import Hero from "@/components/widget/landing-page/Hero";
import WhatWeAre from "@/components/widget/landing-page/WhatWeAre";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

export default function Home() {

  return (
    <main>
      <Hero />
      <Features />
      <WhatWeAre />
      <Footer />

      <CopilotPopup
        instructions={"You are assisting the user as best as you can. Ansewr in the best way possible given the data you have."}
        labels={{
          title: "Your Assistant",
          initial: "Hi! 👋 How can I assist you today?",
        }}
      />
    </main>
  );
}
