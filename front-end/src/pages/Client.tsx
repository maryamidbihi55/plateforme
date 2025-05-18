
import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  Star, 
  File, 
  Plus 
} from "lucide-react";

const demandes = [
  {
    id: 1,
    service: "Plomberie",
    description: "Fuite sous l'évier de la cuisine",
    adresse: "12 rue des Lilas, 75001 Paris",
    date: "2023-06-15T14:00:00",
    statut: "terminé",
    prestataire: {
      nom: "Plomberie Express",
      note: 4.7
    }
  },
  {
    id: 2,
    service: "Électricité",
    description: "Installation de prises électriques dans le salon",
    adresse: "12 rue des Lilas, 75001 Paris",
    date: "2023-06-28T10:30:00",
    statut: "en_cours",
    prestataire: {
      nom: "Électricité Pro",
      note: 4.5
    }
  },
  {
    id: 3,
    service: "Jardinage",
    description: "Tonte de pelouse et taille de haies",
    adresse: "12 rue des Lilas, 75001 Paris",
    date: "2023-07-05T09:00:00",
    statut: "planifié",
    prestataire: {
      nom: "Jardin Service",
      note: 4.8
    }
  }
];

const Client = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return "bg-yellow-100 text-yellow-800";
      case "planifié":
        return "bg-blue-100 text-blue-800";
      case "en_cours":
        return "bg-green-100 text-green-800";
      case "terminé":
        return "bg-gray-100 text-gray-800";
      case "annulé":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return "En attente";
      case "planifié":
        return "Planifié";
      case "en_cours":
        return "En cours";
      case "terminé":
        return "Terminé";
      case "annulé":
        return "Annulé";
      default:
        return statut;
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "en_attente":
        return <Clock className="h-4 w-4 mr-1" />;
      case "planifié":
        return <Clock className="h-4 w-4 mr-1" />;
      case "en_cours":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case "terminé":
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case "annulé":
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return <Clock className="h-4 w-4 mr-1" />;
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <>
      <NavBar />
      
      <Hero 
        title="Votre espace client" 
        subtitle="Gérez vos demandes de services et suivez vos interventions"
        showSearch={false}
      />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="dashboard" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4 lg:grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center">
              <Home className="h-4 w-4 mr-2" /> Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="demandes" className="flex items-center">
              <File className="h-4 w-4 mr-2" /> Mes demandes
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" /> Messages
            </TabsTrigger>
            <TabsTrigger value="avis" className="flex items-center">
              <Star className="h-4 w-4 mr-2" /> Mes avis
            </TabsTrigger>
            <TabsTrigger value="profil" className="flex items-center">
              <Home className="h-4 w-4 mr-2" /> Mon profil
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Demandes récentes</CardTitle>
                    <CardDescription>Suivez l'état de vos dernières demandes de service</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {demandes.slice(0, 3).map((demande) => (
                        <div key={demande.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{demande.service}</h4>
                            <p className="text-sm text-muted-foreground">{demande.description}</p>
                            <p className="text-sm text-servigo-600 mt-1">{formatDate(demande.date)}</p>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <span className={`flex items-center text-xs px-3 py-1 rounded-full ${getStatusColor(demande.statut)}`}>
                              {getStatusIcon(demande.statut)}
                              {getStatusLabel(demande.statut)}
                            </span>
                            <Button variant="ghost" size="sm" asChild className="ml-2">
                              <Link to={`/client/demandes/${demande.id}`}>Détails</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("demandes")}>
                      Voir toutes les demandes
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Services populaires</CardTitle>
                    <CardDescription>Découvrez les services les plus demandés</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {["Plomberie", "Électricité", "Ménage", "Jardinage", "Peinture", "Menuiserie"].map((service, index) => (
                        <Link 
                          key={index} 
                          to={`/services/${service.toLowerCase()}`}
                          className="border rounded-lg p-4 text-center hover:border-servigo-500 hover:shadow transition-all"
                        >
                          <div className="text-2xl mb-2">{
                            ["🔧", "⚡", "🧹", "🌱", "🖌️", "🪚"][index]
                          }</div>
                          <p className="text-sm font-medium">{service}</p>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-servigo-50 border-none">
                  <CardHeader>
                    <CardTitle>Nouvelle demande</CardTitle>
                    <CardDescription>Besoin d'un service à domicile ?</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-5xl mb-4">🏠</div>
                    <p className="mb-4 text-servigo-700">Créez une nouvelle demande de service pour vos besoins à domicile</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-accent-500 hover:bg-accent-600">
                      <Plus className="h-4 w-4 mr-2" /> Créer une demande
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Aide et support</CardTitle>
                    <CardDescription>Besoin d'assistance ?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="text-servigo-600 hover:text-servigo-800">
                        <Link to="/faq" className="flex items-center">
                          <span className="mr-2">📘</span> FAQ
                        </Link>
                      </li>
                      <li className="text-servigo-600 hover:text-servigo-800">
                        <Link to="/contact" className="flex items-center">
                          <span className="mr-2">📞</span> Contacter le support
                        </Link>
                      </li>
                      <li className="text-servigo-600 hover:text-servigo-800">
                        <Link to="/guide" className="flex items-center">
                          <span className="mr-2">📝</span> Guide d'utilisation
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="demandes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Mes demandes de service</CardTitle>
                  <CardDescription>Historique et suivi de toutes vos demandes</CardDescription>
                </div>
                <Button className="bg-accent-500 hover:bg-accent-600">
                  <Plus className="h-4 w-4 mr-2" /> Nouvelle demande
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demandes.map((demande) => (
                    <Card key={demande.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 bg-servigo-50 p-4 flex flex-col justify-center items-center">
                          <p className="font-medium text-lg text-servigo-800">{demande.service}</p>
                          <div className={`mt-2 px-3 py-1 rounded-full flex items-center text-xs ${getStatusColor(demande.statut)}`}>
                            {getStatusIcon(demande.statut)}
                            {getStatusLabel(demande.statut)}
                          </div>
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                            <h4 className="font-semibold text-lg">{demande.description}</h4>
                            <p className="text-sm text-servigo-600">{formatDate(demande.date)}</p>
                          </div>
                          <p className="text-sm mb-3">
                            <span className="font-medium">Adresse:</span> {demande.adresse}
                          </p>
                          <p className="text-sm mb-4">
                            <span className="font-medium">Prestataire:</span> {demande.prestataire.nom} 
                            <span className="ml-2 inline-flex items-center">
                              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                              <span className="ml-1">{demande.prestataire.note}</span>
                            </span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="h-4 w-4 mr-1" /> Message
                            </Button>
                            <Button size="sm" variant="outline">Détails</Button>
                            {demande.statut === "terminé" && (
                              <Button size="sm" variant="outline" className="flex items-center">
                                <Star className="h-4 w-4 mr-1" /> Laisser un avis
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Mes messages</CardTitle>
                <CardDescription>Vos échanges avec les prestataires</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-12">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun message</h3>
                  <p className="text-muted-foreground mb-4">Vous n'avez pas encore de conversations avec des prestataires.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="avis">
            <Card>
              <CardHeader>
                <CardTitle>Mes avis</CardTitle>
                <CardDescription>Avis que vous avez laissés aux prestataires</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-12">
                <div className="text-center">
                  <Star className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun avis</h3>
                  <p className="text-muted-foreground mb-4">Vous n'avez pas encore laissé d'avis à un prestataire.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profil">
            <Card>
              <CardHeader>
                <CardTitle>Mon profil</CardTitle>
                <CardDescription>Gérez vos informations personnelles</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center p-12">
                <div className="text-center">
                  <Home className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Profil client</h3>
                  <p className="text-muted-foreground mb-4">Cette fonctionnalité sera disponible prochainement.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </>
  );
};

export default Client;
