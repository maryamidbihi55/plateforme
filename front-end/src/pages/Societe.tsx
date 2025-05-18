
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
  Users, 
  MapPin,
  BarChart2,
  Settings,
  User,
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
    client: {
      nom: "Marie Dupont",
      tel: "+33612345678"
    },
    agent: {
      nom: "Jean Martin",
      id: 1
    }
  },
  {
    id: 2,
    service: "Plomberie",
    description: "Remplacement d'un robinet",
    adresse: "45 avenue Victor Hugo, 75016 Paris",
    date: "2023-06-28T10:30:00",
    statut: "en_cours",
    client: {
      nom: "Pierre Durand",
      tel: "+33687654321"
    },
    agent: {
      nom: "Luc Dubois",
      id: 2
    }
  },
  {
    id: 3,
    service: "Plomberie",
    description: "Installation d'un chauffe-eau",
    adresse: "8 rue de la Paix, 75002 Paris",
    date: "2023-07-05T09:00:00",
    statut: "planifié",
    client: {
      nom: "Sophie Martin",
      tel: "+33678912345"
    },
    agent: {
      nom: "Non assigné",
      id: null
    }
  },
  {
    id: 4,
    service: "Plomberie",
    description: "Débouchage de toilettes",
    adresse: "27 rue Saint-Michel, 75005 Paris",
    date: "2023-07-02T11:00:00",
    statut: "en_attente",
    client: {
      nom: "Thomas Bernard",
      tel: "+33645678912"
    },
    agent: {
      nom: "Non assigné",
      id: null
    }
  }
];

const agences = [
  {
    id: 1,
    nom: "Plomberie Express Paris Centre",
    adresse: "12 rue du Commerce, 75015 Paris",
    tel: "+33145678923",
    responsable: "David Martin",
    nombreAgents: 5
  },
  {
    id: 2,
    nom: "Plomberie Express Paris Est",
    adresse: "45 avenue Gambetta, 75020 Paris",
    tel: "+33143219876",
    responsable: "Sophie Dubois",
    nombreAgents: 3
  }
];

const agents = [
  {
    id: 1,
    nom: "Jean Martin",
    poste: "Plombier senior",
    agenceId: 1,
    tel: "+33678451236",
    statut: "actif",
    missionsEnCours: 1,
    evaluation: 4.8
  },
  {
    id: 2,
    nom: "Luc Dubois",
    poste: "Plombier",
    agenceId: 1,
    tel: "+33687123654",
    statut: "actif",
    missionsEnCours: 1,
    evaluation: 4.5
  },
  {
    id: 3,
    nom: "Paul Durand",
    poste: "Plombier junior",
    agenceId: 1,
    tel: "+33632145698",
    statut: "inactif",
    missionsEnCours: 0,
    evaluation: 4.2
  },
  {
    id: 4,
    nom: "Marie Lambert",
    poste: "Plombier",
    agenceId: 2,
    tel: "+33698745632",
    statut: "actif",
    missionsEnCours: 0,
    evaluation: 4.7
  },
];

