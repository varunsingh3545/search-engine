const searchInput = document.getElementById("search-input");
const searchWrapper = document.getElementById("search-wrapper");

searchInput.addEventListener("click", () => {
  searchWrapper.classList.add("expanded");
});

document.addEventListener("click", (e) => {
  if (!searchWrapper.contains(e.target)) {
    searchWrapper.classList.remove("expanded");
  }
});