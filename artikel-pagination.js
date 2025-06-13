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
    <div class="bg-white rounded-2xl shadow-md p-6 mb-6 flex flex-col md:flex-row gap-6 items-center">
      <img src="${article.image || 'https://placehold.co/350x200'}" alt="${article.title}" class="rounded-lg w-full md:w-1/3 object-cover" style="max-height:210px">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <span class="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-xs font-semibold">Featured</span>
          <span class="text-gray-400 text-xs">${article.date}</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-2 text-left">${article.title}</h2>
        <p class="text-gray-600 mb-4">${article.excerpt || getExcerpt(article.title, 120)}</p>
        <a href="${article.link}" class="inline-block bg-blue-900 text-white px-4 py-2 rounded font-medium">Baca Selengkapnya</a>
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
    <div class="bg-white rounded-2xl shadow-md p-4 flex flex-col h-full">
      <img src="${a.image || 'https://placehold.co/350x200'}" alt="${a.title}" class="rounded-lg mb-3 w-full object-cover" style="max-height:140px">
      <div class="flex items-center gap-2 mb-2">
        <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">${a.category || 'Artikel'}</span>
        <span class="text-gray-400 text-xs">${a.date}</span>
      </div>
      <h3 class="text-lg font-semibold text-gray-800 mb-1">${a.title}</h3>
      <p class="text-gray-600 text-sm flex-1">${a.excerpt || getExcerpt(a.title, 80)}</p>
      <a href="${a.link}" class="mt-3 text-blue-900 font-semibold hover:underline">Baca Selengkapnya &rarr;</a>
    </div>
  `).join('');
}

function renderPagination() {
  const pageCount = Math.ceil((articles.length - 1) / articlesPerPage);
  let paginationHTML = '';

  paginationHTML += `<button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} class="px-3 py-1 border rounded-s-lg">Previous</button>`;
  for (let i = 1; i <= pageCount; i++) {
    paginationHTML += `<button onclick="goToPage(${i})" class="px-3 py-1 border ${i === currentPage ? 'bg-blue-900 text-white' : ''}">${i}</button>`;
  }
  paginationHTML += `<button onclick="goToPage(${currentPage + 1})" ${currentPage === pageCount ? 'disabled' : ''} class="px-3 py-1 border rounded-e-lg">Next</button>`;

  document.getElementById("pagination").innerHTML = paginationHTML;
}

window.goToPage = function(page) {
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
