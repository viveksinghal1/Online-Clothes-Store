let index = -1;

carousel();

function carousel() {
    const carouselSlide = document.querySelector(".carousel-slides");
    const carouselImages = document.querySelectorAll(".carousel-slides img");
    let size = carouselImages[0].clientWidth;

    index++;
    if (index == carouselImages.length) {
        index = 0;
        carouselSlide.style.transform = "translateX(" + (-size * index) + "px)";
        carouselSlide.style.transition = "none";
        //index++;
        setTimeout(carousel, 0);
    }
    else {
        carouselSlide.style.transform = "translateX(" + (-size * index) + "px)";
        carouselSlide.style.transition = "transform 0.6s ease-in-out";
        //index++;
        setTimeout(carousel, 2000);
    }

}