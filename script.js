// Mock-данные отелей
const hotels = [
  {
    name: "Отель «Солнечный берег»",
    price: 3000,
    amenities: ["Wi-Fi", "Парковка", "Бассейн"],
    maxGuests: 2,
    image: "images/hotel1.jpg",
  },
  {
    name: "Городской люкс",
    price: 5000,
    amenities: ["Wi-Fi", "Кондиционер", "Парковка"],
    maxGuests: 4,
    image: "images/hotel2.jpg",
  },
  {
    name: "Дом отдыха «Зеленая роща»",
    price: 7000,
    amenities: ["Wi-Fi", "Сауна", "Парковка", "Бассейн"],
    maxGuests: 6,
    image: "images/hotel3.jpg",
  },
];

// Ждем загрузки DOM перед началом работы
document.addEventListener("DOMContentLoaded", () => {
  // Элементы формы
  const checkinDate = document.getElementById("checkin-date");
  const checkoutDate = document.getElementById("checkout-date");
  const budgetInput = document.getElementById("budget");
  const budgetValue = document.getElementById("budget-value");
  const guestsInput = document.getElementById("guests");
  const submitButton = document.querySelector("button[type='submit']");
  const resultsContainer = document.getElementById("hotel-cards");

  // Проверка корректности дат
  if (checkinDate && checkoutDate) {
    checkoutDate.addEventListener("change", () => {
      const checkin = new Date(checkinDate.value);
      const checkout = new Date(checkoutDate.value);

      if (checkout <= checkin) {
        alert("Дата выезда должна быть позже даты заезда.");
        checkoutDate.value = ""; // Сбрасываем поле
      }
    });
  }

  // Обновление отображения бюджета
  if (budgetInput && budgetValue) {
    budgetInput.addEventListener("input", () => {
      budgetValue.textContent = `${budgetInput.value} ₽`;
    });
  }

  // Обработчик кнопки "Найти"
  if (submitButton) {
    submitButton.addEventListener("click", (event) => {
      event.preventDefault(); // Отменяем стандартное поведение формы

      // Получаем данные из формы
      const checkin = checkinDate.value;
      const checkout = checkoutDate.value;
      const guests = parseInt(guestsInput.value, 10) || 1;
      const budget = parseInt(budgetInput.value, 10) || 0;

      // Проверяем, чтобы все поля были заполнены
      if (!checkin || !checkout || guests <= 0 || budget <= 0) {
        alert("Пожалуйста, заполните все поля формы.");
        return;
      }

      // Фильтрация отелей по данным
      const availableHotels = hotels.filter((hotel) => {
        return hotel.price <= budget && hotel.maxGuests >= guests;
      });

      // Очистка предыдущих результатов
      resultsContainer.innerHTML = "";

      // Вывод результатов
      if (availableHotels.length > 0) {
        availableHotels.forEach((hotel) => {
          const card = document.createElement("div");
          card.className = "hotel-card";
          card.innerHTML = `
              <img src="${hotel.image}" alt="${
            hotel.name
          }" class="hotel-image" />
              <div class="hotel-info">
                <h3>${hotel.name}</h3>
                <p>Цена: ${hotel.price} ₽/ночь</p>
                <p>Макс. гостей: ${hotel.maxGuests}</p>
                <p>Удобства: ${hotel.amenities.join(", ")}</p>
                <button>Забронировать</button>
              </div>
            `;
          resultsContainer.appendChild(card);
        });
      } else {
        resultsContainer.innerHTML = `
            <p>К сожалению, подходящих отелей не найдено.</p>
          `;
      }
    });
  }
});
