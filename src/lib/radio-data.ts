export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  duration: number;
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tagline: string;
  tracks: Track[];
};

const s = (m: number, sec: number) => m * 60 + sec;

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
      { id: "m10", title: "Mera Dil Bhi Kitna Pagal Hai", artist: "Kumar Sanu, Alka Yagnik", film: "Saajan", year: 1991, duration: s(5, 24), videoId: "" },
      { id: "m11", title: "Tum Mile Dil Khile", artist: "Kumar Sanu", film: "Criminal", year: 1995, duration: s(6, 1), videoId: "" },
      { id: "m12", title: "Aankhon Ki Gustakhiyan", artist: "Kumar Sanu, Kavita Krishnamurthy", film: "Hum Dil De Chuke Sanam", year: 1999, duration: s(5, 3), videoId: "" },
      { id: "m13", title: "Hoshwalon Ko Khabar Kya", artist: "Jagjit Singh", film: "Sarfarosh", year: 1999, duration: s(5, 7), videoId: "" },
      { id: "m14", title: "Ae Kash Ke Hum", artist: "Kumar Sanu", film: "Kabhi Haan Kabhi Naa", year: 1994, duration: s(5, 10), videoId: "" },
      { id: "m15", title: "Yeh Kaali Kaali Aankhen", artist: "Kumar Sanu, Anu Malik", film: "Baazigar", year: 1993, duration: s(7, 11), videoId: "" },
      { id: "m16", title: "Gazab Ka Hai Din", artist: "Udit Narayan, Sadhana Sargam", film: "Qayamat Se Qayamat Tak", year: 1988, duration: s(4, 25), videoId: "" },
      { id: "m17", title: "Adayein Bhi Hain", artist: "Anuradha Paudwal, Kumar Sanu", film: "Dil Hai Ke Manta Nahin", year: 1991, duration: s(4, 50), videoId: "" },
      { id: "m18", title: "Mera Mann", artist: "Udit Narayan", film: "Mann", year: 1999, duration: s(4, 30), videoId: "" },
      { id: "m19", title: "Aankhon Se Tune Ye Kya Keh Diya", artist: "Kumar Sanu, Alka Yagnik", film: "Ghulam", year: 1998, duration: s(5, 3), videoId: "" },
      { id: "m20", title: "Pardesi Pardesi", artist: "Udit Narayan, Alka Yagnik, Sapna Awasthi", film: "Raja Hindustani", year: 1996, duration: s(6, 29), videoId: "" },
      { id: "m21", title: "Humko Sirf Tumse Pyaar Hai", artist: "Kumar Sanu, Alka Yagnik", film: "Barsaat", year: 1995, duration: s(6, 47), videoId: "" },
      { id: "m22", title: "Mere Khwabon Mein", artist: "Lata Mangeshkar", film: "Dilwale Dulhania Le Jayenge", year: 1995, duration: s(4, 17), videoId: "" },
      { id: "m23", title: "Ho Nahi Sakta", artist: "Udit Narayan, Anuradha Paudwal", film: "Diljale", year: 1996, duration: s(6, 12), videoId: "" },
      { id: "m24", title: "Aisi Deewangi", artist: "Alka Yagnik, Nadeem-Shravan", film: "Deewana", year: 1992, duration: s(6, 57), videoId: "" },
      { id: "m25", title: "Tumhe Apna Banane Ki Kasam", artist: "Anuradha Paudwal, Kumar Sanu", film: "Sadak", year: 1991, duration: s(5, 40), videoId: "" },
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
      { id: "g7", title: "Nahin Saamne Tu", artist: "Hariharan", film: "Taal", year: 1999, duration: s(6, 2), videoId: "" },
      { id: "g8", title: "Sunta Hai Mera Khuda", artist: "Kavita Krishnamurthy", film: "Pukar", year: 2000, duration: s(6, 24), videoId: "" },
      { id: "g9", title: "Satrangi Re", artist: "Sonu Nigam, Kavita Krishnamurthy", film: "Dil Se", year: 1998, duration: s(7, 12), videoId: "" },
      { id: "g10", title: "Jiya Jale", artist: "Lata Mangeshkar, M. G. Sreekumar", film: "Dil Se", year: 1998, duration: s(5, 9), videoId: "" },
      { id: "g11", title: "Chaiyya Chaiyya", artist: "Sukhwinder Singh, Sapna Awasthi", film: "Dil Se", year: 1998, duration: s(6, 56), videoId: "" },
      { id: "g12", title: "Humma Humma", artist: "Remo Fernandes", film: "Bombay", year: 1995, duration: s(5, 12), videoId: "" },
      { id: "g13", title: "Urvashi Urvashi", artist: "A. R. Rahman, Shankar Mahadevan", film: "Humse Hai Muqabala", year: 1994, duration: s(5, 42), videoId: "" },
      { id: "g14", title: "Roja Jaaneman", artist: "S. P. Balasubrahmanyam", film: "Roja", year: 1992, duration: s(4, 50), videoId: "" },
      { id: "g15", title: "Tu Hi Re", artist: "Hariharan, Kavita Krishnamurthy", film: "Bombay", year: 1995, duration: s(7, 17), videoId: "" },
      { id: "g16", title: "Sajni O Sajni", artist: "Kavita Krishnamurthy", film: "Deewana Mastana", year: 1997, duration: s(5, 14), videoId: "" },
      { id: "g17", title: "Chupke Se", artist: "Sadhana Sargam, Murtuza, Qadir", film: "Saathiya", year: 2002, duration: s(6, 4), videoId: "" },
      { id: "g18", title: "Aye Udi Udi Udi", artist: "Adnan Sami", film: "Saathiya", year: 2002, duration: s(4, 35), videoId: "" },
      { id: "g19", title: "Mera Piya Ghar Aaya", artist: "Kavita Krishnamurthy", film: "Yaraana", year: 1995, duration: s(5, 45), videoId: "" },
      { id: "g20", title: "Ole Ole", artist: "Abhijeet", film: "Yeh Dillagi", year: 1994, duration: s(4, 10), videoId: "" },
      { id: "g21", title: "Husn Hai Suhana", artist: "Abhijeet, Chandana Dixit", film: "Coolie No. 1", year: 1995, duration: s(5, 58), videoId: "" },
      { id: "g22", title: "What Is Mobile Number", artist: "Sonu Nigam, Jaspinder Narula", film: "Haseena Maan Jaayegi", year: 1999, duration: s(5, 52), videoId: "" },
      { id: "g23", title: "Sona Kitna Sona Hai", artist: "Udit Narayan, Poornima", film: "Hero No. 1", year: 1997, duration: s(5, 33), videoId: "" },
      { id: "g24", title: "Ankhiyon Se Goli Maare", artist: "Sonu Nigam, Jaspinder Narula", film: "Dulhe Raja", year: 1998, duration: s(5, 12), videoId: "" },
      { id: "g25", title: "Main Toh Raste Se Ja Raha Tha", artist: "Alka Yagnik, Kumar Sanu", film: "Coolie No. 1", year: 1995, duration: s(5, 15), videoId: "" },
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
      { id: "i9", title: "Gur Nalon Ishq Mitha", artist: "Malkit Singh", film: "Malkit Singh", year: 1990, duration: s(5, 2), videoId: "" },
      { id: "i10", title: "Kaliyon Ka Chaman", artist: "Lata Mangeshkar / Remix", film: "Kaliyon Ka Chaman", year: 2000, duration: s(5, 5), videoId: "" },
      { id: "i11", title: "Deewana Hai Ye Mann", artist: "Sonu Nigam, Shankar Mahadevan", film: "Chori Chori Chupke Chupke", year: 2001, duration: s(5, 25), videoId: "" },
      { id: "i12", title: "Aaja Mahiya", artist: "Udit Narayan, Alka Yagnik, Prashant", film: "Fiza", year: 2000, duration: s(6, 48), videoId: "" },
      { id: "i13", title: "Kaliyon Ka Chaman", artist: "DJ Suketu", film: "Pop Remix", year: 2000, duration: s(5, 15), videoId: "" },
      { id: "i14", title: "Tunak Tunak Tun", artist: "Daler Mehndi", film: "Tunak Tunak Tun", year: 1998, duration: s(5, 0), videoId: "" },
      { id: "i15", title: "Bolo Ta Ra Ra", artist: "Daler Mehndi", film: "Bolo Ta Ra Ra", year: 1995, duration: s(5, 40), videoId: "" },
      { id: "i16", title: "Ho Jayegi Balle Balle", artist: "Daler Mehndi", film: "Ho Jayegi Balle Balle", year: 1997, duration: s(5, 5), videoId: "" },
      { id: "i17", title: "Dardi Rab Rab Kardi", artist: "Daler Mehndi", film: "Dardi Rab Rab", year: 1996, duration: s(5, 32), videoId: "" },
      { id: "i18", title: "Kaanta Laga", artist: "Shefali Jariwala / DJ Doll", film: "Kaanta Laga", year: 2002, duration: s(4, 2), videoId: "" },
      { id: "i19", title: "Aankhon Mein Tera Hi Chehra", artist: "Aryans", film: "Aankhon Mein Tera Hi Chehra", year: 1999, duration: s(5, 0), videoId: "" },
      { id: "i20", title: "Suno To Deewana Dil", artist: "Abhijeet", film: "Suno To Deewana Dil", year: 1996, duration: s(5, 20), videoId: "" },
      { id: "i21", title: "Boom Boom", artist: "Nazia Hassan", film: "Boom Boom", year: 1982, duration: s(4, 35), videoId: "" },
      { id: "i22", title: "Disco Deewane", artist: "Nazia Hassan", film: "Disco Deewane", year: 1981, duration: s(4, 5), videoId: "" },
      { id: "i23", title: "Aap Jaisa Koi", artist: "Nazia Hassan", film: "Qurbani", year: 1980, duration: s(4, 2), videoId: "" },
      { id: "i24", title: "Rock Your Body", artist: "Colonial Cousins", film: "Colonial Cousins", year: 1996, duration: s(4, 30), videoId: "" },
      { id: "i25", title: "Krishna", artist: "Colonial Cousins", film: "Colonial Cousins", year: 1996, duration: s(5, 10), videoId: "" },
      { id: "i26", title: "Pretty Woman", artist: "Shankar Mahadevan, Ravi Khote", film: "Kal Ho Naa Ho", year: 2003, duration: s(5, 54), videoId: "" },
      { id: "i27", title: "Aankhon Mein", artist: "Shweta Shetty", film: "Indipop", year: 1990, duration: s(4, 40), videoId: "" },
      { id: "i28", title: "Duniya", artist: "Suneeta Rao", film: "Indipop", year: 1991, duration: s(4, 45), videoId: "" },
      { id: "i29", title: "Jadoo", artist: "Asha Bhosle", film: "Indipop", year: 1990, duration: s(5, 1), videoId: "" },
      { id: "i30", title: "Boom Boom", artist: "Bally Sagoo", film: "Indipop", year: 1990, duration: s(5, 20), videoId: "" },
    ],
  },
];

export const formatTime = (secs: number) => {
  if (!Number.isFinite(secs) || secs < 0) secs = 0;
  const m = Math.floor(secs / 60);
  const r = Math.floor(secs % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};
