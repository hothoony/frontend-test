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

function renderSelectGroup(container, data, name) {
  container.innerHTML = '';
  const select = document.createElement('select');
  select.name = name;
  // select.multiple = true;
  select.style.minWidth = '120px';
  data.forEach((item) => {
    const option = document.createElement('option');
    option.value = item.value;
    option.textContent = item.label;
    select.appendChild(option);
  });
  container.appendChild(select);
}

function initApp() {
  const fruitGroup = document.getElementById('fruit-group');
  const animalGroup = document.getElementById('animal-group');
  renderSelectGroup(fruitGroup, dataList1, 'fruit');
  renderSelectGroup(animalGroup, dataList2, 'animal');
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
}); 
