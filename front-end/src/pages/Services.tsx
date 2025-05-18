
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, MapPin, Filter, ArrowRight, Phone, Calendar, Star } from "lucide-react";

const serviceCategories = [
  { 
    id: 1, 
    name: "Plomberie", 
    icon: "🔧", 
    description: "Réparation de fuites, installations sanitaires, robinetterie",
    details: "Services de plomberie pour tous vos besoins résidentiels et commerciaux, incluant les réparations urgentes de fuites, l'installation d'équipements sanitaires, la rénovation de salles de bains et cuisines.",
    pricing: "À partir de 60€/heure",
    populars: ["Réparation de fuite d'eau", "Débouchage de canalisation", "Installation de chauffe-eau", "Remplacement de robinetterie"]
  },
  { 
    id: 2, 
    name: "Électricité", 
    icon: "⚡", 
    description: "Installation, mise aux normes, dépannage électrique",
    details: "Services électriques complets par des électriciens qualifiés et certifiés, incluant les mises aux normes, installations, dépannages, et conseils pour l'optimisation énergétique de votre logement.",
    pricing: "À partir de 65€/heure",
    populars: ["Dépannage électrique", "Installation de prises", "Mise aux normes", "Pose de luminaires"]
  },
  { 
    id: 3, 
    name: "Menuiserie", 
    icon: "🪚", 
    description: "Pose de meubles, réparations, aménagements sur mesure",
    details: "Travaux de menuiserie réalisés par des artisans expérimentés, pour tous types d'aménagements intérieurs, fabrication de mobilier sur mesure, réparations et installation de cuisine.",
    pricing: "À partir de 55€/heure",
    populars: ["Montage de meubles", "Pose de parquet", "Fabrication sur mesure", "Réparation de portes et fenêtres"]
  },
  { 
    id: 4, 
    name: "Serrurerie", 
    icon: "🔐", 
    description: "Ouverture de porte, changement de serrure, sécurisation",
    details: "Services de serrurerie disponibles 24h/24 pour les urgences, incluant ouverture de porte, remplacement de serrures, installation de systèmes de sécurité et blindage.",
    pricing: "À partir de 70€/heure",
    populars: ["Ouverture de porte", "Changement de serrure", "Installation de verrou", "Blindage de porte"]
  },
  { 
    id: 5, 
    name: "Jardinage", 
    icon: "🌱", 
    description: "Entretien de jardin, tonte de pelouse, taille de haies",
    details: "Entretien régulier ou ponctuel de vos espaces verts par des jardiniers professionnels, incluant tonte, taille, désherbage, plantation et conseils d'aménagement paysager.",
    pricing: "À partir de 45€/heure",
    populars: ["Tonte de pelouse", "Taille de haies", "Débroussaillage", "Création de massifs"]
  },
  { 
    id: 6, 
    name: "Peinture", 
    icon: "🖌️", 
    description: "Travaux de peinture intérieure et extérieure",
    details: "Travaux de peinture réalisés avec soin par des professionnels qualifiés, pour intérieur et extérieur, incluant préparation des surfaces, conseils en décoration et finitions de qualité.",
    pricing: "À partir de 50€/heure",
    populars: ["Peinture intérieure", "Peinture extérieure", "Pose de papier peint", "Rénovation de façades"]
  }
];

const ServicesPage = () => {
  const { id } = useParams();
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(id ? parseInt(id) : null);

  // Filter services based on search query
  const filteredServices = searchQuery 
    ? serviceCategories.filter(cat => 
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()))
    : serviceCategories;

  const selectedService = selectedCategory 
    ? serviceCategories.find(cat => cat.id === selectedCategory) 
    : null;

  return (
    <>
      <NavBar />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-servigo-800 to-servigo-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-6">Services à domicile</h1>
              <p className="text-xl text-servigo-100 mb-8">
                Trouvez le professionnel qu'il vous faut parmi nos nombreuses catégories de services
              </p>
              
              <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Quel service recherchez-vous ?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="relative flex-grow">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Votre localisation"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button className="bg-accent-500 hover:bg-accent-600">
                  Rechercher
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="md:w-1/4">
                <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                  <h3 className="font-semibold text-lg mb-4">Catégories</h3>
                  <TabsList className="flex flex-col h-auto bg-transparent space-y-1 w-full">
                    <TabsTrigger value="all" className="justify-start mb-2 w-full">
                      Tous les services
                    </TabsTrigger>
                    {serviceCategories.map(category => (
                      <TabsTrigger 
                        key={category.id} 
                        value={`cat-${category.id}`}
                        className="justify-start mb-2 w-full"
                      >
                        <span className="mr-2">{category.icon}</span> {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Filtrer par</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="rating" className="block mb-2">Note minimum</Label>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className="h-5 w-5 text-gray-300 cursor-pointer hover:text-accent-500"
                            />
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="price" className="block mb-2">Tarif horaire max</Label>
                        <Input id="price" type="number" placeholder="€" className="w-full" />
                      </div>
                      <div>
                        <Label htmlFor="disponibility" className="block mb-2">Disponibilité</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Aujourd'hui</Button>
                          <Button variant="outline" size="sm">Cette semaine</Button>
                        </div>
                      </div>
                      <Button className="w-full flex items-center justify-center gap-2">
                        <Filter className="h-4 w-4" /> Appliquer les filtres
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Besoin d'aide ?</h3>
                    <p className="text-gray-600 mb-4">
                      Notre équipe est disponible pour vous aider à trouver le service dont vous avez besoin.
                    </p>
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4" /> Nous contacter
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="md:w-3/4">
                <TabsContent value="all" className="mt-0">
                  <h2 className="text-2xl font-bold mb-6">Tous nos services</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredServices.map(category => (
                      <ServiceCategoryCard
                        key={category.id}
                        id={category.id}
                        name={category.name}
                        icon={category.icon}
                        description={category.description}
                      />
                    ))}
                  </div>
                  
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationNext href="#" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </TabsContent>
                
                {serviceCategories.map(category => (
                  <TabsContent key={category.id} value={`cat-${category.id}`} className="mt-0">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-servigo-50 p-4 rounded-full mr-4">
                          <span className="text-4xl">{category.icon}</span>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">{category.name}</h2>
                          <p className="text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      
                      <div className="prose max-w-none mb-6">
                        <p>{category.details}</p>
                        <p className="font-medium text-servigo-700">{category.pricing}</p>
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-4">Services populaires</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Service</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {category.populars.map((service, i) => (
                            <TableRow key={i}>
                              <TableCell>{service}</TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" className="bg-servigo-600">
                                  Réserver <Calendar className="ml-2 h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
                      <div className="mt-8 flex justify-end">
                        <Button className="bg-accent-500 hover:bg-accent-600">
                          Voir tous les services de {category.name} <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="font-semibold text-lg mb-4">Nos professionnels spécialisés en {category.name}</h3>
                      <p className="text-gray-600 mb-6">
                        Tous nos prestataires sont vérifiés et certifiés dans leur domaine d'expertise.
                      </p>
                      
                      <Button className="bg-servigo-600 hover:bg-servigo-700">
                        Trouver un professionnel en {category.name}
                      </Button>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default ServicesPage;
