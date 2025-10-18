# Documentación de la API de Vamo

Este documento describe los endpoints de la API para la aplicación Vamo.

## URL Base

La URL base para todas las llamadas a la API es:
`https://api.vamoapp.com/v1`

## Autenticación

Todos los endpoints protegidos requieren un encabezado `Authorization` con un token JWT (JSON Web Token).

-   **Encabezado:** `Authorization: Bearer <access_token>`

## Formato de Respuesta de Error Estándar

Todas las respuestas de error (códigos 4xx y 5xx) seguirán este formato:

```json
{
  "detail": "Mensaje de error que describe el problema."
}
```

---

## 1. Autenticación (`/auth`)

### 1.1. Registrar un nuevo usuario

-   **Endpoint:** `/auth/register`
-   **Método:** `POST`
-   **Descripción:** Crea una nueva cuenta de usuario.
-   **Autenticación:** No requerida.
-   **Payload (Request Body):**
    ```json
    {
      "email": "usuario@ejemplo.com",
      "password": "passwordseguro123",
      "name": "Juan",
      "lastName": "Pérez"
    }
    ```
-   **Respuesta Exitosa (Success Response):**
    -   **Código:** `201 Created`
    -   **Contenido:**
        ```json
        {
          "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

### 1.2. Iniciar sesión

-   **Endpoint:** `/auth/login`
-   **Método:** `POST`
-   **Descripción:** Autentica a un usuario y devuelve tokens de acceso y de refresco.
-   **Autenticación:** No requerida.
-   **Payload (Request Body):**
    ```json
    {
      "email": "usuario@ejemplo.com",
      "password": "passwordseguro123"
    }
    ```
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
        ```

---

## 2. Perfil de Usuario (`/profile`)

### 2.1. Obtener mi perfil

-   **Endpoint:** `/profile/me`
-   **Método:** `GET`
-   **Descripción:** Recupera el perfil del usuario autenticado actualmente.
-   **Autenticación:** Requerida.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "name": "Juan",
          "lastName": "Pérez",
          "age": 28,
          "profilePictureUrl": "https://ejemplo.com/ruta/a/imagen.jpg",
          "bio": "Amante del buen café, los libros y las caminatas...",
          "interests": ["Fútbol", "Cine", "Gastronomía", "Viajar"]
        }
        ```

### 2.2. Actualizar mi perfil

-   **Endpoint:** `/profile/me`
-   **Método:** `PATCH`
-   **Descripción:** Actualiza campos específicos del perfil del usuario autenticado.
-   **Autenticación:** Requerida.
-   **Payload (Request Body):** (Enviar solo los campos a actualizar)
    ```json
    {
      "age": 29,
      "bio": "Biografía actualizada.",
      "interests": ["Fútbol", "Cine", "Gastronomía", "Viajar", "Música en vivo"]
    }
    ```
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:** El objeto completo del perfil de usuario actualizado.

### 2.3. Subir foto de perfil

-   **Endpoint:** `/profile/me/avatar`
-   **Método:** `POST`
-   **Descripción:** Sube o actualiza la foto de perfil del usuario.
-   **Autenticación:** Requerida.
-   **Encabezados:** `Content-Type: multipart/form-data`
-   **Payload (Request Body):**
    -   Una petición `form-data` con un campo `avatar` que contiene el archivo de imagen.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "profilePictureUrl": "https://ejemplo.com/ruta/a/nueva_imagen.jpg"
        }
        ```

---

## 3. Planes (`/plans`)

### 3.1. Obtener planes cercanos

-   **Endpoint:** `/plans`
-   **Método:** `GET`
-   **Descripción:** Recupera una lista de planes públicos cerca de una ubicación, con filtros opcionales.
-   **Autenticación:** Requerida.
-   **Parámetros de Consulta (Query Params):**
    -   `latitude` (number, requerido): Latitud actual del usuario.
    -   `longitude` (number, requerido): Longitud actual del usuario.
    -   `radius` (number, opcional, default: 5): Radio de búsqueda en kilómetros.
    -   `interests` (string, opcional): Lista de intereses separados por comas (ej: "Fútbol,Cine").
    -   `activity` (string, opcional): Término de búsqueda para la actividad del plan.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "plans": [
            {
              "id": "plan-123",
              "title": "Fútbol en Palermo",
              "description": "Partido 5vs5, ¡nos falta uno!",
              "category": "sport",
              "coordinate": {
                "latitude": -34.572,
                "longitude": -58.425
              },
              "participantCount": 9,
              "capacity": 10
            }
          ]
        }
        ```

### 3.2. Crear un plan

-   **Endpoint:** `/plans`
-   **Método:** `POST`
-   **Descripción:** Crea un nuevo plan.
-   **Autenticación:** Requerida.
-   **Payload (Request Body):** (Coincide con el tipo `NewPlan` de la app)
    ```json
    {
      "activity": "Café 30'",
      "description": "Una charla para cortar la tarde.",
      "when": "Ahora",
      "duration": 30,
      "availabilityStart": null,
      "availabilityEnd": null,
      "location": {
        "name": "Café La Poesía",
        "address": "Bolívar 734, CABA",
        "latitude": -34.6174,
        "longitude": -58.3725
      },
      "locationDescription": "Nos vemos en la mesa de la ventana.",
      "capacity": 4,
      "genderPreference": "any",
      "ageRange": { "min": 25, "max": 40 },
      "isFlexible": false,
      "visibility": "Público"
    }
    ```
-   **Respuesta Exitosa:**
    -   **Código:** `201 Created`
    -   **Contenido:** El objeto del plan recién creado.

### 3.3. Obtener detalles de un plan

-   **Endpoint:** `/plans/:planId`
-   **Método:** `GET`
-   **Descripción:** Recupera información detallada de un plan específico.
-   **Autenticación:** Requerida.
-   **Parámetros de URL (URL Params):**
    -   `planId` (string, requerido): El ID del plan.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "id": "plan-123",
          "title": "Fútbol en Palermo",
          "description": "Partido 5vs5, ¡nos falta uno!",
          "category": "sport",
          "coordinate": { "latitude": -34.572, "longitude": -58.425 },
          "locationDescription": "Cancha 3",
          "when": "Hoy",
          "availabilityStart": "19:00",
          "availabilityEnd": "20:00",
          "capacity": 10,
          "genderPreference": "any",
          "ageRange": { "min": 18, "max": 99 },
          "isFlexible": false,
          "visibility": "Público",
          "creator": {
            "id": "user-abc",
            "name": "Carlos",
            "profilePictureUrl": "..."
          },
          "participants": [
            { "id": "user-def", "name": "Ana", "profilePictureUrl": "..." }
          ]
        }
        ```

