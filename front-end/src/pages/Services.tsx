import React, { useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ServiceCategoryCard from "@/components/ServiceCategoryCard";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { ArrowRight, Calendar } from "lucide-react";

// --- Liste des catégories de services ---
const serviceCategories = [
  {
    id: 1,
    name: "Plomberie",
    icon: "🔧",
    description: "Réparation de fuites, installations sanitaires, robinetterie",
    details: "Services de plomberie pour tous vos besoins résidentiels et commerciaux...",
    pricing: "À partir de 60€/heure",
    populars: ["Réparation de fuite d'eau", "Débouchage de canalisation", "Installation de chauffe-eau", "Remplacement de robinetterie"]
  },
  {
    id: 2,
    name: "Électricité",
    icon: "⚡",
    description: "Installation, mise aux normes, dépannage électrique",
    details: "Services électriques complets par des électriciens qualifiés...",
    pricing: "À partir de 65€/heure",
    populars: ["Dépannage électrique", "Installation de prises", "Mise aux normes", "Pose de luminaires"]
  },
  {
    id: 3,
    name: "Menuiserie",
    icon: "🪚",
    description: "Pose de meubles, réparations, aménagements sur mesure",
    details: "Travaux de menuiserie réalisés par des artisans expérimentés...",
    pricing: "À partir de 55€/heure",
    populars: ["Montage de meubles", "Pose de parquet", "Fabrication sur mesure", "Réparation de portes et fenêtres"]
  },
  {
    id: 4,
    name: "Serrurerie",
    icon: "🔐",
    description: "Ouverture de porte, changement de serrure, sécurisation",
    details: "Services de serrurerie disponibles 24h/24 pour les urgences...",
    pricing: "À partir de 70€/heure",
    populars: ["Ouverture de porte", "Changement de serrure", "Installation de verrou", "Blindage de porte"]
  },
  {
    id: 5,
    name: "Jardinage",
    icon: "🌱",
    description: "Entretien de jardin, tonte de pelouse, taille de haies",
    details: "Entretien régulier ou ponctuel de vos espaces verts...",
    pricing: "À partir de 45€/heure",
    populars: ["Tonte de pelouse", "Taille de haies", "Débroussaillage", "Création de massifs"]
  },
  {
    id: 6,
    name: "Peinture",
    icon: "🖌️",
    description: "Travaux de peinture intérieure et extérieure",
    details: "Travaux de peinture réalisés avec soin par des professionnels...",
    pricing: "À partir de 50€/heure",
    populars: ["Peinture intérieure", "Peinture extérieure", "Pose de papier peint", "Rénovation de façades"]
  },
  {
    id: 7,
    name: "Nettoyage",
    icon: "🧼",
    description: "Nettoyage résidentiel et commercial",
    details: "Services de nettoyage pour particuliers et professionnels : ménages, fin de chantier, vitres, etc.",
    pricing: "À partir de 40€/heure",
    populars: ["Ménage régulier", "Nettoyage après travaux", "Nettoyage de vitres", "Désinfection"]
  },
  {
    id: 8,
    name: "Climatisation",
    icon: "❄️",
    description: "Installation et maintenance de climatiseurs",
    details: "Installation, entretien et réparation de systèmes de climatisation pour tous types de logements.",
    pricing: "À partir de 80€/heure",
    populars: ["Installation de clim", "Révision", "Dépannage", "Nettoyage de filtre"]
  },
  {
    id: 9,
    name: "Maçonnerie",
    icon: "🏗️",
    description: "Construction, rénovation, murs, fondations",
    details: "Travaux de maçonnerie pour vos projets de construction et rénovation.",
    pricing: "À partir de 75€/heure",
    populars: ["Construction de murs", "Rénovation de façade", "Pose de dalles", "Fondations"]
  }
];

// --- Composant principal ---
const ServicesPage = () => {
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(id ? parseInt(id) : null);

  const filteredServices = searchQuery
    ? serviceCategories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : serviceCategories;

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-servigo-800 to-servigo-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Services à domicile</h1>
            <p className="text-xl text-servigo-100">
              Trouvez le professionnel qu'il vous faut parmi nos nombreuses catégories de services
            </p>
          </div>
        </section>

        {/* Contenu principal */}
        <div className="container mx-auto px-4 py-12">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Section centrale */}
              <div className="md:w-full">
                <TabsContent value="all" className="mt-10">
                  <h2 className="text-2xl font-bold mb-6 text-center">Tous nos services</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                </TabsContent>

                {/* Détails par catégorie */}
                {serviceCategories.map(category => (
                  <TabsContent key={category.id} value={`cat-${category.id}`} className="mt-10">
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
