// document.addEventListener("DOMContentLoaded", function() {
//   // Simulate fetching visitor count from a server or local storage
//   // Here, we'll just increment a number each time the page is reloaded
//   let visitorCount = localStorage.getItem('visitorCount');
//   visitorCount = visitorCount ? parseInt(visitorCount) + 1 : 1;
//   localStorage.setItem('visitorCount', visitorCount);

//   // Update the visitor count on the webpage
//   document.getElementById('visitor-count').textContent = visitorCount + 'th';
// });


document.addEventListener("DOMContentLoaded", function() {
  // URL for the POST and GET requests
  const postUrl = 'https://msdocs-serverless-function-178982298.azurewebsites.net/api/dbocountvisitorsInsert?code=' + process.env.INSERT_CODE;
  const getUrl = 'https://msdocs-serverless-function-178982298.azurewebsites.net/api/dbocountvisitors?code=' + process.env.GET_CODE;

  // Function to make a POST request to increment visitor count
  function incrementVisitorCount() {
    fetch(postUrl, {
      method: 'POST'
    })
    .then(response => {
      if (response.ok) {
        console.log("Visitor count incremented successfully.");
        fetchVisitorCount(); // Call the GET request after successful POST
      } else {
        throw new Error('Failed to increment visitor count');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  // Function to make a GET request to fetch the visitor count
  function fetchVisitorCount() {
    fetch(getUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        // Assuming the response is an array with at least one object
        const visitorCount = data[0].Column1;
        // Update the visitor count on the webpage
        document.getElementById('visitor-count').textContent = visitorCount + 'th';
      } else {
        throw new Error('Received unexpected data format');
      }
    })
    .catch(error => {
      console.error('Error fetching visitor count:', error);
    });
  }

  // Start the process by incrementing the visitor count
  incrementVisitorCount();
  // Update the visitor count on the webpage
  document.getElementById('visitor-count').textContent = visitorCount + 'th';
});
