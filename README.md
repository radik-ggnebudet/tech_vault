# 🚀 TechVault - Premium Tech Store

<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />
  <img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
</div>

<br />

<div align="center">
  <h3>✨ Современный интернет-магазин премиальной техники с 3D-визуализацией и анимациями ✨</h3>
  <p>Откройте для себя мир инновационных устройств в стильном и интуитивном интерфейсе</p>
</div>

## 📸 Демонстрация

<div align="center">
  <a href="https://tech-vault-xi.vercel.app">Tech Vault
</div>

## ✨ Ключевые особенности

### 🎨 Дизайн и UX
- **Темная тема** с неоновыми акцентами
- **3D-визуализация** с использованием Three.js и React Three Fiber
- **Плавные анимации** на Framer Motion
- **Адаптивный дизайн** для всех устройств
- **Интерактивные элементы** с эффектами hover и click

### 🛍️ Функционал магазина
- **Каталог товаров** с фильтрацией и сортировкой
- **Детальные страницы товаров** с галереей изображений
- **Корзина покупок** с управлением количеством
- **Избранные товары** для быстрого доступа
- **Поиск товаров** в реальном времени

### 👤 Пользовательские функции
- **Регистрация и авторизация** пользователей
- **Личный профиль** с историей покупок
- **Управление избранным** и корзиной
- **Сохранение состояния** между сессиями

### 🎯 Технические особенности
- **SPA архитектура** с React Router
- **Глобальное управление состоянием** через Zustand
- **Локальное хранилище** для персистентности данных
- **Оптимизированная производительность** с lazy loading
- **Частицы на фоне** для визуального эффекта

## 🛠️ Технологический стек

### Frontend
- **React 18** - UI библиотека
- **Vite** - сборщик и dev-сервер
- **Three.js + React Three Fiber** - 3D графика
- **Framer Motion** - анимации
- **Zustand** - управление состоянием
- **React Router v6** - маршрутизация
- **React Hot Toast** - уведомления
- **React Icons** - иконки

### Стилизация
- **CSS3** с кастомными свойствами
- **CSS Grid & Flexbox** для layouts
- **CSS анимации** и переходы
- **Градиенты и эффекты** свечения

## 📁 Структура проекта

```
shop/
├── src/
│   ├── components/          # Переиспользуемые компоненты
│   │   ├── Navbar.jsx      # Навигационная панель
│   │   ├── Hero.jsx        # Главный баннер с 3D
│   │   ├── ProductCard.jsx # Карточка товара
│   │   ├── Categories.jsx  # Категории товаров
│   │   ├── FilterSidebar.jsx # Фильтры товаров
│   │   ├── Newsletter.jsx  # Форма подписки
│   │   ├── ParticlesBackground.jsx # Анимированный фон
│   │   ├── LoadingScreen.jsx # Экран загрузки
│   │   └── ...
│   │
│   ├── pages/              # Страницы приложения
│   │   ├── Home.jsx        # Главная страница
│   │   ├── Products.jsx    # Каталог товаров
│   │   ├── ProductDetail.jsx # Детальная страница товара
│   │   ├── Cart.jsx        # Корзина
│   │   ├── Auth.jsx        # Авторизация/Регистрация
│   │   ├── Profile.jsx     # Личный кабинет
│   │   ├── About.jsx       # О компании
│   │   └── Contact.jsx     # Контакты
│   │
│   ├── store/
│   │   └── useStore.js     # Zustand store
│   │
│   ├── data/
│   │   └── products.js     # Данные товаров
│   │
│   ├── App.jsx             # Главный компонент
│   ├── main.jsx            # Точка входа
│   └── index.css           # Глобальные стили
│
├── public/                 # Статические файлы
├── package.json           # Зависимости проекта
├── vite.config.js         # Конфигурация Vite
└── README.md              # Документация
```

## 🚀 Установка и запуск

### Требования
- Node.js >= 16.0.0
- npm или yarn

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/yourusername/techvault.git
cd techvault
```

2. Установите зависимости:
```bash
npm install
# или
yarn install
```

3. Запустите проект в режиме разработки:
```bash
npm run dev
# или
yarn dev
```

4. Откройте браузер и перейдите по адресу:
```
http://localhost:5173
```

### Сборка для продакшена

```bash
npm run build
# или
yarn build
```

### Предпросмотр production-сборки

```bash
npm run preview
# или
yarn preview
```

## 📋 Доступные скрипты

- `npm run dev` - запуск dev-сервера
- `npm run build` - production сборка
- `npm run preview` - предпросмотр production сборки
- `npm run lint` - проверка кода линтером

## 🎯 Функциональность

### Для пользователей
- ✅ Просмотр каталога товаров
- ✅ Фильтрация по категориям и цене
- ✅ Сортировка товаров
- ✅ Поиск товаров
- ✅ Детальный просмотр товара
- ✅ Добавление в корзину
- ✅ Управление корзиной
- ✅ Добавление в избранное
- ✅ Регистрация и авторизация
- ✅ Личный профиль

### Технические возможности
- ✅ SPA с клиентской маршрутизацией
- ✅ Сохранение состояния в localStorage
- ✅ Адаптивный дизайн
- ✅ Анимации и переходы
- ✅ 3D элементы
- ✅ Оптимизированная загрузка

## 🎨 Дизайн-система

### Цветовая палитра
- **Основной фон**: `#0a0a0a`
- **Вторичный фон**: `#1a1a1a`
- **Акцентный цвет**: `#00d4ff`
- **Градиенты**: `#667eea`, `#764ba2`
- **Текст**: `#ffffff`, `#a0a0a0`

### Типографика
- **Основной шрифт**: Inter
- **Заголовки**: 700 weight
- **Текст**: 400-600 weight

## 🔒 Безопасность

- Хеширование паролей (в реальном проекте)
- Валидация форм
- Защита маршрутов
- Санитизация пользовательского ввода

## 📱 Поддержка браузеров

- Chrome (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- Edge (последние 2 версии)

## 🤝 Вклад в проект

Мы приветствуем вклад в развитие проекта! Пожалуйста:

1. Форкните репозиторий
2. Создайте ветку для вашей функции (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 👨‍💻 Автор

**Радик Григорян**

- Telegram: [@username429](https://t.me/username429)
- GitHub: https://github.com/radik-ggnebudet

## 🙏 Благодарности

- React команде за потрясающий фреймворк
- Three.js за возможности 3D визуализации
- Framer Motion за плавные анимации
- Всем контрибьюторам open source сообщества

---

<div align="center">
  <p>Сделано с ❤️ и ☕</p>
  <p>⭐ Поставьте звезду, если проект был полезен!</p>
</div>
