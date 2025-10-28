# DiabetesPredictorApp

Endpoints:

## AI – FastAPI (tylko predykcja)

* POST /v1/predict – przyjmuje dokładnie 5 pól: { hba1c_level: float, blood_glucose_level: int, bmi: float, age: float, smoking_history: int } i zwraca: { prediction: 0|1, probability: float }; bez autoryzacji, wołane wyłącznie przez backend **.**




# Dokumentacja API Backendu

http://localhost:8080/swagger-ui.html

Poniżej znajduje się lista dostępnych endpointów REST API, podzielona według funkcjonalności.

## 🔑 Authentication

Endpointy odpowiedzialne za rejestrację, logowanie i zarządzanie sesją użytkownika.

| Metoda | Ścieżka | Opis | Dostęp |
|--------|---------|------|--------|
| `POST` | `/auth/signup` | Rejestracja nowego użytkownika. | Public |
| `POST` | `/auth/login` | Logowanie i uzyskanie tokena JWT. | Public |
| `GET` | `/auth/me` | Pobranie danych o zalogowanym użytkowniku. | User |

## 👤 User Profile

Endpointy do zarządzania profilem zalogowanego użytkownika.

| Metoda | Ścieżka | Opis | Dostęp |
|--------|---------|------|--------|
| `GET` | `/users/me` | Pobranie profilu zalogowanego użytkownika. | User |
| `PUT` | `/users/me` | Aktualizacja profilu zalogowanego użytkownika. | User |

## 🔮 Predictions

Endpointy do tworzenia i zarządzania historią predykcji cukrzycy.

| Metoda | Ścieżka | Opis | Dostęp |
|--------|---------|------|--------|
| `POST` | `/api/predictions` | Tworzy nową predykcję na podstawie danych. | User |
| `GET` | `/api/predictions` | Pobiera paginowaną historię predykcji. | User |
| `GET` | `/api/predictions/{id}` | Pobiera szczegóły konkretnej predykcji. | User |
| `DELETE` | `/api/predictions/{id}` | Usuwa konkretną predykcję z historii. | User |

## 🛠️ Admin Panel

Endpointy do zarządzania użytkownikami w systemie. Wymagana rola `ADMIN`.

| Metoda | Ścieżka | Opis |
|--------|---------|------|
| `GET` | `/admin/users` | Pobiera paginowaną listę wszystkich użytkowników. |
| `POST` | `/admin/users` | Tworzy nowego użytkownika. |
| `GET` | `/admin/users/{id}` | Pobiera szczegóły konkretnego użytkownika. |
| `PUT` | `/admin/users/{id}` | Aktualizuje dane konkretnego użytkownika. |
| `DELETE` | `/admin/users/{id}` | Usuwa konkretnego użytkownika. |
## Frontend – ścieżki UI

* GET /login – logowanie; public.
* GET /register – rejestracja; public.
* GET /predict – ankieta (pobiera domyślne dane profilu z /users/me i pozwala nadpisać w formularzu); wymaga zalogowania; wysyła POST do /api/predictions.
* GET /history – historia predykcji zalogowanego użytkownika; wymaga zalogowania; GET /api/predictions.
* GET /profile – podgląd i edycja profilu; wymaga zalogowania; używa GET/PUT /users/me.   
