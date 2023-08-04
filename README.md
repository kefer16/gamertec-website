# Gamertec - FrontEnd

FrontEnd de tienda online Gamertec

## Previsualización

previsualizacion de `despliegue utilizando React`

![Imagen despliegue Api ](./src/assets/images/deploy-web.jpeg)

## Instalar Dependencias

```bash
  npm install
```

## Configurar Variables de Entorno

### 1. Crear arhivo .env

crear arhivo .env en la raiz del proyecto, con las siguientes variables:

```js
//VARIABLE = "VALOR" // EJEMPLO
REACT_APP_API_URL = ""; // http://localhost:3000
```

### 2. Configurar variables de entorno

estas variables se tienen que configurar para que pueda cargar el proyecto, tener en cuenta que el proyecto se configuró con `SQL SERVER`
| variable | descripcion |
| :- | :- |
| `REACT_APP_API_URL` | `URL del despligue (dominio principal)` |

## Iniciar Proyecto

despues de configurar las variables ya podemos correr la API en modo desarrollo

```bash
  npm run dev
```
