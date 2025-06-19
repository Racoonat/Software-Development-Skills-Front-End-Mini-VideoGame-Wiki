// events.js - listeners y control de eventos globales

const logo = document.getElementById('logo');
const faqBtn = document.getElementById('faqBtn');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
let currentView = localStorage.getItem('viewMode') || 'grid';

//click on logo to navigate to home
logo.addEventListener('click', (e) => {
  e.preventDefault();
  navigateTo('home');
});

//click on FAQ button to navigate to FAQ section
faqBtn.addEventListener('click', () => {
  navigateTo('faq');
});

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
  const faqContainer = document.querySelector('.faq-content');
  faqContainer.addEventListener('click', (e) => {
    const groupHeader = e.target.closest('.faq-group-header');


    if(!groupHeader) return;

    const group = groupHeader.parentElement;
    const groupBody = group.querySelector('.faq-group-body');
    const icon = groupHeader.querySelector('i');

    //Toggle icon
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');

    //Toggle body visibility
    groupBody.classList.toggle('open');
  });
});

//This function handles the search form submission
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (!query) return;
  navigateTo('results');
  const games = await fetchGamesBySearch(query);
  renderResults(games, query, currentView, showGameDetails);
});

// This function handles the change of view between grid and list
window.addEventListener('changeView', async (e) => {
  currentView = e.detail;
  localStorage.setItem('viewMode', currentView);

  // If we are in the results section, we need to re-render the results
  if (resultsSection.style.display === 'block') {
    const header = resultsSection.querySelector('h3');
    if (header) {
      const query = header.textContent.match(/"(.*)"/)?.[1];
      if (query) {
        const games = await fetchGamesBySearch(query);
        renderResults(games, query, currentView, showGameDetails);
      }
    }
  }
});


