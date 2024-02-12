const closeIcon = document.querySelector("[alt=icon-close]");
const modalContainer = document.querySelector(".modal-container");
const cartContainer = document.querySelector(".cart-container");
const cartDropdown = document.getElementById("cart-dropdown");
const cartIcon = document.querySelector("[alt=icon-cart]")
const thumbnailImages = document.querySelectorAll(".thumbnails img");
const mainImage = document.getElementById("main-image");
const cartCount = document.getElementById("cart-count");
const minusIcon = document.querySelector("[alt=icon-minus]");
const plusIcon = document.querySelector("[alt=icon-plus]");
const cartCounter = document.querySelector(".cart-counter");
const addToCartBtn = document.getElementById("cart-btn");
const cartPriceP = document.getElementById("cart-price-p");
const cartDetails = document.getElementById("cart-details");
const emptyCart = document.getElementById("empty-cart");
const deleteIcon = cartDetails.querySelector("[alt=icon-delete]");
const modalMainImage = modalContainer.querySelector(".modal > div > img");
const modalThumbnailImages = modalContainer.querySelectorAll(".modal-thumbnails span");
const navigationButtons = modalContainer.getElementsByClassName("navigation-button");

let cartItems = 0;
if (cartItems < 1) {
    cartCounter.style.display = "none";
}

// Close Product Images display modal
closeIcon.addEventListener("click", () => {
    modalContainer.style.display = "none";
})

//Toggle display of cart dropdown on cart icon click
cartIcon.addEventListener("click", () => {
    if (cartDropdown.style.display === "block") {
        cartDropdown.style.display = "none";
    } else {
        cartDropdown.style.display = "block";
    }
})

//hide cart dropdown when other parts of page is clicked
window.onclick = function(event) {
    if (!event.target.closest(".cart-container")) {
        cartDropdown.style.display = "none";
    }
}

//display original image when thumbnails are clicked
for (let i = 0; i < thumbnailImages.length; i++) {
    const thumbnail = thumbnailImages[i];
    thumbnail.onclick = () => {
        mainImage.src = thumbnail.src.replace("-thumbnail", "");

        for (let i = 0; i < thumbnailImages.length; i++) {
            thumbnailImages[i].classList.remove("active-thumbnail");
        }

        thumbnail.classList.add("active-thumbnail");
    }
}


//handle cart add and remove events
plusIcon.addEventListener("click", () => {
    cartItems += 1;
    cartCount.innerText = cartItems;
})
minusIcon.addEventListener("click", () => {
    if (cartItems > 0) {
        cartItems -= 1;
        cartCount.innerText = cartItems;
    }
})

addToCartBtn.onclick = function() {
    if (cartItems !== 0) {
        cartCounter.style.display = "inline-block";
        cartCounter.innerText = cartItems;
        cartDetails.style.display = "block";
        cartPriceP.innerHTML = `$125.00 x ${cartItems} <span>$${(125 * cartItems).toFixed(2)}</span>`;
        emptyCart.style.display = "none";
    } else {
        cartCounter.style.display = "none";
        cartDetails.style.display = "none";
        emptyCart.style.display = "block";
    }
}

deleteIcon.onclick = () => {
    cartItems = 0;
    cartCount.innerText = cartItems;
    cartCounter.style.display = "none";
    cartDetails.style.display = "none";
    emptyCart.style.display = "block";
}

mainImage.onclick = () => {
    modalContainer.style.display = "flex";
}


//display original image when thumbnails are clicked -- for madal
for (let i = 0; i < modalThumbnailImages.length; i++) {
    const thumbnail = modalThumbnailImages[i];
    thumbnail.onclick = () => {
        modalMainImage.src = thumbnail.firstElementChild.src.replace("-thumbnail", "");

        for (let i = 0; i < modalThumbnailImages.length; i++) {
            modalThumbnailImages[i].firstElementChild.classList.remove("active-thumbnail");
        }

        thumbnail.firstElementChild.classList.add("active-thumbnail");
    }
}

navigationButtons[0].onclick = () => {
    let currentImagePosition = Array.from(modalThumbnailImages).findIndex((thumb) => thumb.firstElementChild.className === "active-thumbnail");
    
    if (currentImagePosition === 0) {
        currentImagePosition = 4;
    }

    if (currentImagePosition > 0) {
        for (let i = 0; i < modalThumbnailImages.length; i++) {
            modalThumbnailImages[i].firstElementChild.classList.remove("active-thumbnail");
        }
        modalMainImage.src = modalThumbnailImages[currentImagePosition-1].firstElementChild.src.replace("-thumbnail", "");

        modalThumbnailImages[currentImagePosition-1].firstElementChild.classList.add("active-thumbnail");
    }

}

navigationButtons[1].onclick = () => {
    let currentImagePosition = Array.from(modalThumbnailImages).findIndex((thumb) => thumb.firstElementChild.className === "active-thumbnail");
    
    if (currentImagePosition === 3) {
        currentImagePosition = -1;
    }
    if (currentImagePosition < 3) {
        for (let i = 0; i < modalThumbnailImages.length; i++) {
            modalThumbnailImages[i].firstElementChild.classList.remove("active-thumbnail");
        }
        modalMainImage.src = modalThumbnailImages[currentImagePosition + 1].firstElementChild.src.replace("-thumbnail", "");

        modalThumbnailImages[currentImagePosition + 1].firstElementChild.classList.add("active-thumbnail");
    } 

}
