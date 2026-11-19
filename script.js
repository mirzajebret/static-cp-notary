function toggleDropdown(id) {
  var dropdown = document.getElementById(id);
  var allDropdowns = document.querySelectorAll('.dropdown-content');

  // Hide all other dropdowns
  allDropdowns.forEach(function (d) {
    if (d !== dropdown) {
      d.classList.remove('show');
    }
  });

  // Toggle the clicked dropdown
  dropdown.classList.toggle('show');
}

// Function to handle clicks outside of dropdowns
function handleClickOutside(event) {
  var allDropdowns = document.querySelectorAll('.dropdown-content');
  allDropdowns.forEach(function (d) {
    if (!d.contains(event.target) && !document.querySelector(`.item[data-dropdown="${d.id}"]`).contains(event.target)) {
      d.classList.remove('show');
    }
  });
}

// Attach event listener to document
document.addEventListener('click', handleClickOutside);

// Function to search services
function searchServices() {
  var input = document.getElementById('searchInput');
  var filter = input.value.toLowerCase();
  var items = document.querySelectorAll('.tabel-layanan .item');

  items.forEach(function (item) {
    var text = item.textContent || item.innerText;
    if (text.toLowerCase().indexOf(filter) > -1) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Load header and footer
  Promise.all([
    fetch('header.html').then(response => response.text()),
    fetch('footer.html').then(response => response.text())
  ]).then(([headerData, footerData]) => {
    document.getElementById('header').innerHTML = headerData;
    document.getElementById('footer').innerHTML = footerData;

    // Initialize after header content is loaded
    initializeNavigation();
  }).catch(error => console.error('Error loading header or footer:', error));

  function initializeNavigation() {
    const backToTopButton = document.getElementById('back-to-top');



    // Initialize menu button functionality
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');

    if (menuButton && navLinks) {
      menuButton.addEventListener('click', function () {
        navLinks.classList.toggle('active');
      });
    }
  }


  //  carousel
  const carouselInner = document.querySelector('.carousel-inner');
  const dots = document.querySelectorAll('.dot');
  const items = document.querySelectorAll('.carousel-item');
  let index = 0;
  const slideInterval = 1700; // Slide every 3 seconds

  function updateCarousel() {
    const offset = -index * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    index = (index < items.length - 1) ? index + 1 : 0;
    updateCarousel();
  }

  function setSlide(newIndex) {
    index = newIndex;
    updateCarousel();
  }

  // Auto-slide every `slideInterval` milliseconds
  setInterval(nextSlide, slideInterval);

  // Set up dot click events
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      setSlide(i);
    });
  });

  updateCarousel(); // Initialize carousel position and dots 
});


// Contact form handling with anti-spam timestamp & loading state
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  const tsField = document.getElementById("ts");
  if (tsField) {
    tsField.value = Date.now().toString();
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Kirim Pesan';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i> Mengirim...';
    }

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
    })
      .then(response => {
        // Try parsing JSON or treat successful HTTP status as OK
        if (response.ok) {
          return response.text();
        }
        throw new Error("Respon server bermasalah");
      })
      .then(() => {
        alert("Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.");
        form.reset();
        if (tsField) tsField.value = Date.now().toString();
      })
      .catch(error => {
        console.error(error);
        alert("Terima kasih, pesan Anda telah kami terima.");
        form.reset();
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      });
  });
}



