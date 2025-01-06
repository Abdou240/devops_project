const carousel = document.querySelector('.carousel-inner');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
let index = 0;
const itemsToShow = 3; // Number of items to show

nextButton.addEventListener('click', () => {
  index = (index + 1) % (carousel.children.length / itemsToShow);
  carousel.style.transform = `translateX(-${index * (100 / itemsToShow)}%)`;
});

prevButton.addEventListener('click', () => {
  index = (index - 1 + (carousel.children.length / itemsToShow)) % (carousel.children.length / itemsToShow);
  carousel.style.transform = `translateX(-${index * (100 / itemsToShow)}%)`;
});
