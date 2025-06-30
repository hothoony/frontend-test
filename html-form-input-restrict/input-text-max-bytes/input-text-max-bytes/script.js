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

function initApp() {
  const input = document.getElementById('textInput');
  const byteInfo = document.getElementById('byteInfo');
  const maxBytes = parseInt(input.getAttribute('data-max-bytes'), 10);

  input.addEventListener('input', function (e) {
    let value = input.value;
    let bytes = getUtf8Bytes(value);
    if (bytes > maxBytes) {
      value = truncateToMaxBytes(value, maxBytes);
      input.value = value;
      bytes = getUtf8Bytes(value);
    }
    byteInfo.textContent = `${bytes} / ${maxBytes} bytes`;
  });

  // 초기화
  byteInfo.textContent = `0 / ${maxBytes} bytes`;

  const form = document.getElementById('textForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    alert(`입력값: ${input.value}`);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});