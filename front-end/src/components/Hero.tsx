
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface HeroProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

const Hero = ({ 
  title = "Vos services à domicile en toute confiance", 
  subtitle = "Trouvez rapidement des professionnels qualifiés pour tous vos besoins de services à domicile", 
  showSearch = true 
}: HeroProps) => {
  return (
    <section className="relative bg-gradient-to-r from-servigo-900 via-servigo-800 to-servigo-700 text-white py-16 md:py-24">
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-10" 
        style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px' 
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
          <p className="text-xl md:text-2xl text-servigo-100 mb-8">{subtitle}</p>
          
          {showSearch && (
            <div className="bg-white p-2 rounded-lg shadow-lg max-w-2xl mx-auto">
              <div className="flex flex-col md:flex-row">
                <div className="flex-grow mb-2 md:mb-0 md:mr-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-servigo-400" size={20} />
                    <select 
                      className="w-full pl-10 pr-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-servigo-500 text-servigo-900"
                      defaultValue=""
                    >
                      <option value="" disabled>Quel service recherchez-vous ?</option>
                      <option value="plomberie">Plomberie</option>
                      <option value="electricite">Électricité</option>
                      <option value="menage">Ménage</option>
                      <option value="jardinage">Jardinage</option>
                      <option value="peinture">Peinture</option>
                      <option value="menuiserie">Menuiserie</option>
                    </select>
                  </div>
                </div>
                <Button className="bg-accent-500 hover:bg-accent-600 text-white py-3 px-6 rounded-md">
                  Rechercher
                </Button>
              </div>
            </div>
          )}
          
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div className="flex items-center bg-servigo-800/50 px-4 py-2 rounded-full">
              <span className="mr-2 text-accent-400 text-2xl">✓</span>
              <span>Professionnels qualifiés</span>
            </div>
            <div className="flex items-center bg-servigo-800/50 px-4 py-2 rounded-full">
              <span className="mr-2 text-accent-400 text-2xl">✓</span>
              <span>Interventions garanties</span>
            </div>
            <div className="flex items-center bg-servigo-800/50 px-4 py-2 rounded-full">
              <span className="mr-2 text-accent-400 text-2xl">✓</span>
              <span>Service client 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
