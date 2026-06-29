import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

const ProjectGallery = ({ images, title }: ProjectGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!images?.length) return null;

  const multiple = images.length > 1;

  return (
    <div>
      <div className="relative">
        <Carousel setApi={setApi} opts={{ loop: true }} className="rounded-xl overflow-hidden shadow-lg">
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i}>
                <div className="flex items-center justify-center h-64 md:h-96 bg-gray-50">
                  <img
                    src={src}
                    alt={`${title} screenshot ${i + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {multiple && (
            <>
              <CarouselPrevious className="left-3" />
              <CarouselNext className="right-3" />
            </>
          )}
        </Carousel>

        {multiple && (
          <div className="absolute top-3 right-3 bg-portfolio-dark/70 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {current + 1} / {count}
          </div>
        )}
      </div>

      {multiple && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "w-6 bg-portfolio-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;
