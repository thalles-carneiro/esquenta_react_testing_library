// Quando estamos tratando da declaração de uma função
// não podemos reatribuir um valor

/*

const ola = () => {
  console.log('Olá');
};

ola();

ola = () => {
  console.log('Oi');
};

ola();

*/

// Quando estamos tratando de um objeto declarado
// podemos reatribuir o valor de suas propriedades e métodos

const obj = {
  ola: () => {
    console.log('Olá');
  },
}

obj.ola();

obj.ola = () => {
  console.log('Oi');
};

obj.ola();
