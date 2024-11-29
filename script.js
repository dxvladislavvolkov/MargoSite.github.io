const checkbox = document.querySelector('.checkbox');
const body = document.body;
const menuLinks = document.querySelectorAll('.menu-items a'); // Все ссылки меню
const menuButton = document.querySelector('.buttonContainer button'); // Кнопка в меню

// Функция закрытия меню
const closeMenu = () => {
  checkbox.checked = false; // Снимаем галочку
  body.classList.remove('no-scroll'); // Возвращаем прокрутку
  document.removeEventListener('touchmove', preventScroll); // Разрешаем свайпы
};

// Запрещаем прокрутку при открытом меню
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    body.classList.add('no-scroll');
    document.addEventListener('touchmove', preventScroll, { passive: false });
  } else {
    closeMenu();
  }
});

// Разрешаем прокрутку при клике на любой пункт меню или кнопку
menuLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

menuButton.addEventListener('click', closeMenu); // Для кнопки

function preventScroll(event) {
  event.preventDefault(); // Останавливает любые действия по свайпу
}




document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("imageContainer");
    const images = imageContainer.querySelectorAll("img");
    let currentIndex = 0;
    let timer;
  
    // Функция для переключения изображения
    const switchImage = (index) => {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    };
  
    // Автоматическая смена изображения
    const nextImage = () => {
      currentIndex = (currentIndex + 1) % images.length;
      switchImage(currentIndex);
    };
  
    // Сброс таймера
    const resetTimer = () => {
      clearInterval(timer);
      timer = setInterval(nextImage, 5000); // Интервал в 5 секунд
    };
  
    // Инициализация
    switchImage(currentIndex);
    resetTimer();
  
    // Обработка кликов по imageContainer
    imageContainer.addEventListener("click", () => {
      nextImage(); // Переключить на следующее изображение
      resetTimer(); // Перезапустить таймер
    });
  });
  



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
emailjs.init("zq7v07VJEBawgYzDZ");

// Открытие и закрытие модального окна
const openFormMenu = document.getElementById("openFormMenu");
const openFormButton = document.getElementById("openFormButton");
const openFormBottom = document.getElementById("openFormBottom");
const closeForm = document.getElementById("closeForm");
const modal = document.getElementById("modal");

// Модальные уведомления для успеха и ошибки
const successNotification = document.getElementById("successNotification");
const errorNotification = document.getElementById("errorNotification");

openFormMenu?.addEventListener("click", () => {
  modal.style.display = "flex";
});

openFormButton?.addEventListener("click", () => {
  modal.style.display = "flex";
});

openFormBottom?.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeForm?.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Нормализация имени тарифа (опционально)
function normalizeTariffName(tariffName) {
  return tariffName
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[А-ЯЁ]/g, (char) => char.toLowerCase());
}

// Получение выбранных тарифов
function getSelectedTariffs(tariffType) {
  const selectedTariffs = [];
  const tariffs = document.querySelectorAll(`input[name="${tariffType}"]:checked`);

  tariffs.forEach((tariff) => {
    const countInput = tariff.parentElement.querySelector('input[type="number"]');
    const count = countInput ? parseInt(countInput.value, 10) : 1;
    const price = tariff.dataset.price ? parseFloat(tariff.dataset.price) : 0;
    const totalPrice = price * count;

    selectedTariffs.push({
      name: tariff.value,
      count,
      price,
      totalPrice,
    });
  });

  return selectedTariffs;
}

// Обновление итоговой цены
function updateTotalPrice() {
  const tariffCheckboxes = document.querySelectorAll('.tariff-options input[type="checkbox"]');
  let totalPrice = 0;
  let totalPriceWithoutDiscount = 0;

  tariffCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const countInput = checkbox.parentElement.querySelector('input[type="number"]');
      const count = countInput ? parseInt(countInput.value, 10) : 1;
      const price = checkbox.dataset.price ? parseFloat(checkbox.dataset.price) : 0;
      totalPriceWithoutDiscount += price * count;
      totalPrice += price * count;
    }
  });

  // Если оба тарифа выбраны, применяем скидку 10%
  const hasDiscount = document.querySelectorAll('input[name="childTariff"]:checked').length > 0 && document.querySelectorAll('input[name="adultTariff"]:checked').length > 0;
  if (hasDiscount) {
    totalPrice *= 0.9; // 10% скидка
  }

  // Показ итоговой цены
  const totalPriceElement = document.getElementById("totalPriceValue");
  if (totalPriceElement) {
    totalPriceElement.textContent = totalPrice; // Обновляем только значение цены
  }

  const totalPriceWithoutDiscountElement = document.getElementById("totalPriceWithoutDiscount");
  const saleBackgroundElement = document.getElementById("saleBackground");

  // Логика управления видимостью цены без скидки и скидки
  if (totalPriceWithoutDiscountElement) {
    if (hasDiscount) {
      // Показать цену без скидки и скидку
      totalPriceWithoutDiscountElement.innerHTML = `<span style="text-decoration: line-through;">${totalPriceWithoutDiscount}₽</span>`;
      saleBackgroundElement.style.display = "block";
    } else {
      // Скрыть цену без скидки и скидку
      totalPriceWithoutDiscountElement.innerHTML = "";
      saleBackgroundElement.style.display = "none";
    }
  }

  return {
    totalPrice,
    totalPriceWithoutDiscount,
    hasDiscount,
  };
}

// Обработка формы
const form = document.getElementById("contactForm");
form?.addEventListener("submit", function (event) {
  event.preventDefault();

  // Собираем данные
  const childTariffs = getSelectedTariffs("childTariff");
  const adultTariffs = getSelectedTariffs("adultTariff");
  const { totalPrice, totalPriceWithoutDiscount, hasDiscount } = updateTotalPrice();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    childTariffs: childTariffs.map((t) => `${t.name} (x${t.count}) - ${t.totalPrice}р`).join(", "),
    adultTariffs: adultTariffs.map((t) => `${t.name} (x${t.count}) - ${t.totalPrice}р`).join(", "),
    totalPrice: totalPrice,
    totalPriceWithoutDiscount: totalPriceWithoutDiscount,
    hasDiscount: hasDiscount
  };

  // Отправка через EmailJS
  emailjs
    .send("service_cs9p1tr", "template_z0w7jzg", formData)
    .then((response) => {
      console.log("Success", response);
      modal.style.display = "none"; // Закрыть модальное окно
      showNotification(successNotification, "Заявка успешно отправлена!");
    })
    .catch((error) => {
      console.error("Error", error);
      showNotification(errorNotification, "Произошла ошибка при отправке. Попробуйте еще раз.");
    });
});

// Показ уведомления
function showNotification(notificationElement, message) {
  notificationElement.textContent = message;
  notificationElement.style.display = "block";
  
  setTimeout(() => {
    notificationElement.style.display = "none";
  }, 3000); // Скрытие уведомления через 3 секунды
}

// Остановка выбора нескольких тарифов в каждой категории
const childTariffs = document.querySelectorAll('input[name="childTariff"]');
const adultTariffs = document.querySelectorAll('input[name="adultTariff"]');

childTariffs.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    childTariffs.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
    updateTotalPrice();
  });
});

adultTariffs.forEach((checkbox) => {
  checkbox.addEventListener('change', () => {
    adultTariffs.forEach((otherCheckbox) => {
      if (otherCheckbox !== checkbox) {
        otherCheckbox.checked = false;
      }
    });
    updateTotalPrice();
  });
});



/* emailjs.init("zq7v07VJEBawgYzDZ");
.send("service_cs9p1tr", "template_z0w7jzg", formData) */