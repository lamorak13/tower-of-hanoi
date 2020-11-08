//get submit values
const submit = document.getElementsByClassName('submit')[0];
var numberInput = document.getElementsByClassName('number')[0];
const tower1 = document.getElementsByClassName('tower1')[0];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let a = [];
let b = [];
let c = [];

submit.addEventListener('click', (e) => {
  if (a.length || b.length) {
    numberInput.value = '';
    e.preventDefault();
    return;
  }

  if (!a.length && !b.length && c.length) {
    c = [];
    let disks = document.getElementsByClassName('disk');
    while (disks[0]) {
      disks[0].remove();
    }
  }

  const number = parseInt(numberInput.value);
  towerOfHanoi(number);
  numberInput.value = '';
  e.preventDefault();
});

//start the game
async function towerOfHanoi(number) {
  let iterator = number;

  //fill first tower with disks equal to number imput
  for (iterator; iterator > 0; iterator--) {
    a.push(iterator);
  }

  a.forEach((item) => {
    element = document.createElement('div');
    element.className = 'disk';
    element.setAttribute('id', item);
    const style = {
      width: (400 / (number + 1)) * item + 'px',
      bottom: a.indexOf(item) * 20 + 'px',
      background:
        'rgb(' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ',' +
        Math.floor(Math.random() * 256) +
        ')',
      transform: 'translateX(0px)',
    };
    Object.assign(element.style, style);
    tower1.appendChild(element);
  });

  if (number % 2 != 0) {
    while (c.length < number) {
      await moveDisk(a, c, c, number, 2);
      await moveDisk(a, b, c, number, 1);
      await moveDisk(b, c, c, number, 1);
    }
  } else {
    while (c.length < number) {
      await moveDisk(a, b, c, number, 1);
      await moveDisk(a, c, c, number, 2);
      await moveDisk(b, c, c, number, 1);
    }
  }
}

// move disk function input = 2 arrays
async function moveDisk(a, b, c, number, distance) {
  if (c.length == number) return;
  alast = a[a.length - 1];
  blast = b[b.length - 1];

  if (!a.length && b.length) {
    await draw(b, a, distance * -1);
    a.push(blast);
    b.pop();
  } else if (!b.length && a.length) {
    await draw(a, b, distance);
    b.push(alast);
    a.pop();
  } else {
    if (alast < blast) {
      await draw(a, b, distance);
      b.push(alast);
      a.pop();
    } else {
      await draw(b, a, distance * -1);
      a.push(blast);
      b.pop();
    }
  }
  return delay(150);
}

async function draw(a, b, distance) {
  num = a[a.length - 1].toString();
  disk = document.getElementById(num);

  regEx = /\.*translateX\((.*)px\)/i;
  translate = disk.getAttribute('style');
  value = parseInt(regEx.exec(translate)[1]) + distance * 400;

  await delay(150);
  disk.style.bottom = '350px';
  await delay(150);
  disk.style.transform = 'translateX(' + value + 'px)';
  await delay(150);
  disk.style.bottom = b.length * 20 + 'px';
}
