# Documentación Completa del Backend - Sistema de Gestión Ganadera
## Sprint 1

---

## 1. RESUMEN DEL PROYECTO

Sistema de gestión ganadera que permite administrar el inventario de animales y el control sanitario de una finca. El frontend está desarrollado en React + TypeScript y consume una API REST que debe ser implementada.

### Funcionalidades del Sprint 1:
- **HU.1**: Registrar nuevo animal
- **HU.2**: Actualización mensual de características de animales
- **HU.3**: Registrar ganado enfermo
- **HU.4**: Seguimiento de tratamientos
- **HU.5**: Registro de dietas y suplementos

---

## 2. ARQUITECTURA GENERAL

### Stack Tecnológico Sugerido:
- Framework backend: Node.js + Express / NestJS / FastAPI (Python) / Spring Boot (Java)
- Base de datos: PostgreSQL / MySQL / MongoDB
- ORM: Prisma / TypeORM / Sequelize / Mongoose
- Autenticación: JWT (JSON Web Tokens)

### URL Base de la API:
```
http://localhost:3000/api
```

---

## 3. MODELO DE DATOS

### 3.1 Entidad: **usuarios**

Tabla para almacenar los usuarios que pueden autenticarse en el sistema.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | UUID/INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único del usuario |
| email | VARCHAR(255) | NOT NULL, UNIQUE | Correo electrónico del usuario |
| password | VARCHAR(255) | NOT NULL | Contraseña hasheada (bcrypt/argon2) |
| nombre | VARCHAR(100) | NULL | Nombre completo del usuario |
| rol | ENUM | DEFAULT 'usuario' | Roles: 'admin', 'usuario', 'veterinario' |
| createdAt | TIMESTAMP | DEFAULT NOW() | Fecha de creación |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Fecha de última actualización |

### 3.2 Entidad: **animales**

Tabla principal de inventario de animales.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | UUID/INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único del animal |
| identificacion | VARCHAR(50) | NOT NULL, UNIQUE | Código de identificación del animal (ej: "001-2024") |
| nombre | VARCHAR(100) | NULL | Nombre del animal (opcional) |
| raza | VARCHAR(50) | NOT NULL | Raza del animal |
| sexo | ENUM | NOT NULL | Valores: 'macho', 'hembra' |
| fechaNacimiento | DATE | NOT NULL | Fecha de nacimiento del animal |
| peso | DECIMAL(8,2) | NOT NULL | Peso en kilogramos |
| color | VARCHAR(100) | NULL | Color del animal |
| procedencia | VARCHAR(100) | NULL | Origen/procedencia del animal |
| observaciones | TEXT | NULL | Observaciones generales |
| estado | ENUM | DEFAULT 'activo' | Estados: 'activo', 'vendido', 'muerto' |
| createdAt | TIMESTAMP | DEFAULT NOW() | Fecha de registro |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Fecha de última actualización |

**Valores permitidos para raza:**
- holstein
- brahman
- angus
- hereford
- criollo
- mestizo

### 3.3 Entidad: **actualizaciones_mensuales**

Registro histórico de actualizaciones mensuales de cada animal.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | UUID/INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| animalId | UUID/INT | FOREIGN KEY, NOT NULL | Referencia a animales.id |
| peso | DECIMAL(8,2) | NOT NULL | Peso actual del animal en kg |
| altura | DECIMAL(6,2) | NULL | Altura del animal en cm |
| condicionCorporal | INT | NULL, CHECK (1-5) | Escala de 1 a 5 |
| produccionLeche | DECIMAL(6,2) | NULL | Litros de leche producidos por día |
| estadoReproductivo | ENUM | NULL | Valores: 'vacia', 'gestante', 'lactante', 'servicio' |
| observaciones | TEXT | NULL | Observaciones del mes |
| fechaRegistro | TIMESTAMP | DEFAULT NOW() | Fecha de la actualización |
| createdAt | TIMESTAMP | DEFAULT NOW() | Fecha de creación del registro |

**Relación:** N actualizaciones → 1 animal

