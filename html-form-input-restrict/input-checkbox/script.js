const dataList1 = [
  { value: 'apple', label: '사과' },
  { value: 'banana', label: '바나나' },
  { value: 'orange', label: '오렌지' },
  { value: 'grape', label: '포도' }
];

const dataList2 = [
  { value: 'cat', label: '고양이' },
  { value: 'dog', label: '강아지' },
  { value: 'rabbit', label: '토끼' },
  { value: 'hamster', label: '햄스터' }
];

function renderCheckboxGroup(container, data, name) {
  container.innerHTML = '';
  data.forEach((item, idx) => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.name = name;
    checkbox.value = item.value;
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(item.label));
    container.appendChild(label);
  });
}

function initApp() {
  const fruitGroup = document.getElementById('fruit-group');
  const animalGroup = document.getElementById('animal-group');
  renderCheckboxGroup(fruitGroup, dataList1, 'fruit');
  renderCheckboxGroup(animalGroup, dataList2, 'animal');
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();

  const submitBtn = document.getElementById('submit-btn');
  submitBtn.addEventListener('click', () => {
    const fruitChecked = Array.from(document.querySelectorAll('input[name="fruit"]:checked')).map(cb => cb.value);
    const animalChecked = Array.from(document.querySelectorAll('input[name="animal"]:checked')).map(cb => cb.value);
    console.log('');
    console.log('선택한 과일:', fruitChecked);
    console.log('선택한 동물:', animalChecked);
  });
}); 
