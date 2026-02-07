# Hambre Cero - Frontend Web

Cliente web para el sistema **RecipeApp / Hambre Cero**. Permite la gestión visual de recetas e ingredientes consumiendo la API REST del backend.

## 🛠️ Tecnologías

*   **Core:** React
*   **Build Tool:** Vite 
*   **Estilos:** TailwindCSS 
*   **HTTP Client:** Axios 
*   **Routing:** React Router 

## 📂 Estructura del Proyecto

El código fuente se organiza modularmente en `src/` :
*   `components/`: Elementos reutilizables (tarjetas, formularios, layout).
*   `pages/`: Vistas principales (Listados, Detalles, Edición).
*   `services/`: Lógica de conexión con la API (Axios).
*   `assets/`: Recursos estáticos.

## ✨ Funcionalidades

*   **Navegación SPA:** Transiciones sin recarga de página .
*   **Gestión de Recetas e Ingredientes:**
    *   Listados y vistas de detalle.
    *   Formularios de creación y edición.
*   **Feedback de Usuario:** Gestión de estados de Carga (Loading) y Error .

## 🚀 Configuración y Ejecución

1.  **Instalar dependencias** (asumiendo Node.js instalado):
    ```bash
    npm install
    ```
2.  **Ejecutar en desarrollo:**
    ```bash
    npm run dev
    ```
3.  **Configuración API:**
    La configuración base de Axios se encuentra en la capa de servicios, apuntando al backend local.

## 📱 Vistas Principales

*   Inicio
*   Listado de recetas / ingredientes
*   Crear
*   Editar receta/ ingrediente
*   Eliminar receta / ingrediente
