(() => {
  const elements = document.querySelectorAll('[data-sr][data-en]');
  const labelledElements = document.querySelectorAll('[data-aria-sr][data-aria-en]');
  const languageToggle = document.querySelector('[data-language-toggle]');
  const languageMenu = document.querySelector('[data-language-menu]');
  const languageOptions = document.querySelectorAll('[data-language-option]');
  const projectTitles = document.querySelectorAll('.project-reference-content h2');
  const referenceTrack = document.querySelector('[data-reference-track]');

  projectTitles.forEach((title) => {
    title.dataset.englishTitle = title.dataset.en || title.textContent.trim();
  });

  function updateInternalLinks(language) {
    document.querySelectorAll('a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || /^(mailto:|tel:|https?:\/\/)/i.test(href)) return;
      const url = new URL(href, window.location.href);
      if (url.origin !== window.location.origin) return;
      url.searchParams.set('lang', language);
      link.setAttribute('href', `${url.pathname}${url.search}${url.hash}`);
    });
  }

  function changeLanguage(language) {
    const selectedLanguage = language === 'en' ? 'en' : 'sr';
    try { window.localStorage.setItem('unda-language', selectedLanguage); } catch (_) {}
    document.documentElement.lang = selectedLanguage;
    elements.forEach((element) => { element.textContent = element.dataset[selectedLanguage]; });
    labelledElements.forEach((element) => { element.setAttribute('aria-label', element.dataset[selectedLanguage === 'sr' ? 'ariaSr' : 'ariaEn']); });
    projectTitles.forEach((title) => {
      const englishTitle = title.dataset.englishTitle;
      title.textContent = selectedLanguage === 'sr'
        ? englishTitle.replaceAll('Port Belgrade', 'Luka Beograd').replaceAll('Belgrade', 'Beograd').replaceAll('Serbia', 'Srbija')
        : englishTitle;
      const projectImage = title.closest('.project-reference-card')?.querySelector('img');
      if (projectImage) projectImage.alt = title.textContent;
    });
    const languageKey = selectedLanguage === 'sr' ? 'Sr' : 'En';
    const pageTitle = document.body.dataset[`title${languageKey}`];
    const pageDescription = document.body.dataset[`description${languageKey}`];
    const socialDescription = document.body.dataset[`socialDescription${languageKey}`];
    document.title = pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', pageDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', socialDescription);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', selectedLanguage === 'sr' ? 'sr_RS' : 'en_US');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', pageTitle);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', socialDescription);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const canonicalUrl = new URL(canonical.href);
      if (selectedLanguage === 'en') canonicalUrl.searchParams.set('lang', 'en');
      else canonicalUrl.searchParams.delete('lang');
      canonical.href = canonicalUrl.toString();
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl.toString());
    }
    updateInternalLinks(selectedLanguage);

    const pageUrl = new URL(window.location.href);
    pageUrl.searchParams.set('lang', selectedLanguage);
    window.history.replaceState(null, '', `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`);

    if (languageToggle) {
      languageToggle.querySelector('.language-flag').src = selectedLanguage === 'en' ? 'assets/images/flags/gb.png' : 'assets/images/flags/rs.png';
      languageToggle.querySelector('.language-code').textContent = selectedLanguage.toUpperCase();
      languageToggle.setAttribute('aria-label', selectedLanguage === 'sr' ? 'Izaberi jezik. Trenutno srpski' : 'Choose language. Currently English');
      languageOptions.forEach((option) => option.setAttribute('aria-current', String(option.dataset.languageOption === selectedLanguage)));
    }
  }

  function closeLanguageMenu() {
    if (!languageToggle || !languageMenu) return;
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }

  languageToggle?.addEventListener('click', () => {
    if (!languageMenu) return;
    const willOpen = languageMenu.hidden;
    languageMenu.hidden = !willOpen;
    languageToggle.setAttribute('aria-expanded', String(willOpen));
  });
  languageOptions.forEach((option) => {
    option.addEventListener('click', () => {
      changeLanguage(option.dataset.languageOption);
      closeLanguageMenu();
    });
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.language-switch')) closeLanguageMenu();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLanguageMenu();
      languageToggle?.focus();
    }
  });
  document.querySelectorAll('[data-carousel-direction]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!referenceTrack) return;
      const card = referenceTrack.querySelector('.reference-card');
      const gap = Number.parseFloat(getComputedStyle(referenceTrack).gap) || 0;
      const step = card ? card.getBoundingClientRect().width + gap : referenceTrack.clientWidth * .8;
      const isNext = button.dataset.carouselDirection === 'next';
      const startOffset = card ? card.offsetLeft - referenceTrack.offsetLeft : 0;
      const atStart = referenceTrack.scrollLeft <= startOffset + 4;
      const atEnd = referenceTrack.scrollLeft + referenceTrack.clientWidth >= referenceTrack.scrollWidth - 4;
      const left = isNext
        ? (atEnd ? 0 : referenceTrack.scrollLeft + step)
        : (atStart ? referenceTrack.scrollWidth : referenceTrack.scrollLeft - step);
      referenceTrack.scrollTo({ left, behavior: 'smooth' });
    });
  });
  let savedLanguage = document.documentElement.lang;
  try { savedLanguage = window.localStorage.getItem('unda-language') || savedLanguage; } catch (_) {}
  const urlLanguage = new URLSearchParams(window.location.search).get('lang');
  if (urlLanguage === 'sr' || urlLanguage === 'en') savedLanguage = urlLanguage;
  changeLanguage(savedLanguage);
})();
