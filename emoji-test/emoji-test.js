// 4바이트 이모지 제거
function remove4ByteChars(str) {
  // UTF-16 surrogate pair (U+10000 ~ U+10FFFF)
  return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
}

const emoji_3bytes = "©☀☕☎♥"; // 3바이트
const emoji_4bytes = "😀😂😎🐶🚀"; // 4바이트

let original = "안녕하세요 😃😂😍😢😎🐱‍👤❤️💯🚀🌟 abc 123";
original += ", 3bytes: " + emoji_3bytes;
original += ", 4bytes: " + emoji_4bytes;
const filtered = remove4ByteChars(original);

console.log("원본:", original);
console.log("결과:", filtered);
