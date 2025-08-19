import { Header } from "./Header";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Footer } from "./Footer";
export const LandingPage = () => {
   return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <Hero />
    <Features />
    <Footer />
    </div>
  )
}


