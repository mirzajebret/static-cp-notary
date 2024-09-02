document.addEventListener('DOMContentLoaded', function() {
  // Load header and footer
  Promise.all([
      fetch('header.html').then(response => response.text()),
      fetch('footer.html').then(response => response.text())
  ]).then(([headerData, footerData]) => {
      document.getElementById('header').innerHTML = headerData;
      document.getElementById('footer').innerHTML = footerData;
  }).catch(error => console.error('Error loading header or footer:', error));

  // Back to Top Button
  const backToTopButton = document.getElementById('back-to-top');
  
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
});
