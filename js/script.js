const digitInput = document.querySelector('.digit__input');

let prevOperator;
let sum = 0;
let clearField = false;

document.addEventListener('click', (e) => {
  if (!isNaN(parseFloat(e.target.innerText)) || e.target.innerText === '.') {
    if (clearField) {
      digitInput.value = ''
      clearField = false
    }
    e.target.innerText === '.' && digitInput.value.trim() === '' ? digitInput.value += '0.' : digitInput.value += e.target.innerText
  }
  else {
    prevOperator = e.target.innerText
    clearField = true
    sum = parseFloat(digitInput.value)
  }
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    Calculate()
  }
  if (e.key === 'c' || e.key === 'с') {
    Clear()
  }
  if (!isNaN(parseFloat(e.key)) || e.key === '.') {
    if (clearField) {
      digitInput.value = ''
      clearField = false
    }
    e.key === '.' && digitInput.value.trim() === '' ? digitInput.value += '0.' : digitInput.value += parseInt(e.key)
  }
  else {
    prevOperator = e.key
    clearField = true
    sum = parseFloat(digitInput.value)
  }
})

function Calculate() {
  console.log('Calculation')
  switch (prevOperator) {
    case '+':
      sum += parseFloat(digitInput.value)
      digitInput.value = sum
      break;
    case '-':
      sum -= parseFloat(digitInput.value)
      digitInput.value = sum
      break;
    case '*':
      sum *= parseFloat(digitInput.value)
      digitInput.value = sum
      break;
    case '/':
      sum /= parseFloat(digitInput.value)
      digitInput.value = sum
      break;
  }
}

function Clear() {
  digitInput.value = ''
  sum = 0;
}