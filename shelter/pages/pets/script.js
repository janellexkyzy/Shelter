document.addEventListener("DOMContentLoaded", function () {
    const learnMoreButtons = document.querySelectorAll(
      ".pets__slider-card-button button"
    );
    const popup = document.getElementById("popup");
    const popupImage = document.querySelector(".popup__container__img img");
    const popupText = document.querySelector(".popup__container__text");
  
    function loadJSON(callback) {
      fetch("./pets.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          callback(data);
        });
    }
  
    function updatePopupContent(pet) {
      popupImage.src = pet.img;
      popupText.innerHTML = `
          <button class="popup__close" onclick="popup.style.display = 'none'">&times;</button>
          <h2 class="popup__container__text__name">${pet.name}</h2>
          <h3 class="popup__container__text__type-breed">${pet.type} - ${
        pet.breed
      }</h3>
          <p class="popup__container__text__description">${pet.description}</p>
          <ul class="popup__container__text__ul">
            <li><span class="popup__span-bold">Age:</span> <span class="popup__pet-age char">${
              pet.age
            }</span></li>
            <li><span class="popup__span-bold">Inoculations:</span> <span class="popup__pet-inoculations char">${pet.inoculations.join(
              ", "
            )}</span></li>
            <li><span class="popup__span-bold">Diseases:</span> <span class="popup__pet-diseases char">${pet.diseases.join(
              ", "
            )}</span></li>
            <li><span class="popup__span-bold">Parasites:</span> <span class="popup__pet-parasites char">${pet.parasites.join(
              ", "
            )}</span></li>
          </ul>
        `;
    }
  
    function processData(data) {
      let pets = data;
      for (let i = 0; i < learnMoreButtons.length; i++) {
        (function (index) {
          learnMoreButtons[index].addEventListener("click", function () {
            popup.style.display = "flex";
            updatePopupContent(pets[index]);
          });
        })(i);
      }
    }
  
    loadJSON(processData);
  });
  
  //---------------------------------------buttons
  
  const doubleLeftBtn = document.querySelector(".double-left");
  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right");
  const doubleRightBtn = document.querySelector(".double-right");
  
  const pageNumber = document.querySelector(".number");
  
  let totalPages = 4;
  let currentPage = 1;
  
  function updatePageNumber() {
    pageNumber.textContent = currentPage;
  }
  
  function rearrangeSlides() {
    const slides = Array.from(document.querySelectorAll(".pets__slider-card"));
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.order = Math.floor(Math.random() * slides.length);
    }
  }
  
  doubleLeftBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentPage !== 1) {
      currentPage = 1;
    }
    updatePageNumber();
    rearrangeSlides();
  });
  
  leftBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentPage > 1) {
      currentPage--;
    }
    updatePageNumber();
    rearrangeSlides();
  });
  
  rightBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
    }
    updatePageNumber();
    rearrangeSlides();
  });
  
  doubleRightBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (currentPage !== totalPages) {
      currentPage = totalPages;
    }
    updatePageNumber();
    rearrangeSlides();
  });