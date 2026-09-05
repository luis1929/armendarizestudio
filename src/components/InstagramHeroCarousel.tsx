'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { InstagramPost, InstagramProfile } from './InstagramFeed';

function InstagramIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface InstagramHeroCarouselProps {
  profile?: InstagramProfile;
  posts?: InstagramPost[];
  maxPosts?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export function InstagramHeroCarousel({
  profile,
  posts = [],
  maxPosts = 6,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: InstagramHeroCarouselProps) {
  const displayPosts = posts.slice(0, maxPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const instagramUrl = profile ? `https://www.instagram.com/${profile.username}/` : 'https://www.instagram.com/armendariz_estudio/';

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 400);
  }, [currentIndex, isTransitioning]);

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % displayPosts.length);
  }, [currentIndex, displayPosts.length, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + displayPosts.length) % displayPosts.length);
  }, [currentIndex, displayPosts.length, goToSlide]);

  useEffect(() => {
    if (!autoPlay || displayPosts.length <= 1) return;
    autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, autoPlayInterval, displayPosts.length, nextSlide]);

  if (displayPosts.length === 0) return null;

  return (
    <section className={cn('py-10 px-6 bg-gray-50', className)} aria-label="Vista previa de Instagram">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={profile?.profilePictureUrl || '/images/instagram-avatar-placeholder.svg'}
                alt={profile?.username || 'armendariz_estudio'}
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h2 className="font-playfair uppercase tracking-wider text-lg font-medium text-gray-900">
                @{profile?.username || 'armendariz_estudio'}
              </h2>
              <p className="text-xs text-gray-500">
                {profile?.followersCount?.toLocaleString() ?? '2.840'} seguidores
              </p>
            </div>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-sm shadow-pink-500/20 whitespace-nowrap"
            aria-label={`Seguir en Instagram`}
          >
            <InstagramIcon className="w-4 h-4" aria-hidden="true" />
            Seguir
          </a>
        </div>

        <div 
          className="relative" 
          role="region" 
          aria-roledescription="carousel"
          aria-label="Publicaciones de Instagram"
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-400 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                width: `${displayPosts.length * (100 / 3)}%`,
              }}
              role="list"
            >
              {displayPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="flex-[0_0_33.333%] w-full px-2"
                  role="listitem"
                  aria-roledescription="slide"
                  aria-label={`Publicación ${index + 1} de ${displayPosts.length}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                >
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
                    aria-label={`Ver en Instagram: ${post.caption?.slice(0, 80)}...`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.caption ? `Instagram: ${post.caption.slice(0, 80)}` : `Post de @${profile?.username || 'armendariz_estudio'}`}
                        fill
                        className={cn(
                          'object-cover transition-transform duration-500 ease-out',
                          isTransitioning ? 'scale-100' : 'group-hover:scale-105'
                        )}
                        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 33vw, 33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <div className="flex items-center justify-between w-full text-white">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 9.5a5.5 5.5 0 019.591-3.676.56.56 0 00.818 0A5.49 5.49 0 0122 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 01-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg>
                              {post.likeCount?.toLocaleString() ?? '0'}
                            </span>
                          </div>
                          <span className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                            <ExternalLink className="w-4 h-4" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>

          {displayPosts.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 z-10 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white hover:text-wine transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 z-10 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-md text-gray-700 hover:bg-white hover:text-wine transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </>
          )}

          {displayPosts.length > 3 && (
            <div className="flex justify-center gap-1.5 mt-6" role="tablist" aria-label="Navegación">
              {Array.from({ length: Math.ceil(displayPosts.length / 3) }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i * 3)}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2',
                    Math.floor(currentIndex / 3) === i
                      ? 'bg-wine w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  )}
                  role="tab"
                  aria-selected={Math.floor(currentIndex / 3) === i}
                  aria-label={`Grupo ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}