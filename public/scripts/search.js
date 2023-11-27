// scripts.js

function searchPlaces() {
    const locationInput = document.getElementById('locationInput');
    const resultsContainer = document.getElementById('results');
    const apiKey = '8d951bbead6339d67fdcd4d5a51e8ab8'; // Replace with your API key

    const location = locationInput.value;

    // Check if location is provided
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    // Make API request
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            resultsContainer.innerHTML = ''; // Clear previous results

            if (data.length === 0) {
                resultsContainer.innerHTML = 'No results found.';
            } else {
                data.forEach(place => {
                    resultsContainer.innerHTML += `<p>${place.name}, ${place.country}</p>`;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = 'An error occurred. Please try again later.';
        });
}
