/**
 * ─────────────────────────────────────────────────────────────
 *  CENTRAL WEDDING CONFIGURATION
 *  Every name, date, time, venue, dress code and story
 *  shown on the website comes from this one file.
 * ─────────────────────────────────────────────────────────────
 */

const weddingData = {
  bride: 'Himani',
  groom: 'Lovenish',
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
  // `dressCode` (optional) is highlighted on the event's card: attire text + colour swatches
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
      dressCode: { attire: 'Lavender & Pink', swatches: ['#B9A5D6', '#F4A6C1', '#D9CBEE', '#F9D3E0'] },
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

  // ── OUR STORY ──────────────────────────────────────────────
  // width/height are the photo's proportions (portrait photos are shown a little cropped).
  story: [
    {
      title: 'Where It All Began',
      date: 'Once upon a time',
      text: 'It all started with a little hello and a few unexpected conversations. little did we know, those ordinary moments would lead us to something so special — a love story of our own. 🤍✨',
      image: '/images/story-1.jpg',
      width: 1599,
      height: 899,
    },
    {
      title: 'The Journey',
      date: 'Along the way',
      text: 'We already knew each other, but that new year brought us a little closer. little did we know, we’d look back at those moments someday and smile at how our story began. ❤️',
      image: '/images/story-2.jpg',
      width: 900,
      height: 1600,
    },
    {
      title: 'The Moment',
      date: 'The question',
      text: 'so many little memories, endless laughter, and just us being us. 🥹 looking back at these pictures makes me miss those days a little extra. if I could go back, I’d do it all over again, as long as it’s with you. 🤍🏔️',
      image: '/images/story-3.jpg',
      width: 900,
      height: 1600,
    },
    {
      title: 'Forever Begins',
      date: 'November 2026',
      text: 'Just us on a sushiii date, eating, talking about everything and nothing, and making another little memory together. 🤍 never thought I’d find someone who’d make even the simplest little things feel this special, but somehow, with you, they do. and if forever means more sushiii dates, endless conversations, annoying you for the rest of our lives, and choosing each other through all of life’s little moments, then I think I’ve found my kind of forever. 🥹💍🍣❤️',
      image: '/images/story-4.jpg',
      width: 1600,
      height: 900,
    },
  ],

  // Optional: an illustration of the couple (transparent background) for the opening
  // courtyard scene, which then takes on a soft blush look. Leave as null for the drawn couple.
  introCartoon: '/images/couple-cartoon.webp',

  // Optional: a portrait of the couple, shown as a 3D card at the top of the main page.
  // Leave as null to show the names only.
  couplePhoto: '/images/couple.jpg',

  // Optional: a photo/scan of the printed invitation, e.g. '/images/invitation.jpg'.
  // Leave as null to hide the "From Our Invitation" section.
  invitationImage: null,

  // Background music. Starts when the guest taps "Tap to open" (browsers block sound before a tap).
  // If the file is missing, the music button plays a soft generated tanpura drone instead.
  music: {
    src: '/music/jashn-e-bahaaraa.m4a', // 128 kbps AAC for faster loading
    title: 'Jashn-E-Bahaaraa',
  },
}

export default weddingData