### 3.4. Unirse a un plan

-   **Endpoint:** `/plans/:planId/join`
-   **Método:** `POST`
-   **Descripción:** Permite al usuario autenticado unirse a un plan.
-   **Autenticación:** Requerida.
-   **Parámetros de URL:**
    -   `planId` (string, requerido): El ID del plan al que se unirá.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "message": "Te has unido al plan exitosamente."
        }
        ```
-   **Respuesta de Error:**
    -   **Código:** `409 Conflict` (si el plan está lleno o el usuario no cumple los criterios).
    -   **Código:** `404 Not Found` (si el plan no existe).

---

## 4. Amigos y Lugares (`/profile/me/*`)

### 4.1. Obtener mi lista de amigos

-   **Endpoint:** `/profile/me/friends`
-   **Método:** `GET`
-   **Descripción:** Recupera la lista de amigos del usuario autenticado.
-   **Autenticación:** Requerida.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "friends": [
            {
              "id": "user-1",
              "name": "Ana Gómez",
              "profilePictureUrl": "https://i.pravatar.cc/100?u=anagomez"
            }
          ]
        }
        ```

### 4.2. Obtener mis lugares frecuentes

-   **Endpoint:** `/profile/me/places`
-   **Método:** `GET`
-   **Descripción:** Recupera los lugares frecuentes del usuario autenticado.
-   **Autenticación:** Requerida.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "places": [
            {
              "id": "place-1",
              "name": "Café La Poesía",
              "address": "Bolívar 734, CABA",
              "category": "Cafetería",
              "imageUrl": "https://images.unsplash.com/..."
            }
          ]
        }
        ```

---

## 5. Búsqueda de Ubicaciones (`/locations`)

### 5.1. Buscar ubicaciones

-   **Endpoint:** `/locations/search`
-   **Método:** `GET`
-   **Descripción:** Busca lugares y direcciones. Podría integrarse con una API externa como Google Places.
-   **Autenticación:** Requerida.
-   **Parámetros de Consulta:**
    -   `query` (string, requerido): El término de búsqueda.
    -   `latitude` (number, opcional): Latitud del usuario para sesgar los resultados.
    -   `longitude` (number, opcional): Longitud del usuario para sesgar los resultados.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "results": [
            {
              "id": "external-place-id-1",
              "name": "Café La Poesía",
              "address": "Bolívar 734, CABA",
              "coordinate": {
                "latitude": -34.6174,
                "longitude": -58.3725
              }
            }
          ]
        }
        ```

---

## 6. Mensajería (`/messages`)

### 6.1. Obtener conversaciones

-   **Endpoint:** `/messages/conversations`
-   **Método:** `GET`
-   **Descripción:** Recupera una lista de las conversaciones de mensajes del usuario.
-   **Autenticación:** Requerida.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "conversations": [
            {
              "id": "conv-1",
              "type": "plan",
              "name": "Fútbol en Palermo",
              "lastMessage": {
                "text": "¡Nos vemos a las 19hs!",
                "timestamp": "2024-08-15T18:30:00Z"
              },
              "unreadCount": 2
            }
          ]
        }
        ```

### 6.2. Obtener mensajes de una conversación

-   **Endpoint:** `/messages/conversations/:conversationId`
-   **Método:** `GET`
-   **Descripción:** Recupera el historial de mensajes de una conversación específica.
-   **Autenticación:** Requerida.
-   **Parámetros de URL:**
    -   `conversationId` (string, requerido): El ID de la conversación.
-   **Parámetros de Consulta:**
    -   `before` (string, opcional): Un cursor (ej: ID de mensaje o timestamp) para paginación y obtener mensajes más antiguos.
-   **Respuesta Exitosa:**
    -   **Código:** `200 OK`
    -   **Contenido:**
        ```json
        {
          "messages": [
            {
              "id": "msg-1",
              "text": "Hola! ¿Quién lleva la pelota?",
              "timestamp": "2024-08-15T18:00:00Z",
              "sender": {
                "id": "user-xyz",
                "name": "Lucía"
              }
            }
          ]
        }
        ```

### 6.3. Enviar un mensaje

-   **Endpoint:** `/messages/conversations/:conversationId`
-   **Método:** `POST`
-   **Descripción:** Envía un mensaje a una conversación. (En una app real, esto se manejaría idealmente con WebSockets, pero un endpoint REST es un buen punto de partida).
-   **Autenticación:** Requerida.
-   **Parámetros de URL:**
    -   `conversationId` (string, requerido): El ID de la conversación.
-   **Payload (Request Body):**
    ```json
    {
      "text": "¡Yo la llevo!"
    }
    ```
-   **Respuesta Exitosa:**
    -   **Código:** `201 Created`
    -   **Contenido:** El objeto del mensaje recién creado.