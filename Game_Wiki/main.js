// main.js - Punto de entrada

async function init() {
  navigateTo('home');
  popularGames = await fetchPopularGames();
  renderSlide(0);

  // Autoplay slideshow cada 5s
  setInterval(() => {
    renderSlide(currentSlideIndex + 1);
  }, 5000);
}

init();
