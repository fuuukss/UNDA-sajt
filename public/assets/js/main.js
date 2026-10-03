(() => {
  const elements = document.querySelectorAll('[data-sr][data-en]');
  const labelledElements = document.querySelectorAll('[data-aria-sr][data-aria-en]');
  const languageToggle = document.querySelector('[data-language-toggle]');
  const projectTitles = document.querySelectorAll('.project-reference-content h2');
  const referenceTrack = document.querySelector('[data-reference-track]');

  projectTitles.forEach((title) => {
    title.dataset.englishTitle = title.dataset.en || title.textContent.trim();
  });

  function changeLanguage(language) {
    const selectedLanguage = language === 'en' ? 'en' : 'sr';
    document.documentElement.lang = selectedLanguage;
    elements.forEach((element) => { element.textContent = element.dataset[selectedLanguage]; });
    labelledElements.forEach((element) => { element.setAttribute('aria-label', element.dataset[selectedLanguage === 'sr' ? 'ariaSr' : 'ariaEn']); });
    projectTitles.forEach((title) => {
      const englishTitle = title.dataset.englishTitle;
      title.textContent = selectedLanguage === 'sr'
        ? englishTitle.replaceAll('Port Belgrade', 'Luka Beograd').replaceAll('Belgrade', 'Beograd').replaceAll('Serbia', 'Srbija')
        : englishTitle;
    });
    document.title = document.body.dataset[selectedLanguage === 'sr' ? 'titleSr' : 'titleEn'];

    if (languageToggle) {
      const targetLanguage = selectedLanguage === 'sr' ? 'en' : 'sr';
      languageToggle.dataset.targetLanguage = targetLanguage;
      languageToggle.querySelector('.language-flag').src = targetLanguage === 'en' ? 'assets/images/flags/gb.png' : 'assets/images/flags/rs.png';
      languageToggle.querySelector('.language-code').textContent = targetLanguage.toUpperCase();
      languageToggle.setAttribute('aria-label', selectedLanguage === 'sr' ? 'Prebaci na engleski' : 'Switch to Serbian');
    }
  }

  languageToggle?.addEventListener('click', () => changeLanguage(languageToggle.dataset.targetLanguage));
  document.querySelectorAll('[data-carousel-direction]').forEach((button) => {
    button.addEventListener('click', () => {
      if (!referenceTrack) return;
      const card = referenceTrack.querySelector('.reference-card');
      const gap = Number.parseFloat(getComputedStyle(referenceTrack).gap) || 0;
      const step = card ? card.getBoundingClientRect().width + gap : referenceTrack.clientWidth * .8;
      const isNext = button.dataset.carouselDirection === 'next';
      const atStart = referenceTrack.scrollLeft <= 4;
      const atEnd = referenceTrack.scrollLeft + referenceTrack.clientWidth >= referenceTrack.scrollWidth - 4;
      const left = isNext
        ? (atEnd ? 0 : referenceTrack.scrollLeft + step)
        : (atStart ? referenceTrack.scrollWidth : referenceTrack.scrollLeft - step);
      referenceTrack.scrollTo({ left, behavior: 'smooth' });
    });
  });
  changeLanguage(document.documentElement.lang);
})();
