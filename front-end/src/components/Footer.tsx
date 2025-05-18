
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-servigo-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-white text-servigo-800 rounded-full h-8 w-8 flex items-center justify-center">
                <span className="servigo-logo text-sm font-bold">SG</span>
              </div>
              <h2 className="servigo-logo text-xl font-bold">ServiGo</h2>
            </div>
            <p className="text-servigo-100 mb-4">
              ServiGo est une plateforme qui met en relation des clients particuliers 
              avec des sociétés prestataires de services à domicile.
            </p>
            <p className="servigo-slogan text-sm text-accent-400">Vos besoins. Nos pros. Votre confort.</p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services" className="text-servigo-100 hover:text-accent-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/comment-ca-marche" className="text-servigo-100 hover:text-accent-400 transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link to="/devenir-partenaire" className="text-servigo-100 hover:text-accent-400 transition-colors">
                  Devenir partenaire
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-servigo-100 hover:text-accent-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Espaces */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Espaces</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/client" className="text-servigo-100 hover:text-accent-400 transition-colors">
                  Espace client
                </Link>
              </li>
              <li>
                <Link to="/societe" className="text-servigo-100 hover:text-accent-400 transition-colors">
                  Espace société
                </Link>
              </li>
              <li>
                <Link to="/agent" className="text-servigo-100 hover:text-accent-400 transition-colors">
                  Espace agent
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-servigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-servigo-100">123 Rue des Services, 75000 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-servigo-400" />
                <span className="text-servigo-100">+33 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-servigo-400" />
                <span className="text-servigo-100">contact@servigo.fr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <hr className="border-servigo-700 my-8" />

        {/* Copyright et liens légaux */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-servigo-300 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} ServiGo. Tous droits réservés.
          </p>
          <div className="flex space-x-6">
            <Link to="/mentions-legales" className="text-sm text-servigo-300 hover:text-accent-400 transition-colors">
              Mentions légales
            </Link>
            <Link to="/confidentialite" className="text-sm text-servigo-300 hover:text-accent-400 transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/cgu" className="text-sm text-servigo-300 hover:text-accent-400 transition-colors">
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
