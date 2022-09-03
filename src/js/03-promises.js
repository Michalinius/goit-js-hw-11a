function createPromise(position, delay) {
  return new Promise ((resolve,reject) =>{
      setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position,delay})
      } else {
        reject({position,delay})
      }
    },delay);
  });
}

const firstDelay = document.querySelector('[name="delay"]');
const delayStep = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');
const form = document.querySelector('.form');

form.addEventListener("submit",(event) => {
  event.preventDefault();
    for (let i=1;i<=amount.value;i++) {
      createPromise(i,+firstDelay.value + +delayStep.value * (i-1))
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    }
})