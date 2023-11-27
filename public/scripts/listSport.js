/* ==================================================
        SPORTS AND AMENITIES CHECKBOXES
====================================================*/
// document.addEventListener("DOMContentLoaded", function () {
    const sportsContainer = document.getElementById("sportsContainer");
    const amenitiesContainer = document.getElementById("amenitiesContainer");
  
    // Function to add checkboxes dynamically
    function addCheckboxes(container, items) {
      items.forEach(item => {
        const checkboxDiv = document.createElement("div");
        checkboxDiv.classList.add("form-check");
  
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input");
        checkbox.id = item.toLowerCase();
        checkbox.name = container.id === "sportsContainer" ? "sports" : "amenities";
        checkbox.value = item;
  
        const label = document.createElement("label");
        label.classList.add("form-check-label");
        label.htmlFor = item.toLowerCase();
        label.textContent = item;
  
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        container.appendChild(checkboxDiv);
      });
    }
  
    // Initial sports and amenities
    const sports = ["Football", "Basketball", "Cricket", "Swimming", "Boxing", "Badminton", "Tennis"];
    const amenities = ["Pool", "Gym", "Parking", "No Smoking", "Clean", "Canteen", "Equipment"];
  
    // Add initial checkboxes
    addCheckboxes(sportsContainer, sports);
    addCheckboxes(amenitiesContainer, amenities);
// });

/* ==================================================
        COURT AND PRICE INPUT FIELDS
====================================================*/
$(document).ready(function () {
    let courtCount = 2;

    // Dynamically add and remove courts
    $("#addCourt").click(function () {
        $("#courtsContainer").append(`<div class="row mb-2" id="court${courtCount}">
            <div class="col-md-12">
                <input type="text" class="form-control" name="courts" placeholder="Court ${courtCount}" required>
            </div>
        </div>`);

        // Dynamically add corresponding price input for the new court
        $("#priceContainer").append(`<div class="row mb-2" id="priceCourtContainer${courtCount}">
            <div class="col-md-6">
                <input type="text" class="form-control" id="priceCourt${courtCount}" name="prices" required>
            </div>
            <div class="col-md-6">
                <button type="button" class="btn btn-danger" onclick="removeCourt(${courtCount})">Remove</button>
            </div>
        </div>`);
        courtCount++;
    });
});

// Function to remove a court dynamically
function removeCourt(courtNumber) {
    $(`#court${courtNumber}`).remove();

    // Dynamically remove corresponding price input for the removed court
    $(`#priceCourtContainer${courtNumber}`).remove();
}


/* ==================================================
                UPLOAD IMAGES
====================================================*/


