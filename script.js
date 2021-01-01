// show cart when click on button
(function(){
	const btnCart = document.querySelector("#cart-info");
	const conCart = document.getElementById("cart");
	btnCart.addEventListener("click", function(e){
		conCart.classList.toggle("show-cart");
	})
}());

// watchlist
let watchlist = [];

// set item count
function setItemCount(num){
	const count = document.getElementById("item-count");
	count.innerHTML = `${num} `;
}

// remove button
function handleRemoveButton(){
	const cart = document.getElementById("cart");
	const cartItems = document.querySelectorAll(".cart-item");
	cartItems.forEach(function(cartItem){
		const btn = cartItem.querySelector(".cart-item-remove");
		btn.addEventListener("click", function(e){
			cart.removeChild(cartItem);
			watchlist = watchlist.filter(function(item){
				if(item.imgSrc.localeCompare(e.target.parentElement.children[0].src) === 0 && item.name.localeCompare(e.target.parentElement.children[1].textContent === 0)) return false;
				else return true;
			});
			setLocalStorage(watchlist);
			setItemCount(watchlist.length);
		})
	})
}

// get watchlist
function showWatchlist(watchlist){
	const clearBtn = document.getElementById("clear-all-btn");
	watchlist.forEach(function(item){
		clearBtn.insertAdjacentHTML("beforebegin",`<!-- cart-item -->
		<div class="cart-item d-flex justify-content-between text-capitalize my-3">
			<img src="${item.imgSrc}" alt="" class="img-fluid rounded-circle img-cart">
			<div class="item-text font-weight-bold mb-0 text-center">${item.name}</div>
			<i class="fas fa-trash cart-item-remove"></i>
		</div>
		<!-- end of cart item -->`);
		handleRemoveButton();
	});
}


// get localStorage
function getLocalStorage(){
	const wl = localStorage.getItem("watchlist");
	if(wl === undefined || wl === null){
		watchlist = [];
	}
	else{
		watchlist = JSON.parse(wl);
		showWatchlist(watchlist);
		setItemCount(watchlist.length);
	}
}

getLocalStorage(watchlist);

// set localStorage
function setLocalStorage(watchlist){
	localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

// add new movie to cart
(function(){
	const btnCarts = document.querySelectorAll(".category-item-icon");
	btnCarts.forEach((btnCart) => {
		btnCart.addEventListener("click",function(e){
			if (e.target.parentElement.classList.contains("category-item-icon")) {
				let fullPath = event.target.parentElement.previousElementSibling.src;
				const item = {};
				item.imgSrc = fullPath;
				let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
				item.name = name;
				const clearBtn = document.getElementById("clear-all-btn");
				clearBtn.insertAdjacentHTML("beforebegin",`<!-- cart-item -->
					<div class="cart-item d-flex justify-content-between text-capitalize my-3">
						<img src="${item.imgSrc}" alt="" class="img-fluid rounded-circle img-cart">
						<div class="item-text font-weight-bold mb-0 text-center">${item.name}</div>
						<i class="fas fa-trash cart-item-remove"></i>
					</div>
					<!-- end of cart item -->`);
				watchlist.push(item);
				setLocalStorage(watchlist);
				handleRemoveButton();
				setItemCount(watchlist.length);
				// showWatchlist(watchlist);
				alert("Added sucessfully to your watchlist!");
			}
		})
	})
	
}());

// cart clear all button
(function(){
	const clearBtn = document.getElementById("clear-cart");
	clearBtn.addEventListener("click",(e) => {
		e.preventDefault();
		watchlist = [];
		setLocalStorage(watchlist);
		let parent = e.target.parentElement.parentElement;
		let numIte = parent.childElementCount - 2;
		while (numIte > 0) {
			if(e.target.parentElement.previousElementSibling.classList.contains("cart-item")){
				e.target.parentElement.previousElementSibling.remove();
			}
			numIte--;
		}
		setItemCount(0);
	})
}());

// filter button
(function(){
	const buttons = document.querySelectorAll(".filter-btn");
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

(function(){
	const imgs = document.querySelectorAll(".category-img");
	const modal = document.querySelector("#imageModal");
	const tmpSrc = document.querySelector("#temp-src");
	imgs.forEach( function(img) {
		img.addEventListener("click", function(e){
			let src = e.target.src;
			var bg = document.querySelector(".modal-body");
			tmpSrc.src = src;
			// bg.style.backgroundImage = `url(${src})`;
			modal.classList.add("show");
		})
	});
}());