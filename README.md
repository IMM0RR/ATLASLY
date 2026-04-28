# ATLASLY
## Установка и запуск

```bash
# 1. Перейти в папку проекта
cd atlasly

# 2. Установить зависимости
npm install

# 3. Запустить dev сервер
npm run dev
```


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
