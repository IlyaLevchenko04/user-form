## Завдання
Створити односторонній веб-застосування (SPA) з системою авторизації та формою редагування інформації про користувача.

## Технічні вимоги
- React
- React Router

## Функціональні вимоги (обовязкові)
- Сторінка авторизації
  - Форма з полями:
    - username
    - password
  - Валідація
  - Відображення та обробка помилок
- Сторінка редагування профілю
  - Доступна лише після авторизації
  - Форма редагування інформації про користувача
    - Name
    - Surname
    - Email
    - Phone
    - Данні зберігати просто в localstorage (зробити емітацію відправки данних на сервер, сервером є localstorage)
    - Кнопка "Logout"
- Система авторизації
  - Збереження стану авторизації
  - Middleware для перевірки авторизації

  

## Додактові вимоги (за бажанням)
- Використати Mantine UI для стилізації (https://mantine.dev/guides/react-router/)
- Повідомлення про помилки
- Чистий, сучасний інтерфейс
- **Зробити проект готовим до production**

## Authorization

```bash
curl --location 'https://auth.sq-inf-site.online/realms/master/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=integration-api' \
--data-urlencode 'username=testuser' \
--data-urlencode 'password=12345678'

{
"access_token": "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJFNXZTZGU3N0w3VVVSVGNsZGZmT011cXhfelQ5ZFJWWFJkWmY5bUxnUEEwIn0.eyJleHAiOjE3NTc1Nzk0NDAsImlhdCI6MTc1NzU3ODg0MCwianRpIjoiYzEwMjBkN2QtYmI2Yi00ZDA5LWJmZWUtMWFiNDU5ZThjMDc3IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNxLWluZi1zaXRlLm9ubGluZS9yZWFsbXMvbWFzdGVyIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6Ijk0YjhmMTVmLWE2OGMtNDM5Ni1hZGQ5LTE1NzhkMDQ3MGQzZCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImludGVncmF0aW9uLWFwaSIsInNpZCI6ImZjNzZlMDcxLTVkYzEtNGNhOC1iN2M2LTk4ODU1N2RjZmIxZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo1MTczIiwiaHR0cDovL2xvY2FsaG9zdDo1MTc0Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoidGVzdHVzZXIifQ.bGueyXNE_HxInpuERHYGymf1ukO9FiWFjmlLE_JIvZHJ1NjL6qhIm0mdiwu0jJvQWqfRsNf8EMu6xGgNGet1LPMaK8sDFj7ouUF8HbT6u8HXz4q2s6r0INc1e0cr6Srm4XVPxhu-J88z8MxeGRbVrwpRlY3vBbmd8Y6Qgn7uYzzVKT2nRMXvNQ3ZFh_bmm_DpDYfjtmjWnlfYg-J4pzD7EvCBRtDQN-8ObeJ7p0YeQKD6pOKhEnGaS3NDKHCUiQwKhGqajnKyVVAK8lDG-vpiOL4SVp7nDsEnHKxLvBCthhgD41fy3wdzdLOITE1LYfm7-SzCdAxolwYDX_b0oKCVQ",
"expires_in": 600,
"refresh_expires_in": 1800,
"refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjOWRjZTkyNi1kMmIxLTQyNDAtOWE5Zi00NzRiNGZhMWFkMjIifQ.eyJleHAiOjE3NTc1ODA2NDAsImlhdCI6MTc1NzU3ODg0MCwianRpIjoiYWQ2ZDlkYzQtZmM4Yi00ZDYxLWE0ZjEtZTE1OTM5M2M4NDMyIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNxLWluZi1zaXRlLm9ubGluZS9yZWFsbXMvbWFzdGVyIiwiYXVkIjoiaHR0cHM6Ly9hdXRoLnNxLWluZi1zaXRlLm9ubGluZS9yZWFsbXMvbWFzdGVyIiwic3ViIjoiOTRiOGYxNWYtYTY4Yy00Mzk2LWFkZDktMTU3OGQwNDcwZDNkIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImludGVncmF0aW9uLWFwaSIsInNpZCI6ImZjNzZlMDcxLTVkYzEtNGNhOC1iN2M2LTk4ODU1N2RjZmIxZCIsInNjb3BlIjoiZW1haWwgd2ViLW9yaWdpbnMgYWNyIHJvbGVzIHByb2ZpbGUgYmFzaWMifQ.AAFChC-DnTVgB6Pl7piX6VMydmBEbVf_Sb1-BCZpD6-cEs3m74frvBGR4a485ctM-8l0hlMJGfZG9_mr8EE6Sw",
"token_type": "Bearer",
"not-before-policy": 0,
"session_state": "fc76e071-5dc1-4ca8-b7c6-988557dcfb1d",
"scope": "email profile"
}
```

## Refresh token
```bash
curl --location 'https://auth.sq-inf-site.online/realms/master/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=refresh_token' \
--data-urlencode 'client_id=integration-api' \
--data-urlencode 'refresh_token=eyJhbGciOiJIUzUxMiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJjOWRjZTkyNi1kMmIxLTQyNDAtOWE5Zi00NzRiNGZhMWFkMjIifQ.eyJleHAiOjE3NTc1ODExMzgsImlhdCI6MTc1NzU3OTMzOCwianRpIjoiODNmMmQ5NWYtYTY3Yi00YWJkLWIxOTktZDkxNjAxZTBiYjM4IiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnNxLWluZi1zaXRlLm9ubGluZS9yZWFsbXMvbWFzdGVyIiwiYXVkIjoiaHR0cHM6Ly9hdXRoLnNxLWluZi1zaXRlLm9ubGluZS9yZWFsbXMvbWFzdGVyIiwic3ViIjoiOTRiOGYxNWYtYTY4Yy00Mzk2LWFkZDktMTU3OGQwNDcwZDNkIiwidHlwIjoiUmVmcmVzaCIsImF6cCI6ImludGVncmF0aW9uLWFwaSIsInNpZCI6IjFiNGE5Njk1LWUxNGYtNDE1Ni05ODM4LWU2NGEyOGQ3YWZhOCIsInNjb3BlIjoiZW1haWwgd2ViLW9yaWdpbnMgYWNyIHJvbGVzIHByb2ZpbGUgYmFzaWMifQ.mkM03FaDa9LyhARRjWZwLXHujnh3UY-Rng-Hw5Tcl5AhKIGxjQrj9PPtwoB4dnrxFd5nc9XXLD_1VHrbLg9aPw'
```
