// Definimos las rutas válidas y los elementos de sección correspondientes
const routes = ['home', 'results', 'faq', 'details'];

const sections = {
  home: document.getElementById('slideshow-section'),
  results: document.getElementById('results-section'),
  faq: document.getElementById('faq'),
  details: document.getElementById('details-section')
};

// Función para obtener la ruta actual desde el hash
function getCurrentRoute() {
  const hash = window.location.hash.slice(1); // quitamos el '#'
  if (routes.includes(hash)) {
    return hash;
  } else {
    return 'home'; // ruta por defecto
  }
}

// Función para mostrar solo la sección que corresponde a la ruta
function navigateTo(route) {
  for (let key in sections) {
    if (key === route) {
      sections[key].style.display = 'block';
    } else {
      sections[key].style.display = 'none';
    }
  }
  
  // Cambiamos el hash si es distinto para que quede en la URL
  if (window.location.hash.slice(1) !== route) {
    window.location.hash = route;
  }
}

// Cuando cambia el hash, navegamos a la sección correspondiente
window.addEventListener('hashchange', function() {
  navigateTo(getCurrentRoute());
});

// Cuando carga la página, mostramos la sección correspondiente
window.addEventListener('DOMContentLoaded', function() {
  navigateTo(getCurrentRoute());
});

// Exponemos la función para que la puedas usar desde otros archivos
window.navigateTo = navigateTo;
