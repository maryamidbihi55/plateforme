
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  service: string;
  rating: number;
  text: string;
  avatar: string;
}

const TestimonialCard = ({ name, location, service, rating, text, avatar }: TestimonialCardProps) => {
  return (
    <Card className="h-full shadow-md border-none">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
            <img 
              src={avatar} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-servigo-900">{name}</h4>
            <p className="text-sm text-servigo-600">{location}</p>
          </div>
        </div>
        
        <div className="flex items-center mb-2">
          {Array(5).fill(0).map((_, i) => (
            <StarIcon 
              key={i} 
              className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
        
        <p className="text-sm text-servigo-500 mb-4">Service : {service}</p>
        
        <p className="text-servigo-700 italic">"{text}"</p>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
