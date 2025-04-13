
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface ProfilePictureProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const ProfilePicture = ({
  src = "/placeholder.svg",
  alt = "Developer Avatar",
  size = "lg",
  className,
}: ProfilePictureProps) => {
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32", 
    xl: "h-40 w-40"
  };

  return (
    <div className={`rounded-full p-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent ${className}`}>
      <Avatar className={`${sizeClasses[size]} border-4 border-white`}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback className="bg-portfolio-primary/10 text-portfolio-primary">
          <User className="h-12 w-12" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ProfilePicture;
