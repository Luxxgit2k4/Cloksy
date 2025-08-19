import { Header } from "@/components/Landing_page/Header";
import { Hero } from "@/components/Landing_page/Hero";
import { Features } from "@/components/Landing_page/Features";
import { Footer } from "@/components/Landing_page/Footer";
function App() {
   return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <Hero />
    <Features />
    <Footer />
    </div>
  )
}

export default App