### 3.4 Entidad: **registros_enfermedades**

Registro de animales enfermos.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | UUID/INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| animalId | UUID/INT | FOREIGN KEY, NOT NULL | Referencia a animales.id |
| fechaDeteccion | DATE | NOT NULL | Fecha en que se detectó la enfermedad |
| enfermedad | VARCHAR(100) | NOT NULL | Nombre o tipo de enfermedad |
| sintomas | TEXT | NOT NULL | Descripción de síntomas observados |
| temperatura | DECIMAL(4,2) | NULL | Temperatura corporal en °C |
| estadoGeneral | ENUM | NULL | Valores: 'critico', 'grave', 'moderado', 'leve' |
| observaciones | TEXT | NULL | Observaciones adicionales |
| estadoActual | ENUM | DEFAULT 'activo' | Valores: 'activo', 'recuperado', 'fallecido' |
| createdAt | TIMESTAMP | DEFAULT NOW() | Fecha de creación |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Fecha de actualización |

**Valores permitidos para enfermedad:**
- mastitis
- fiebre_aftosa
- brucelosis
- parasitosis
- neumonía
- diarrea
- cojera
- otra

**Relación:** N registros de enfermedad → 1 animal

### 3.5 Entidad: **tratamientos**

Seguimiento de tratamientos aplicados a animales.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | UUID/INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| animalId | UUID/INT | FOREIGN KEY, NOT NULL | Referencia a animales.id |
| registroEnfermedadId | UUID/INT | FOREIGN KEY, NULL | Referencia a registros_enfermedades.id |
| fechaInicio | DATE | NOT NULL | Fecha de inicio del tratamiento |
| medicamento | VARCHAR(200) | NOT NULL | Nombre del medicamento |
| dosis | VARCHAR(100) | NOT NULL | Dosis administrada (ej: "10 ml") |
| frecuencia | ENUM | NOT NULL | Frecuencia de administración |
| duracion | INT | NOT NULL | Duración en días |
| viaAdministracion | ENUM | NOT NULL | Vía de administración |
| veterinario | VARCHAR(100) | NULL | Nombre del veterinario responsable |
| estadoTratamiento | ENUM | DEFAULT 'en_curso' | Estado del tratamiento |
| observaciones | TEXT | NULL | Observaciones y evolución |
| createdAt | TIMESTAMP | DEFAULT NOW() | Fecha de creación |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Fecha de actualización |

**Valores permitidos para frecuencia:**
- cada_6h
- cada_8h
- cada_12h
- cada_24h
- cada_48h

**Valores permitidos para viaAdministracion:**
- intramuscular
- intravenosa
- subcutanea
- oral
- topica

**Valores permitidos para estadoTratamiento:**
- en_curso
- completado
- suspendido
- actualizar

**Relación:** N tratamientos → 1 animal

### 3.6 Entidad: **dietas**

Registro de dietas y suplementos alimenticios.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| id | UUID/INT | PRIMARY KEY, AUTO_INCREMENT | Identificador único |
| animalId | UUID/INT | FOREIGN KEY, NOT NULL | Referencia a animales.id |
| fechaRegistro | DATE | NOT NULL | Fecha de registro de la dieta |
| tipoDieta | ENUM | NOT NULL | Tipo de dieta |
| alimentoBase | VARCHAR(200) | NOT NULL | Alimento principal |
| cantidad | DECIMAL(8,2) | NOT NULL | Cantidad en kg/día |
| suplementos | TEXT | NULL | Descripción de suplementos y minerales |
| frecuenciaAlimentacion | ENUM | NOT NULL | Frecuencia de alimentación |
| objetivoDieta | ENUM | NULL | Objetivo de la dieta |
| observaciones | TEXT | NULL | Observaciones adicionales |
| createdAt | TIMESTAMP | DEFAULT NOW() | Fecha de creación |
| updatedAt | TIMESTAMP | DEFAULT NOW() | Fecha de actualización |

**Valores permitidos para tipoDieta:**
- pastoreo
- semi_estabulado
- estabulado
- especial

