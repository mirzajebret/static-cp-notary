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
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    const navBackdrop = document.getElementById('nav-backdrop');
    const siteHeader = document.querySelector('.site-header') || document.getElementById('header');

    function closeMobileMenu() {
      if (menuButton) {
        menuButton.classList.remove('active', 'open');
        menuButton.setAttribute('aria-expanded', 'false');
      }
      if (navLinks) {
        navLinks.classList.remove('active');
      }
      if (navBackdrop) {
        navBackdrop.classList.remove('active');
      }
      document.body.classList.remove('menu-open');
    }

    function toggleMobileMenu() {
      const isOpen = navLinks && navLinks.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        if (menuButton) {
          menuButton.classList.add('active', 'open');
          menuButton.setAttribute('aria-expanded', 'true');
        }
        if (navLinks) {
          navLinks.classList.add('active');
        }
        if (navBackdrop) {
          navBackdrop.classList.add('active');
        }
        document.body.classList.add('menu-open');
      }
    }

    // Toggle menu on button click
    if (menuButton && navLinks) {
      menuButton.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMobileMenu();
      });
    }

    // Close menu when backdrop is tapped
    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && (!menuButton || !menuButton.contains(e.target))) {
          closeMobileMenu();
        }
      }
    });

    // Close menu when any nav link is clicked
    if (navLinks) {
      const allLinks = navLinks.querySelectorAll('a');
      allLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });
    }

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    });

    // Reset mobile menu state on desktop resize
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 992) {
        closeMobileMenu();
      }
    });

    // Highlight active link based on current page URL
    const rawPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentPath = rawPath.toLowerCase();
    const navItems = document.querySelectorAll('.nav-links .nav-link, .nav-links a');
    navItems.forEach(link => {
      const href = (link.getAttribute('href') || '').toLowerCase();
      if (href && (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'index.html' && href === 'index.html'))) {
        link.classList.add('active');
      }
    });

    // Add scroll elevation shadow to header
    function handleScroll() {
      if (siteHeader) {
        if (window.scrollY > 15) {
          siteHeader.classList.add('is-scrolled');
        } else {
          siteHeader.classList.remove('is-scrolled');
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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



