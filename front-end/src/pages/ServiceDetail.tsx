
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Phone, Star, Clock, FileText, ChevronRight } from "lucide-react";

// Mock data
const serviceCategories = [
  { 
    id: 1, 
    name: "Plomberie", 
    icon: "🔧", 
    description: "Réparation de fuites, installations sanitaires, robinetterie",
    longDescription: "Notre service de plomberie couvre tous vos besoins en matière de réparation, installation et maintenance. Nos plombiers qualifiés interviennent rapidement pour résoudre vos problèmes de plomberie, qu'il s'agisse d'une fuite d'eau, d'un problème de chauffe-eau ou d'une installation complète de salle de bain.",
    pricing: "À partir de 60€/heure",
    services: [
      { name: "Réparation de fuite d'eau", price: "60€-90€" },
      { name: "Débouchage de canalisation", price: "70€-120€" },
      { name: "Installation de chauffe-eau", price: "150€-350€" },
      { name: "Remplacement de robinetterie", price: "80€-200€" },
      { name: "Rénovation de salle de bain", price: "Sur devis" }
    ],
    faqs: [
      { 
        question: "Combien de temps faut-il pour réparer une fuite ?", 
        answer: "La plupart des fuites simples peuvent être réparées en 1 à 2 heures. Les problèmes plus complexes peuvent nécessiter plus de temps ou plusieurs visites." 
      },
      { 
        question: "Êtes-vous disponibles pour les urgences ?", 
        answer: "Oui, nous proposons un service d'urgence 24h/24 et 7j/7 pour les problèmes critiques comme les fuites importantes ou les canalisations bouchées." 
      },
      { 
        question: "Quelles zones géographiques couvrez-vous ?", 
        answer: "Nos plombiers interviennent dans un rayon de 50km autour de votre ville. Une vérification de disponibilité est effectuée lors de votre demande." 
      }
    ],
    pros: [
      { 
        id: 1, 
        name: "Martin Dupont", 
        company: "Plomberie Express",
        rating: 4.8,
        reviews: 124,
        response: "< 30 min", 
        image: "https://randomuser.me/api/portraits/men/36.jpg" 
      },
      { 
        id: 2, 
        name: "Sophie Martin", 
        company: "Eco-Plomberie",
        rating: 4.9,
        reviews: 89,
        response: "< 1 heure", 
        image: "https://randomuser.me/api/portraits/women/44.jpg" 
      },
      { 
        id: 3, 
        name: "Jean Leroy", 
        company: "Leroy Plomberie",
        rating: 4.7,
        reviews: 156,
        response: "< 2 heures", 
        image: "https://randomuser.me/api/portraits/men/22.jpg" 
      }
    ]
  },
  // ... Add other categories data here
];

const ServiceDetail = () => {
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const serviceId = id ? parseInt(id) : 1;
  const service = serviceCategories.find(s => s.id === serviceId) || serviceCategories[0];

  return (
    <>
      <NavBar />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-servigo-800 to-servigo-900 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
                <div className="inline-flex items-center text-servigo-200 mb-4">
                  <Link to="/services" className="hover:text-white">Services</Link>
                  <ChevronRight className="h-4 w-4 mx-1" />
                  <span>{service.name}</span>
                </div>
                <h1 className="text-4xl font-bold mb-4">Services de {service.name}</h1>
                <div className="w-16 h-1 bg-accent-500 mb-6"></div>
                <p className="text-xl text-servigo-100 mb-8">{service.longDescription}</p>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-accent-500 hover:bg-accent-600 text-white">
                    <Calendar className="mr-2 h-5 w-5" /> Réserver maintenant
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <Phone className="mr-2 h-5 w-5" /> Contacter un expert
                  </Button>
                </div>
              </div>
              
              <div className="lg:w-1/2 bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4">Réservez un service de {service.name}</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location" className="text-white mb-2 block">Votre adresse</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="location"
                        placeholder="Entrez votre adresse"
                        className="pl-10 bg-white/80 text-gray-900"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="date" className="text-white mb-2 block">Date souhaitée</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="date"
                        type="date"
                        className="pl-10 bg-white/80 text-gray-900"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-white mb-2 block">Description de votre besoin</Label>
                    <textarea
                      id="description"
                      rows={3}
                      placeholder="Décrivez brièvement votre besoin"
                      className="w-full rounded-md border border-input bg-white/80 px-3 py-2 text-gray-900"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-accent-500 hover:bg-accent-600">Trouver un professionnel</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main content */}
        <section className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="lg:w-2/3">
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Nos services de {service.name}</h2>
                  <div className="space-y-4">
                    {service.services.map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4">
                        <div className="flex items-center">
                          <div className="bg-servigo-50 text-servigo-700 p-2 rounded-full mr-4">
                            <span className="text-xl">{service.icon}</span>
                          </div>
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-gray-500">{item.price}</span>
                          <Button size="sm" className="mt-2 bg-servigo-600 hover:bg-servigo-700">Réserver</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Comment ça fonctionne</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-servigo-50 text-servigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold mb-2">1. Décrivez votre besoin</h3>
                      <p className="text-gray-600">Expliquez-nous ce dont vous avez besoin et quand vous en avez besoin.</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-servigo-50 text-servigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold mb-2">2. Choisissez un pro</h3>
                      <p className="text-gray-600">Sélectionnez un professionnel qualifié selon ses avis et disponibilités.</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-servigo-50 text-servigo-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8" />
                      </div>
                      <h3 className="font-semibold mb-2">3. Service réalisé</h3>
                      <p className="text-gray-600">Le professionnel intervient à l'heure convenue et réalise la prestation.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="lg:w-1/3">
              <Card className="mb-8 sticky top-4">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-6">Professionnels disponibles</h3>
                  
                  <Tabs defaultValue="list" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-6">
                      <TabsTrigger value="list">Liste</TabsTrigger>
                      <TabsTrigger value="map">Carte</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="list">
                      <div className="space-y-4">
                        {service.pros.map((pro) => (
                          <div key={pro.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center mb-4">
                              <img 
                                src={pro.image} 
                                alt={pro.name} 
                                className="w-12 h-12 rounded-full mr-4 object-cover"
                              />
                              <div>
                                <h4 className="font-semibold">{pro.name}</h4>
                                <p className="text-sm text-gray-600">{pro.company}</p>
                              </div>
                            </div>
                            <div className="flex justify-between text-sm mb-4">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-accent-500 mr-1" fill="currentColor" />
                                <span>{pro.rating} ({pro.reviews} avis)</span>
                              </div>
                              <div className="flex items-center text-servigo-600">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{pro.response}</span>
                              </div>
                            </div>
                            <Button className="w-full">Voir le profil</Button>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="map">
                      <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                        <p className="text-gray-500">Carte des professionnels à proximité</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="w-full">Voir tous les professionnels</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default ServiceDetail;