**Valores permitidos para frecuenciaAlimentacion:**
- 1_vez
- 2_veces
- 3_veces
- continuo

**Valores permitidos para objetivoDieta:**
- mantenimiento
- engorde
- produccion_leche
- gestacion
- recuperacion

**Relación:** N dietas → 1 animal

---

## 4. ENDPOINTS DE LA API

### 4.1 AUTENTICACIÓN

#### POST `/api/auth/login`
Autenticación de usuario.

**Request Body:**
```json
{
  "email": "admin@finca.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid-123",
      "email": "admin@finca.com",
      "nombre": "Administrador",
      "rol": "admin"
    }
  }
}
```

**Response (401 Unauthorized):**
```json
{
  "success": false,
  "error": {
    "message": "Credenciales inválidas"
  }
}
```

**Notas:**
- El token JWT debe incluir: `userId`, `email`, `rol`
- Expiración del token: 24 horas
- El frontend almacena el token en `localStorage`

---

### 4.2 GESTIÓN DE INVENTARIO ANIMAL

#### POST `/api/animales`
Registrar un nuevo animal (HU.1).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "identificacion": "001-2024",
  "nombre": "Luna",
  "raza": "holstein",
  "sexo": "hembra",
  "fechaNacimiento": "2023-03-15",
  "peso": 450.5,
  "color": "Negro con manchas blancas",
  "procedencia": "Finca El Roble",
  "observaciones": "Animal sano, primera compra"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Animal registrado exitosamente",
  "data": {
    "id": "uuid-456",
    "identificacion": "001-2024",
    "nombre": "Luna",
    "raza": "holstein",
    "sexo": "hembra",
    "fechaNacimiento": "2023-03-15",
    "peso": 450.5,
    "color": "Negro con manchas blancas",
    "procedencia": "Finca El Roble",
    "observaciones": "Animal sano, primera compra",
    "estado": "activo",
    "createdAt": "2026-04-09T10:30:00Z"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "error": {
    "message": "Error de validación",
    "details": [
      {
        "field": "identificacion",
        "message": "La identificación ya existe"
      }
    ]
  }
}
```

**Validaciones:**
- `identificacion`: obligatorio, único
- `raza`: obligatorio, debe ser uno de los valores permitidos
- `sexo`: obligatorio, valores: 'macho' o 'hembra'
- `fechaNacimiento`: obligatorio, formato fecha válido, no puede ser futura
- `peso`: obligatorio, número positivo

---

#### GET `/api/animales`
Listar todos los animales.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters (opcionales):**
- `estado`: filtrar por estado (activo, vendido, muerto)
- `raza`: filtrar por raza
- `sexo`: filtrar por sexo
- `page`: número de página (default: 1)
- `limit`: registros por página (default: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-456",
      "identificacion": "001-2024",
      "nombre": "Luna",
      "raza": "holstein",
      "sexo": "hembra",
      "fechaNacimiento": "2023-03-15",
      "peso": 450.5,
      "color": "Negro con manchas blancas",
      "estado": "activo",
      "createdAt": "2026-04-09T10:30:00Z"
    },
    {
      "id": "uuid-457",
      "identificacion": "002-2024",
      "nombre": "Paloma",
      "raza": "brahman",
      "sexo": "hembra",
      "fechaNacimiento": "2022-11-20",
      "peso": 520.0,
      "color": "Blanco",
      "estado": "activo",
      "createdAt": "2026-04-08T14:20:00Z"
    }
  ],
  "pagination": {
    "total": 142,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

---

#### GET `/api/animales/:id`
Obtener detalles de un animal específico.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid-456",
    "identificacion": "001-2024",
    "nombre": "Luna",
    "raza": "holstein",
    "sexo": "hembra",
    "fechaNacimiento": "2023-03-15",
    "peso": 450.5,
    "color": "Negro con manchas blancas",
    "procedencia": "Finca El Roble",
    "observaciones": "Animal sano, primera compra",
    "estado": "activo",
    "createdAt": "2026-04-09T10:30:00Z",
    "updatedAt": "2026-04-09T10:30:00Z"
  }
}
```

