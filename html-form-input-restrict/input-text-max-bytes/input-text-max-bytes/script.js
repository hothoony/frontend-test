function getUtf8Bytes(str) {
  // UTF-8 인코딩 기준 바이트 수 계산
  return new TextEncoder().encode(str).length;
}

function truncateToMaxBytes(str, maxBytes) {
  let bytes = 0;
  let result = '';
  for (const char of str) {
    const charBytes = getUtf8Bytes(char);
    if (bytes + charBytes > maxBytes) break;
    bytes += charBytes;
    result += char;
  }
  return result;
}

function applyTextInput(textInput, byteInfo) {
  const maxBytes = parseInt(textInput.getAttribute('data-max-bytes'), 10);
  byteInfo.textContent = `0 / ${maxBytes} bytes`;
  
  textInput.addEventListener('input', function (e) {
    const required = textInput.hasAttribute('required');
    let value = textInput.value;
    let bytes = getUtf8Bytes(value);
    if (bytes > maxBytes) {
      value = truncateToMaxBytes(value, maxBytes);
      textInput.value = value;
      bytes = getUtf8Bytes(value);
    }
    byteInfo.textContent = `${bytes} / ${maxBytes} bytes`;
  });
}

function initApp() {

  applyTextInput(document.querySelector('input[name=titleInput]'),
                 document.querySelector('input[name=titleInput] ~ .byteInfo'));

  applyTextInput(document.querySelector('textarea[name=contentInput]'),
                 document.querySelector('textarea[name=contentInput] ~ .byteInfo'));

  const form = document.getElementById('form1');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert(`입력값: ${titleInput.value}`);
  });

}

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});