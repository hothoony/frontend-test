function remove4ByteChars(str) {
  // UTF-16 surrogate pair (U+10000 ~ U+10FFFF)
  return str.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '');
}

const original = "안녕하세요 😃😂😍😢😎🐱‍👤❤️💯🚀🌟";
const filtered = remove4ByteChars(original);

console.log("원본:", original);
console.log("결과:", filtered);
