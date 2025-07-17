// JavaScript Array.some() 예제
// some() 메서드는 배열의 요소 중 하나라도 주어진 판별 함수를 통과하는지 테스트합니다.

console.log('=== Array.some() 기본 예제 ===');

// 1. 숫자 배열에서 짝수가 있는지 확인
const numbers = [1, 3, 5, 7, 8, 9];
const hasEvenNumber = numbers.some(num => num % 2 === 0);
console.log();
console.log('1. -------------------------------');
console.log('숫자 배열:', numbers);
console.log('짝수가 있나요?', hasEvenNumber); // true

// 2. 문자열 배열에서 특정 길이보다 긴 문자열이 있는지 확인
const fruits = ['apple', 'banana', 'cherry', 'date'];
const hasLongName = fruits.some(fruit => fruit.length > 6);
console.log();
console.log('2. -------------------------------');
console.log('과일 배열:', fruits);
console.log('6글자보다 긴 과일이 있나요?', hasLongName); // false

// 3. 객체 배열에서 특정 조건을 만족하는 객체가 있는지 확인
const users = [
  { name: '김철수', age: 25, isActive: true },
  { name: '이영희', age: 30, isActive: false },
  { name: '박민수', age: 35, isActive: true }
];

const hasAdult = users.some(user => user.age >= 30);
const hasInactiveUser = users.some(user => !user.isActive);

console.log();
console.log('3. -------------------------------');
console.log('사용자 배열:', users);
console.log('30세 이상 사용자가 있나요?', hasAdult); // true
console.log('비활성 사용자가 있나요?', hasInactiveUser); // true

// 4 . 빈 배열과 some() 메서드
const emptyArray = [];
const emptyResult = emptyArray.some(item => item > 0);
console.log();
console.log('4. -------------------------------');
console.log('빈 배열:', emptyArray);
console.log('빈 배열에서 some() 결과:', emptyResult); // false

// 5. 실용적인 예제: 폼 유효성 검사
const formFields = [
  { name: 'email', value: 'user@example.com', required: true },
  { name: 'password', value: '', required: true },
  { name: 'nickname', value: 'user123', required: false }
];

const hasEmptyRequiredField = formFields.some(field => 
  field.required && field.value.trim() === ''
);

console.log();
console.log('5. -------------------------------');
console.log('폼 필드:', formFields);
console.log('필수 필드 중 비어있는 것이 있나요?', hasEmptyRequiredField); // true

// 6. 중첩 배열에서 특정 값 찾기
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const hasTargetNumber = matrix.some(row => row.some(num => num === 5));
console.log();
console.log('6. -------------------------------');
console.log('2차원 배열:', matrix);
console.log('숫자 5가 있나요?', hasTargetNumber); // true

// 7. some()과 includes()의 차이점 비교
const colors = ['red', 'green', 'blue'];

// includes() - 정확한 값 찾기
const hasRed = colors.includes('red');

// some() - 조건에 맞는 값 찾기
const hasShortName = colors.some(color => color.length < 4);

console.log();
console.log('7. -------------------------------');
console.log('색상 배열:', colors);
console.log('red가 있나요? (includes)', hasRed); // true
console.log('4글자 미만 색상이 있나요? (some)', hasShortName); // true