**Response (404 Not Found):**
```json
{
  "success": false,
  "error": {
    "message": "Animal no encontrado"
  }
}
```

---

#### POST `/api/animales/:id/actualizacion`
Registrar actualización mensual de un animal (HU.2).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "peso": 480.0,
  "altura": 145.5,
  "condicionCorporal": 3,
  "produccionLeche": 18.5,
  "estadoReproductivo": "lactante",
  "observaciones": "Animal en buen estado, producción estable"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Actualización registrada exitosamente",
  "data": {
    "id": "uuid-789",
    "animalId": "uuid-456",
    "peso": 480.0,
    "altura": 145.5,
    "condicionCorporal": 3,
    "produccionLeche": 18.5,
    "estadoReproductivo": "lactante",
    "observaciones": "Animal en buen estado, producción estable",
    "fechaRegistro": "2026-04-09T11:15:00Z",
    "animal": {
      "identificacion": "001-2024",
      "nombre": "Luna"
    }
  }
}
```

**Validaciones:**
- `peso`: obligatorio, número positivo
- `condicionCorporal`: si se envía, debe estar entre 1 y 5
- `estadoReproductivo`: si se envía, debe ser uno de los valores permitidos

---

#### GET `/api/animales/:id/actualizaciones`
Obtener historial de actualizaciones de un animal.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-789",
      "peso": 480.0,
      "altura": 145.5,
      "condicionCorporal": 3,
      "produccionLeche": 18.5,
      "estadoReproductivo": "lactante",
      "observaciones": "Animal en buen estado",
      "fechaRegistro": "2026-04-09T11:15:00Z"
    },
    {
      "id": "uuid-788",
      "peso": 470.0,
      "altura": 144.0,
      "condicionCorporal": 3,
      "produccionLeche": 17.2,
      "estadoReproductivo": "lactante",
      "observaciones": "Producción en aumento",
      "fechaRegistro": "2026-03-09T10:20:00Z"
    }
  ]
}
```

---

### 4.3 CONTROL SANITARIO

#### POST `/api/enfermedades`
Registrar un animal enfermo (HU.3).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "animalId": "uuid-456",
  "fechaDeteccion": "2026-04-08",
  "enfermedad": "mastitis",
  "sintomas": "Inflamación de ubre, presencia de grumos en leche",
  "temperatura": 39.5,
  "estadoGeneral": "moderado",
  "observaciones": "Se detectó durante ordeño matutino"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registro de enfermedad exitoso",
  "data": {
    "id": "uuid-890",
    "animalId": "uuid-456",
    "fechaDeteccion": "2026-04-08",
    "enfermedad": "mastitis",
    "sintomas": "Inflamación de ubre, presencia de grumos en leche",
    "temperatura": 39.5,
    "estadoGeneral": "moderado",
    "observaciones": "Se detectó durante ordeño matutino",
    "estadoActual": "activo",
    "createdAt": "2026-04-09T12:00:00Z",
    "animal": {
      "identificacion": "001-2024",
      "nombre": "Luna"
    }
  }
}
```

**Validaciones:**
- `animalId`: obligatorio, debe existir
- `fechaDeteccion`: obligatorio, formato fecha válido
- `enfermedad`: obligatorio, debe ser uno de los valores permitidos
- `sintomas`: obligatorio, texto no vacío

---

#### GET `/api/enfermedades`
Listar todos los registros de enfermedades.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters (opcionales):**
- `estadoActual`: filtrar por estado (activo, recuperado, fallecido)
- `enfermedad`: filtrar por tipo de enfermedad
- `animalId`: filtrar por animal específico

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-890",
      "fechaDeteccion": "2026-04-08",
      "enfermedad": "mastitis",
      "estadoGeneral": "moderado",
      "estadoActual": "activo",
      "animal": {
        "id": "uuid-456",
        "identificacion": "001-2024",
        "nombre": "Luna",
        "raza": "holstein"
      }
    }
  ]
}
```

