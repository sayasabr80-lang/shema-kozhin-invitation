import coupleIllustration from '../assets/couple-illustration.png'

/**
 * Single source of truth for all customizable wedding invitation content and media paths.
 */
export const invitationData = {
  // Envelope Cover
  sealInitials: 'Sh,K',
  openButtonText: 'بیکەرەوە',

  // Hero & Event Date (ISO string drives Hero date, Calendar grid, .ics download, and Countdown)
  eventTitle: 'ڕۆژی مارەبڕین',
  eventDateISO: '2026-11-29T18:00:00',
  groomName: 'کۆژین',
  brideName: 'شەیما',
  scrollIndicatorText: 'وەرە خوارەوە',

  // Invitation Details
  quranVerse:
    'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\nوَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
  invitationHeader: 'بەڕێزتان بانگهێشت کراون لە لایەن',
  groomFatherLabel: 'باوکی زاوا',
  groomFatherName: 'کاک ئازاد',
  brideFatherLabel: 'باوکی بووک',
  brideFatherName: 'وەستا کۆچەر',
  invitationMessage:
    'ئامادەبوونی خۆتان و خانەوادەی بەڕێزتان لە مارەبڕینەکەمان، بۆنەکەمان جوانتر دەکات',
  secondaryMessage:
    'ژیان بەو ساتانەوە جوانە کە لەگەڵ ئازیزانماندا بەشی دەکەین. زۆر دڵخۆش دەبین کە ئێوەش بەشێک بن لەم ڕۆژە تایبەتەمان.',

  // Calendar & Countdown
  saveDateButtonText: 'هەڵگرتنی ڕۆژەکە',
  eventStartedText: 'ئاهەنگەکە دەستی پێکرد!',

  // Venue & Map
  locationTitle: 'ناونیشانی ئاهەنگ',
  venueName: 'سلێمانی - سولی بالکۆن',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Suli+Balcony,Sulaymaniyah&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapDirectLink: 'https://maps.app.goo.gl/6AhxyUzZQ6jdhk5YA?g_st=ic',
  mapButtonText: 'کردنەوە لە نەخشە',

  // Poetic Dedication
  dedicationTitle: 'بۆ ئازیزانمان',
  dedicationLines: [
    'بە ئامادەبوونتان، گوڵزاری ئاهەنگ دەگەشێتەوە',
    'بە زەردەخەنەتان، کۆڕی شادیمان دەڕازێتەوە',
    'ڕووناکیی ئەم ئاهەنگە، پرشنگی دیداری ئێوەیە',
    'سەرچاوانمان ڕووناک، کە ئەمڕۆ جێگەتان لێرەیە',
  ],

  // Footer
  footerCreditText: 'کارتی بانگهێشتنامەی هاوسەرگیریت لای Infora.krd By Saya دروست بکە',
  footerCreditHighlight: 'Infora.krd By Saya',
  instagramUrl: 'https://www.instagram.com/infora.krd',

  // Media Paths (supports a YouTube URL or a local audio path like '/music/song.mp3')
  mediaPaths: {
    envelopeVideo: '',
    heroVideo: '',
    coupleImage: coupleIllustration,
    backgroundMusic: 'https://youtu.be/YlutQsV0WWs?si=uoQyljvjnPXuy3Ag',
    backgroundMusicStartSeconds: 0,
  },
}
