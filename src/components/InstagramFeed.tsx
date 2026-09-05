'use client';

import Image from 'next/image';
import { ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

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

export interface InstagramPost {
  id: string;
  imageUrl: string;
  thumbnailUrl: string;
  permalink: string;
  caption?: string;
  likeCount?: number;
  commentCount?: number;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
}

export interface InstagramProfile {
  id: string;
  username: string;
  profilePictureUrl: string;
  biography?: string;
  followsCount?: number;
  followersCount?: number;
  mediaCount?: number;
}

const FALLBACK_PROFILE: InstagramProfile = {
  id: 'armendariz_estudio',
  username: 'armendariz_estudio',
  profilePictureUrl: '/images/instagram-avatar-placeholder.svg',
  biography: 'Bolsos artesanales únicos hechos a mano en Colombia 🇨🇴 Diseños ilustrados y bordados | Envío gratis | Talleres creativos',
  followsCount: 120,
  followersCount: 2840,
  mediaCount: 156,
};

const FALLBACK_POSTS: InstagramPost[] = [
  {
    id: '1',
    imageUrl: '/images/instagram-post-1.svg',
    thumbnailUrl: '/images/instagram-post-1.svg',
    permalink: 'https://www.instagram.com/p/armendariz_post1/',
    caption: 'Nuevo bolso felino 🐱 Hecho a mano con amor en nuestro taller. Cada puntada cuenta una historia. #HechoEnColombia #Artesanal #BolsosArtesanales',
    likeCount: 245,
    commentCount: 18,
    mediaType: 'IMAGE',
    timestamp: '2025-01-15T10:30:00Z',
  },
  {
    id: '2',
    imageUrl: '/images/instagram-post-2.svg',
    thumbnailUrl: '/images/instagram-post-2.svg',
    permalink: 'https://www.instagram.com/p/armendariz_post2/',
    caption: 'Taller de bordado creativo este sábado 🧵✨ Aprende a crear tus propios diseños. Cupos limitados. Link en bio para inscribirse. #TalleresCreativos #Bordado #ArmendarizEstudio',
    likeCount: 312,
    commentCount: 42,
    mediaType: 'IMAGE',
    timestamp: '2025-01-12T14:20:00Z',
  },
  {
    id: '3',
    imageUrl: '/images/instagram-post-3.svg',
    thumbnailUrl: '/images/instagram-post-3.svg',
    permalink: 'https://www.instagram.com/p/armendariz_post3/',
    caption: 'Detalle de nuestro bolso libélula 🦋 La ilustración a mano hace que cada pieza sea única. Disponible en tienda online. #DisenoArtesanal #Ilustracion #ModaColombiana',
    likeCount: 189,
    commentCount: 12,
    mediaType: 'IMAGE',
    timestamp: '2025-01-10T09:15:00Z',
  },
  {
    id: '4',
    imageUrl: '/images/instagram-post-4.svg',
    thumbnailUrl: '/images/instagram-post-4.svg',
    permalink: 'https://www.instagram.com/p/armendariz_post4/',
    caption: 'Proceso creativo: del boceto al bolso final 🎨👜 Cada diseño nace en papel antes de cobrar vida en tela. #ProcesoCreativo #HechoAMano #ArteYModa',
    likeCount: 428,
    commentCount: 35,
    mediaType: 'CAROUSEL_ALBUM',
    timestamp: '2025-01-08T16:45:00Z',
  },
  {
    id: '5',
    imageUrl: '/images/instagram-post-5.svg',
    thumbnailUrl: '/images/instagram-post-5.svg',
    permalink: 'https://www.instagram.com/p/armendariz_post5/',
    caption: 'Envío gratis a toda Colombia 📦🇨🇴 Tu bolso artesanal llega a la puerta de tu casa. Pago contraentrega disponible. #EnvioGratis #Colombia #CompraLocal',
    likeCount: 156,
    commentCount: 8,
    mediaType: 'IMAGE',
    timestamp: '2025-01-05T11:00:00Z',
  },
  {
    id: '6',
    imageUrl: '/images/instagram-post-6.svg',
    thumbnailUrl: '/images/instagram-post-6.svg',
    permalink: 'https://www.instagram.com/p/armendariz_post6/',
    caption: 'Regalos únicos para ocasiones especiales 🎁 Un bolso Armendariz no es solo un accesorio, es una obra de arte que llevas contigo. #RegalosUnicos #ArteHechoAMano #DetallesEspeciales',
    likeCount: 267,
    commentCount: 23,
    mediaType: 'IMAGE',
    timestamp: '2025-01-03T13:30:00Z',
  },
];

interface InstagramFeedProps {
  profile?: InstagramProfile;
  posts?: InstagramPost[];
  maxPosts?: number;
  showFollowButton?: boolean;
  className?: string;
}

export function InstagramFeed({
  profile = FALLBACK_PROFILE,
  posts = FALLBACK_POSTS,
  maxPosts = 6,
  showFollowButton = true,
  className,
}: InstagramFeedProps) {
  const displayPosts = posts.slice(0, maxPosts);
  const instagramUrl = `https://www.instagram.com/${profile.username}/`;

  return (
    <section className={cn('py-16 px-6 bg-gray-50', className)} aria-label="Feed de Instagram">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <Image
                src={profile.profilePictureUrl}
                alt={profile.username}
                fill
                className="object-cover"
                sizes="64px"
                priority
              />
            </div>
            <div>
              <h2 className="font-playfair uppercase tracking-wider text-xl font-medium text-gray-900">
                @{profile.username}
              </h2>
              {profile.biography && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2 max-w-md">
                  {profile.biography}
                </p>
              )}
              <div className="flex gap-6 mt-2 text-sm text-gray-500">
                {profile.mediaCount !== undefined && (
                  <span>{profile.mediaCount} publicaciones</span>
                )}
                {profile.followersCount !== undefined && (
                  <span>{profile.followersCount.toLocaleString()} seguidores</span>
                )}
                {profile.followsCount !== undefined && (
                  <span>{profile.followsCount} seguidos</span>
                )}
              </div>
            </div>
          </div>

          {showFollowButton && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/25"
              aria-label={`Seguir a @${profile.username} en Instagram`}
            >
              <InstagramIcon className="w-5 h-5" />
              Seguir en Instagram
            </a>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3" role="list">
          {displayPosts.map((post) => (
            <article
              key={post.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100"
              role="listitem"
            >
              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-square focus:outline-none focus-visible:ring-2 focus-visible:ring-wine focus-visible:ring-offset-2"
                aria-label={`Ver publicación en Instagram: ${post.caption?.slice(0, 100)}...`}
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.caption ? `Publicación de Instagram: ${post.caption.slice(0, 100)}` : `Publicación de Instagram de @${profile.username}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center justify-between w-full text-white">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-sm font-medium">
                          <Heart className="w-4 h-4" aria-hidden="true" />
                          {post.likeCount?.toLocaleString() ?? '0'}
                        </span>
                        <span className="flex items-center gap-1 text-sm font-medium">
                          <MessageCircle className="w-4 h-4" aria-hidden="true" />
                          {post.commentCount?.toLocaleString() ?? '0'}
                        </span>
                      </div>
                      <span className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                        <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                  {post.mediaType === 'VIDEO' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-500 shadow-lg">
                        <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {post.mediaType === 'CAROUSEL_ALBUM' && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700 text-xs font-medium">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Carrusel
                    </div>
                  )}
                </div>
              </a>
            </article>
          ))}

          {displayPosts.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">No hay publicaciones disponibles</p>
            </div>
          )}
        </div>

        <div className="text-center mt-10">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-wine hover:underline font-medium transition-colors"
            aria-label={`Ver todo el feed de @${profile.username} en Instagram`}
          >
            Ver más en Instagram
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function InstagramFeedSkeleton({ count = 6 }: { count?: number }) {
  return (
    <section className="py-16 px-6 bg-gray-50" aria-label="Feed de Instagram cargando">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-60 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-80 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse overflow-hidden" />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function fetchInstagramFeed(
  accessToken: string,
  userId: string,
  limit = 12
): Promise<{ profile: InstagramProfile; posts: InstagramPost[] }> {
  const fields = 'id,username,profile_picture_url,biography,follows_count,followers_count,media_count';
  const mediaFields = 'id,media_type,media_url,thumbnail_url,permalink,caption,like_count,comments_count,timestamp';

  try {
    const [profileRes, mediaRes] = await Promise.all([
      fetch(`https://graph.instagram.com/${userId}?fields=${fields}&access_token=${accessToken}`),
      fetch(`https://graph.instagram.com/${userId}/media?fields=${mediaFields}&limit=${limit}&access_token=${accessToken}`),
    ]);

    if (!profileRes.ok || !mediaRes.ok) {
      throw new Error('Error fetching Instagram data');
    }

    const profile = await profileRes.json();
    const media = await mediaRes.json();

    return {
      profile: {
        id: profile.id,
        username: profile.username,
        profilePictureUrl: profile.profile_picture_url,
        biography: profile.biography,
        followsCount: profile.follows_count,
        followersCount: profile.followers_count,
        mediaCount: profile.media_count,
      },
      posts: media.data.map((post: Record<string, unknown>) => ({
        id: post.id as string,
        imageUrl: post.media_url as string,
        thumbnailUrl: (post.thumbnail_url as string) || (post.media_url as string),
        permalink: post.permalink as string,
        caption: post.caption as string | undefined,
        likeCount: post.like_count as number | undefined,
        commentCount: post.comments_count as number | undefined,
        mediaType: post.media_type as 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM',
        timestamp: post.timestamp as string,
      })),
    };
  } catch (error) {
    console.error('Instagram fetch error:', error);
    throw error;
  }
}