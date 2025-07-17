// JavaScript Array.map() 예제들

console.log('=== Array.map() 기본 예제 ===');

// 1. 기본 사용법 - 숫자 배열을 2배로 만들기
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log();
console.log('1. ----------------------------');
console.log('원본 배열:', numbers);
console.log('2배 배열 :', doubled);

// 2. 문자열 배열을 대문자로 변환
const fruits = ['apple', 'banana', 'cherry'];
const upperFruits = fruits.map(fruit => fruit.toUpperCase());
console.log();
console.log('2. ----------------------------');
console.log('원본 과일:', fruits);
console.log('대문자 과일:', upperFruits);

// 3. 객체 배열에서 특정 속성만 추출
const users = [
  { id: 1, name: '김철수', age: 25 },
  { id: 2, name: '이영희', age: 30 },
  { id: 3, name: '박민수', age: 28 }
];

const userNames = users.map(user => user.name);
const userAges = users.map(user => user.age);
console.log();
console.log('3. ----------------------------');
console.log('사용자 이름들:', userNames);
console.log('사용자 나이들:', userAges);

// 4. 객체 배열을 새로운 형태로 변환
const userProfiles = users.map(user => ({
  fullName: user.name,
  isAdult: user.age >= 18,
  category: user.age >= 30 ? '시니어' : '주니어'
}));
console.log();
console.log('4. ----------------------------');
console.log('사용자 프로필:', userProfiles);

// 5. 인덱스를 활용한 변환
const letters = ['a', 'b', 'c', 'd'];
const indexedLetters = letters.map((letter, index) => `${index + 1}. ${letter}`);
console.log();
console.log('5. ----------------------------');
console.log('인덱스가 포함된 문자:', indexedLetters);

// 6. 중첩 배열 처리
const matrix = [[1, 2], [3, 4], [5, 6]];
const flattenedAndDoubled = matrix.map(row => row.map(num => num * 2));
console.log();
console.log('6. ----------------------------');
console.log('중첩 배열 2배:', flattenedAndDoubled);

// 7. 조건부 변환
const scores = [85, 92, 78, 96, 88];
const grades = scores.map(score => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  return 'F';
});
console.log();
console.log('7. ----------------------------');
console.log('점수:', scores);
console.log('등급:', grades);

// 8. 문자열을 숫자로 변환
const stringNumbers = ['10', '20', '30', '40'];
const parsedNumbers = stringNumbers.map(str => parseInt(str));
const multipliedNumbers = stringNumbers.map(str => parseInt(str) * 3);
console.log();
console.log('8. ----------------------------');
console.log('문자열 숫자:', stringNumbers);
console.log('파싱된 숫자:', parsedNumbers);
console.log('3배 곱한 숫자:', multipliedNumbers);

// 9. 실제 사용 예제 - 상품 목록 변환
const products = [
  { name: '노트북', price: 1200000, category: '전자제품' },
  { name: '마우스', price: 25000, category: '전자제품' },
  { name: '키보드', price: 80000, category: '전자제품' }
];

const productDisplay = products.map(product => ({
  ...product,
  formattedPrice: `${product.price.toLocaleString()}원`,
  isExpensive: product.price > 100000
}));
console.log();
console.log('9. ----------------------------');
console.log('상품 표시용 데이터:', productDisplay);

// 10. map vs forEach 차이점 보여주기
console.log();
console.log('10. ----------------------------');
console.log('=== map vs forEach 차이점 ===');
const originalArray = [1, 2, 3];

// map은 새 배열을 반환
const mapResult = originalArray.map(x => x * 2);
console.log('map 결과:', mapResult);

// forEach는 undefined를 반환
const forEachResult = originalArray.forEach(x => x * 2);
console.log('forEach 결과:', forEachResult); // undefined