---

#### POST `/api/tratamientos`
Registrar un tratamiento (HU.4).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "animalId": "uuid-456",
  "registroEnfermedadId": "uuid-890",
  "fechaInicio": "2026-04-08",
  "medicamento": "Penicilina G",
  "dosis": "10 ml",
  "frecuencia": "cada_12h",
  "duracion": 7,
  "viaAdministracion": "intramuscular",
  "veterinario": "Dr. Carlos Méndez",
  "estadoTratamiento": "en_curso",
  "observaciones": "Tratamiento estándar para mastitis"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Tratamiento registrado exitosamente",
  "data": {
    "id": "uuid-901",
    "animalId": "uuid-456",
    "registroEnfermedadId": "uuid-890",
    "fechaInicio": "2026-04-08",
    "medicamento": "Penicilina G",
    "dosis": "10 ml",
    "frecuencia": "cada_12h",
    "duracion": 7,
    "viaAdministracion": "intramuscular",
    "veterinario": "Dr. Carlos Méndez",
    "estadoTratamiento": "en_curso",
    "observaciones": "Tratamiento estándar para mastitis",
    "createdAt": "2026-04-09T12:30:00Z",
    "animal": {
      "identificacion": "001-2024",
      "nombre": "Luna"
    }
  }
}
```

**Validaciones:**
- `animalId`: obligatorio, debe existir
- `fechaInicio`: obligatorio
- `medicamento`: obligatorio
- `dosis`: obligatorio
- `frecuencia`: obligatorio, valor permitido
- `duracion`: obligatorio, número entero positivo
- `viaAdministracion`: obligatorio, valor permitido

---

#### PUT `/api/tratamientos/:id`
Actualizar un tratamiento existente.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "estadoTratamiento": "completado",
  "observaciones": "Tratamiento finalizado con éxito, animal recuperado"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Tratamiento actualizado exitosamente",
  "data": {
    "id": "uuid-901",
    "estadoTratamiento": "completado",
    "observaciones": "Tratamiento finalizado con éxito, animal recuperado",
    "updatedAt": "2026-04-15T10:00:00Z"
  }
}
```

---

#### GET `/api/tratamientos`
Listar todos los tratamientos.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters (opcionales):**
- `estadoTratamiento`: filtrar por estado
- `animalId`: filtrar por animal

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-901",
      "fechaInicio": "2026-04-08",
      "medicamento": "Penicilina G",
      "duracion": 7,
      "estadoTratamiento": "en_curso",
      "animal": {
        "id": "uuid-456",
        "identificacion": "001-2024",
        "nombre": "Luna",
        "enfermedad": "mastitis"
      }
    }
  ]
}
```

---

#### POST `/api/dietas`
Registrar una dieta o suplemento (HU.5).

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "animalId": "uuid-456",
  "fechaRegistro": "2026-04-09",
  "tipoDieta": "semi_estabulado",
  "alimentoBase": "Pasto estrella, concentrado",
  "cantidad": 25.0,
  "suplementos": "Sales minerales, vitamina A, vitamina D",
  "frecuenciaAlimentacion": "2_veces",
  "objetivoDieta": "produccion_leche",
  "observaciones": "Dieta balanceada para optimizar producción"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Dieta registrada exitosamente",
  "data": {
    "id": "uuid-912",
    "animalId": "uuid-456",
    "fechaRegistro": "2026-04-09",
    "tipoDieta": "semi_estabulado",
    "alimentoBase": "Pasto estrella, concentrado",
    "cantidad": 25.0,
    "suplementos": "Sales minerales, vitamina A, vitamina D",
    "frecuenciaAlimentacion": "2_veces",
    "objetivoDieta": "produccion_leche",
    "observaciones": "Dieta balanceada para optimizar producción",
    "createdAt": "2026-04-09T13:00:00Z",
    "animal": {
      "identificacion": "001-2024",
      "nombre": "Luna"
    }
  }
}
```

