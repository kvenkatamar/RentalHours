let nextBtn = document.querySelector("#next");
let prevBtn = document.querySelector("#prev");
let slides = document.querySelectorAll(".slide");
let changeSlide = 0;

nextBtn.addEventListener("click", function() {
  
    slides.forEach(function (slide, index) {
    if (slide.classList.contains("show") === true) {
      changeSlide = index + 1;
      slide.classList.remove("show");
    }
    
  });

  if (changeSlide < slides.length) {
    slides[changeSlide].classList.add("show");
    }
  else {
      changeSlide = 0;
      slides[changeSlide].classList.add("show");
    }
});

prevBtn.addEventListener('click', function () {
   
    slides.forEach(function (slide, index) {
        if (slide.classList.contains("show") === true) {
            changeSlide = index - 1;
            slide.classList.remove("show");
        }
       
        
    });

    if (changeSlide < slides.length && changeSlide > -1) {
        slides[changeSlide].classList.add("show");
    }
    else {
        
        changeSlide = slides.length - 1;
        slides[changeSlide].classList.add("show");
    }
});

function openRatingPopup() {
    document.getElementById('ratingPopup').style.display = 'block';
}

function rateVenue(rating) {
    // Reset all stars to empty
    for (let i = 1; i <= 6; i++) {
        let starElement = document.querySelector('.stars:nth-child(' + i + ') i');
        if (starElement) {
            starElement.classList.remove('fas', 'filled');
            starElement.classList.add('far');
        }
    }

    // Fill the stars up to the selected rating
    for (let i = 1; i <= rating+1; i++) {
        let starElement = document.querySelector('.stars:nth-child(' + i + ') i');
        if (starElement) {
            starElement.classList.add('fas', 'filled');
            starElement.classList.remove('far');
        }
    }
}

function submitRating() {
    // Implement logic to submit the rating
    // For demonstration, alert the selected rating
    const selectedRating = document.querySelectorAll('.filled').length;
    alert('Rating submitted: ' + selectedRating);
    closePopup();
}

function closePopup() {
    // Close the rating popup
    document.getElementById('ratingPopup').style.display = 'none';
}

function bookNow() {
    // Implement book now logic here
}

function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        alert("Web Share API not supported in this browser.");
    }
}

function bulkCorporate() {
    // Implement bulk/corporate logic here
}
