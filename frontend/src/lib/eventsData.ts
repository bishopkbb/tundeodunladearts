import { calculateExhibitionStatus, type ExhibitionStatus } from '@/lib/exhibitionUtils';
import { eventImages } from '@/lib/eventImages.generated';

/**
 * Single source of truth for exhibitions and events, shared by the landing page
 * (FeaturedExhibitions) and the /exhibitions page. To add an event, add one entry here.
 *
 * Images for new events come from scripts/optimize-event-images.mjs (see eventImages.generated.ts).
 */

export type EventType = 'exhibition' | 'festival' | 'awards' | 'event';

export interface SiteEvent {
  id: number;
  title: string;
  /** Shorter title for compact cards, when the full title is long. */
  cardTitle?: string;
  subtitle?: string;
  artist: string;
  category: string;
  /** Longer category line for compact cards. */
  cardCategory?: string;
  type: EventType;
  startDate: string; // YYYY-MM-DD
  endDate?: string; // YYYY-MM-DD
  openingTime?: string;
  venue: string;
  address?: string;
  /** Full location line used on the exhibitions page. */
  location: string;
  description: string;
  longDescription: string;
  artworks: number;
  image: string;
  imageAlt?: string;
  /** 'contain' shows flyers in full (with a blurred backdrop) instead of cropping their text. */
  imageFit?: 'cover' | 'contain';
  blurDataURL?: string;
  /** YouTube video id of a recording or livestream, shown with a lightweight player. */
  videoId?: string;
  videoUrl?: string;
}

const flyer = (key: keyof typeof eventImages) => ({
  image: eventImages[key].src,
  blurDataURL: eventImages[key].blurDataURL,
  imageFit: 'contain' as const,
});

