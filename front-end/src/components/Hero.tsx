

interface HeroProps {
  title?: string;
  subtitle?: string;
  showSearch?: boolean;
}

const Hero = ({ 
  title = "Vos services à domicile en toute confiance", 
  subtitle = "Trouvez rapidement des professionnels qualifiés pour tous vos besoins de services à domicile", 
   
}: HeroProps) => {
  return (
    <section className="relative min-h-screen text-white py-16 md:py-24">
  {/* Image de fond */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: 'url("/backround.avif")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      filter: 'brightness(0.5)', // ou blur, ou rien
    }}
  ></div>

  {/* Overlay bleu foncé transparent */}
  <div className="absolute inset-0 bg-servigo-700 opacity-20"></div>

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      <p className="text-xl md:text-2xl text-servigo-100 mb-8">{subtitle}</p>

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