**Validaciones:**
- `animalId`: obligatorio, debe existir
- `fechaRegistro`: obligatorio
- `tipoDieta`: obligatorio, valor permitido
- `alimentoBase`: obligatorio
- `cantidad`: obligatorio, número positivo
- `frecuenciaAlimentacion`: obligatorio, valor permitido

---

#### GET `/api/dietas`
Listar todas las dietas registradas.

**Headers:**
```
Authorization: Bearer {token}
```

**Query Parameters (opcionales):**
- `animalId`: filtrar por animal
- `tipoDieta`: filtrar por tipo
- `objetivoDieta`: filtrar por objetivo

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-912",
      "fechaRegistro": "2026-04-09",
      "tipoDieta": "semi_estabulado",
      "alimentoBase": "Pasto estrella, concentrado",
      "cantidad": 25.0,
      "objetivoDieta": "produccion_leche",
      "animal": {
        "id": "uuid-456",
        "identificacion": "001-2024",
        "nombre": "Luna"
      }
    }
  ]
}
```

---

### 4.4 DASHBOARD - ESTADÍSTICAS

#### GET `/api/dashboard/estadisticas`
Obtener estadísticas para el dashboard.

**Headers:**
```
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalAnimales": 142,
    "enTratamiento": 5,
    "actualizadosMes": 23,
    "tasaSalud": 98.5
  }
}
```

**Cálculos:**
- `totalAnimales`: COUNT de animales con estado = 'activo'
- `enTratamiento`: COUNT de tratamientos con estadoTratamiento = 'en_curso'
- `actualizadosMes`: COUNT de actualizaciones_mensuales del mes actual
- `tasaSalud`: porcentaje de animales sin enfermedades activas

---

## 5. MANEJO DE ERRORES

### Códigos de Estado HTTP:
- `200 OK`: Operación exitosa
- `201 Created`: Recurso creado exitosamente
- `400 Bad Request`: Error de validación o datos incorrectos
- `401 Unauthorized`: No autenticado o token inválido
- `403 Forbidden`: Autenticado pero sin permisos
- `404 Not Found`: Recurso no encontrado
- `500 Internal Server Error`: Error del servidor

### Formato de Respuesta de Error:
```json
{
  "success": false,
  "error": {
    "message": "Descripción del error",
    "code": "ERROR_CODE",
    "details": []
  }
}
```

---

## 6. AUTENTICACIÓN Y SEGURIDAD

### Headers Requeridos:
```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

### Implementación JWT:
- Secret key: variable de entorno `JWT_SECRET`
- Algoritmo: HS256
- Payload debe incluir:
  ```json
  {
    "userId": "uuid-123",
    "email": "admin@finca.com",
    "rol": "admin",
    "iat": 1234567890,
    "exp": 1234654290
  }
  ```

### Middleware de Autenticación:
Todos los endpoints excepto `/api/auth/login` requieren autenticación.

---

## 7. VALIDACIONES GENERALES

### Reglas de Negocio:
1. Un animal no puede tener más de una actualización mensual en la misma fecha
2. No se pueden registrar tratamientos para animales que no existen
3. Las fechas no pueden ser futuras (excepto en casos específicos)
4. Los animales con estado 'muerto' o 'vendido' no pueden recibir nuevas actualizaciones
5. Un tratamiento solo puede estar asociado a un animal enfermo (con registro en `registros_enfermedades`)

### Validación de Datos:
- Strings: trim espacios, validar longitud máxima
- Números: validar que sean positivos donde corresponda
- Fechas: validar formato ISO 8601 (YYYY-MM-DD)
- Enums: validar que estén en la lista de valores permitidos

---

## 8. DATOS DE PRUEBA (SEED)

### Usuario de prueba:
```json
{
  "email": "admin@finca.com",
  "password": "admin123",
  "nombre": "Administrador Principal",
  "rol": "admin"
}
```

