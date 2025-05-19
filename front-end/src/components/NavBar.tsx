import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  User,
  Users,
  Settings,
  Menu,
  X
} from "lucide-react";
import {
  Building,
  Briefcase,
  LayoutDashboard,
  ShieldCheck,
  
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
  const { setActiveSpace } = useAppContext();
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const handleSpaceSelection = (space: "client" | "societe" | "agent" | "admin") => {
    setActiveSpace(space);
    setMobileMenuOpen(false);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  const navLinks = [
    { label: "Accueil", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Comment ça marche", path: "/comment-ca-marche" },
    { label: "Devenir partenaire", path: "/devenir-partenaire" }
  ];

  const userSpaces = [
    {
    label: "Espace client",
    path: "/client",
    icon: <User className="mr-2 h-4 w-4" />,
    key: "client",
  },
  {
    label: "Espace société",
    path: "/societe",
    icon: <Building className="mr-2 h-4 w-4" />,
    key: "societe",
  },
  {
    label: "Espace agence",
    path: "/agence",
    icon: <Briefcase className="mr-2 h-4 w-4" />,
    key: "agence",
  },
  {
    label: "Espace agent",
    path: "/agent",
    icon: <ShieldCheck className="mr-2 h-4 w-4" />,
    key: "agent",
  },
  {
    label: "Administration",
    path: "/admin",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    key: "admin",
  },
  ];

  return (
    <nav className="bg-servigo-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-white text-servigo-800 rounded-full h-10 w-10 flex items-center justify-center group-hover:bg-accent-100 transition-colors">
              <span className="servigo-logo text-xl font-bold">SG</span>
            </div>
            <div>
              <h1 className="servigo-logo text-xl font-bold">ServiGo</h1>
              <p className="servigo-slogan text-xs hidden md:block">Vos besoins. Nos pros. Votre confort.</p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`hover:text-accent-400 transition-colors ${isActiveLink(link.path) ? 'text-accent-400 font-semibold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Espace Dropdown - Desktop */}
          <div className="hidden md:flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <ButtonWithEffect
                  className="bg-transparent border-white text-white hover:bg-servigo-700"
                  hoverEffect="scale"
                >
                  <User className="mr-2 h-4 w-4" /> Espaces
                </ButtonWithEffect>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {userSpaces.map(space => (
                  <DropdownMenuItem
                    asChild
                    key={space.key}
                    onClick={() => handleSpaceSelection(space.key as any)}
                  >
                    <Link to={space.path} className="flex items-center">
                      {space.icon} {space.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-servigo-700"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-servigo-700 animate-fade-in">
            <div className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMobileMenu}
                  className={`px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors ${isActiveLink(link.path) ? 'bg-servigo-700' : ''}`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-servigo-700 pt-3 mt-2">
                <p className="px-3 text-sm text-servigo-300 mb-2">Espaces utilisateurs</p>
                {userSpaces.map(space => (
                  <Link
                    key={space.key}
                    to={space.path}
                    onClick={() => {
                      handleSpaceSelection(space.key as any);
                      toggleMobileMenu();
                    }}
                    className="px-3 py-2 rounded-md hover:bg-servigo-700 transition-colors flex items-center"
                  >
                    {space.icon} {space.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
