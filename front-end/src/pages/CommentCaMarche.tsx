
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { 
  Calendar, 
  CheckCircle2, 
  Headphones, 
  Phone, 
  Search, 
  UserCheck 
} from "lucide-react";
import ButtonWithEffect from "@/components/ui/ButtonWithEffect";

const steps = [
  {
    icon: <Search className="h-12 w-12 text-accent-500" />,
    title: "Recherchez un service",
    description: "Parcourez notre catalogue de services ou utilisez la recherche pour trouver rapidement ce dont vous avez besoin."
  },
  {
    icon: <Calendar className="h-12 w-12 text-accent-500" />,
    title: "Réservez un rendez-vous",
    description: "Choisissez une date et une heure qui vous conviennent et réservez en quelques clics."
  },
  {
    icon: <UserCheck className="h-12 w-12 text-accent-500" />,
    title: "Un professionnel vous contacte",
    description: "Un professionnel qualifié et vérifié vous contactera pour confirmer les détails."
  },
  {
    icon: <CheckCircle2 className="h-12 w-12 text-accent-500" />,
    title: "Service réalisé",
    description: "Le professionnel réalise la prestation à domicile selon vos besoins."
  }
];

const CommentCaMarche = () => {
  return (
    <>
      <NavBar />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-servigo-800 to-servigo-900 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-6">Comment ça marche ?</h1>
            <p className="text-xl text-servigo-100 max-w-2xl mx-auto mb-8">
              ServiGo vous connecte avec des professionnels qualifiés pour tous vos besoins de services à domicile.
            </p>
          </div>
        </section>
        
        {/* Process Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="bg-servigo-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <div className="mx-auto mb-4 flex justify-center">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-servigo-900 mb-3">{step.title}</h3>
                  <p className="text-servigo-700">{step.description}</p>
                  <div className="mt-4 text-accent-600 text-lg font-semibold">Étape {index + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-servigo-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-servigo-900 mb-10 text-center">Questions fréquentes</h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {[
                { question: "Comment sont sélectionnés les professionnels ?", answer: "Tous nos professionnels passent par un processus de vérification rigoureux incluant la vérification des qualifications, des antécédents et des assurances professionnelles." },
                { question: "Comment fonctionne la tarification ?", answer: "Les tarifs sont transparents et fixés à l'avance. Vous recevez un devis détaillé avant d'accepter le service, sans frais supplémentaires cachés." },
                { question: "Puis-je annuler une réservation ?", answer: "Oui, vous pouvez annuler ou reporter une réservation jusqu'à 24 heures avant le rendez-vous sans frais." },
                { question: "Que faire si je ne suis pas satisfait du service ?", answer: "Votre satisfaction est notre priorité. Si vous n'êtes pas satisfait, contactez-nous dans les 48 heures et nous trouverons une solution adaptée." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-servigo-900 mb-2">{item.question}</h3>
                  <p className="text-servigo-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="bg-servigo-800 text-white rounded-lg p-8 md:p-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Besoin d'aide ?</h2>
                  <p className="mb-8">Notre équipe de support client est disponible pour répondre à toutes vos questions.</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="mr-3 h-5 w-5 text-accent-400" />
                      <span>01 23 45 67 89</span>
                    </div>
                    <div className="flex items-center">
                      <Headphones className="mr-3 h-5 w-5 text-accent-400" />
                      <span>support@servigo.fr</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <ButtonWithEffect 
                    hoverEffect="scale"
                    className="bg-accent-500 hover:bg-accent-600 text-white px-8 py-3"
                  >
                    Contactez-nous
                  </ButtonWithEffect>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default CommentCaMarche;