### Animales de ejemplo:
```json
[
  {
    "identificacion": "001-2024",
    "nombre": "Luna",
    "raza": "holstein",
    "sexo": "hembra",
    "fechaNacimiento": "2023-03-15",
    "peso": 450.5
  },
  {
    "identificacion": "002-2024",
    "nombre": "Thor",
    "raza": "brahman",
    "sexo": "macho",
    "fechaNacimiento": "2022-11-20",
    "peso": 520.0
  },
  {
    "identificacion": "003-2024",
    "nombre": "Bella",
    "raza": "angus",
    "sexo": "hembra",
    "fechaNacimiento": "2023-06-10",
    "peso": 380.0
  }
]
```

---

## 9. VARIABLES DE ENTORNO

Archivo `.env`:
```env
# Base de datos
DATABASE_URL=postgresql://user:password@localhost:5432/gestion_ganadera
# MongoDB alternativo: mongodb://localhost:27017/gestion_ganadera

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRATION=24h

# Puerto del servidor
PORT=3000

# Ambiente
NODE_ENV=development

# CORS (origen permitido del frontend)
CORS_ORIGIN=http://localhost:5173
```

---

## 10. PRIORIZACIÓN DE DESARROLLO

### Fase 1 - Funcionalidades Críticas:
1. Autenticación (`POST /api/auth/login`)
2. Registro de animales (`POST /api/animales`)
3. Listar animales (`GET /api/animales`)
4. Actualización mensual (`POST /api/animales/:id/actualizacion`)

### Fase 2 - Control Sanitario:
5. Registrar enfermedad (`POST /api/enfermedades`)
6. Registrar tratamiento (`POST /api/tratamientos`)
7. Registrar dieta (`POST /api/dietas`)

### Fase 3 - Extras:
8. Dashboard con estadísticas (`GET /api/dashboard/estadisticas`)
9. Endpoints GET adicionales para consultas
10. Actualización de tratamientos

---

## 11. TESTING

### Tests Requeridos:
- Unit tests para validaciones de datos
- Integration tests para cada endpoint
- E2E tests para flujos completos (registro animal → enfermedad → tratamiento)

### Casos de Prueba Importantes:
1. Crear animal con identificación duplicada (debe fallar)
2. Actualizar animal que no existe (debe fallar)
3. Registrar tratamiento sin animal (debe fallar)
4. Login con credenciales incorrectas (debe fallar)
5. Acceder a endpoints sin token (debe retornar 401)

---

## 12. CONSIDERACIONES ADICIONALES

### CORS:
Configurar CORS para permitir requests desde el frontend (http://localhost:5173)

### Rate Limiting:
Implementar límite de requests por IP (ej: 100 requests por minuto)

### Logs:
- Registrar todas las operaciones críticas (creación, actualización, eliminación)
- Incluir timestamp, userId, operación, y resultado

### Paginación:
Implementar paginación en todos los endpoints GET que retornen listas

### Búsqueda:
Implementar búsqueda por texto en endpoint de animales (por identificación o nombre)

---

## 13. DIAGRAMAS

### Diagrama de Relaciones:

```
usuarios
  └── (no tiene relaciones directas, solo para autenticación)

animales (1)
  ├──< actualizaciones_mensuales (N)
  ├──< registros_enfermedades (N)
  ├──< tratamientos (N)
  └──< dietas (N)

registros_enfermedades (1)
  └──< tratamientos (N) [opcional]
```

### Flujo de Usuario Típico:

```
1. Login → Obtener token
2. Ver dashboard → GET /api/dashboard/estadisticas
3. Registrar animal → POST /api/animales
4. Actualizar animal mensualmente → POST /api/animales/:id/actualizacion
5. Si animal enferma → POST /api/enfermedades
6. Aplicar tratamiento → POST /api/tratamientos
7. Registrar dieta → POST /api/dietas
```

---

## 14. CONTACTO Y SOPORTE

Para dudas sobre la implementación del backend, referirse a:
- Documentación del frontend en `/src/app/pages/`
- Estructura de formularios para validar campos exactos
- Mensajes de éxito esperados por el frontend (ver archivos `.tsx`)

---

**Versión del documento:** 1.0
**Fecha:** 2026-04-09
**Sprint:** 1 (Funcionalidades HU.1 a HU.5)
