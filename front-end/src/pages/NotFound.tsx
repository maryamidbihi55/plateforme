
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Search, RefreshCcw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Countdown timer to automatically redirect to home after 10 seconds
  useEffect(() => {
    if (countdown <= 0) {
      navigate("/");
      return;
    }
    
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  // Simple search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // In a real implementation, this would redirect to a search results page
      // For now, just redirect to home
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-md px-8 py-12 text-center">
        <div className="mb-8">
          <div className="text-9xl font-bold text-servigo-800 opacity-20">404</div>
          <h1 className="text-4xl font-bold text-gray-800 -mt-16 mb-4">Page introuvable</h1>
          <div className="w-16 h-1 bg-accent-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 mb-4">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Retour automatique à l'accueil dans <span className="font-bold text-accent-500">{countdown}</span> secondes
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher sur ServiGo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-servigo-500 focus:border-transparent"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-servigo-600"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Button 
            variant="outline" 
            className="flex items-center justify-center border-servigo-800 text-servigo-800 hover:bg-servigo-800 hover:text-white" 
            asChild
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" /> 
              Accueil
            </Link>
          </Button>
          
          <Button 
            className="flex items-center justify-center bg-accent-500 hover:bg-accent-600" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> 
            Retour
          </Button>

          <Button 
            variant="ghost" 
            className="flex items-center justify-center text-gray-600 hover:text-servigo-800" 
            onClick={() => window.location.reload()}
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> 
            Actualiser
          </Button>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Vous cherchez peut-être :</p>
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <Link to="/services" className="text-servigo-600 hover:text-servigo-800 hover:underline">
              Services
            </Link>
            <Link to="/client" className="text-servigo-600 hover:text-servigo-800 hover:underline">
              Espace client
            </Link>
            <Link to="/societe" className="text-servigo-600 hover:text-servigo-800 hover:underline">
              Espace société
            </Link>
            <Link to="/agent" className="text-servigo-600 hover:text-servigo-800 hover:underline">
              Espace agent
            </Link>
            <Link to="/admin" className="text-servigo-600 hover:text-servigo-800 hover:underline">
              Administration
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
