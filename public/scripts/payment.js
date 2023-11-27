
    function toggleDropdown(dropdownId) {
        const dropdownContent = document.querySelector(`.${dropdownId}`);
        dropdownContent.classList.toggle('show');
    }
    
    let duration = 1;

    function decreaseDuration() {
        if (duration > 0.5) {
            duration -= 0.5;
            updateDuration();
        }
    }

    function increaseDuration() {
        duration += 0.5;
        updateDuration();
    }

    function updateDuration() {
        document.getElementById('duration').innerText = duration + ' Hr';
    }

    function addToCart() {
        const selectedSport = document.getElementById('sportsDropdown').innerText;
        const selectedDate = document.getElementById('dateInput').value;
        const selectedTime = document.getElementById('timeDropdown').innerText;
        const selectedDuration = duration;
        const selectedCourt = document.getElementById('courtDropdown').innerText;

        // Implement logic to add the booking details to the cart or perform further actions
        console.log("Sport:", selectedSport);
        console.log("Date:", selectedDate);
        console.log("Time:", selectedTime);
        console.log("Duration:", selectedDuration);
        console.log("Court:", selectedCourt);
    }