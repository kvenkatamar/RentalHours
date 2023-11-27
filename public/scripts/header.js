function toggleNavbar() {
    // Get the navbar collapse element
    var navbarCollapse = document.getElementById('navbarSupportedContent');

    // Remove the "collapse show" class
    navbarCollapse.classList.remove('collapse', 'show');

    // Add the "collapsing" class
    navbarCollapse.classList.add('collapsing');

    // Set the height to 214px (adjust the height as needed)
    navbarCollapse.style.height = '214px';

    document.addEventListener('click', function (event) {
        if (event.target.closest('.navbar-collapse')) {
            event.stopPropagation();
        }
    });
}