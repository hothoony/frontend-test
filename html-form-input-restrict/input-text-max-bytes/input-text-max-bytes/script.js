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

  const titleInput = document.querySelector('input[name=titleInput]');
  const contentInput = document.querySelector('textarea[name=contentInput]');

  // applyTextInput(titleInput, document.querySelector('input[name=titleInput] ~ .byteInfo'));
  applyTextInput(titleInput, titleInput.parentElement.querySelector('.byteInfo'));

  // applyTextInput(contentInput, document.querySelector('textarea[name=contentInput] ~ .byteInfo'));
  applyTextInput(contentInput, contentInput.parentElement.querySelector('.byteInfo'));

  const form = document.getElementById('form1');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!titleInput.value.trim()) {
      alert('제목을 입력해 주세요.');
      titleInput.focus();
      return;
    }
    if (!contentInput.value.trim()) {
      alert('내용을 입력해 주세요.');
      contentInput.focus();
      return;
    }
    alert(`입력값: 제목: ${titleInput.value}, 내용: ${contentInput.value}`);
  });

}

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});