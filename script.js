document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".carousel__wrapper");
  const slides = document.querySelectorAll(".carousel__slide");
  const prevButton = document.querySelector(".carousel__prev");
  const nextButton = document.querySelector(".carousel__next");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateCarousel() {
    const offset = -100 * currentIndex; // Смещение на 100% для каждой группы
    wrapper.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Возвращаемся к последнему
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides; // Переход к первому
    updateCarousel();
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".secondCarousel__wrapper");
    const slides = document.querySelectorAll(".secondCarousel__slide");
    const prevButton = document.querySelector(".secondCarousel__prev");
    const nextButton = document.querySelector(".secondCarousel__next");
  
    let currentIndex = 0;
    const totalSlides = slides.length;
  
    // Переменные для свайпа
    let startX = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let isDragging = false;
  
    const SWIPE_THRESHOLD = 50; // Порог для переключения в пикселях
  
    function updatesecondCarousel() {
      const offset = -100 * currentIndex;
      wrapper.style.transform = `translateX(${offset}%)`;
      wrapper.style.transition = "transform 0.5s ease-in-out";
    }
  
    function setTranslate(translate) {
      wrapper.style.transform = `translateX(${translate}px)`;
      wrapper.style.transition = "none";
    }
  
    // Управление кнопками
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      updatesecondCarousel();
    });
  
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      updatesecondCarousel();
    });
  
    // События для свайпа (только для touch)
    wrapper.addEventListener("pointerdown", startDrag);
    wrapper.addEventListener("pointermove", onDrag);
    wrapper.addEventListener("pointerup", endDrag);
    wrapper.addEventListener("pointerleave", endDrag);
  
    function startDrag(event) {
      if (event.pointerType !== "touch") return; // Игнорируем мышь
  
      isDragging = true;
      startX = event.clientX;
      previousTranslate = -wrapper.offsetWidth * currentIndex;
      wrapper.style.transition = "none";
    }
  
    function onDrag(event) {
      if (!isDragging || event.pointerType !== "touch") return; // Игнорируем мышь
  
      const deltaX = event.clientX - startX;
      currentTranslate = previousTranslate + deltaX;
      setTranslate(currentTranslate);
    }
  
    function endDrag(event) {
      if (!isDragging || event.pointerType !== "touch") return; // Игнорируем мышь
  
      isDragging = false;
  
      const deltaX = event.clientX - startX;
  
      // Определяем направление свайпа
      if (deltaX > SWIPE_THRESHOLD) {
        // Свайп вправо — перелистываем назад
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      } else if (deltaX < -SWIPE_THRESHOLD) {
        // Свайп влево — перелистываем вперёд
        currentIndex = (currentIndex + 1) % totalSlides;
      }
  
      updatesecondCarousel();
    }
  
    // Инициализация
    updatesecondCarousel();
  });
  
  
