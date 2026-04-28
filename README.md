# ATLASLY — React + SCSS версия

## Структура проекта

```
atlasly/
├── public/
│   └── atlasly.png          # favicon
├── src/
│   ├── assets/
│   │   ├── world.svg        # SVG карта мира
│   │   └── settings.png     # иконка настроек
│   ├── components/
│   │   ├── Navbar.jsx       # навигационная панель
│   │   ├── ModeSwitch.jsx   # переключатель been/wish
│   │   ├── CountrySearch.jsx# поиск стран
│   │   ├── WorldMap.jsx     # карта (вспомогательный)
│   │   └── Tooltip.jsx      # тултип при наведении
│   ├── pages/
│   │   └── HomePage.jsx     # главная страница
│   ├── styles/
│   │   ├── global.scss      # глобальные стили и переменные
│   │   ├── _navbar.scss     # стили navbar
│   │   ├── _map.scss        # стили карты и тем
│   │   ├── _modeswitch.scss # стили переключателя
│   │   ├── _search.scss     # стили поиска
│   │   └── _tooltip.scss    # стили тултипа
│   ├── utils/
│   │   └── cookieStorage.js # сохранение стран в cookies (вместо БД)
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Установка и запуск

```bash
# 1. Перейти в папку проекта (скопируй файлы в твой atlasly проект из WebStorm)
cd atlasly

# 2. Установить зависимости
npm install

# 3. Запустить dev сервер
npm run dev
```

## Что изменилось по сравнению с оригиналом

- ❌ Убраны: вход, регистрация, профиль, настройки
- ❌ Убрана: зависимость от бекенда (Node.js + БД)
- ✅ Добавлено: сохранение выбранных стран через **cookies** (js-cookie)
- ✅ Переписано на **React 18 + SCSS**
- ✅ Дизайн полностью сохранён (цвета, шрифты, анимации)
- ✅ Темы been (синяя) и wish (зелёная) работают
- ✅ Поиск стран с чекбоксами работает
- ✅ Tooltip при наведении работает
- ✅ Клик по стране — выделение/снятие

## Как работает сохранение (cookies)

- При выборе страны в режиме **been** — сохраняется в cookie `atlasly_been`
- При выборе страны в режиме **wish** — сохраняется в cookie `atlasly_wish`
- При переключении режима загружаются соответствующие данные
- Cookies хранятся **365 дней**

## Зависимости

- `react` + `react-dom` — UI
- `js-cookie` — работа с cookies
- `sass` — компиляция SCSS
- `vite` + `@vitejs/plugin-react` — сборка
