/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL WEDDING CONFIGURATION
 *  Every name, date, time, venue, dress code, photo and story
 *  shown on the website comes from this one file.
 * ─────────────────────────────────────────────────────────────
 */

const weddingData = {
  bride: 'Himani Gupta',
  groom: 'Lovenish Gupta',
  brideShort: 'Himani',
  groomShort: 'Lovenish',

  // Blessing line shown on the opening card and hero
  blessing: '॥ श्री गणेशाय नमः ॥',

  weddingDates: {
    start: '2026-11-25',
    end: '2026-11-26',
    display: '25th & 26th November 2026',
  },

  // The countdown counts down to this moment (IST, +05:30).
  countdownTo: '2026-11-25T16:00:00+05:30',

  location: 'Jaipur, Rajasthan',

  venue: {
    name: 'Varmala Resort & Banquet',
    city: 'Jaipur',
    state: 'Rajasthan',
    // TODO: add the full street address
    address: '',
    // Optional: paste a Google Maps share link (e.g. https://maps.app.goo.gl/…).
    // If empty, "Get Directions" searches Google Maps for the venue name + city.
    mapsUrl: '',
    // Optional: a Google Maps embed URL (Share → Embed a map → copy the src="…").
    // If empty, a map is embedded from a search for the venue name + city.
    mapsEmbedUrl: '',
    image: '/images/venue.svg',
  },

  // Shown on the opening card
  invitationText: 'Together with their families,\ninvite you to celebrate\ntheir wedding',

  scratchCard: {
    title: 'Save the Date',
    tagline: ['Two Days.', 'One Beautiful Celebration.', 'A Lifetime Together.'],
  },

  days: [
    { day: 1, date: '25 November 2026', label: 'Day One', subtitle: 'The Celebrations Begin' },
    { day: 2, date: '26 November 2026', label: 'Day Two', subtitle: 'The Wedding Day' },
  ],

  // `icon` picks an illustration from components/EventIcons.jsx
  // `feature` gives an event its own cinematic section: 'varmala' | 'doli'
  events: [
    {
      name: 'Godh Bharai',
      day: 1,
      date: '25 November 2026',
      time: '4:00 PM',
      icon: 'godhBharai',
      description: 'Beginning the celebrations with love, blessings and family.',
    },
    {
      name: 'Lagan Tika',
      day: 1,
      date: '25 November 2026',
      time: '5:00 PM',
      icon: 'tika',
      description: 'A sacred tilak and the first promise between two families.',
    },
    {
      name: 'Sangeet & Engagement',
      day: 1,
      date: '25 November 2026',
      time: '6:00 PM',
      icon: 'sangeet',
      description: 'An evening of rings, music, dance and celebration.',
    },
    {
      name: 'Dinner',
      day: 1,
      date: '25 November 2026',
      time: '7:00 PM',
      icon: 'dinner',
      description: 'Good food and warm company to close the first day.',
    },
    {
      name: 'Haldi',
      day: 2,
      date: '26 November 2026',
      time: '11:00 AM',
      icon: 'haldi',
      description: 'Turmeric, marigolds and laughter on a bright golden morning.',
    },
    {
      name: 'Reception of Barat',
      day: 2,
      date: '26 November 2026',
      time: '8:00 PM',
      icon: 'barat',
      description: 'Welcoming the groom and his family with dhol, dance and joy.',
    },
    {
      name: 'Dinner',
      day: 2,
      date: '26 November 2026',
      time: '8:30 PM',
      icon: 'dinner',
      description: 'A royal feast to celebrate the wedding night.',
    },
    {
      name: 'Varmala',
      day: 2,
      date: '26 November 2026',
      time: '10:00 PM',
      icon: 'varmala',
      description: 'Two hearts. One promise. Forever begins.',
    },
    {
      name: 'Doli',
      day: 2,
      date: '26 November 2026',
      time: 'Taaron Ki Chhaon Mein',
      icon: 'doli',
      feature: 'doli',
      description:
        'Under a sky full of stars, we bid a tearful, joyful farewell as our daughter begins her new journey.',
    },
  ],

  // ── DRESS CODE (placeholders — edit freely) ──────────────────
  // `swatches` are the colours shown on each mood-board card.
  // `pattern` picks a fabric texture: 'bandhani' | 'leheriya' | 'brocade' | 'floral' | 'jaali' | 'zari'
  dressCodeNote: 'Suggested looks — final dress codes will be shared closer to the date.',
  dressCode: [
    { event: 'Godh Bharai', attire: 'Pastels / Elegant Indian', swatches: ['#F3D9D3', '#E8E1C8', '#CFE0D2'], pattern: 'floral' },
    { event: 'Lagan Tika', attire: 'Traditional Indian', swatches: ['#8C1C2B', '#C9973F', '#F2E6CC'], pattern: 'brocade' },
    { event: 'Sangeet & Engagement', attire: 'Festive Glam', swatches: ['#2B2347', '#B8893B', '#9E3B5B'], pattern: 'zari' },
    { event: 'Haldi', attire: 'Lavender', swatches: ['#B9A5D6', '#E6DDF2', '#8E7AB5'], pattern: 'bandhani' },
    { event: 'Barat', attire: 'Traditional Indian', swatches: ['#B23A48', '#E3A857', '#5E6B4E'], pattern: 'leheriya' },
    { event: 'Varmala', attire: 'Wedding Elegance', swatches: ['#6E1423', '#D9B970', '#FBF6EC'], pattern: 'jaali' },
  ],

  // ── OUR STORY (placeholders — replace with your own words/photos) ──
  story: [
    {
      title: 'Where It All Began',
      date: 'Once upon a time',
      text: 'Every love story has a beginning. Ours started with a simple hello that neither of us knew would change everything.',
      image: '/images/story-1.svg',
    },
    {
      title: 'The Journey',
      date: 'Along the way',
      text: 'Through conversations, laughter and shared dreams, two lives slowly became one beautiful journey.',
      image: '/images/story-2.svg',
    },
    {
      title: 'The Moment',
      date: 'The question',
      text: 'With our families’ blessings, a promise was made — and our hearts already knew the answer.',
      image: '/images/story-3.svg',
    },
    {
      title: 'Forever Begins',
      date: 'November 2026',
      text: 'In the Pink City, surrounded by everyone we love, we begin our forever. We would love for you to be there.',
      image: '/images/story-4.svg',
    },
  ],

  // ── GALLERY — put photos in /public/images and list them here ──
  // width/height are the image's proportions (prevents layout shift).
  gallery: [
    { src: '/images/gallery-1.svg', alt: 'Himani and Lovenish', width: 800, height: 1100 },
    { src: '/images/gallery-2.svg', alt: 'A candid moment', width: 1200, height: 800 },
    { src: '/images/gallery-3.svg', alt: 'Laughing together', width: 800, height: 1000 },
    { src: '/images/gallery-4.svg', alt: 'Family celebrations', width: 1200, height: 900 },
    { src: '/images/gallery-5.svg', alt: 'Hand in hand', width: 800, height: 1200 },
    { src: '/images/gallery-6.svg', alt: 'The ring', width: 1000, height: 1000 },
    { src: '/images/gallery-7.svg', alt: 'Jaipur memories', width: 1200, height: 800 },
    { src: '/images/gallery-8.svg', alt: 'Together', width: 800, height: 1100 },
  ],

  // Optional: a photo/scan of the printed invitation, e.g. '/images/invitation.jpg'.
  // Leave as null to hide the "From Our Invitation" section.
  invitationImage: null,

  // Background music. Starts when the guest taps "Tap to open" (browsers block sound before a tap).
  // If the file is missing, the music button plays a soft generated tanpura drone instead.
  music: {
    src: '/music/liggi.m4a', // compressed copy of liggi.mp3 (128 kbps AAC) for faster loading
    title: 'Liggi — Ritviz',
  },

  closing: {
    message: 'We can’t wait to celebrate\nwith you.',
    signOff: 'With love,\nOur Families',
    farewell: 'See You There',
  },
}

export default weddingData
