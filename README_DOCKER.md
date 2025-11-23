# Guía de Docker para SADI

Este proyecto ha sido configurado para ejecutarse con Docker.

## Requisitos

- Docker Desktop instalado y corriendo.

## Instrucciones

1.  **Construir y levantar los contenedores:**

    Abre una terminal en la raíz del proyecto y ejecuta:

    ```bash
    docker-compose up --build
    ```

2.  **Acceder a la aplicación:**

    - **Frontend:** [http://localhost:3000](http://localhost:3000)
    - **Backend API:** [http://localhost:8000](http://localhost:8000)
    - **Documentación API:** [http://localhost:8000/docs](http://localhost:8000/docs)

## Notas Importantes

- **Hot Reload:** El frontend está configurado para recargar automáticamente los cambios (hot reload) gracias al volumen montado.
- **Backend:** El backend también se recargará si modificas los archivos Python.
- **Variables de Entorno:**
    - El frontend lee `.env.local`.
    - El backend lee `backend/.env`.
    - Asegúrate de que estos archivos contengan las claves necesarias (ej. `GEMINI_API_KEY`).

## Solución de Problemas

- Si tienes errores de permisos o módulos no encontrados en el frontend, intenta borrar `node_modules` localmente o reconstruir la imagen:
    ```bash
    docker-compose build --no-cache
    ```
- Si el backend falla, revisa los logs:
    ```bash
    docker-compose logs backend
    ```
