// Search bar functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchBar = document.querySelector('.search-bar');
    
    if (!searchInput) return;
    
    // Add active class when focused
    searchInput.addEventListener('focus', function() {
        this.classList.add('active');
    });
    
    // Remove active class when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchBar.contains(event.target) && !searchInput.contains(event.target)) {
            searchInput.classList.remove('active');
            searchInput.blur(); // Remove focus
        }
    });
    
    // Prevent closing when clicking inside the search bar
    searchBar.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});
