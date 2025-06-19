
const slideshowSection = document.getElementById('slideshow-section');
const resultsSection = document.getElementById('results-section');
const faqSection = document.getElementById('faq-section');

// ---slider---
const slider = document.createElement('div');
slider.id = 'slider';
slider.className = 'slider-container';
slideshowSection.appendChild(slider);
//---------------------

let currentSlideIndex = 0;
let popularGames = [];



// --- SLIDESHOW ---
function renderSlide(index) {
  if (!popularGames.length) {
    slider.innerHTML = '<p>Could not found popular games to show</p>';
    return;
  }
  currentSlideIndex = ((index % popularGames.length) + popularGames.length) % popularGames.length;

  slider.innerHTML = '';

  const game = popularGames[currentSlideIndex];

  const slide = document.createElement('div');
  slide.className = 'slide';
  slide.innerHTML = `
    <img src="${game.background_image}" alt="${game.name}" />
    <h3>${game.name}</h3>
  `;
  slide.addEventListener('click', () => showGameDetails(game.id));
  
  // Buttons nav slideshow
  const prevBtn = document.createElement('button');
  prevBtn.textContent = '⬅';
  prevBtn.className = 'slider-nav left';
  prevBtn.onclick = () => renderSlide(currentSlideIndex - 1);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = '➡';
  nextBtn.className = 'slider-nav right';
  nextBtn.onclick = () => renderSlide(currentSlideIndex + 1);

  slider.appendChild(prevBtn);
  slider.appendChild(slide);
  slider.appendChild(nextBtn);
}

// Render resultados búsqueda
function renderResults(games, query, currentView, onGameClick) {
  resultsSection.innerHTML = '';

  // Header con título y botones vista
  const header = document.createElement('div');
  header.className = 'results-header';

  const title = document.createElement('h3');
  title.textContent = `Showing Results for:  "${query}"`;

  const viewButtons = document.createElement('div');
  viewButtons.className = 'view-buttons';

  const gridBtn = document.createElement('button');
  gridBtn.textContent = 'Grid';
  gridBtn.className = currentView === 'grid' ? 'active' : '';
  gridBtn.onclick = () => {
    dispatchEvent(new CustomEvent('changeView', { detail: 'grid' }));
  };

  const listBtn = document.createElement('button');
  listBtn.textContent = 'List';
  listBtn.className = currentView === 'list' ? 'active' : '';
  listBtn.onclick = () => {
    dispatchEvent(new CustomEvent('changeView', { detail: 'list' }));
  };

  viewButtons.appendChild(gridBtn);
  viewButtons.appendChild(listBtn);

  header.appendChild(title);
  header.appendChild(viewButtons);

  resultsSection.appendChild(header);

  // Contenedor juegos
  const container = document.createElement('div');
  container.className = currentView === 'grid' ? 'game-grid' : 'game-list';

  if (games.length === 0) {
    container.textContent = 'Not found any games matching your search';
  } else {
    games.forEach(game => {
      const card = createGameCard(game, onGameClick);
      container.appendChild(card);
    });
  }
  
  resultsSection.appendChild(container);
}

function createGameCard(game, clickHandler) {
  const card = document.createElement('article');
  card.className = 'game-card';
  card.innerHTML = `
    <img src="${game.background_image}" alt="${game.name}" />
    <h3>${game.name}</h3>
  `;
  card.addEventListener('click', () => clickHandler(game.id));
  return card;
}

// Render detalles juego
function renderGameDetails(game) {
  const detailsSection = document.getElementById('details-section');
  detailsSection.innerHTML = `
    <div class="game-details">
      <h3>${game.name}</h3>
      <img src="${game.background_image}" alt="${game.name}" class="game-details__image" />
      <div class="game-details__info">
        <p><strong>Descripción:</strong></p>
        <p>${game.description_raw || 'Not available'}</p>
        <p><strong>Géneros:</strong> ${game.genres.map(g => g.name).join(', ') || 'Unknown '}</p>
        <p><strong>Plataformas:</strong> ${game.platforms.map(p => p.platform.name).join(', ') || 'Unknown'}</p>
        <p><strong>Fecha de lanzamiento:</strong> ${game.released || 'Unknown'}</p>
      </div>
    </div>
  `;
}


async function showGameDetails(id) {
  try {
    const game = await fetchGameDetails(id);
    navigateTo('details');
    renderGameDetails(game);
  } catch (error) {
    console.error('Error loading game data:', error);
  }
}



window.showGameDetails = showGameDetails;


