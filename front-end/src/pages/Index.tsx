
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import HowItWorks from "@/components/HowItWorks";
import TestimonialCard from "@/components/TestimonialCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const serviceCategories = [
  { 
    id: 1, 
    name: "Plomberie", 
    icon: "🔧", 
    description: "Réparation de fuites, installations sanitaires, robinetterie" 
  },
  { 
    id: 2, 
    name: "Électricité", 
    icon: "⚡", 
    description: "Installation, mise aux normes, dépannage électrique" 
  },
  { 
    id: 3, 
    name: "Menuiserie", 
    icon: "🪚", 
    description: "Pose de meubles, réparations, aménagements sur mesure" 
  },
  { 
    id: 4, 
    name: "Serrurerie", 
    icon: "🔐", 
    description: "Ouverture de porte, changement de serrure, sécurisation" 
  },
  { 
    id: 5, 
    name: "Jardinage", 
    icon: "🌱", 
    description: "Entretien de jardin, tonte de pelouse, taille de haies" 
  },
  { 
    id: 6, 
    name: "Peinture", 
    icon: "🖌️", 
    description: "Travaux de peinture intérieure et extérieure" 
  }
];

const testimonials = [
  {
    name: "Marie Dupont",
    location: "Lyon",
    service: "Plomberie",
    rating: 5,
    text: "Intervention rapide et efficace pour réparer une fuite. Le plombier était très professionnel et à l'écoute.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg"
  },
  {
    name: "Thomas Martin",
    location: "Paris",
    service: "Électricité",
    rating: 4,
    text: "Excellent travail pour la rénovation de mon installation électrique. Service ponctuel et soigné.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sophie Bernard",
    location: "Marseille",
    service: "Menuiserie",
    rating: 5,
    text: "J'ai fait appel à ServiGo pour l'installation de ma cuisine. Résultat impeccable, je recommande !",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg"
  }
];

const Index = () => {
  return (
    <>
      <NavBar />
      
      <main>
        <Hero />
        
        {/* Services */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-servigo-900 mb-4">Nos services à domicile</h2>
              <p className="text-lg text-servigo-700 max-w-2xl mx-auto">
                Des professionnels qualifiés pour tous vos besoins de services à domicile
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCategories.map(category => (
                <ServiceCategoryCard 
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  icon={category.icon}
                  description={category.description}
                />
              ))}
            </div>
            
            <div className="text-center mt-12">
              
            </div>
          </div>
        </section>
        
        {/* Comment ça marche */}
        <HowItWorks />
        
        {/* Avantages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-servigo-900 mb-4">Pourquoi choisir ServiGo ?</h2>
              <p className="text-lg text-servigo-700 max-w-2xl mx-auto">
                ServiGo vous garantit des prestations de qualité avec des professionnels vérifiés
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div className="bg-servigo-50 p-8 rounded-lg text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-servigo-900 mb-3">Professionnels vérifiés</h3>
                <p className="text-servigo-700">Tous nos partenaires sont sélectionnés rigoureusement et leurs qualifications vérifiées.</p>
              </div>
              
              <div className="bg-servigo-50 p-8 rounded-lg text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-3xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-servigo-900 mb-3">Tarifs transparents</h3>
                <p className="text-servigo-700">Recevez des devis clairs et précis avant d'accepter le service, sans surprise.</p>
              </div>
              
              <div className="bg-servigo-50 p-8 rounded-lg text-center">
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-md">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-xl font-semibold text-servigo-900 mb-3">Intervention rapide</h3>
                <p className="text-servigo-700">Des professionnels disponibles rapidement, même pour les urgences.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Témoignages */}
        <section className="py-16 bg-servigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-servigo-900 mb-4">Ce que disent nos clients</h2>
              <p className="text-lg text-servigo-700 max-w-2xl mx-auto">
                Découvrez les expériences de nos clients avec ServiGo
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  location={testimonial.location}
                  service={testimonial.service}
                  rating={testimonial.rating}
                  text={testimonial.text}
                  avatar={testimonial.avatar}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-servigo-800 to-servigo-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à trouver votre professionnel ?</h2>
            <p className="text-xl text-servigo-100 mb-8 max-w-2xl mx-auto">
              Des milliers de professionnels qualifiés sont disponibles pour répondre à tous vos besoins de services à domicile.
            </p>
            
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Index;
