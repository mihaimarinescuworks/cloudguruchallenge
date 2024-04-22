document.addEventListener("DOMContentLoaded", function() {
  // Simulate fetching visitor count from a server or local storage
  // Here, we'll just increment a number each time the page is reloaded
  let visitorCount = localStorage.getItem('visitorCount');
  visitorCount = visitorCount ? parseInt(visitorCount) + 1 : 1;
  localStorage.setItem('visitorCount', visitorCount);

  // Update the visitor count on the webpage
  document.getElementById('visitor-count').textContent = visitorCount + 'th';
});
