// scripts.js

function detectLocation() {
    // Add JavaScript code to detect the current location of the user
    alert("Detecting your current location...");
}

function search() {
    var searchTerm= document.getElementById("searchBox").value.toLowerCase();
    var items= ["madhapur", "gachibowli", "jubilee hills", "uppal","LB nagar","ameerpet","punjagutta","kukatpally","Miyapur","begumpet"];
    //var selectedCity = cities.find(city => city.toLowerCase() === searchQuery);
    const resultList = document.getElementById("resultList");
   // Clear previous search results
   resultList.innerHTML = '';
    if(searchTerm!="")
    {
        // Filter items based on search term
   const filteredItems = items.filter(item => item.toLowerCase().includes(searchTerm));
//    console.log(filteredItems);
  // Display the filtered items
  filteredItems.forEach(item => {

      const listItem = document.createElement("li");
      listItem.textContent = item;
      resultList.appendChild(listItem);
  }); 
}
}

function submitCity(selectedCity) {
    document.getElementById('selectedCityInput').value = selectedCity;
    document.getElementById('sportsComplexForm').submit();
}
// Event listener for the search input
        document.getElementById("searchBox").addEventListener("input", search);
        


       