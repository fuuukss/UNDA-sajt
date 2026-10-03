(() => {
  const elements = document.querySelectorAll('[data-sr][data-en]');
  const buttons = document.querySelectorAll('[data-language]');

  function changeLanguage(language) {
    const selectedLanguage = language === 'en' ? 'en' : 'sr';
    document.documentElement.lang = selectedLanguage;
    elements.forEach((element) => { element.textContent = element.dataset[selectedLanguage]; });
    buttons.forEach((button) => { button.setAttribute('aria-pressed', String(button.dataset.language === selectedLanguage)); });
    document.title = document.body.dataset[selectedLanguage === 'sr' ? 'titleSr' : 'titleEn'];
  }

  buttons.forEach((button) => { button.addEventListener('click', () => changeLanguage(button.dataset.language)); });
})();
