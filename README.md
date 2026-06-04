# 🌎 Country Quiz App

Aplicación web de preguntas y respuestas sobre países.

## 📖 Descripción

Country Quiz es una aplicación interactiva que pone a prueba los conocimientos del usuario sobre países del mundo. Las preguntas se generan dinámicamente utilizando información obtenida desde una API externa.

El usuario responde 10 preguntas de selección múltiple, recibe retroalimentación inmediata y obtiene una puntuación final al terminar el cuestionario.

---

## 🚀 Tecnologías Utilizadas

- React
- TypeScript
- Vite
- React Router DOM (Latest)
- Tailwind CSS
- Fetch API
- ESLint
- Vitest
- Testing Library

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/
├── components/
├── data/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── tests/
├── utils/
├── App.tsx
├── index.css
└── main.tsx
```

---

## ✨ Funcionalidades

### Funcionalidades Base

- Generación automática de 10 preguntas.
- Consumo de API de países.
- 4 opciones por pregunta.
- Retroalimentación inmediata.
- Navegación entre preguntas.
- Página de resultados.
- Reinicio del cuestionario.

### Funcionalidades Adicionales

- ⏱️ Temporizador de 15 segundos por pregunta.
- 🏆 Persistencia de récord (High Score) con localStorage.
- 🌙 Modo Oscuro / Claro.
- 🔊 Sonidos sutiles de acierto, error y tiempo agotado.
- 📱 Diseño responsive.

---

## 🛠️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/maria1625/Quiz-App.git
```

Ingresar al proyecto:

```bash
cd Quiz-App
```

Instalar dependencias:

```bash
npm install
```

Ejecutar en desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Previsualizar producción:

```bash
npm run preview
```

---

## 🧪 Pruebas

Ejecutar pruebas:

```bash
npm test
```

Ejecutar ESLint:

```bash
npm run lint
```

---

## 🌍 API Utilizada

REST Countries API

```text
https://restcountries.com/v3.1/all?fields=name,capital,region,flags,population
```

---

## 📌 Rutas del Sistema

| Ruta | Descripción |
|--------|--------|
| / | Página principal |
| /quiz | Cuestionario |
| /result | Resultados |
| * | Página 404 |

---

## 👥 Integrantes

- María  Guerra 
- Jorge Montoya
- Jaider Chindoy 

---


## 🌐 Despliegue

Demo:

```text
Pendiente
```


