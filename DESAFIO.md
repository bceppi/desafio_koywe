<div align="center">
  <p>
    <img src="./ImgKoywe.png" width="250" />
  </p>
</div>

# Cuentanos del Desafio
#### 1. Nivel de dificultad del desafío (que tan compleja fue para ti).

Encontré un desafío de baja dificultad, pero que tomaba un tiempo no menor, debido a ciertos detalles del front y a que había que estudiar un poco acerca de los Order Books y documentación de las APIs.

#### 2. Que sección te tomó más tiempo hacer. ¿Cuál te resultó más compleja? ¿pórque?

El backend, particularmente porque tuve que leer la documentación de las APIs y entender de qué se trataban los Order Books para diseñar una buena solución.

#### 3. Que librerias usaste en el FrontEnd. ¿Qué hace y para que la usaste?
- FuseJS, es una librería para hacer fuzzy search. La utilicé para hacer fuzzy searching de las monedas y hacer la búsqueda mas "inteligente". 
- ReactJS, como framework de front.
- Typescript.


#### 4. Que librerias usaste en el BackEnd. ¿Qué hace y para que la usaste?
Usé `Koa` como framework de backend para recibir, procesar y responder requests.  Además, utilicé ciertos middlewares de Koa como: 
 - `koa-json`, para que los json salgan "pretty printed".
 - `koa-router`, para hacer el routing de los endpoints.
 
Por otro lado, usé `nodemon`, para reiniciar la aplicación automáticamente ante algún cambio en algún archivo del proyecto.

Finalmente, incorporé también Typescript.

#### 5. Algún supuesto y/o consideraciones que debamos tener presente cuando implementaste el FrontEnd?
- Asumí que los únicos campos útiles para filtrar serían "name" y "symbol".
- Asumí que la experiencia de búsqueda sería mejor incorporando "fuzzy" search.

#### 6. Algún supuesto y/o consideraciones que debamos tener presente cuando implementaste el BacktEnd?
- Si no existen suficientes "asks" para resolver el pedido, la aplicación retorna un mensaje de error.

#### 7. Nos encantaría ver que sugerencia nos puedes hacer para mejorar este desafio.   
Creo que fue largo, en comparación a otros procesos que he tenido. Como todo, existe el tradeoff entre filtrar "malos" candidatos, pero también podría quedar gente buena fuera debido a falta de tiempo para resolver el desafío.

