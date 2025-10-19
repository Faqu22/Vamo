# Vamo 🚀

¡La app para organizar planes espontáneos!

Vamo es una aplicación móvil diseñada para ayudar a las personas a conectar y socializar mediante la creación y participación en planes improvisados. Ya sea que quieras tomar un café, jugar un partido de fútbol o encontrar a alguien para ir a un concierto, Vamo facilita el encuentro con personas cercanas que comparten tus intereses.

## ✨ Características Principales

-   **Explora Planes en un Mapa:** Descubre actividades y planes que están sucediendo a tu alrededor en tiempo real.
-   **Crea Tus Propios Planes:** Configura fácilmente un plan, define preferencias (como rango de edad, tamaño del grupo) e invita a otros a unirse.
-   **Flujo de Creación Detallado:** Un proceso guiado paso a paso para crear planes, cubriendo actividad, horario, ubicación y preferencias.
-   **Perfiles de Usuario:** Personaliza tu perfil con tus intereses, biografía y foto.
-   **Mensajería en Tiempo Real:** Chatea con los participantes de un plan para coordinar los detalles.
-   **Autenticación Segura:** Registro e inicio de sesión de usuarios.
-   **Modo Claro y Oscuro:** Interfaz adaptada para una excelente experiencia de usuario en cualquier condición de luz.

## 🛠️ Stack Tecnológico

-   **Framework:** React Native con Expo
-   **Enrutamiento:** Expo Router (basado en archivos)
-   **Gestión de Datos:** SWR con Axios
-   **Estilos:** React Native StyleSheet con un sistema de temas personalizado
-   **Iconos:** Expo Symbols (SF Symbols en iOS) y Material Icons (Android/Web)
-   **Lenguaje:** TypeScript

## 🚀 Cómo Empezar

### Prerrequisitos

-   [Node.js](https://nodejs.org/) (versión LTS recomendada)
-   [pnpm](https://pnpm.io/installation) (manejador de paquetes del proyecto)
-   Un simulador de iOS (a través de Xcode) o un emulador de Android (a través de Android Studio).

### Instalación y Ejecución

1.  **Clona el repositorio:**
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    cd vamo
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npx expo start
    ```

Esto abrirá las herramientas de desarrollo de Expo en tu navegador. Desde allí, puedes:
-   Presionar `i` para ejecutar en el **Simulador de iOS**.
-   Presionar `a` para ejecutar en el **Emulador de Android**.
-   Escanear el código QR con la aplicación **Expo Go** en tu dispositivo físico (algunas funcionalidades nativas podrían no estar disponibles).

## 📂 Estructura del Proyecto

-   `app/`: Contiene todas las pantallas y rutas, siguiendo la convención de enrutamiento de Expo Router.
-   `components/`: Componentes de UI reutilizables.
-   `contexts/`: Providers de React Context para gestionar el estado global (ej. Autenticación, Creación de Planes).
-   `hooks/`: Hooks de React personalizados para la obtención de datos (con SWR) y otra lógica.
-   `lib/`: Funciones de utilidad, configuración de Axios y otros módulos de ayuda.
-   `types/`: Definiciones de tipos de TypeScript para las estructuras de datos.
-   `constants/`: Datos estáticos como los colores del tema y fuentes.
-   `mocksdata/`: Datos de prueba utilizados durante el desarrollo.

## 📄 API

La aplicación se comunica con una API de backend. Para obtener información detallada sobre los endpoints, formatos de solicitud/respuesta y autenticación, consulta la [Documentación de la API](API_DOCUMENTATION.md).