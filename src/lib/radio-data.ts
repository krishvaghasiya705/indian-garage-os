export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number; // seconds, fallback until the player reports the real one
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tagline: string;
  tracks: Track[];
};

const s = (m: number, sec: number) => m * 60 + sec;

// Adding a song = one line. Only official rights-holder uploads with embedding on.
export const PLAYLISTS: Playlist[] = [
  {
    id: "morning",
    name: "Morning Shift",
    tagline: "Shutter khula, chai bani, pehli bike aa gayi.",
    tracks: [
      { id: "m1", title: "Pehla Nasha", artist: "Udit Narayan, Sadhana Sargam", film: "Jo Jeeta Wohi Sikandar", year: 1992, duration: s(5, 3), videoId: "iSUK1QoK9-E" },
      { id: "m2", title: "Bahut Pyar Karte Hain", artist: "Anuradha Paudwal", film: "Saajan", year: 1991, duration: s(4, 14), videoId: "pk1CZiA2_-8" },
      { id: "m3", title: "Ek Ladki Ko Dekha Toh Aisa Laga", artist: "Kumar Sanu", film: "1942: A Love Story", year: 1994, duration: s(4, 34), videoId: "H5sheEWfsOQ" },
      { id: "m4", title: "Do Dil Mil Rahe Hain", artist: "Kumar Sanu", film: "Pardes", year: 1997, duration: s(4, 52), videoId: "5SvIuD6wJRI" },
      { id: "m5", title: "Jaadu Teri Nazar", artist: "Udit Narayan", film: "Darr", year: 1993, duration: s(2, 38), videoId: "n_oP9Onj0r0" },
      { id: "m6", title: "Nazar Ke Saamne", artist: "Kumar Sanu, Anuradha Paudwal", film: "Aashiqui", year: 1990, duration: s(4, 58), videoId: "uNt18l9UfjE" },
      { id: "m7", title: "Dheere Dheere Se Meri Zindagi", artist: "Kumar Sanu, Anuradha Paudwal", film: "Aashiqui", year: 1990, duration: s(5, 27), videoId: "Mcs2xEZ6K8o" },
      { id: "m8", title: "Tujhe Dekha To Ye Jana Sanam", artist: "Kumar Sanu, Lata Mangeshkar", film: "Dilwale Dulhania Le Jayenge", year: 1995, duration: s(5, 14), videoId: "cNV5hLSa9H8" },
      { id: "m9", title: "Kuch Kuch Hota Hai", artist: "Udit Narayan, Alka Yagnik", film: "Kuch Kuch Hota Hai", year: 1998, duration: s(5, 9), videoId: "bKZTnnFU9HA" },
    ],
  },
  {
    id: "shaam",
    name: "Garage Ki Shaam",
    tagline: "Din khatam, dhool baithi, radio thoda upar.",
    tracks: [
      { id: "g1", title: "Kehna Hi Kya", artist: "K. S. Chithra", film: "Bombay", year: 1995, duration: s(6, 3), videoId: "_YB1taxJPgk" },
      { id: "g2", title: "Tu Hi Re", artist: "Hariharan, Kavita Krishnamurthy", film: "Bombay", year: 1995, duration: s(7, 17), videoId: "V9mN0qBgEzQ" },
      { id: "g3", title: "Bahon Ke Darmiyan", artist: "Alka Yagnik, Hariharan", film: "Khamoshi: The Musical", year: 1996, duration: s(6, 5), videoId: "kHYYfKAQdHA" },
      { id: "g4", title: "Aankhon Se Tune Ye Kya Keh Diya", artist: "Kumar Sanu, Alka Yagnik", film: "Ghulam", year: 1998, duration: s(3, 1), videoId: "KqztTyphd8s" },
      { id: "g5", title: "Jaati Hoon Main", artist: "Kumar Sanu, Alka Yagnik", film: "Karan Arjun", year: 1995, duration: s(6, 41), videoId: "nKKVCaPbS3M" },
      { id: "g6", title: "Tan Tana Tan Tan Tara", artist: "Abhijeet, Poornima", film: "Judwaa", year: 1997, duration: s(6, 4), videoId: "qeOfhT44XWg" },
    ],
  },
  {
    id: "indipop",
    name: "Indi-Pop Corner",
    tagline: "Cassette palti, ab Bollywood nahi — Indipop.",
    tracks: [
      { id: "i1", title: "Made In India", artist: "Alisha Chinai", film: "Made In India", year: 1995, duration: s(4, 23), videoId: "pi4HDAa2hC8" },
      { id: "i2", title: "Paree Hoon Main", artist: "Suneeta Rao", film: "Paree", year: 1991, duration: s(6, 18), videoId: "Jt7Vd9Fv48g" },
      { id: "i3", title: "Deewane To Deewane Hain", artist: "Shweta Shetty", film: "Johnny Joker", year: 1993, duration: s(3, 59), videoId: "14IA7mkz5Aw" },
      { id: "i4", title: "Yaad Piya Ki Aane Lagi", artist: "Falguni Pathak", film: "Yaad Piya Ki Aane Lagi", year: 1999, duration: s(6, 59), videoId: "eN6AYHAT8UM" },
      { id: "i5", title: "Maine Payal Hai Chhankai", artist: "Falguni Pathak", film: "Maine Payal Hai Chhankai", year: 1999, duration: s(4, 36), videoId: "Rbz1qFlRL_Y" },
      { id: "i6", title: "Chudi Jo Khanke", artist: "Falguni Pathak", film: "Chudi Jo Khanke", year: 2000, duration: s(4, 4), videoId: "NdMdXYAvP9A" },
      { id: "i7", title: "O Piya O Piya", artist: "Falguni Pathak", film: "Falguni Pathak", year: 1998, duration: s(4, 38), videoId: "BZlTSxcYXJw" },
      { id: "i8", title: "Piya Se Milke Aaye Nain", artist: "Falguni Pathak", film: "Falguni Pathak", year: 1998, duration: s(3, 44), videoId: "ruXPoU1LeJM" },
    ],
  },
];

export const formatTime = (secs: number) => {
  if (!Number.isFinite(secs) || secs < 0) secs = 0;
  const m = Math.floor(secs / 60);
  const r = Math.floor(secs % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};
