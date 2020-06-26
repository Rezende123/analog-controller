# ANALOG-CONTROLLER

Controle analógico feito em angular, que interage com eventos do mouse e de toque, layout com base no neomorfismo, a cor se adapta à cor de fundo do layout em que é implantado, o tamanho pode ser definido por parâmetro. A resposta é um angulo de 0º a 360º, com base no lado esquerdo e indo em sentido horário.

## Layout Adaptável

- Dark
![Controle cor preta](./src/assets/imgs/controller1.png)

- Azul
![Controle cor azul](./src/assets/imgs/controller2.png)

- Verde
![Controle cor verde](./src/assets/imgs/controllerw.png)

## Funcionamento

- Web
![Controle sendo utilizado com o mouse](./src/assets/imgs/exempleWeb.gif)

- Mobile
![Controle sendo utilizado com o mouse](./src/assets/imgs/exempleMobile.gif)

## Lógica

Os ângulos começam a contar do lado esquerdo, com base no ponto atual do analógico em relação ao centro do controle, é calculado o angulo da tangente naquele quadrante e incrementado um valor que varia de acordo com o quadrante, para que então seja encontrado o ângulo relativo.

![Cálculo](./src/assets/imgs/logic.png)