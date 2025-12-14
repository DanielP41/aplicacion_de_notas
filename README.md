# 📝 Aplicación de Notas

Una aplicación web para gestionar notas personales, desarrollada con Spring Boot y React.

Este proyecto fue creado como parte del desafío técnico de Ensolvers.

## 🚀 Características

- Crear notas con título y contenido
- Editar notas existentes
- Eliminar notas
- Archivar y desarchivar notas
- Interfaz simple y fácil de usar
- API REST para todas las operaciones

## 🛠️ Tecnologías

**Backend:**
- Java 21
- Spring Boot 3.4.12
- PostgreSQL
- Maven

**Frontend:**
- React 19.2.0
- Vite
- Axios para las peticiones HTTP

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- Java 21 o superior
- Node.js (versión 18 o superior)
- PostgreSQL
- Maven

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/DanielP41/aplicacion_de_notas.git
cd aplicacion_de_notas
```

### 2. Configurar la Base de Datos

Primero, crea una base de datos en PostgreSQL:

```sql
CREATE DATABASE notasDB;
```

Luego, configura las credenciales en `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/notasDB
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

### 3. Ejecutar el Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

El servidor estará corriendo en `http://localhost:8081`

### 4. Ejecutar el Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📱 Uso

1. Abre tu navegador en `http://localhost:5173`
2. Usa el formulario para crear una nueva nota
3. Puedes editar, archivar o eliminar notas desde la lista
4. Cambia entre notas activas y archivadas usando las pestañas

## 🔌 API Endpoints

La API REST está disponible en `http://localhost:8081/api/notes`

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/notes` | Obtener todas las notas activas |
| GET | `/api/notes/archived` | Obtener notas archivadas |
| GET | `/api/notes/{id}` | Obtener una nota específica |
| POST | `/api/notes` | Crear una nueva nota |
| PUT | `/api/notes/{id}` | Actualizar una nota |
| DELETE | `/api/notes/{id}` | Eliminar una nota |
| PATCH | `/api/notes/{id}/archive` | Archivar una nota |
| PATCH | `/api/notes/{id}/unarchive` | Desarchivar una nota |

### Ejemplo de Petición

```json
POST /api/notes
{
  "title": "Mi primera nota",
  "content": "Este es el contenido de mi nota"
}
```

## 📁 Estructura del Proyecto

```
aplicacion_de_notas/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/Ensolvers/Notas/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── model/
│   │   │   │       ├── repository/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## 🧪 Testing

Para ejecutar los tests del backend:

```bash
cd backend
mvn test
```

## 🐛 Problemas Comunes

**Error de conexión a la base de datos:**
- Verifica que PostgreSQL esté corriendo
- Revisa que las credenciales en `application.properties` sean correctas
- Asegúrate de que la base de datos `notasDB` exista

**El frontend no se conecta al backend:**
- Verifica que el backend esté corriendo en el puerto 8081
- Revisa la configuración de CORS en el backend

## 💡 Mejoras Futuras

Algunas ideas para mejorar la aplicación:

- [ ] Agregar autenticación de usuarios
- [ ] Implementar búsqueda de notas
- [ ] Agregar categorías o etiquetas
- [ ] Modo oscuro
- [ ] Exportar notas a PDF
- [ ] Recordatorios


Este proyecto fue desarrollado como parte de un desafío técnico.

 Cualquier feedback es bienvenido!
