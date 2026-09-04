/* ================================================================
   INTERACTIVITY & LOCALIZATION (UPDATED FOR NEW REVIEWS)
   ================================================================ */

/* 1. THEME TOGGLE */
(function themeModule() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemPrefersDark ? 'dark' : 'light'));

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem(STORAGE_KEY, nextTheme);
    });
  }
})();

/* 2. LANGUAGE SWITCHER & TRANSLATIONS */
(function languageModule() {
  const root = document.documentElement;
  const langButtons = document.querySelectorAll('.lang-btn');
  const STORAGE_KEY = 'portfolio-lang';

  const translations = {
    fr: {
      promo: "Nouveau — Découvrez notre sélection exclusive",
      'nav.about': "À propos",
      'nav.sourcing': "Sélection",
      'nav.categories': "Catégories",
      'nav.brands': "Marques",
      'nav.gallery': "Galerie",
      'nav.reviews': "Avis",
      'nav.contact': "Contact",
      'nav.cta': "Contact",
      'hero.title': "Une parapharmacie internationale, au cœur d'Agadir.",
      'hero.sub': "France, Espagne, Corée — LOPA réunit les meilleures marques de dermocosmétique, sélectionnées pour votre peau, vos cheveux et votre famille.",
      'hero.cta1': "Contactez-nous",
      'hero.cta2': "Découvrir nos marques",
      'hero.badge': "20+ marques internationales",
      'about.heading': "Une sélection pensée, pas seulement un rayon.",
      'about.p1': "LOPA est née d'une idée simple : réunir ce qui se fait de mieux en dermocosmétique dans le monde.",
      'about.p2': "Chaque produit est choisi avec soin. Notre équipe est là pour vous orienter vers la routine idéale.",
      'sourcing.badge': "Exclusivités & Pépites",
      'sourcing.heading': "Notre Sélection Saisonnière",
      'sourcing.sub': "Des soins iconiques et formulés par des laboratoires de renommée mondiale.",
      'sourcing.card1Title': "Sérums Hydratants Coréens",
      'sourcing.card1Desc': "Une hydratation en profondeur grâce à des formules innovantes enrichies en acide hyaluronique et centella asiatica.",
      'sourcing.card2Title': "Dermocosmétique Avancée",
      'sourcing.card2Desc': "Des soins dermatologiques haute tolérance pour traiter, réparer et protéger les peaux sensibles.",
      'sourcing.card3Title': "Photoprotection ISDIN",
      'sourcing.card3Desc': "Protection solaire fluide et invisible adaptée au climat et aux activités quotidiennes.",
      'categories.heading': "Ce que vous trouverez chez LOPA",
      'categories.c1': "Dermocosmétique",
      'categories.c2': "Soins Capillaires",
      'categories.c3': "Bébé & Maman",
      'categories.c4': "K-Beauty",
      'categories.c5': "Solaire",
      'brands.heading': "Les marques que vous aimez",
      'brands.sub': "Un aperçu de notre sélection — la liste complète vous attend en boutique.",
      'gallery.heading': "Galerie LOPA",
      'gallery.sub': "L'atmosphère de notre boutique et nos arrivages récents.",
      'gallery.img1': "Espace Conseil & Soins",
      'gallery.img2': "Rayon K-Beauty",
      'gallery.img3': "Nouveautés Solaire",
      'gallery.img4': "Comptoir Dermocosmétique",
      
      /* تحديث أفيات Zboon جداد بالفرنسية */
      'reviews.heading': "Ce que nos clients en disent",
      'reviews.quote1': "« Très satisfaite de mon expérience à La Centrale Para. Le personnel est accueillant, professionnel et de bon conseil. Les produits sont de qualité, les prix sont intéressants et le service est rapide. Je recommande vivement ! »",
      'reviews.quote2': "« Très satisfaite de cette parapharmacie ! 😊 Ils proposent de très bons produits avec un large choix. Le service est également excellent et l’équipe est très agréable. Tous les produits que j’ai achetés étaient de qualité et efficaces. Je recommande vivement cette parapharmacie ! ✨ »",
      'reviews.quote3': "« Excellente parapharmacie ! Large choix de produits, prix compétitifs et équipe très à l’écoute. Les conseils sont pertinents et le service est toujours agréable. Je recommande sans hésitation. »",
      'reviews.author1': "— Client LOPA",
      'reviews.author2': "— Client LOPA",
      'reviews.author3': "— Client LOPA",

      'contact.label': "Contact",
      'contact.heading': "Restons en contact",
      'contact.sub': "Retrouvez-nous directement sur nos réseaux ou rendez-nous visite.",
      'contact.addressLabel': "Adresse",
      'contact.addressValue': "Agadir, Maroc",
      'contact.phoneLabel': "Téléphone / WhatsApp",
      'contact.instagramLabel': "Instagram",
      'contact.hoursLabel': "Horaires",
      'contact.hoursValue': "Lundi - Samedi: 09:00 - 20:00",
      'contact.mapBtn': "Ouvrir dans Google Maps",
      'contact.whatsappBtn': "WhatsApp Direct",
      'contact.instagramBtn': "Instagram",
      'footer.text': "© <span id=\"year\"></span> LOPA — Tous droits réservés"
    },
    ar: {
      promo: "جديد — اكتشفوا تشكيلتنا الحصرية",
      'nav.about': "من نحن",
      'nav.sourcing': "تشكيلتنا",
      'nav.categories': "الأصناف",
      'nav.brands': "العلامات التجارية",
      'nav.gallery': "المعرض",
      'nav.reviews': "الآراء",
      'nav.contact': "تواصل معنا",
      'nav.cta': "تواصل معنا",
      'hero.title': "صيدلية دولية في قلب مدينة أكادير.",
      'hero.sub': "فرنسا، إسبانيا، كوريا — تجمع LOPA أفضل العلامات التجارية لمستحضرات التجميل المختارة لبشرتك وشعرك وعائلتك.",
      'hero.cta1': "تواصل معنا",
      'hero.cta2': "اكتشف علاماتنا",
      'hero.badge': "+20 علامة تجارية دولية",
      'about.heading': "تشكيلة مختارة بعناية وليست مجرد رفوف.",
      'about.p1': "نشأت LOPA من فكرة بسيطة: جمع أفضل مستحضرات التجميل والعناية بالبشرة في العالم.",
      'about.p2': "تم اختيار كل منتج بعناية. فريقنا هنا لتوجيهك نحو الروتين المالي المناسب لك.",
      'sourcing.badge': "منتجات حصرية",
      'sourcing.heading': "تشكيلة الموسم المختارة",
      'sourcing.sub': "منتجات عناية أيقونية مصممة من طرف أكبر المختبرات العالمية.",
      'sourcing.card1Title': "سيروم الترطيب الكوري",
      'sourcing.card1Desc': "ترطيب عميق بفضل تركيبات مبتكرة غنية بحمض الهيالورونيك وسينتيلا أسياتيكا.",
      'sourcing.card2Title': "العناية الجلدية المتقدمة",
      'sourcing.card2Desc': "منتجات عناية فائقة الجودة لعلاج وإصلاح وحماية البشرة الحساسة.",
      'sourcing.card3Title': "الحماية من الشمس ISDIN",
      'sourcing.card3Desc': "حماية شمسية خفيفة وغير مرئية مناسبة للمناخ والأنشطة اليومية.",
      'categories.heading': "ما ستجده لدى LOPA",
      'categories.c1': "العناية بالبشرة",
      'categories.c2': "العناية بالشعر",
      'categories.c3': "الأم والطفل",
      'categories.c4': "الجمال الكوري",
      'categories.c5': "الحماية من الشمس",
      'brands.heading': "العلامات التجارية التي تحبونها",
      'brands.sub': "لمحة عن تشكيلتنا — القائمة الكاملة بانتظاركم في المتجر.",
      'gallery.heading': "معرض LOPA",
      'gallery.sub': "أجواء متجرنا وأحدث التشكيلات الواصلة.",
      'gallery.img1': "فضاء الاستشارة والعناية",
      'gallery.img2': "جناح الجمال الكوري",
      'gallery.img3': "تشكيلة الحماية الشمسية",
      'gallery.img4': "ركن مستحضرات التجميل",
      
      /* تحديث أفيات Zboon جداد بالعربية */
      'reviews.heading': "آراء عملائنا في خدماتنا",
      'reviews.quote1': "« جد مسرورة بتجربتي في La Centrale Para. الطاقم مرحب، مهني ويقدم نصائح ممتازة. المنتجات ذات جودة عالية، الأسعار مناسبة والخدمة سريعة. أوصي بها بشدة! »",
      'reviews.quote2': "« جد مسرورة بهذه الصيدلية! 😊 يقدمون منتجات ممتازة مع خيارات واسعة. الخدمة ممتازة والفريق لطيف للغاية. جميع المنتجات التي اشتريتها كانت فعالة وذات جودة. أوصي بها بشدة! ✨ »",
      'reviews.quote3': "« صيدلية ممتازة! خيارات متعددة من المنتجات، أسعار تنافسية وفريق يستمع باهتمام. النصائح قيمة والخدمة دائماً ممتعة. أوصي بها بدون تردد. »",
      'reviews.author1': "— زبون LOPA",
      'reviews.author2': "— زبون LOPA",
      'reviews.author3': "— زبون LOPA",

      'contact.label': "التواصل",
      'contact.heading': "ابقَ على تواصل معنا",
      'contact.sub': "تواصل معنا مباشرة عبر شبكاتنا أو قم بزيارتنا.",
      'contact.addressLabel': "العنوان",
      'contact.addressValue': "أكادير، المغرب",
      'contact.phoneLabel': "الهاتف / واتساب",
      'contact.instagramLabel': "إنستغرام",
      'contact.hoursLabel': "أوقات العمل",
      'contact.hoursValue': "الإثنين - السبت: 09:00 - 20:00",
      'contact.mapBtn': "الخرائط Google Maps",
      'contact.whatsappBtn': "واتساب مباشر",
      'contact.instagramBtn': "إنستغرام",
      'footer.text': "© <span id=\"year\"></span> LOPA — جميع الحقوق محفوظة"
    }
  };

  function applyLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;

    root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    root.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.innerHTML = dict[key];
      }
    });

    langButtons.forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  const savedLang = localStorage.getItem(STORAGE_KEY) || 'fr';
  applyLanguage(savedLang);

  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      applyLanguage(lang);
      localStorage.setItem(STORAGE_KEY, lang);
    });
  });
})();

/* 3. MOBILE NAV */
(function mobileNavModule() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
})();

/* 4. FOOTER YEAR */
const footerYearEl = document.getElementById('year');
if (footerYearEl) {
  footerYearEl.textContent = new Date().getFullYear();
}
