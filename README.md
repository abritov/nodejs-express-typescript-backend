1. Из конфига /src/config/default.js сделать копию конфига и установить свои настройки.
	Для developer окружения это файл dev.js.
	Для prodaction окружения это файл prod.js. 

2. Запуск приложения npm run start. 


Алгоритм регистрации:
1. Получить encodedSignup токен через метод POST /signup или POST /signup/fb
2. Создать пользователя POST /user, используя полученный выше токен, при необходимости дополнительно указать email. При отсутствии в запросе полей email, password или name они будут взяты из токена.
3. Создать токен POST /token в запросе указать encodedSignup и accessBitmask

Алгоритм авторизации:
1. Получить encodedSignup токен через метод POST /signup или POST /signup/fb
2. Получить токен GET /token в параметрах запроса указать encodedSignup