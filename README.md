# DiabetesPredictorApp

Endpoints:

## AI – FastAPI (tylko predykcja)

* POST /v1/predict – przyjmuje dokładnie 5 pól: { hba1c_level: float, blood_glucose_level: int, bmi: float, age: float, smoking_history: int } i zwraca: { prediction: 0|1, probability: float }; bez autoryzacji, wołane wyłącznie przez backend **.**

http://localhost:8080/swagger-ui/html
## Backend – Spring Boot (API dla frontu)

Uwierzytelnianie i użytkownicy:

* POST /auth/register – rejestracja nowego użytkownika (email, hasło; opcjonalnie imię, nazwisko, data urodzenia).
* POST /auth/login – logowanie; zwraca access JWT; bez refresh tokenów.
* GET /auth/me – dane aktualnego użytkownika; wymaga JWT.
* PUT /users/me – pełna edycja profilu zalogowanego użytkownika (imię, nazwisko, data urodzenia, płeć opcjonalnie); wymaga JWT.
* GET /users/me – alias do /auth/me, aby UI mógł łatwo wczytać dane w formularzu; wymaga JWT.
* Admin opcjonalnie:
  * GET /admin/users – lista użytkowników (tylko jeśli potrzebujesz panelu admina); wymaga roli ADMIN.
  * PATCH /admin/users/{id}/role – zmiana roli na USER/ADMIN; wymaga roli ADMIN.

Predykcje:

* POST /api/predictions – przyjmuje rozbudowany formularz użytkownika (np. weight, height, dateOfBirth, hba1cLevel, bloodGlucoseLevel, smokingHistory, opcjonalnie inne pola UI); backend przelicza age i BMI, mapuje do dokładnych 5 cech wymaganych przez model i woła AI; wymaga JWT; zwraca: { id, prediction, probability, createdAt }.
* GET /api/predictions – lista historii predykcji zalogowanego użytkownika (paginacja i filtry from/to opcjonalne); wymaga JWT.
* GET /api/predictions/{id} – szczegóły pojedynczej predykcji użytkownika; wymaga JWT.
* DELETE /api/predictions/{id} – usunięcie własnego wpisu z historii (jeśli chcesz na to pozwolić); wymaga JWT.

Uwagi do kontraktów:

* Backend zawsze buduje wektor [HbA1c, Glucose, BMI, Age, Smoking] w takiej kolejności, by pozostać zgodnym z modelem zapisanym w .pkl; model zwraca predict oraz predict_proba dla klasy pozytywnej, które mapowane są na prediction i probability zwracane do frontu.
* Dodatkowe pola z formularza (np. waga, wzrost, płeć, ciśnienie) nie są wysyłane do AI, ale mogą być zapisane przy predykcji do historii dla wygody użytkownika; jeśli podane są weight i height, BMI obliczane jako bmi = weight / (height/100)^2; jeśli podana jest data urodzenia, obliczane jest age w latach na dzień zapytania.

## Frontend – ścieżki UI

* GET /login – logowanie; public.
* GET /register – rejestracja; public.
* GET /predict – ankieta (pobiera domyślne dane profilu z /users/me i pozwala nadpisać w formularzu); wymaga zalogowania; wysyła POST do /api/predictions.
* GET /history – historia predykcji zalogowanego użytkownika; wymaga zalogowania; GET /api/predictions.
* GET /profile – podgląd i edycja profilu; wymaga zalogowania; używa GET/PUT /users/me.   
