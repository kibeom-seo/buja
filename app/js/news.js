/**
 * news.js - Global Economic News Filter & Editorial Feed Engine
 */
function filterNewsCategory(cat) {
  // 1. Update Buttons
  const buttons = document.querySelectorAll('.news-filter-btn');
  buttons.forEach(b => {
    b.className = 'news-filter-btn px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition';
  });

  if (window.event && window.event.target) {
    window.event.target.className = 'news-filter-btn active px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-black transition';
  }

  // 2. Filter News Cards
  const cards = document.querySelectorAll('.news-card-item');
  cards.forEach(card => {
    if (cat === 'all' || card.classList.contains(cat)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}
