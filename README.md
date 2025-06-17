# Prueba Técnica:
Para el desarrollo de la apliacación front se construyó una SPA utilizando angular en su versión 19, esta permite utilizar caracteristicas como los stand-alone components por defecto y el modelo de reactividad basado en señales.
Ademas se utilizó angular material como libreria de componentes.
Se construyeron cinco paginas para cumplir con cado uno de los puntos solicitados. se pude interactuar con esta mediante la barra de navegación.

!["app"](/assets/app.png)

Se implementó lazy loading para optimizar el rendimiento, el javascript de cada uno de las paginas será cargado bajo demanda, a medida que se navega a través de estas.

!["lazy"](/assets/lazy.png)


## Deployment del proyecto.
Para el despliegue del proyecto seguir los siguientes pasos:

1. Clonar el repositorio.

```shell script
git clone https://github.com/asuridev/xpert-front.git
```
2. Ingresar a la raíz del proyecto.

```shell script
cd xpert-front
```
3. instalar dependencias 

```shell script
npm run install
```
4. iniciar servidor de desarrollo

```shell script
npm run start
```
Este ultimo comando levantará un servidor de desarrollo en el puerto 4200.

> **_NOTA:_**  la aplicación front solo será funcional si previamente se levantó los contenedores del backend a traves de docker compose.

## Verificando el funcionaminto del proyecto.
navegar mediante la barra de navegacion por cada uno de las vistas, la vista numero cinco se encuentra protegida, si el usuario no ha realizado la operación de login lo redireccionará a la pagina de login.


