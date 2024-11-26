document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".carousel__wrapper");
  const slides = document.querySelectorAll(".carousel__slide");
  const prevButton = document.querySelector(".carousel__prev");
  const nextButton = document.querySelector(".carousel__next");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updatesecondCarousel() {
    const offset = -100 * currentIndex; // Смещение на 100% для каждой группы
    wrapper.style.transform = `translateX(${offset}%)`;
  }

  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Возвращаемся к последнему
    updatesecondCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides; // Переход к первому
    updatesecondCarousel();
  });
});

// Инициализация элементов
const carousel = document.querySelector('.secondCarousel');
const wrapper = document.querySelector('.secondCarousel__wrapper');
const slides = document.querySelectorAll('.secondCarousel__slide');
const prevButton = document.querySelector('.secondCarousel__prev');
const nextButton = document.querySelector('.secondCarousel__next');
let currentIndex = 0;

// Получаем количество слайдов
const totalSlides = slides.length;

// Функция для обновления слайда
function updateCarousel() {
  // Позиционируем wrapper с учетом индекса
  wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Функция для перехода на следующий слайд
function nextSlide() {
  // Перемещаемся к следующему слайду и зацикливаем
  currentIndex = (currentIndex + 1) % totalSlides;
  updateCarousel();
}

// Функция для перехода на предыдущий слайд
function prevSlide() {
  // Перемещаемся к предыдущему слайду и зацикливаем
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

// Обработчики событий для кнопок
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Функция для обработки свайпа
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener('touchend', () => {
  if (startX - endX > 50) {
    nextSlide(); // Свайп влево (вперёд)
  } else if (endX - startX > 50) {
    prevSlide(); // Свайп вправо (назад)
  }
});

// Обновление карусели при загрузке
window.addEventListener('load', updateCarousel);

// Чтобы карусель корректно работала после ресайза окна
window.addEventListener('resize', updateCarousel);





// Найти элементы для управления
const laptop = document.querySelector('.laptop');
const laptopBlock = document.querySelector('.laptop-block');

// Настройки Intersection Observer
const observerOptions = {
  root: null, // Используем окно браузера
  rootMargin: '-40% 0px', // Смещаем точку срабатывания на середину экрана
  threshold: 0, // Реагируем, когда хотя бы минимальная часть блока видна
};

// Функция, которая будет вызвана, когда элемент пересечет порог
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      laptop.classList.remove('laptop--closed'); // Убрать закрытое состояние
      laptopBlock.style.transform = 'scale(0)'; // Открыть верхнюю часть
    } else {
      laptop.classList.add('laptop--closed'); // Вернуть в закрытое состояние
      laptopBlock.style.transform = 'scale(1)'; // Закрыть верхнюю часть
    }
  });
};

// Создаем наблюдатель
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Наблюдаем за контейнером
observer.observe(document.querySelector('.containers'));


