
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  User, 
  Users, 
  Settings, 
  Menu, 
  X, 
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import ButtonWithEffect from "@/components/ui/ButtonWithEffect";
import { useAppContext } from "@/contexts/AppContext";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setActiveSpace } = useAppContext();
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLoginClick = () => {
    setIsLoggedIn(true);
    console.log("User logged in");
  };

  const handleSpaceSelection = (space: "client" | "societe" | "agent" | "admin") => {
    setActiveSpace(space);
    setMobileMenuOpen(false);
  };

  // Vérifier si le lien est actif
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-servigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo et titre */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white text-servigo-800 rounded-full h-10 w-10 flex items-center justify-center group-hover:bg-accent-100 transition-colors">
              <span className="servigo-logo text-xl font-bold">SG</span>
            </div>
            <div>
              <h1 className="servigo-logo text-xl font-bold">ServiGo</h1>
              <p className="servigo-slogan text-xs hidden md:block">Vos besoins. Nos pros. Votre confort.</p>
            </div>
          </Link>

          {/* Navigation principale - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`hover:text-accent-400 transition-colors ${isActiveLink('/') ? 'text-accent-400 font-semibold' : ''}`}
            >
              Accueil
            </Link>
            <Link 
              to="/services" 
              className={`hover:text-accent-400 transition-colors ${isActiveLink('/services') ? 'text-accent-400 font-semibold' : ''}`}
            >
              Services
            </Link>
            <Link 
              to="/comment-ca-marche" 
              className={`hover:text-accent-400 transition-colors ${isActiveLink('/comment-ca-marche') ? 'text-accent-400 font-semibold' : ''}`}
            >
              Comment ça marche
            </Link>
            <Link 
              to="/devenir-partenaire" 
              className={`hover:text-accent-400 transition-colors ${isActiveLink('/devenir-partenaire') ? 'text-accent-400 font-semibold' : ''}`}
            >
              Devenir partenaire
            </Link>
          </div>

          {/* Boutons d'action - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ButtonWithEffect 
                  variant="outline" 
                  className="bg-transparent border-white text-white hover:bg-servigo-700"
                  hoverEffect="scale"
                >
                  <User className="mr-2 h-4 w-4" />
                  Espace
                </ButtonWithEffect>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild onClick={() => handleSpaceSelection("client")}>
                  <Link to="/client" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Espace client
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={() => handleSpaceSelection("societe")}>
                  <Link to="/societe" className="flex items-center">
                    <Users className="mr-2 h-4 w-4" /> Espace société
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={() => handleSpaceSelection("agent")}>
                  <Link to="/agent" className="flex items-center">
                    <User className="mr-2 h-4 w-4" /> Espace agent
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild onClick={() => handleSpaceSelection("admin")}>
                  <Link to="/admin" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" /> Administration
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ButtonWithEffect 
              className="bg-accent-500 hover:bg-accent-600"
              hoverEffect="glow"
              onClick={handleLoginClick}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {isLoggedIn ? "Mon compte" : "Connexion"}
            </ButtonWithEffect>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-servigo-700" 
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-servigo-700 animate-fade-in">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors ${isActiveLink('/') ? 'bg-servigo-700' : ''}`} 
                onClick={toggleMobileMenu}
              >
                Accueil
              </Link>
              <Link 
                to="/services" 
                className={`px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors ${isActiveLink('/services') ? 'bg-servigo-700' : ''}`} 
                onClick={toggleMobileMenu}
              >
                Services
              </Link>
              <Link 
                to="/comment-ca-marche" 
                className={`px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors ${isActiveLink('/comment-ca-marche') ? 'bg-servigo-700' : ''}`}  
                onClick={toggleMobileMenu}
              >
                Comment ça marche
              </Link>
              <Link 
                to="/devenir-partenaire" 
                className={`px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors ${isActiveLink('/devenir-partenaire') ? 'bg-servigo-700' : ''}`} 
                onClick={toggleMobileMenu}
              >
                Devenir partenaire
              </Link>
              <div className="border-t border-servigo-700 pt-3 mt-2">
                <p className="px-3 text-sm text-servigo-300 mb-2">Espaces utilisateurs</p>
                <Link 
                  to="/client" 
                  className="px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors flex items-center" 
                  onClick={() => { toggleMobileMenu(); handleSpaceSelection("client"); }}
                >
                  <User className="mr-2 h-4 w-4" /> Espace client
                </Link>
                <Link 
                  to="/societe" 
                  className="px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors flex items-center" 
                  onClick={() => { toggleMobileMenu(); handleSpaceSelection("societe"); }}
                >
                  <Users className="mr-2 h-4 w-4" /> Espace société
                </Link>
                <Link 
                  to="/agent" 
                  className="px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors flex items-center" 
                  onClick={() => { toggleMobileMenu(); handleSpaceSelection("agent"); }}
                >
                  <User className="mr-2 h-4 w-4" /> Espace agent
                </Link>
                <Link 
                  to="/admin" 
                  className="px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors flex items-center" 
                  onClick={() => { toggleMobileMenu(); handleSpaceSelection("admin"); }}
                >
                  <Settings className="mr-2 h-4 w-4" /> Administration
                </Link>
              </div>
              <ButtonWithEffect 
                className="bg-accent-500 hover:bg-accent-600 mt-3"
                hoverEffect="glow"
                onClick={() => { handleLoginClick(); toggleMobileMenu(); }}
              >
                <LogIn className="mr-2 h-4 w-4" />
                {isLoggedIn ? "Mon compte" : "Connexion"}
              </ButtonWithEffect>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
