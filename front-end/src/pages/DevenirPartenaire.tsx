
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { CheckCircle, ArrowRight } from "lucide-react";
import ButtonWithEffect from "@/components/ui/ButtonWithEffect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const benefits = [
  "Accès à une clientèle qualifiée",
  "Gestion simplifiée des rendez-vous",
  "Paiements sécurisés et rapides",
  "Augmentez votre visibilité en ligne",
  "Support dédié aux professionnels",
  "Aucun frais d'inscription"
];

const DevenirPartenaire = () => {
  return (
    <>
      <NavBar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-servigo-800 to-servigo-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Devenez partenaire ServiGo</h1>
            <p className="text-xl text-servigo-100 max-w-2xl mx-auto mb-8">
              Rejoignez notre réseau de professionnels qualifiés et développez votre activité
            </p>
           
          </div>
        </section>
        
        {/* Avantages */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-servigo-900 mb-10 text-center">Les avantages de rejoindre ServiGo</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start bg-servigo-50 p-6 rounded-lg">
                  <CheckCircle className="text-accent-500 mr-4 h-6 w-6 mt-0.5 flex-shrink-0" />
                  <p className="text-servigo-800 text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Comment ça marche */}
        <section className="py-16 bg-servigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-servigo-900 mb-10 text-center">Comment devenir partenaire</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { step: "1", title: "Inscrivez-vous", description: "Créez votre compte professionnel et complétez votre profil avec vos compétences et zones d'intervention." },
                { step: "2", title: "Vérification", description: "Nous vérifions vos qualifications, votre assurance professionnelle et votre identité." },
                { step: "3", title: "Commencez à accepter des missions", description: "Recevez des demandes de clients et choisissez celles qui vous intéressent selon votre disponibilité." }
              ].map((item) => (
                <div key={item.step} className="bg-white p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <div className="bg-accent-500 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-xl font-semibold">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-servigo-900 mb-3">{item.title}</h3>
                  <p className="text-servigo-700">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Formulaire */}
        
      </main>
      
      <Footer />
    </>
  );
};

export default DevenirPartenaire;
