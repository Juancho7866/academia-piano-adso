1. Descripción del Proyecto
Sistema integral para la gestión de lecciones de piano que permite la carga de recursos multimedia (vídeos) y su asociación dinámica con cursos específicos. El sistema garantiza la persistencia de datos y una experiencia de usuario fluida mediante una arquitectura moderna.

3. Arquitectura del Sistema
El proyecto se basa en una arquitectura de Tres Capas (Cliente-Servidor-Base de Datos):
•	Frontend (Capa de Presentación): Desarrollado con HTML5, CSS3 y JavaScript Vanila . Utiliza Fetch APIpara la comunicación asíncrona con el servidor, evitando recargas innecesarias de la página.
•	Backend (Capa de Lógica): Construido sobre Node.js utilizando el framework Express . Se encarga de la gestión de rutas, procesamiento de archivos mediante Multery lógica de negocio.
•	Base de Datos (Capa de Persistencia): Sistema relacional MySQL . Implemente una estructura de tablas normalizadas con integridad referencial (Foreign Keys) para asegurar que cada lección pertenezca a un curso válido.

4. Especificaciones de la Base de Datos
La estructura se optimizó para soportar la relación entre cursos y contenidos:
•	Tabla cursos: Almacena la información principal (ID, título, descripción, nivel).
•	Tabla lecciones: Contiene la relación cursos_id, el título de la lección y la ruta física de video ( video_url).

5. Funcionalidades Clave Implementadas
1.	Carga de Archivos Multimedia: Procesamiento de vídeos MP4 mediante almacenamiento local seguro en el servidor.
2.	Inyección Dinámica de Contenido: Generación automática de tarjetas de curso y reproductores de video mediante manipulación del DOM.
3.	Control de Errores (Troubleshooting): Implementación de validaciones para evitar registros huérfanos y manejo de estados HTTP (Error 500 corregido). 
