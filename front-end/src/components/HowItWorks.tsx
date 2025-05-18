
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Choisissez votre service",
    description: "Sélectionnez le type de service dont vous avez besoin parmi nos catégories variées.",
    icon: "🔍"
  },
  {
    number: "02",
    title: "Décrivez votre besoin",
    description: "Précisez votre besoin, indiquez votre adresse et choisissez une date d'intervention.",
    icon: "📝"
  },
  {
    number: "03",
    title: "Recevez des devis",
    description: "Les prestataires qualifiés de votre région vous envoient leurs propositions.",
    icon: "💼"
  },
  {
    number: "04",
    title: "Service à domicile",
    description: "Le professionnel intervient chez vous à la date convenue pour réaliser le service.",
    icon: "🏠"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-12 bg-servigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-servigo-900 mb-4">Comment ça marche ?</h2>
          <p className="text-lg text-servigo-700 max-w-2xl mx-auto">
            ServiGo vous simplifie l'accès aux services à domicile en quelques étapes simples
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Card className="h-full border-none shadow-md bg-white">
                <CardContent className="p-6 text-center">
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-accent-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="mt-8 mb-4 text-4xl">{step.icon}</div>
                  <h3 className="font-semibold text-xl text-servigo-800 mb-3">{step.title}</h3>
                  <p className="text-servigo-600">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M39.0607 13.0607C39.6464 12.4749 39.6464 11.5251 39.0607 10.9393L29.5147 1.3934C28.9289 0.807612 27.9792 0.807612 27.3934 1.3934C26.8076 1.97918 26.8076 2.92893 27.3934 3.51472L35.8787 12L27.3934 20.4853C26.8076 21.0711 26.8076 22.0208 27.3934 22.6066C27.9792 23.1924 28.9289 23.1924 29.5147 22.6066L39.0607 13.0607ZM0 13.5H38V10.5H0V13.5Z" fill="#3B82F6"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-accent-500 hover:bg-accent-600 text-white font-medium py-3 px-6 rounded-md transition-colors">
            Trouver un professionnel
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
