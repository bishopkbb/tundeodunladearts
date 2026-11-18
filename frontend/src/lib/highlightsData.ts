import { eventImages } from './eventImages.generated';
import { highlightImages, type HighlightImageKey } from './highlightImages.generated';

export type HighlightKind = 'photo' | 'video';

export interface HighlightItem {
  id: string;
  kind: HighlightKind;
  /** Short description for screen readers (and shown in the lightbox). */
  alt: string;
  src: string;
  /** Videos only: still shown before playback. */
  poster?: string;
  /** Photos only: natural size, so the grid can reserve space before the picture loads. */
  width?: number;
  height?: number;
  blurDataURL?: string;
}

const photo = (
  id: string,
  alt: string,
  image: { src: string; width: number; height: number; blurDataURL: string }
): HighlightItem => ({
  id,
  kind: 'photo',
  alt,
  src: image.src,
  width: image.width,
  height: image.height,
  blurDataURL: image.blurDataURL,
});

/**
 * Everything shown on /gallery-highlights, in display order (newest and strongest first).
 *
 * To add more: drop the photo into public/Assets/highlights/, run `node scripts/generate-highlight-media.mjs`,
 * then add one line below. For a video, put the .mp4 in public/Assets/highlights/ and add a `kind: 'video'` entry.
 * TODO: replace the plain descriptions with real captions once Prince Tunde confirms the event names.
 */
const video = (n: number, alt: string, width = 576, height = 1024): HighlightItem => ({
  id: `video-0${n}`,
  kind: 'video',
  alt,
  src: `/Assets/highlights/video-0${n}.mp4`,
  poster: `/Assets/highlights/video-0${n}-poster.jpg`,
  width,
  height,
});

const bham = (n: number, alt: string): HighlightItem =>
  photo(`birmingham-${String(n).padStart(2, '0')}`, alt, highlightImages[`birmingham-${String(n).padStart(2, '0')}` as HighlightImageKey]);

export const highlightItems: HighlightItem[] = [
  video(2, 'Guests dance and drum together on the mosaic floor inside the gallery'),
  photo('reception-01', 'Guests gather around a large textile artwork at an exhibition reception', eventImages['reception-01']),
  video(3, 'Guests gather in a circle in the gallery as speakers address the crowd'),
  photo('reception-02', 'Collectors and visitors discuss the work at a reception', eventImages['reception-02']),
  photo('event-01', 'A large group of guests in traditional dress standing together in the gallery', highlightImages['event-01']),
  video(4, 'Performers in blue adire greet the crowd at the gallery gate'),
  photo('event-02', 'An elder in a patterned adire jacket and blue cap greeting a guest', highlightImages['event-02']),
  photo('event-03', 'Two men shaking hands in the gallery', highlightImages['event-03']),
  video(5, 'A crowd gathers outside the gallery entrance'),
  photo('event-04', 'Guests seated and talking inside the gallery', highlightImages['event-04']),
  photo('event-05', 'A warm handshake between two men in traditional attire', highlightImages['event-05']),
  photo('event-06', 'A visitor holding a programme as he arrives at the gallery', highlightImages['event-06']),
  photo('event-07', 'A visitor at the gallery entrance with a programme in hand', highlightImages['event-07']),
  // Birmingham: Tunde Baba Odunlade, Five Decades of Textile, Printmaking & Yoruba Cultural Storytelling (BHM Art Club)
  bham(1, 'A large batik tapestry being installed for the Birmingham exhibition'),
  bham(2, 'Prince Tunde Odunlade with guests and a double bass player in the garden at the Birmingham event'),
  bham(3, 'Batik and textile wall hangings in the Birmingham exhibition space'),
  bham(4, 'The Birmingham exhibition hall with seating and wall hangings'),
  bham(5, 'Textile wall hangings along the wall of the Birmingham exhibition hall'),
  bham(6, 'Four large textile panels on display in Birmingham'),
  bham(7, 'The hall and seating set up for the Birmingham artist talk'),
  bham(8, 'Guests and a musician posing together outdoors at the Birmingham event'),
  bham(9, 'The BHM Art Club entrance with textile pieces displayed outside'),
  bham(10, 'Guests mingling in front of the large tapestry at the Birmingham reception'),
  bham(11, 'Guests seated and talking at the Birmingham reception'),
  bham(12, 'Guests chatting on the pavement outside the venue in Birmingham'),
  video(6, 'Coverage of the Oyo State Business Forum 2026'),
  photo('portrait-01', 'Portrait of a smiling elder in a blue cap in front of a painted face', highlightImages['portrait-01']),
  photo('dance-studio', 'Dancers rehearsing on a mosaic floor in the studio', highlightImages['dance-studio']),
  {
    id: 'video-01',
    kind: 'video',
    alt: 'Slideshow video from Prince Tunde Odunlade, November 2026, including the VAGON exhibition reveal',
    src: '/Assets/highlights/video-01.mp4',
    poster: '/Assets/highlights/video-01-poster.jpg',
    width: 854,
    height: 480,
  },
];
