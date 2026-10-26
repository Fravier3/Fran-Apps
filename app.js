'use strict';
const cards = [...document.querySelectorAll('.app-card')];
const search = document.querySelector('#search');
const filters = [...document.querySelectorAll('[data-filter]')];
const storageKey = 'fran-apps-favorites-v1';
let favorites = new Set();
try { const saved = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(saved)) favorites = new Set(saved.filter(id => typeof id === 'string')); } catch {}
let selected = 'Todas';
const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
function render() {
  const query = normalize(search.value.trim());
  let count = 0;
  cards.forEach(card => {
    const favored = favorites.has(card.dataset.id);
    const button = card.querySelector('.favorite');
    button.setAttribute('aria-pressed', String(favored));
    button.setAttribute('aria-label', `${favored ? 'Quitar' : 'Añadir'} ${button.dataset.name} ${favored ? 'de' : 'a'} favoritos`);
    button.textContent = favored ? '★' : '☆';
    card.hidden = !((selected === 'Todas' || (selected === 'Favoritos' ? favored : selected === card.dataset.category)) && normalize(card.dataset.search).includes(query));
    if (!card.hidden) count++;
  });
  document.querySelector('.count').textContent = count;
  document.querySelector('#result-status').textContent = `${count} ${count === 1 ? 'aplicación' : 'aplicaciones'}`;
  document.querySelector('#empty').hidden = count > 0;
  const noFavorites = selected === 'Favoritos' && favorites.size === 0;
  document.querySelector('#empty-title').textContent = noFavorites ? 'Tus favoritas, más cerca' : 'No encontramos esa app';
  document.querySelector('#empty-message').textContent = noFavorites ? 'Toca la estrella de una app para guardarla aquí.' : 'Prueba con otro nombre o categoría.';
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
}
search.addEventListener('input', render);
filters.forEach(button => button.addEventListener('click', () => { selected = button.dataset.filter; render(); }));
cards.forEach(card => {
  card.querySelector('.favorite').addEventListener('click', () => {
    const id = card.dataset.id;
    favorites.has(id) ? favorites.delete(id) : favorites.add(id);
    try { localStorage.setItem(storageKey, JSON.stringify([...favorites])); } catch { document.querySelector('#storage-status').textContent = 'El navegador no permite guardar favoritos. Se conservarán durante esta visita.'; }
    render();
  });
  const img = card.querySelector('img');
  if (img) { img.addEventListener('error', () => { img.hidden = true; }); if (img.complete && !img.naturalWidth) img.hidden = true; }
});
document.querySelector('#reset').addEventListener('click', () => { selected = 'Todas'; search.value = ''; render(); search.focus(); });
render();
if ('serviceWorker' in navigator) {
  let refreshing = false;
  const hadController = Boolean(navigator.serviceWorker.controller);
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (hadController && !refreshing) { refreshing = true; window.location.reload(); }
  });
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
      registration.update().catch(() => {});
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') registration.update().catch(() => {}); });
    } catch { /* The catalog remains usable without offline support. */ }
  });
}