export const events: SiteEvent[] = [
  // ---------------------------------------------------------------- 2026 (new)
  {
    id: 7,
    title: 'Ìtànjẹ, Ìrẹ̀jẹ̀, Títí Ayé',
    subtitle: 'Deception and Perfidy Till Eternity',
    artist: 'Curated by Tunde Odunlade',
    category: 'Multimedia Arts Exhibition',
    type: 'exhibition',
    startDate: '2026-11-19',
    endDate: '2026-12-08',
    openingTime: '02:00 PM',
    venue: 'National Museum of Unity',
    address: 'Ibadan, Oyo State',
    location: 'National Museum of Unity, Ibadan, Oyo State',
    description:
      'A multimedia arts exhibition by the Visual Artists Gallery Owners Network (VAGON) and the National Commission for Museums and Monuments (NCMM), opening 19 November 2026 in Ibadan.',
    longDescription:
      'Ìtànjẹ, Ìrẹ̀jẹ̀, Títí Ayé (Deception and Perfidy Till Eternity) is a multimedia arts exhibition presented by the Visual Artists Gallery Owners Network (VAGON) and the National Commission for Museums and Monuments (NCMM).\n\nThe exhibition opens on 19 November 2026 at 2:00 pm at the National Museum of Unity, Ibadan, and runs until 8 December 2026. It features members of VAGON and other guest artists, with relevant speakers expected during the show.\n\nCurated by Tunde Odunlade. Powered by the Tunde Odunlade Culture and Art Foundation (TOCA-F).',
    artworks: 0,
    ...flyer('itanje-ireje-titi-aye-2026'),
    imageAlt: 'Flyer for the Ìtànjẹ, Ìrẹ̀jẹ̀, Títí Ayé multimedia arts exhibition, opening 19 November 2026 at the National Museum of Unity, Ibadan',
  },
  {
    id: 8,
    title: 'Oyo State Business Forum 2026',
    artist: 'Curated by Prince Tunde Odunlade',
    category: 'Business Forum',
    type: 'event',
    startDate: '2026-11-11',
    endDate: '2026-11-12',
    venue: 'Ministry of Local Government Hall',
    address: 'Oyo State Secretariat, Agodi, Ibadan',
    location: 'Ministry of Local Government Hall, Oyo State Secretariat, Agodi, Ibadan',
    description:
      'Theme: Investment and Export Promotion of Arts and Crafts Businesses in Oyo State. Curated by the artist Prince Tunde Odunlade.',
    longDescription:
      'The Oyo State Business Forum 2026 took place on 11 and 12 November 2026 at the Ministry of Local Government Hall, Oyo State Secretariat, Agodi, Ibadan.\n\nTheme: Investment and Export Promotion of Arts and Crafts Businesses in Oyo State. The forum was curated by the artist Prince Tunde Odunlade, with His Excellency Engr. Oluseyi Abiodun Makinde, Executive Governor of Oyo State, as chief host.\n\nPowered by the Ministry of Culture and Tourism, the Oyo State Investment Promotion and Public Private Partnerships Agency (OYSIPPPA) and the State Action on Business Enabling Reforms (SABER).',
    artworks: 0,
    ...flyer('oyo-state-business-forum-2026'),
    imageAlt: 'Flyer for the Oyo State Business Forum 2026, 11 and 12 November 2026, Agodi, Ibadan',
    videoId: 'myg6YF1cgUQ',
    videoUrl: 'https://www.youtube.com/live/myg6YF1cgUQ',
  },
  {
    id: 9,
    title: 'Yoruba Cultural Exchange Festival and Tourism',
    artist: 'Prince Tunde Odunlade',
    category: 'Cultural Festival',
    type: 'festival',
    startDate: '2026-09-11',
    endDate: '2026-09-12',
    venue: 'African International House and Chicago State University',
    address: 'Chicago, Illinois, USA',
    location: 'African International House and Chicago State University, Chicago, Illinois, USA',
    description:
      'A Meet & Greet with Veteran Artist in Residence Prince Tunde Odunlade, part of the Yoruba Cultural Exchange Festival and Tourism in Chicago, hosted by First Eye Inc.',
    longDescription:
      'The Yoruba Cultural Exchange Festival and Tourism in Chicago, hosted by First Eye Inc, featured a Meet & Greet with Veteran Artist in Residence Prince Tunde Odunlade.\n\nThe programme took place across two days: Friday 11 September 2026 at the African International House, and Saturday 12 September 2026 at Chicago State University.',
    artworks: 0,
    ...flyer('yoruba-cultural-exchange-chicago-2026'),
    imageAlt: 'Flyer for the Yoruba Cultural Exchange Festival and Tourism in Chicago: Meet and Greet with Prince Tunde Odunlade, 11 and 12 September 2026',
  },
  {
    id: 10,
    title: 'Bo Se N Lọ on BCOS TV',
    artist: 'Prince Tunde Odunlade (guest)',
    category: 'TV Programme',
    type: 'event',
    // TODO(confirm with Prince): the flyer says "Wednesday 29th October, 2026" but 29 Oct 2026 is a Thursday.
    startDate: '2026-10-29',
    openingTime: '03:30 PM',
    venue: 'BCOS TV Studio',
    location: 'BCOS TV, live studio programme',
    description:
      'Prince Tunde Odunlade is the guest on BCOS TV\'s live studio programme "Bo Se N Lọ", with a focus on promoting Yoruba cultural heritage (Ìgbélàruge Àṣà Ilẹ̀ Yorùbá).',
    longDescription:
      'Prince Tunde Odunlade appeared as guest on "Bo Se N Lọ", a live studio programme on BCOS TV broadcast in the Yoruba language, from 3:30 pm to 5:30 pm on 29 October 2026.\n\nThe focus of the programme was Ìgbélàruge Àṣà Ilẹ̀ Yorùbá, the promotion of Yoruba cultural heritage. It was presented by Funke Taiwo Olaoye and Temitope Salawu.',
    artworks: 0,
    ...flyer('bcos-tv-bo-se-n-lo-2026'),
    imageAlt: 'Flyer for Bo Se N Lọ on BCOS TV with guest Prince Tunde Odunlade, 29 October 2026',
  },
  {
    id: 11,
    title: 'Five Decades of Textile, Printmaking & Yoruba Cultural Storytelling',
    cardTitle: 'Five Decades of Textile & Printmaking',
    subtitle: 'Tunde Baba Odunlade',
    artist: 'Tunde Baba Odunlade',
    category: 'Exhibition & Artist Talk',
    type: 'exhibition',
    // TODO(confirm with Prince): the flyer shows no year. 29 Aug is a Saturday in 2026, so 2026 is assumed.
    startDate: '2026-08-29',
    openingTime: '05:30 PM',
    venue: 'BHM Art Club',
    address: '1525 4th Ave N, Downtown Birmingham',
    location: 'BHM Art Club, 1525 4th Ave N, Downtown Birmingham',
    description:
      'A special event for collectors and art lovers: an exhibition and artist talk on five decades of textile, printmaking and Yoruba cultural storytelling, presented by The BHM Art Club.',
    longDescription:
      'Tunde Baba Odunlade: Five Decades of Textile, Printmaking & Yoruba Cultural Storytelling was a special event for collectors and art lovers, presented by The BHM Art Club.\n\nIt combined an exhibition with an artist talk on Saturday 29 August at 5:30 pm, at 1525 4th Ave N in Downtown Birmingham.',
    artworks: 0,
    ...flyer('birmingham-five-decades-2026'),
    imageAlt: 'Flyer for Tunde Baba Odunlade: Five Decades of Textile, Printmaking and Yoruba Cultural Storytelling, presented by The BHM Art Club',
  },

  // ---------------------------------------------------------------- 2025 and earlier
  {
    id: 1,
    title: 'Chain of Souls (ASOPO OKAN)',
    cardTitle: 'Chain of Souls',
    subtitle: '(ASOPO OKAN)',
    artist: 'Taofeek Olalekan',
    category: 'Fiber/Textile Art',
    cardCategory: 'Mixed Media, Fiber/Textile Art, Beadworks & Oil on Canvas',
    type: 'exhibition',
    startDate: '2025-12-16',
    endDate: '2026-01-10',
    openingTime: '04:00 PM',
    venue: 'Femi Osofisan Amphitheater',
    address: 'No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    location: 'Femi Osofisan Amphitheater, Tunde Odunlade Arts and Culture Gallery, No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    description:
      "An art exhibition of mixed media, fiber/textile art, beadworks, & oil on canvas. A new talent born to celebrate Arewa Odunlade's birthday.",
    longDescription:
      "Chain of Souls (ASOPO OKAN) presents a powerful exploration of connection, heritage, and artistic expression through diverse mediums. This groundbreaking exhibition features works by emerging talent Taofeek Olalekan, showcasing innovative approaches to mixed media, fiber/textile art, beadworks, and traditional oil on canvas. The exhibition serves as both a celebration of new artistic voices and a tribute to Arewa Odunlade's birthday. Visitors will experience a dynamic interplay between traditional African craft techniques and contemporary artistic practices, with each piece telling a story of cultural continuity and creative evolution. The opening reception promises an intimate encounter with the artist, allowing visitors to meet Taofeek Olalekan live and experience his creative process firsthand.",
    artworks: 30,
    image: '/Assets/chain of souls.png',
  },
  {
    id: 2,
    title: '6TH ORÍKÌ YORÙBÁ FESTIVAL',
    artist: 'Prince Tunde Odunlade',
    category: 'Cultural Festival',
    type: 'festival',
    startDate: '2025-12-13',
    endDate: '2025-12-13',
    openingTime: '9:00 AM',
    venue: 'Iyaniwura Palace',
    address: 'Iba town Osun State, Nigeria',
    location: 'Iyaniwura Palace, Iba town Osun State, Nigeria',
    description:
      'A celebration of Yoruba culture and heritage featuring guest speaker Prince Tunde Odunlade, an accomplished print and textile artist with extensive background in exhibiting, teaching, lecturing, and studying.',
    longDescription:
      "The 6TH ORÍKÌ YORÙBÁ FESTIVAL brings together cultural enthusiasts, artists, and scholars for a day-long celebration of Yoruba heritage and oral traditions. This year's festival features Prince Tunde Odunlade as the guest speaker, a highly accomplished print and textile artist whose work bridges traditional African art forms with contemporary expression. Prince Tunde Odunlade brings decades of experience from his studies in Anthropology at Iowa State University and Stillman College in Tuscaloosa, Alabama, where he served as an artist-in-residence in 1986 and 1989. His extensive travels throughout Nigeria, Africa, North America, and Europe have enriched his understanding of global artistic practices while maintaining deep roots in Yoruba cultural traditions. The festival promises engaging discussions, cultural performances, and insights into the preservation and evolution of Yoruba artistic heritage.",
    artworks: 0,
    image: '/Assets/oriki.jpg',
  },
  {
    id: 3,
    title: 'Abuja 2025 African Descent Creative Industry Awards & Honours',
    artist: 'Prince Tunde Odunlade',
    category: 'Awards Ceremony',
    type: 'awards',
    startDate: '2025-12-11',
    endDate: '2025-12-11',
    venue: 'Nicon Luxury Abuja',
    address: 'Abuja, Nigeria',
    location: 'Nicon Luxury Abuja, Nigeria',
    description:
      'Creative Arts Promotion Icon Award honoring Prince Tunde Odunlade for his outstanding contributions to African arts and culture.',
    longDescription:
      "The Abuja 2025 African Descent Creative Industry Awards & Honours recognizes exceptional individuals who have made significant contributions to the creative arts across the African diaspora. Prince Tunde Odunlade is being honored as the Creative Arts Promotion Icon for his decades of dedication to advancing African artistic expression, cultural preservation, and creative education. This prestigious award acknowledges his role as a bridge between traditional African art forms and contemporary global artistic practices. The ceremony at Nicon Luxury Abuja brings together leaders from across the African creative industry to celebrate excellence, innovation, and cultural impact. Prince Tunde Odunlade's recognition highlights the importance of artistic advocacy and the power of creative expression in shaping cultural identity and global understanding.",
    artworks: 0,
    image: '/Assets/abuja .jpg',
  },
  {
    id: 4,
    title: 'ARIYA GENGE 2025',
    artist: 'Iyaniwura Alarinjo Troupe',
    category: 'Cultural Event',
    type: 'event',
    startDate: '2025-12-15',
    endDate: '2025-12-15',
    venue: 'Tunde Odunlade Arts Gallery',
    address: 'No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    location: 'Tunde Odunlade Arts Gallery, No 2, Ladoke Akintola, Off Aare Avenue, New Bodija',
    description:
      'Presented by Iyaniwura Alarinjo Troupe in collaboration with Tunde Odunlade Arts Gallery. A vibrant celebration of traditional Nigerian performing arts and culture.',
    longDescription:
      'ARIYA GENGE 2025 is a spectacular showcase of traditional Nigerian performing arts, presented by the renowned Iyaniwura Alarinjo Troupe in collaboration with Tunde Odunlade Arts Gallery. This vibrant cultural event brings together music, dance, storytelling, and theatrical performances that celebrate the rich heritage of Nigerian and Yoruba traditions. The event transforms the gallery space into a dynamic stage where ancient artistic practices meet contemporary presentation, creating an immersive experience for audiences of all ages. ARIYA GENGE 2025 offers a unique opportunity to witness living cultural traditions and the ongoing evolution of African performing arts, all within the inspiring setting of Tunde Odunlade Arts Gallery.',
    artworks: 0,
    image: '/Assets/Ariya.jpg',
  },
  {
    id: 5,
    title: 'Ancestral Threads',
    artist: 'Prince Tunde Odunlade',
    category: 'Textile Art',
    type: 'exhibition',
    startDate: '2025-01-15',
    endDate: '2025-03-30',
    venue: 'Main Gallery',
    location: 'Main Gallery',
    description:
      'A breathtaking exploration of Yoruba heritage through contemporary batik art, weaving stories of tradition into modern textile masterpieces.',
    longDescription:
      "Ancestral Threads is a profound journey through the rich tapestry of Yoruba culture, where Prince Tunde Odunlade's innovative floatography technique brings centuries-old stories to life. This exhibition features over 30 original batik works that bridge the gap between traditional Nigerian art forms and contemporary expression. Each piece is a meditation on identity, heritage, and the enduring power of cultural memory. Through vibrant indigo dyes and intricate patterns, visitors will discover how ancestral wisdom continues to shape modern African artistry.",
    artworks: 32,
    image: '/Assets/ancestral thread.jpg',
  },
  {
    id: 6,
    title: 'Metamorphosis',
    artist: 'Various Artists',
    category: 'Sculpture & Performance',
    type: 'exhibition',
    startDate: '2024-09-01',
    endDate: '2024-12-15',
    venue: 'Main Gallery',
    location: 'Main Gallery',
    description:
      'A transformative journey through change, growth, and evolution depicted through sculpture, painting, and performance art.',
    longDescription:
      'Metamorphosis explored the universal themes of transformation and personal evolution through diverse artistic mediums. Artists examined how individuals, communities, and cultures adapt and transform in response to social change, environmental pressures, and technological advancement. The exhibition featured powerful sculptural works that literally transformed as viewers interacted with them, alongside paintings that documented personal journeys of growth and change. Performance art pieces conducted throughout the exhibition period added a temporal dimension, reminding visitors that transformation is an ongoing process rather than a destination.',
    artworks: 28,
    image: '/Assets/metamorphosis.jpg',
  },
];

/** Now showing and upcoming first (soonest first), then past events (most recent first). */
export function sortEventsForDisplay<T extends { startDate: string; endDate?: string }>(list: T[]): T[] {
  const rank = (e: T): ExhibitionStatus => calculateExhibitionStatus(e.startDate, e.endDate);
  const active = list.filter((e) => rank(e) !== 'past').sort((a, b) => a.startDate.localeCompare(b.startDate));
  const past = list
    .filter((e) => rank(e) === 'past')
    .sort((a, b) => (b.endDate ?? b.startDate).localeCompare(a.endDate ?? a.startDate));
  return [...active, ...past];
}

/** The events shown on the landing page: upcoming first, then the most recent past ones. */
export function selectFeaturedEvents(count = 4): SiteEvent[] {
  return sortEventsForDisplay(events).slice(0, count);
}
