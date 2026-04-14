export interface Hadith {
  id: number;
  title: string;
  arabic: string;
  translation: string;
  narrator: string;
}

export const hadiths: Hadith[] = [
  {
    id: 1,
    title: "Niat dan Ikhlas",
    narrator: "Amirul Mukminin Abu Hafsh, Umar bin Al-Khathab radhiallahu 'anhu",
    arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوْ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ",
    translation: "Sesungguhnya setiap amalan itu bergantung kepada niatnya. Dan setiap orang hanyalah mendapatkan apa yang dia niatkan. Maka sesiapa yang hijrahnya kerana Allah dan Rasul-Nya, maka hijrahnya kepada Allah dan Rasul-Nya. Dan sesiapa yang hijrahnya kerana dunia yang dia cari atau wanita yang dia nikahi, maka hijrahnya kepada apa yang dia hijrah kepadanya."
  },
  {
    id: 2,
    title: "Islam, Iman, dan Ihsan",
    narrator: "Umar bin Al-Khathab radhiallahu 'anhu",
    arabic: "بَيْنَمَا نَحْنُ جُلُوسٌ عِنْدَ رَسُولِ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ ذَاتَ يَوْمٍ إِذْ طَلَعَ عَلَيْنَا رَجُلٌ شَدِيدُ بَيَاضِ الثِّيَابِ شَدِيدُ سَوادِ الشَّعْرِ، لَا يُرَى عَلَيْهِ أَثَرُ السَّفَرِ، وَلَا يَعْرِفُهُ مِنَّا أَحَدٌ...",
    translation: "Pada suatu hari ketika kami sedang duduk di sisi Rasulullah SAW, tiba-tiba muncul seorang lelaki yang pakaiannya sangat putih dan rambutnya sangat hitam. Tidak terlihat padanya bekas perjalanan dan tidak ada seorang pun di antara kami yang mengenalinya..."
  },
  {
    id: 3,
    title: "Rukun Islam",
    narrator: "Abu Abdurrahman Abdullah bin Umar bin Al-Khathab radhiallahu 'anhuma",
    arabic: "بُنِيَ الْإِسْلَامُ عَلَى خَمْسٍ: شَهَادَةِ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَإِقَامِ الصَّلَاةِ، وَإِيتَاءِ الزَّكَاةِ، وَحَجِّ الْبَيْتِ، وَصَوْمِ رَمَضَانَ",
    translation: "Islam dibina atas lima perkara: bersaksi bahawa tiada tuhan yang berhak disembah melainkan Allah dan Muhammad adalah utusan Allah, mendirikan solat, menunaikan zakat, mengerjakan haji ke Baitullah, dan berpuasa di bulan Ramadhan."
  },
  {
    id: 4,
    title: "Penciptaan Manusia dan Takdir",
    narrator: "Abu Abdurrahman Abdullah bin Mas'ud radhiallahu 'anhu",
    arabic: "إِنَّ أَحَدَكُمْ يُجْمَعُ خَلْقُهُ فِي بَطْنِ أُمِّهِ أَرْبَعِينَ يَوْمًا نُطْفَةً، ثُمَّ يَكُونُ عَلَقَةً مِثْلَ ذَلِكَ، ثُمَّ يَكُونُ مُضْغَةً مِثْلَ ذَلِكَ، ثُمَّ يُرْسَلُ إِلَيْهِ الْمَلَكُ فَيَنْفُخُ فِيهِ الرُّوحَ...",
    translation: "Sesungguhnya setiap seorang daripada kamu dikumpulkan penciptaannya dalam rahim ibunya selama empat puluh hari berupa nuthfah (sperma), kemudian menjadi 'alaqah (segumpal darah) selama itu pula, kemudian menjadi mudhghah (segumpal daging) selama itu pula, kemudian diutuslah malaikat kepadanya lalu meniupkan ruh padanya..."
  },
  {
    id: 5,
    title: "Larangan Bid'ah",
    narrator: "Ummul Mukminin Ummu Abdillah Aisyah radhiallahu 'anha",
    arabic: "مَنْ أَحْدَثَ فِي أَمْرِنَا هَذَا مَا لَيْسَ مِنْهُ فَهُوَ رَدٌّ",
    translation: "Sesiapa yang mengada-adakan dalam urusan (agama) kami ini sesuatu yang bukan daripadanya, maka amalan tersebut ditolak."
  },
  {
    id: 6,
    title: "Meninggalkan Syubhat",
    narrator: "Abu Abdillah An-Nu'man bin Basyir radhiallahu 'anhuma",
    arabic: "إِنَّ الْحَلَالَ بَيِّنٌ وَإِنَّ الْحَرَامَ بَيِّنٌ وَبَيْنَهُمَا أُمُورٌ مُشْتَبِهَاتٌ لَا يَعْلَمُهُنَّ كَثِيرٌ مِنْ النَّاسِ...",
    translation: "Sesungguhnya yang halal itu jelas dan yang haram itu jelas. Di antara keduanya terdapat perkara-perkara syubhat (samar) yang tidak diketahui oleh kebanyakan manusia..."
  },
  {
    id: 7,
    title: "Agama adalah Nasihat",
    narrator: "Abu Ruqayyah Tamim bin Aus Ad-Dari radhiallahu 'anhu",
    arabic: "الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ، وَلِكِتَابِهِ، وَلِرَسُولِهِ، وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ",
    translation: "Agama itu nasihat. Kami bertanya: Untuk siapa? Beliau bersabda: Untuk Allah, Kitab-Nya, Rasul-Nya, para pemimpin kaum muslimin, dan orang-orang awam mereka."
  },
  {
    id: 8,
    title: "Kehormatan Seorang Muslim",
    narrator: "Ibnu Umar radhiallahu 'anhuma",
    arabic: "أُمِرْتُ أَنْ أُقَاتِلَ النَّاسَ حَتَّى يَشْهَدُوا أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَأَنَّ مُحَمَّدًا رَسُولُ اللَّهِ، وَيُقِيمُوا الصَّلَاةَ، وَيُؤْتُوا الزَّكَاةَ...",
    translation: "Aku diperintahkan untuk memerangi manusia sehingga mereka bersaksi bahawa tiada tuhan yang berhak disembah melainkan Allah dan Muhammad adalah utusan Allah, mendirikan solat, dan menunaikan zakat..."
  },
  {
    id: 9,
    title: "Melaksanakan Perintah Mengikut Kemampuan",
    narrator: "Abu Hurairah Abdurrahman bin Sakhr radhiallahu 'anhu",
    arabic: "مَا نَهَيْتُكُمْ عَنْهُ فَاجْتَنِبُوهُ، وَمَا أَمَرْتُكُمْ بِهِ فَأْتُوا مِنْهُ مَا اسْتَطَعْتُمْ...",
    translation: "Apa yang aku larang kepada kamu hendaklah kamu jauhi, dan apa yang aku perintahkan kepada kamu hendaklah kamu lakukan mengikut kemampuan kamu..."
  },
  {
    id: 10,
    title: "Makan daripada yang Halal",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "إِنَّ اللَّهَ طَيِّبٌ لَا يَقْبَلُ إِلَّا طَيِّبًا، وَإِنَّ اللَّهَ أَمَرَ الْمُؤْمِنِينَ بِمَا أَمَرَ بِهِ الْمُرْسَلِينَ...",
    translation: "Sesungguhnya Allah itu baik dan tidak menerima kecuali yang baik. Dan sesungguhnya Allah memerintahkan orang-orang mukmin dengan apa yang Dia perintahkan kepada para Rasul..."
  },
  {
    id: 11,
    title: "Meninggalkan yang Ragu-ragu",
    narrator: "Abu Muhammad Al-Hasan bin Ali bin Abi Thalib radhiallahu 'anhuma",
    arabic: "دَعْ مَا يَرِيبُكَ إِلَى مَا لَا يَرِيبُكَ",
    translation: "Tinggalkanlah apa yang meragukanmu menuju apa yang tidak meragukanmu."
  },
  {
    id: 12,
    title: "Meninggalkan yang Tidak Bermanfaat",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "مِنْ حُسْنِ إِسْلَامِ الْمَرْءِ تَرْكُهُ مَا لَا يَعْنِيهِ",
    translation: "Antara tanda keelokan Islam seseorang ialah dia meninggalkan apa yang tidak berkaitan dengannya."
  },
  {
    id: 13,
    title: "Mencintai Saudara Seperti Mencintai Diri Sendiri",
    narrator: "Abu Hamzah Anas bin Malik radhiallahu 'anhu",
    arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
    translation: "Tidak sempurna iman seseorang daripada kamu sehingga dia mencintai untuk saudaranya apa yang dia cintai untuk dirinya sendiri."
  },
  {
    id: 14,
    title: "Larangan Menumpahkan Darah Muslim",
    narrator: "Ibnu Mas'ud radhiallahu 'anhu",
    arabic: "لَا يَحِلُّ دَمُ امْرِئٍ مُسْلِمٍ إِلَّا بِإِحْدَى ثَلَاثٍ: الثَّيِّبُ الزَّانِي، وَالنَّفْسُ بِالنَّفْسِ، وَالتَّارِكُ لِدِينِهِ الْمُفَارِقُ لِلْجَمَاعَةِ",
    translation: "Tidak halal darah seorang muslim melainkan kerana salah satu daripada tiga perkara: orang yang sudah berkahwin yang berzina, nyawa dibalas nyawa (qishash), dan orang yang meninggalkan agamanya serta memisahkan diri daripada jamaah."
  },
  {
    id: 15,
    title: "Berkata Baik atau Diam",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْmِ الْآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيُكْرِمْ ضَيْفَهُ",
    translation: "Sesiapa yang beriman kepada Allah dan hari akhirat maka hendaklah dia berkata baik atau diam. Sesiapa yang beriman kepada Allah dan hari akhirat maka hendaklah dia memuliakan jiran tetangganya. Dan sesiapa yang beriman kepada Allah dan hari akhirat maka hendaklah dia memuliakan tetamunya."
  },
  {
    id: 16,
    title: "Larangan Marah",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "أَنَّ رَجُلًا قَالَ لِلنَّبِيِّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: أَوْصِنِي. قَالَ: لَا تَغْضَبْ. فَرَدَّدَ مِرَارًا، قَالَ: لَا تَغْضَبْ",
    translation: "Seorang lelaki berkata kepada Nabi SAW: 'Berilah wasiat kepadaku.' Beliau bersabda: 'Janganlah kamu marah.' Lelaki itu mengulangi permintaannya beberapa kali, dan beliau tetap bersabda: 'Janganlah kamu marah.'"
  },
  {
    id: 17,
    title: "Berbuat Baik dalam Segala Urusan",
    narrator: "Abu Ya'la Syaddad bin Aus radhiallahu 'anhu",
    arabic: "إِنَّ اللَّهَ كَتَبَ الْإِحْسَانَ عَلَى كُلِّ شَيْءٍ، فَإِذَا قَتَلْتُمْ فَأَحْسِنُوا الْقِتْلَةَ، وَإِذَا ذَبَحْتُمْ فَأَحْسِنُوا الذِّبْحَةَ...",
    translation: "Sesungguhnya Allah mewajibkan berbuat baik (ihsan) atas segala sesuatu. Maka apabila kamu membunuh, bunuhlah dengan cara yang baik. Dan apabila kamu menyembelih, sembelihlah dengan cara yang baik..."
  },
  {
    id: 18,
    title: "Takwa dan Akhlak Mulia",
    narrator: "Abu Dzar Jundub bin Junadah dan Abu Abdurrahman Mu'adz bin Jabal radhiallahu 'anhuma",
    arabic: "اتَّقِ اللَّهَ حَيْثُمَا كُنْتَ، وَأَتْبِعْ السَّيِّئَةَ الْحَسَنَةَ تَمْحُهَا، وَخَالِقِ النَّاسَ بِخُلُقٍ حَسَنٍ",
    translation: "Bertakwalah kepada Allah di mana sahaja kamu berada. Ikutilah keburukan dengan kebaikan, nescaya kebaikan itu akan menghapuskannya. Dan bergaullah dengan manusia dengan akhlak yang baik."
  },
  {
    id: 19,
    title: "Penjagaan Allah terhadap Hamba-Nya",
    narrator: "Abu Al-Abbas Abdullah bin Abbas radhiallahu 'anhuma",
    arabic: "يَا غُلَامُ، إِنِّي أُعَلِّمُكَ كَلِمَاتٍ: احْفَظْ اللَّهَ يَحْفَظْكَ، احْفَظْ اللَّهَ تَجِدْهُ تُجَاهَكَ، إِذَا سَأَلْتَ فَاسْأَلْ اللَّهَ...",
    translation: "Wahai anak muda, sesungguhnya aku akan mengajarkan kepadamu beberapa kalimat: Jagalah Allah, nescaya Allah akan menjagamu. Jagalah Allah, nescaya kamu akan mendapati-Nya di hadapanmu. Apabila kamu memohon, mohonlah kepada Allah..."
  },
  {
    id: 20,
    title: "Sifat Malu",
    narrator: "Abu Mas'ud Uqbah bin Amr Al-Anshari Al-Badri radhiallahu 'anhu",
    arabic: "إِنَّ مِمَّا أَدْرَكَ النَّاسُ مِنْ كَلَامِ النُّبُوَّةِ الْأُولَى: إِذَا لَمْ تَسْتَحْيِ فَاصْنَعْ مَا شِئْتَ",
    translation: "Sesungguhnya antara perkara yang didapati oleh manusia daripada perkataan kenabian yang terdahulu ialah: 'Jika kamu tidak malu, maka lakukanlah apa sahaja yang kamu mahu.'"
  },
  {
    id: 21,
    title: "Istiqamah",
    narrator: "Abu Amr (ada yang menyebut Abu Amrah) Sufyan bin Abdillah radhiallahu 'anhu",
    arabic: "قُلْتُ: يَا رَسُولَ اللَّهِ، قُلْ لِي فِي الْإِسْلَامِ قَوْلًا لَا أَسْأَلُ عَنْهُ أَحَدًا غَيْرَكَ. قَالَ: قُلْ آمَنْتُ بِاللَّهِ ثُمَّ اسْتَقِمْ",
    translation: "Aku berkata: 'Wahai Rasulullah, katakanlah kepadaku dalam Islam suatu perkataan yang aku tidak akan bertanya mengenainya kepada sesiapa pun selain engkau.' Beliau bersabda: 'Katakanlah: Aku beriman kepada Allah, kemudian beristiqamahlah.'"
  },
  {
    id: 22,
    title: "Jalan ke Syurga",
    narrator: "Abu Abdillah Jabir bin Abdullah Al-Anshari radhiallahu 'anhuma",
    arabic: "أَرَأَيْتَ إِذَا صَلَّيْتُ الْمَكْتُوبَاتِ، وَصُمْتُ رَمَضَانَ، وَأَحْلَلْتُ الْحَلَالَ، وَحَرَّمْتُ الْحَرَامَ، وَلَمْ أَزِدْ عَلَى ذَلِكَ شَيْئًا، أَأَدْخُلُ الْجَنَّةَ؟ قَالَ: نَعَمْ",
    translation: "Bagaimana pendapatmu jika aku menunaikan solat fardu, berpuasa Ramadhan, menghalalkan yang halal, mengharamkan yang haram, dan aku tidak menambah sedikit pun atas perkara itu, adakah aku akan masuk syurga? Beliau bersabda: 'Ya.'"
  },
  {
    id: 23,
    title: "Kesucian dan Keutamaan Amal",
    narrator: "Abu Malik Al-Harits bin Ashim Al-Asy'ari radhiallahu 'anhu",
    arabic: "الطُّهُورُ شَطْرُ الْإِيمَانِ، وَالْحَمْدُ لِلَّهِ تَمْلأُ الْمِيزَانَ، وَسُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ تَمْلآنِ مَا بَيْنَ السَّمَاءِ وَالْأَرْضِ...",
    translation: "Kesucian itu sebahagian daripada iman. Alhamdulillah memenuhi timbangan. Subhanallah dan Alhamdulillah memenuhi ruang antara langit dan bumi..."
  },
  {
    id: 24,
    title: "Keharaman Kezaliman",
    narrator: "Abu Dzar Al-Ghifari radhiallahu 'anhu",
    arabic: "يَا عِبَادِي، إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّمًا فَلَا تَظَالَمُوا...",
    translation: "Wahai hamba-hamba-Ku, sesungguhnya Aku telah mengharamkan kezaliman atas diri-Ku dan Aku menjadikannya haram di antara kamu, maka janganlah kamu saling menzalimi..."
  },
  {
    id: 25,
    title: "Sedekah daripada Kelebihan Amal",
    narrator: "Abu Dzar radhiallahu 'anhu",
    arabic: "أَوَلَيْسَ قَدْ جَعَلَ اللَّهُ لَكُمْ مَا تَصَّدَّقُونَ؟ إِنَّ بِكُلِّ تَسْبِيحَةٍ صَدَقَةً، وَكُلِّ تَكْبِيرَةٍ صَدَقَةً...",
    translation: "Bukankah Allah telah menjadikan bagi kamu sesuatu untuk kamu bersedekah? Sesungguhnya setiap tasbih adalah sedekah, setiap takbir adalah sedekah..."
  },
  {
    id: 26,
    title: "Setiap Sendi Ada Sedekah",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "كُلُّ سُلَامَى مِنْ النَّاسِ عَلَيْهِ صَدَقَةٌ كُلَّ يَوْمٍ تَطْلُعُ فِيهِ الشَّمْسُ: تَعْدِلُ بَيْنَ اثْنَيْنِ صَدَقَةٌ...",
    translation: "Setiap sendi manusia wajib dikeluarkan sedekah baginya setiap hari yang terbit padanya matahari: kamu mendamaikan antara dua orang adalah sedekah..."
  },
  {
    id: 27,
    title: "Kebaikan dan Dosa",
    narrator: "An-Nawwas bin Sam'an radhiallahu 'anhu",
    arabic: "الْبِرُّ حُسْنُ الْخُلُقِ، وَالْإِثْمُ مَا حَاكَ فِي نَفْسِكَ وَكَرِهْتَ أَنْ يَطَّلِعَ عَلَيْهِ النَّاسُ",
    translation: "Kebaikan itu adalah akhlak yang baik, dan dosa itu adalah apa yang meragukan dalam hatimu dan kamu benci jika manusia mengetahuinya."
  },
  {
    id: 28,
    title: "Berpegang Teguh dengan Sunnah",
    narrator: "Abu Najih Al-Irbadh bin Sariyah radhiallahu 'anhu",
    arabic: "وَعَظَنَا رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ مَوْعِظَةً وَجِلَتْ مِنْهَا الْقُلُوبُ وَذَرَفَتْ مِنْهَا الْعُيُونُ...",
    translation: "Rasulullah SAW telah memberi nasihat kepada kami dengan satu nasihat yang menggetarkan hati dan menitiskan air mata..."
  },
  {
    id: 29,
    title: "Pintu-pintu Kebaikan",
    narrator: "Mu'adz bin Jabal radhiallahu 'anhu",
    arabic: "أَلَا أَدُلُّكَ عَلَى أَبْوَابِ الْخَيْرِ؟ الصَّوْمُ جُنَّةٌ، وَالصَّدَقَةُ تُطْفِئُ الْخَطِيئَةَ كَمَا يُطْفِئُ الْمَاءُ النَّارَ...",
    translation: "Mahukah aku tunjukkan kepadamu pintu-pintu kebaikan? Puasa itu perisai, sedekah itu memadamkan kesalahan sebagaimana air memadamkan api..."
  },
  {
    id: 30,
    title: "Batasan-batasan Allah",
    narrator: "Abu Tsa'labah Al-Khusyani Jurtsum bin Nasyir radhiallahu 'anhu",
    arabic: "إِنَّ اللَّهَ تَعَالَى فَرَضَ فَرَائِضَ فَلَا تُضَيِّعُوهَا، وَحَدَّ حُدُودًا فَلَا تَعْتَدُوهَا...",
    translation: "Sesungguhnya Allah Ta'ala telah mewajibkan beberapa kewajipan maka janganlah kamu mensia-siakannya, dan Dia telah menetapkan batasan-batasan maka janganlah kamu melampauinya..."
  },
  {
    id: 31,
    title: "Hakikat Zuhud",
    narrator: "Abu Al-Abbas Sahl bin Sa'ad Al-Sa'idi radhiallahu 'anhu",
    arabic: "ازْهَدْ فِي الدُّنْيَا يُحِبَّكَ اللَّهُ، وَازْهَدْ فِيمَا عِنْدَ النَّاسِ يُحِبَّكَ النَّاسُ",
    translation: "Zuhudlah terhadap dunia nescaya Allah akan mencintaimu, dan zuhudlah terhadap apa yang ada pada manusia nescaya manusia akan mencintaimu."
  },
  {
    id: 32,
    title: "Larangan Memberi Mudarat",
    narrator: "Abu Sa'id Sa'ad bin Malik bin Sinan Al-Khudri radhiallahu 'anhu",
    arabic: "لَا ضَرَرَ وَلَا ضِرَارَ",
    translation: "Tidak boleh memberi mudarat dan tidak boleh membalas mudarat dengan mudarat."
  },
  {
    id: 33,
    title: "Bukti bagi Pendakwa",
    narrator: "Ibnu Abbas radhiallahu 'anhuma",
    arabic: "لَوْ يُعْطَى النَّاسُ بِدَعْوَاهُمْ لَادَّعَى رِجَالٌ أَمْوَالَ قَوْمٍ وَدِمَاءَهُمْ، وَلَكِنَّ الْبَيِّنَةَ عَلَى الْمُدَّعِي وَالْيَمِينَ عَلَى مَنْ أَنْكَرَ",
    translation: "Sekiranya manusia diberikan (hak) berdasarkan dakwaan mereka, nescaya ramai orang akan mendakwa harta dan darah kaum yang lain. Akan tetapi bukti wajib bagi pendakwa dan sumpah bagi yang mengingkari."
  },
  {
    id: 34,
    title: "Kewajipan Mengubah Kemungkaran",
    narrator: "Abu Sa'id Al-Khudri radhiallahu 'anhu",
    arabic: "مَنْ رَأَى مِنْكُمْ مُنْكَرًا فَلْيُغَيِّرْهُ بِيَدِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِلِسَانِهِ، فَإِنْ لَمْ يَسْتَطِعْ فَبِقَلْبِهِ وَذَلِكَ أَضْعَفُ الْإِيمَانِ",
    translation: "Sesiapa di antara kamu yang melihat kemungkaran hendaklah dia mengubahnya dengan tangannya. Sekiranya dia tidak mampu, maka dengan lidahnya. Sekiranya dia tidak mampu, maka dengan hatinya dan itu adalah selemah-lemah iman."
  },
  {
    id: 35,
    title: "Persaudaraan Islam",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "لَا تَحَاسَدُوا، وَلَا تَنَاجَشُوا، وَلَا تَبَاغَضُوا، وَلَا تَدَابَرُوا، وَلَا يَبِعْ بَعْضُكُمْ عَلَى بَيْعِ بَعْضٍ، وَكُونُوا عِبَادَ اللَّهِ إِخْوَانًا...",
    translation: "Janganlah kamu saling mendengki, janganlah kamu saling menipu dalam jual beli, janganlah kamu saling membenci, janganlah kamu saling membelakangi, janganlah sebahagian kamu menjual atas jualan sebahagian yang lain, dan jadilah hamba-hamba Allah yang bersaudara..."
  },
  {
    id: 36,
    title: "Membantu Kesulitan Orang Mukmin",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ...",
    translation: "Sesiapa yang melepaskan satu kesusahan seorang mukmin daripada kesusahan-kesusahan dunia, nescaya Allah akan melepaskan daripadanya satu kesusahan daripada kesusahan-kesusahan hari kiamat..."
  },
  {
    id: 37,
    title: "Kebaikan dan Keburukan",
    narrator: "Ibnu Abbas radhiallahu 'anhuma",
    arabic: "إِنَّ اللَّهَ كَتَبَ الْحَسَنَاتِ وَالسَّيِّئَاتِ ثُمَّ بَيَّنَ ذَلِكَ، فَمَنْ هَمَّ بِحَسَنَةٍ فَلَمْ يَعْمَلْهَا كَتَبَهَا اللَّهُ عِنْدَهُ حَسَنَةً كَامِلَةً...",
    translation: "Sesungguhnya Allah telah menetapkan kebaikan dan keburukan kemudian Dia menjelaskannya. Sesiapa yang berniat melakukan kebaikan lalu dia tidak melakukannya, Allah mencatat di sisi-Nya sebagai satu kebaikan yang sempurna..."
  },
  {
    id: 38,
    title: "Ibadah Nawafil (Sunat)",
    narrator: "Abu Hurairah radhiallahu 'anhu",
    arabic: "مَنْ عَادَى لِي وَلِيًّا فَقَدْ آذَنْتُهُ بِالْحَرْبِ، وَمَا تَقَرَّبَ إِلَيَّ عَبْدِي بِشَيْءٍ أَحَبَّ إِلَيَّ مِمَّا افْتَرَضْتُ عَلَيْهِ...",
    translation: "Sesiapa yang memusuhi wali-Ku, maka Aku mengisytiharkan perang kepadanya. Tidaklah hamba-Ku mendekatkan diri kepada-Ku dengan sesuatu yang lebih Aku cintai daripada apa yang telah Aku fardukan ke atasnya..."
  },
  {
    id: 39,
    title: "Kesilapan, Lupa dan Terpaksa",
    narrator: "Ibnu Abbas radhiallahu 'anhuma",
    arabic: "إِنَّ اللَّهَ تَجَاوَزَ لِي عَنْ أُمَّتِي الْخَطَأَ وَالنِّسْيَانَ وَمَا اسْتُكْرِهُوا عَلَيْهِ",
    translation: "Sesungguhnya Allah telah memaafkan untukku daripada umatku (perbuatan yang dilakukan kerana) tersilap, lupa dan apa yang dipaksa ke atas mereka."
  },
  {
    id: 40,
    title: "Hidup di Dunia Ibarat Perantau",
    narrator: "Ibnu Umar radhiallahu 'anhuma",
    arabic: "كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ",
    translation: "Jadilah kamu di dunia ini seolah-olah kamu seorang asing atau seorang pengembara."
  }
];
