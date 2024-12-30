# Task Manager - Aplicación de Administración de Tareas

**Task Manager** es una aplicación web moderna que permite a los usuarios gestionar tareas de manera eficiente y organizada. Esta aplicación ofrece una interfaz de usuario intuitiva, autenticación con JWT para proteger las rutas, animaciones, un diseño responsive y documentación Swagger para la API.

### Acceso

Para acceder a la aplicación, utiliza las siguientes credenciales:

- **Email:** `usertest@email.com`
- **Contraseña:** `password1`

Puedes acceder al sitio desplegado en Vercel aquí:  
[**Task Manager en Vercel**](https://task-manager-seven-lemon.vercel.app)

El servidor está desplegado en Render:  
[**Servidor API en Render**](https://task-manager-server-n7nd.onrender.com)

### Características

- **Gestión de tareas:** Crear, editar, marcar como completada y eliminar tareas.
- **Autenticación:** Protege las rutas con JWT (JSON Web Token). Requiere iniciar sesión para acceder a las funciones de gestión de tareas.
- **Interfaz moderna y responsive:** Diseño limpio y adaptable a dispositivos móviles y de escritorio.
- **Animaciones:** Transiciones suaves y animaciones para una experiencia de usuario fluida.
- **Documentación Swagger:** La API está documentada con Swagger para facilitar el uso de las rutas disponibles.
- **Pruebas con Jest:** El servidor incluye pruebas unitarias y de integración usando Jest para asegurar la estabilidad de la aplicación.
- **Base de Datos:** Utiliza **MongoDB** como base de datos, y **Mongoose** para el manejo de los datos en el servidor.

### Tecnologías Utilizadas

#### **Frontend:**
- **React**: Para construir una interfaz de usuario dinámica y reactiva.
- **Vite**: Como bundler para el frontend.
- **React Router**: Para gestionar las rutas de la aplicación.
- **CSS Animations**: Para animaciones y transiciones suaves.
  
#### **Backend:**
- **Node.js**: Para crear un servidor rápido y escalable.
- **Express**: Framework para manejar las rutas y solicitudes HTTP.
- **MongoDB**: Base de datos NoSQL para almacenar las tareas y usuarios.
- **Mongoose**: Librería para interactuar con MongoDB de forma eficiente.
- **JWT**: Para la autenticación y protección de las rutas.
- **Swagger**: Para la documentación de la API.
- **Jest**: Para pruebas unitarias e integradas en el servidor.

### Rutas de la API

- **POST `/login`**: Inicia sesión con las credenciales del usuario y genera un token JWT.
- **GET `/tasks`**: Obtiene todas las tareas del usuario autenticado.
- **GET `/tasks:id`**: Obtiene una tarea del usuario autenticado.
- **POST `/tasks`**: Crea una nueva tarea.
- **PUT `/tasks/:id`**: Actualiza una tarea existente.
- **DELETE `/tasks/:id`**: Elimina una tarea.
- **GET `/api-docs`**: Accede a la documentación de la API con Swagger.

### Instalación y Configuración

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/tu-usuario/task-manager.git
   ```

2. **Instalación del cliente (React):**

   - Navega al directorio del cliente y ejecuta el siguiente comando para instalar las dependencias:
   
     ```bash
     cd client
     npm install
     ```

   - Inicia el servidor de desarrollo con Vite:
   
     ```bash
     npm run dev
     ```

3. **Instalación del servidor (Node.js):**

   - Navega al directorio del servidor y ejecuta el siguiente comando para instalar las dependencias:
   
     ```bash
     cd server
     npm install
     ```

   - Crea un archivo `.env` en el directorio del servidor y configura las siguientes variables de entorno:

     ```bash
     MONGO_URI=mongodb://localhost:27017/task_manager
     JWT_SECRET=tu_secreto_jwt
     ```

   - Inicia el servidor:

     ```bash
     npm run start
     ```

### Estructura de Archivos

- **client/**: Contiene el frontend construido con React.
- **server/**: Contiene el backend construido con Node.js y Express, interactuando con MongoDB a través de Mongoose.

### Contribuciones

Si deseas contribuir al proyecto, puedes seguir estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu función o corrección de errores:
   ```bash
   git checkout -b nueva-funcionalidad
   ```
3. Realiza los cambios y haz commit:
   ```bash
   git commit -am 'Agrega nueva funcionalidad'
   ```
4. Empuja tus cambios:
   ```bash
   git push origin nueva-funcionalidad
   ```
5. Abre un pull request desde tu rama hacia la rama principal del repositorio.

---

¡Gracias por usar **Task Manager**! 🎉

```
