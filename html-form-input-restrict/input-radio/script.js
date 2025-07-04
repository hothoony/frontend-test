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

function renderRadioGroup(container, data, name) {
  container.innerHTML = '';
  data.forEach((item, idx) => {
    const label = document.createElement('label');
    label.className = 'radio-label';
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = name;
    radio.value = item.value;
    label.appendChild(radio);
    label.appendChild(document.createTextNode(item.label));
    container.appendChild(label);
  });
}

function initApp() {
  const fruitGroup = document.getElementById('fruit-group');
  const animalGroup = document.getElementById('animal-group');
  renderRadioGroup(fruitGroup, dataList1, 'fruit');
  renderRadioGroup(animalGroup, dataList2, 'animal');
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
}); 
