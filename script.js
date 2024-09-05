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
  });
  
