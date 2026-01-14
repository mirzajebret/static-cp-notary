let articles = [];
const articlesPerPage = 6;
let currentPage = 1;

function getExcerpt(text, len = 100) {
  if (!text) return '';
  return text.length > len ? text.substring(0, len) + '...' : text;
}

function renderFeatured(article) {
  const container = document.getElementById('featured-article');
  container.innerHTML = `
    <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8 hover:shadow-xl transition-all duration-300">
      <div class="flex flex-col md:flex-row">
        <div class="md:w-2/5">
          <img src="${article.image || 'https://placehold.co/400x250'}" alt="${article.title}" class="w-full h-64 md:h-full object-cover">
        </div>
        <div class="md:w-3/5 p-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-md">Featured</span>
            <span class="text-gray-500 text-sm flex items-center gap-1">
              <i class="fa fa-calendar"></i>
              ${article.date}
            </span>
          </div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4 leading-tight hover:text-blue-900 transition-colors">${article.title}</h2>
          <p class="text-gray-600 mb-6 text-lg leading-relaxed">${article.excerpt || getExcerpt(article.title, 150)}</p>
          <a href="${article.link}" class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-800 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <span>Baca Selengkapnya</span>
            <i class="fa fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  `;
}

function renderArticles() {
  // Setelah featured (artikel[0]), render sisanya untuk grid
  const start = 1 + (currentPage - 1) * articlesPerPage;
  const end = start + articlesPerPage;
  const pageArticles = articles.slice(start, end);

  const grid = document.getElementById("artikel-list");
  grid.innerHTML = pageArticles.map(a => `
    <div class="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div class="relative overflow-hidden h-48">
        <img src="${a.image || 'https://placehold.co/350x200'}" alt="${a.title}" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110">
      </div>
      <div class="p-5 flex flex-col flex-1">
        <div class="flex items-center gap-2 mb-3">
          <span class="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">${a.category || 'Artikel'}</span>
          <span class="text-gray-400 text-xs flex items-center gap-1">
            <i class="fa fa-calendar"></i>
            ${a.date}
          </span>
        </div>
        <h3 class="text-lg font-bold text-gray-800 mb-3 leading-snug hover:text-blue-900 transition-colors line-clamp-2">${a.title}</h3>
        <p class="text-gray-600 text-sm flex-1 mb-4 leading-relaxed">${a.excerpt || getExcerpt(a.title, 100)}</p>
        <a href="${a.link}" class="inline-flex items-center gap-2 text-blue-900 font-semibold hover:text-orange-600 transition-colors group">
          <span>Baca Selengkapnya</span>
          <i class="fa fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </div>
  `).join('');
}

function renderPagination() {
  const pageCount = Math.ceil((articles.length - 1) / articlesPerPage);
  let paginationHTML = '<div class="flex justify-center items-center gap-2">';

  // Previous button
  paginationHTML += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} 
    class="px-4 py-2 rounded-lg border-2 font-semibold transition-all ${currentPage === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'} flex items-center gap-2">
    <i class="fa fa-chevron-left"></i>
    <span class="hidden sm:inline">Previous</span>
  </button>`;

  // Page numbers
  for (let i = 1; i <= pageCount; i++) {
    const isActive = i === currentPage;
    paginationHTML += `<button onclick="goToPage(${i})" 
      class="w-10 h-10 rounded-lg font-bold transition-all ${isActive ? 'bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg' : 'border-2 border-gray-200 text-gray-700 hover:border-blue-900 hover:text-blue-900'}">${i}</button>`;
  }

  // Next button
  paginationHTML += `<button onclick="goToPage(${currentPage + 1})" ${currentPage === pageCount ? 'disabled' : ''} 
    class="px-4 py-2 rounded-lg border-2 font-semibold transition-all ${currentPage === pageCount ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white'} flex items-center gap-2">
    <span class="hidden sm:inline">Next</span>
    <i class="fa fa-chevron-right"></i>
  </button>`;

  paginationHTML += '</div>';

  document.getElementById("pagination").innerHTML = paginationHTML;
}

window.goToPage = function (page) {
  const pageCount = Math.ceil((articles.length - 1) / articlesPerPage);
  if (page < 1 || page > pageCount) return;
  currentPage = page;
  renderArticles();
  renderPagination();
};

document.addEventListener('DOMContentLoaded', function () {
  fetch('artikel.json')
    .then(response => response.json())
    .then(data => {
      articles = data;
      renderFeatured(articles[0]);
      renderArticles();
      renderPagination();
    })
    .catch(error => {
      console.error('Gagal load data artikel:', error);
    });
});
