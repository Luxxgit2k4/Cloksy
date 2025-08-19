import { Header } from "@/components/Landing_page/Header";
import { Hero } from "@/components/Landing_page/Hero";
import { Features } from "@/components/Landing_page/Features";

function App() {
   return (
    <div className="min-h-screen flex flex-col bg-gray-50">
    <Header />
    <Hero />
    <Features />
    </div>
  )
}

export default App
