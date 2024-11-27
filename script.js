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
const carousel = document.querySelector(".secondCarousel");
const wrapper = document.querySelector(".secondCarousel__wrapper");
const slides = document.querySelectorAll(".secondCarousel__slide");
const prevButton = document.querySelector(".secondCarousel__prev");
const nextButton = document.querySelector(".secondCarousel__next");
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
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// Функция для обработки свайпа
let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  if (startX - endX > 50) {
    nextSlide(); // Свайп влево (вперёд)
  } else if (endX - startX > 50) {
    prevSlide(); // Свайп вправо (назад)
  }
});

// Обновление карусели при загрузке
window.addEventListener("load", updateCarousel);

// Чтобы карусель корректно работала после ресайза окна
window.addEventListener("resize", updateCarousel);

// Найти элементы для управления
const laptop = document.querySelector(".laptop");
const laptopBlock = document.querySelector(".laptop-block");

// Настройки Intersection Observer
const observerOptions = {
  root: null, // Используем окно браузера
  rootMargin: "-40% 0px", // Смещаем точку срабатывания на середину экрана
  threshold: 0, // Реагируем, когда хотя бы минимальная часть блока видна
};

// Функция, которая будет вызвана, когда элемент пересечет порог
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      laptop.classList.remove("laptop--closed"); // Убрать закрытое состояние
      laptopBlock.style.transform = "scale(0)"; // Открыть верхнюю часть
    } else {
      laptop.classList.add("laptop--closed"); // Вернуть в закрытое состояние
      laptopBlock.style.transform = "scale(1)"; // Закрыть верхнюю часть
    }
  });
};

// Создаем наблюдатель
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Наблюдаем за контейнером
observer.observe(document.querySelector(".containers"));




// Инициализация EmailJS с публичным ключом
emailjs.init("B9zMyupnCHE8Qs3DQ"); // Вставьте ваш публичный ключ

// Открытие и закрытие модального окна
const openFormMenu = document.getElementById("openFormMenu");
const openFormBottom = document.getElementById("openFormBottom");
const closeForm = document.getElementById("closeForm");
const modal = document.getElementById("modal");

// Обработчик для кнопки в меню
openFormMenu.addEventListener("click", () => {
  modal.style.display = "flex"; // Показываем модальное окно
});

// Обработчик для кнопки внизу страницы
openFormBottom.addEventListener("click", () => {
  modal.style.display = "flex"; // Показываем модальное окно
});

closeForm.addEventListener("click", () => {
  modal.style.display = "none"; // Скрываем модальное окно
});

// Закрытие модального окна при клике вне его
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Функция для отображения поля ввода количества
function toggleCountField(checkbox, countField) {
  if (checkbox.checked) {
    countField.style.display = "inline-block"; // Показываем поле ввода
    countField.disabled = false; // Разрешаем ввод
  } else {
    countField.style.display = "none"; // Скрываем поле ввода
    countField.disabled = true; // Блокируем ввод
    countField.value = 0; // Сбрасываем значение
  }
}

// Добавляем обработчики событий для чекбоксов
document.querySelectorAll('input[type="checkbox"][name="childTariff"]').forEach((checkbox) => {
  const countField = checkbox.parentElement.querySelector(".childCount");
  checkbox.addEventListener("change", () => toggleCountField(checkbox, countField));
});

document.querySelectorAll('input[type="checkbox"][name="adultTariff"]').forEach((checkbox) => {
  const countField = checkbox.parentElement.querySelector(".adultCount");
  checkbox.addEventListener("change", () => toggleCountField(checkbox, countField));
});

// Функция для нормализации имени тарифа
function normalizeTariffName(tariffName) {
  return tariffName
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+|\_|\-|\—)/g, (match, index) => index === 0 ? match.toLowerCase() : match.toUpperCase())
    .replace(/\s+/g, '')
    .replace(/[А-ЯЁ]/g, (char) => char.toLowerCase());
}

// Функция для получения выбранных тарифов
function getSelectedTariffs(tariffType) {
  const selectedTariffs = [];
  const tariffs = document.querySelectorAll(`input[name="${tariffType}"]:checked`);

  tariffs.forEach((tariff) => {
    const tariffName = normalizeTariffName(tariff.value);
    const countField = document.querySelector(`input[name="${tariffType}Count_${tariffName}"]`);

    if (countField && countField.value > 0) {
      selectedTariffs.push(`${tariff.value} (x${countField.value})`);
    }
  });

  return selectedTariffs.length > 0 ? selectedTariffs.join(", ") : "Не выбраны";
}

// Обработчик отправки формы
const form = document.getElementById("contactForm");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Собираем все данные из формы
  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    childTariffs: getSelectedTariffs("childTariff"),
    adultTariffs: getSelectedTariffs("adultTariff"),
    consent: document.getElementById("consentCheckbox").checked,
  };

  // Отправка данных на EmailJS
  emailjs.send("service_v6ppbhz", "template_3cp8efa", formData)  // Убедитесь, что заменили на ваш сервис и шаблон
    .then((response) => {
      console.log("Success", response);
      modal.style.display = "none"; // Закрыть форму
    })
    .catch((error) => {
      console.error("Error", error);
    });
});