const Societe = () => {
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

  const getAgentStatusColor = (statut: string) => {
    switch (statut) {
      case "actif":
        return "bg-green-100 text-green-800";
      case "inactif":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <NavBar />
      
      <Hero 
        title="Espace société partenaire" 
        subtitle="Gérez votre entreprise, vos agents et vos demandes de services"
        showSearch={false}
      />
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="dashboard" className="space-y-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center">
              <Home className="h-4 w-4 mr-2" /> Tableau de bord
            </TabsTrigger>
            <TabsTrigger value="demandes" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" /> Demandes
            </TabsTrigger>
            <TabsTrigger value="agents" className="flex items-center">
              <Users className="h-4 w-4 mr-2" /> Agents
            </TabsTrigger>
            <TabsTrigger value="agences" className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" /> Agences
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center">
              <BarChart2 className="h-4 w-4 mr-2" /> Statistiques
            </TabsTrigger>
            <TabsTrigger value="parametres" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" /> Paramètres
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Demandes récentes</CardTitle>
                      <CardDescription>Les dernières demandes de service reçues</CardDescription>
                    </div>
                    <Button onClick={() => setActiveTab("demandes")}>Voir tout</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {demandes.slice(0, 3).map((demande) => (
                        <div key={demande.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{demande.description}</h4>
                            <p className="text-sm text-muted-foreground">{demande.adresse}</p>
                            <p className="text-sm text-servigo-600 mt-1">{formatDate(demande.date)}</p>
                          </div>
                          <div className="flex items-center mt-3 md:mt-0">
                            <span className={`flex items-center text-xs px-3 py-1 rounded-full ${getStatusColor(demande.statut)}`}>
                              {getStatusIcon(demande.statut)}
                              {getStatusLabel(demande.statut)}
                            </span>
                            <Button variant="ghost" size="sm" asChild className="ml-2">
                              <Link to={`/societe/demandes/${demande.id}`}>Détails</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Agents actifs</CardTitle>
                    <CardDescription>Agents disponibles pour des missions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      {agents.filter(a => a.statut === "actif").slice(0, 4).map((agent) => (
                        <div key={agent.id} className="flex items-center p-3 border rounded-lg">
                          <div className="h-10 w-10 rounded-full bg-servigo-100 text-servigo-800 flex items-center justify-center font-semibold mr-3">
                            {agent.nom.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-medium">{agent.nom}</h4>
                            <p className="text-xs text-muted-foreground">{agent.poste}</p>
                          </div>
                          <div className="ml-auto">
                            <span className={`text-xs px-2 py-1 rounded-full ${agent.missionsEnCours > 0 ? 'bg-servigo-100 text-servigo-800' : 'bg-green-100 text-green-800'}`}>
                              {agent.missionsEnCours > 0 ? `${agent.missionsEnCours} mission(s)` : 'Disponible'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("agents")}>
                      Gérer les agents
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="bg-servigo-50 border-none">
                  <CardHeader>
                    <CardTitle>Votre entreprise</CardTitle>
                    <CardDescription>Plomberie Express</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-servigo-700">Agences</span>
                        <span className="font-medium">{agences.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-servigo-700">Agents</span>
                        <span className="font-medium">{agents.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-servigo-700">Demandes en cours</span>
                        <span className="font-medium">{demandes.filter(d => d.statut === "en_cours").length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-servigo-700">Note moyenne</span>
                        <span className="font-medium flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          4.7/5
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("parametres")}>
                      Modifier le profil
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="border-2 border-dashed border-servigo-200 bg-transparent">
                  <CardHeader>
                    <CardTitle>Nouvelle agence</CardTitle>
                    <CardDescription>Étendez votre présence géographique</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="rounded-full bg-servigo-100 w-12 h-12 mx-auto flex items-center justify-center mb-4">
                      <MapPin className="h-6 w-6 text-servigo-700" />
                    </div>
                    <p className="text-servigo-700 mb-4">Ajoutez une nouvelle agence pour couvrir plus de zones</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-servigo-700 hover:bg-servigo-800" onClick={() => setActiveTab("agences")}>
                      <Plus className="h-4 w-4 mr-2" /> Ajouter une agence
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="demandes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestion des demandes de service</CardTitle>
                  <CardDescription>Visualisez et gérez toutes les demandes clients</CardDescription>
                </div>
                <div className="flex space-x-4">
                  <Button variant="outline">Filtrer</Button>
                  <Button variant="outline">Trier</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {demandes.map((demande) => (
                    <Card key={demande.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 bg-servigo-50 p-4 flex flex-col justify-center">
                          <div className={`mb-3 self-start px-3 py-1 rounded-full flex items-center text-xs ${getStatusColor(demande.statut)}`}>
                            {getStatusIcon(demande.statut)}
                            {getStatusLabel(demande.statut)}
                          </div>
                          <p className="font-medium text-lg text-servigo-800 mb-1">{demande.service}</p>
                          <p className="text-sm text-servigo-600">{formatDate(demande.date)}</p>
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{demande.description}</h4>
                              <p className="text-sm flex items-center">
                                <MapPin className="h-4 w-4 mr-1 text-servigo-500" />
                                {demande.adresse}
                              </p>
                            </div>
                            <div className="mt-2 md:mt-0 flex flex-col items-start md:items-end">
                              <p className="text-sm font-medium">{demande.client.nom}</p>
                              <p className="text-sm text-servigo-600">{demande.client.tel}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-3 border-t">
                            <div className="mb-2 sm:mb-0">
                              <p className="text-sm font-medium">Agent assigné:</p>
                              <p className={`text-sm ${demande.agent.id ? "text-servigo-700" : "text-yellow-600"}`}>
                                {demande.agent.nom}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {!demande.agent.id && (
                                <Button size="sm" className="bg-servigo-600 hover:bg-servigo-700">
                                  <User className="h-4 w-4 mr-1" /> Assigner un agent
                                </Button>
                              )}
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" /> Message
                              </Button>
                              <Button size="sm" variant="outline">Détails</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agents">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestion des agents</CardTitle>
                  <CardDescription>Visualisez et gérez vos agents de service</CardDescription>
                </div>
                <Button className="bg-servigo-600 hover:bg-servigo-700">
                  <Plus className="h-4 w-4 mr-2" /> Ajouter un agent
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agents.map((agent) => (
                    <Card key={agent.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 bg-servigo-50 p-4 flex items-center">
                          <div className="h-12 w-12 rounded-full bg-white text-servigo-800 flex items-center justify-center font-semibold text-lg shadow-sm mr-3">
                            {agent.nom.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-medium">{agent.nom}</h4>
                            <p className="text-xs text-servigo-600">{agent.poste}</p>
                            <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${getAgentStatusColor(agent.statut)}`}>
                              {agent.statut === "actif" ? "Actif" : "Inactif"}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 sm:w-3/4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-servigo-600">Téléphone</p>
                              <p className="text-sm">{agent.tel}</p>
                            </div>
                            <div>
                              <p className="text-xs text-servigo-600">Agence</p>
                              <p className="text-sm">{agences.find(a => a.id === agent.agenceId)?.nom || "Non assigné"}</p>
                            </div>
                            <div>
                              <p className="text-xs text-servigo-600">Évaluation</p>
                              <p className="text-sm flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                                {agent.evaluation}/5
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-2 pt-3 border-t">
                            <div className="mb-2 sm:mb-0">
                              <p className="text-sm">
                                <span className="font-medium">Missions en cours:</span> {agent.missionsEnCours}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" variant="outline">
                                <MessageSquare className="h-4 w-4 mr-1" /> Message
                              </Button>
                              <Button size="sm" variant="outline">Modifier</Button>
                              {agent.statut === "actif" ? (
                                <Button size="sm" variant="outline" className="border-servigo-200 text-servigo-700">
                                  Désactiver
                                </Button>
                              ) : (
                                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                  Activer
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="agences">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestion des agences</CardTitle>
                  <CardDescription>Visualisez et gérez vos différentes agences</CardDescription>
                </div>
                <Button className="bg-servigo-600 hover:bg-servigo-700">
                  <Plus className="h-4 w-4 mr-2" /> Nouvelle agence
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agences.map((agence) => (
                    <Card key={agence.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/4 bg-servigo-50 p-4 flex flex-col justify-center">
                          <h4 className="font-semibold text-lg text-servigo-800">{agence.nom}</h4>
                          <p className="text-xs text-servigo-600 mt-2 flex items-center">
                            <Users className="h-4 w-4 mr-1" /> {agence.nombreAgents} agents
                          </p>
                        </div>
                        <div className="p-4 md:w-3/4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-servigo-600">Adresse</p>
                              <p className="text-sm flex items-start">
                                <MapPin className="h-4 w-4 mr-1 mt-0.5 text-servigo-500" />
                                {agence.adresse}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-servigo-600">Téléphone</p>
                              <p className="text-sm">{agence.tel}</p>
                            </div>
                            <div>
                              <p className="text-xs text-servigo-600">Responsable</p>
                              <p className="text-sm">{agence.responsable}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap justify-end mt-4 pt-3 border-t">
                            <Button size="sm" variant="outline" className="mr-2">
                              Gérer les agents
                            </Button>
                            <Button size="sm" variant="outline">
                              Modifier l'agence
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Statistiques</CardTitle>
                <CardDescription>Analysez les performances de votre entreprise</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <BarChart2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Statistiques à venir</h3>
                  <p className="text-muted-foreground">Cette fonctionnalité sera disponible prochainement.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="parametres">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de l'entreprise</CardTitle>
                <CardDescription>Configurez les informations de votre société</CardDescription>
              </CardHeader>
              <CardContent className="min-h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <Settings className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Paramètres à venir</h3>
                  <p className="text-muted-foreground">Cette fonctionnalité sera disponible prochainement.</p>
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

export default Societe;
