function toggleDropdown(id) {
  var dropdown = document.getElementById(id);
  var allDropdowns = document.querySelectorAll('.dropdown-content');
  
  // Hide all other dropdowns
  allDropdowns.forEach(function(d) {
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
  allDropdowns.forEach(function(d) {
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
    
    items.forEach(function(item) {
        var text = item.textContent || item.innerText;
        if (text.toLowerCase().indexOf(filter) > -1) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });
}

  document.addEventListener('DOMContentLoaded', function() {
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
    
        // Back to Top Button
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) { // Show the button if scrolled down more than 200px
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
    
            // Adjust header size based on scroll position
            const header = document.getElementById('header');
            if (window.scrollY > 150) { // Adjust the threshold as needed
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        });
    
        // Smooth scroll to the top when the button is clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    
        // Initialize menu button functionality
        const menuButton = document.querySelector('.menu-button');
        const navLinks = document.querySelector('.nav-links');
        
        if (menuButton && navLinks) {
            menuButton.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });
        }
      }


    //  carousel
    const carouselInner = document.querySelector('.carousel-inner');
    const dots = document.querySelectorAll('.dot');
    const items = document.querySelectorAll('.carousel-item');
    let index = 0;
    const slideInterval = 4000; // Slide every 3 seconds

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


  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var form = event.target;
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://formspree.io/f/mvgpywge'); // Correct Formspree form ID
    xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          form.reset(); // Reset the form fields
          document.getElementById('form-response').style.display = 'block'; // Show the success message
        } else {
          alert('Gagal mengirim pesan. Silakan coba lagi.');
        }
      }
    };

    xhr.send(formData); // Send the form data via AJAX
  });
  
