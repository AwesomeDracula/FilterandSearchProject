// filter button
(function(){
	const buttons = document.querySelectorAll(".btn");
	const items = document.querySelectorAll(".category-item");

	buttons.forEach((button) => {
		button.addEventListener("click", (e) => {
			e.preventDefault();
			const filter = e.target.dataset.filter;

			items.forEach((item) => {
				if(filter === "all"){
					item.style.display = 'block';
				}
				else{
					item.classList.contains(filter) ? item.style.display = 'block' : item.style.display = 'none';
				}
			})
		})
	})
})();

// search box
(function(){
	const searchInput = document.querySelector("#search-item");
	const items = document.querySelectorAll(".category-item");
	searchInput.addEventListener("keyup", (e) => {
		const searchFilter = e.target.value.toLowerCase().trim();
		console.log(searchFilter);
		items.forEach((item) => {
			item.textContent.includes(searchFilter) ? item.style.display = 'block' : item.style.display = 'none';
		})
	})
})();