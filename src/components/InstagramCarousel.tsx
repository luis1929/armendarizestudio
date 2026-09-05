'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ExternalLink, Heart, MessageCircle } from 'lucide-react';
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

interface InstagramCarouselProps {
  profile?: InstagramProfile;
  posts?: InstagramPost[];
  maxPosts?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function InstagramCarousel({
  profile,
  posts = [],
  maxPosts = 6,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  showArrows = true,
  className,
}: InstagramCarouselProps) {
  const displayPosts = posts.slice(0, maxPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const instagramUrl = profile ? `https://www.instagram.com/${profile.username}/` : 'https://www.instagram.com/armendariz_estudio/';

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
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

  useEffect(() => {
    isMountedRef.current = true;
    return () => { isMountedRef.current = false; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    setTouchStart(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  if (displayPosts.length === 0) {
    return (
      <div className={cn('py-16 px-6 bg-gray-50 text-center', className)}>
        <InstagramIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" aria-hidden="true" />
        <p className="text-gray-500">No hay publicaciones disponibles</p>
      </div>
    );
  }

  return (
    <section className={cn('relative py-16 px-6 bg-gray-50 overflow-hidden', className)} aria-label="Feed de Instagram - Carrusel">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={profile?.profilePictureUrl || '/images/instagram-avatar-placeholder.svg'}
                alt={profile?.username || 'armendariz_estudio'}
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            </div>
            <div>
              <h2 className="font-playfair uppercase tracking-wider text-xl font-medium text-gray-900">
                @{profile?.username || 'armendariz_estudio'}
              </h2>
              {profile?.biography && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2 max-w-md">
                  {profile.biography}
                </p>
              )}
              <div className="flex gap-6 mt-2 text-sm text-gray-500">
                {profile?.mediaCount !== undefined && <span>{profile.mediaCount} publicaciones</span>}
                {profile?.followersCount !== undefined && <span>{profile.followersCount.toLocaleString()} seguidores</span>}
                {profile?.followsCount !== undefined && <span>{profile.followsCount} seguidos</span>}
              </div>
            </div>
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
            aria-label={`Seguir a @${profile?.username || 'armendariz_estudio'} en Instagram`}
          >
            <InstagramIcon className="w-5 h-5" aria-hidden="true" />
            Seguir en Instagram
          </a>
        </div>

        <div 
          className="relative" 
          role="region" 
          aria-roledescription="carousel"
          aria-label="Publicaciones de Instagram"
          onKeyDown={handleKeyDown}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                width: `${displayPosts.length * 100}%`,
              }}
              role="list"
            >
              {displayPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="flex-[0_0_100%] w-full px-2 sm:px-3"
                  role="listitem"
                  aria-roledescription="slide"
                  aria-label={`Publicación ${index + 1} de ${displayPosts.length}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                >
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
                    aria-label={`Ver publicación en Instagram: ${post.caption?.slice(0, 100)}...`}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.caption ? `Publicación de Instagram: ${post.caption.slice(0, 100)}` : `Publicación de Instagram de @${profile?.username || 'armendariz_estudio'}`}
                        fill
                        className={cn(
                          'object-cover transition-transform duration-700 ease-out',
                          isTransitioning ? 'scale-100' : 'group-hover:scale-105'
                        )}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                        <div className="flex items-center justify-between w-full text-white">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              <Heart className="w-4 h-4" aria-hidden="true" />
                              <span className="font-medium text-sm">{post.likeCount?.toLocaleString() ?? '0'}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                              <MessageCircle className="w-4 h-4" aria-hidden="true" />
                              <span className="font-medium text-sm">{post.commentCount?.toLocaleString() ?? '0'}</span>
                            </div>
                          </div>
                          <span className="p-2.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                            <ExternalLink className="w-5 h-5" aria-hidden="true" />
                          </span>
                        </div>
                      </div>

                      {post.mediaType === 'VIDEO' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-500 shadow-xl">
                            <svg className="w-7 h-7 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {post.mediaType === 'CAROUSEL_ALBUM' && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-gray-700 text-sm font-medium shadow-lg">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Carrusel
                        </div>
                      )}
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>

          {showArrows && displayPosts.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:bg-white hover:text-wine transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
                aria-label="Publicación anterior"
                aria-disabled={isTransitioning}
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 z-10 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-gray-700 hover:bg-white hover:text-wine transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus-visible:ring-2 focus-visible:ring-wine"
                aria-label="Siguiente publicación"
                aria-disabled={isTransitioning}
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}

          {showIndicators && displayPosts.length > 1 && (
            <div className="flex justify-center gap-2 mt-8" role="tablist" aria-label="Navegación del carrusel">
              {displayPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2',
                    index === currentIndex
                      ? 'bg-wine w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  )}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Ir a publicación ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-wine hover:underline font-medium transition-colors"
            aria-label={`Ver todo el feed de @${profile?.username || 'armendariz_estudio'} en Instagram`}
          >
            Ver más en Instagram
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}