
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ServiceCategoryCardProps {
  id: number;
  name: string;
  icon: string;
  description: string;
  className?: string;
}

const ServiceCategoryCard = ({ id, name, icon, description, className }: ServiceCategoryCardProps) => {
  return (
    <Link to={`/services/${id}`}>
      <Card className={cn(
        "transition-all hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-servigo-300 h-full",
        className
      )}>
        <CardContent className="p-6 text-center">
          <div className="mb-4 inline-flex p-3 rounded-full bg-servigo-50 text-servigo-700">
            <span className="text-4xl">{icon}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2">{name}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </CardContent>
        <CardFooter className="pt-0 pb-4 justify-center">
          <span className="text-servigo-600 text-sm font-medium">Découvrir &rarr;</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ServiceCategoryCard;
