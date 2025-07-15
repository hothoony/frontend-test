// --- 도형 데이터 구조 정의 ---
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 520;
const STAGE_SIZE = 400;
const SHAPES_BAR_HEIGHT = 120;
const SHAPE_SIZE = 64;
const STAGE_CENTER = { x: CANVAS_WIDTH / 2, y: STAGE_SIZE / 2 };

const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');

// 하단 도형들 초기 위치 (y좌표를 shapes-bar 영역에 맞게 조정)
const shapes = [
  {
    type: 'circle',
    x: 80,
    y: STAGE_SIZE + SHAPES_BAR_HEIGHT / 2,
    color: '#4a90e2',
    isDragging: false,
    origin: { x: 80, y: STAGE_SIZE + SHAPES_BAR_HEIGHT / 2 },
    fixed: false,
  },
  {
    type: 'square',
    x: 200,
    y: STAGE_SIZE + SHAPES_BAR_HEIGHT / 2,
    color: '#50e3c2',
    isDragging: false,
    origin: { x: 200, y: STAGE_SIZE + SHAPES_BAR_HEIGHT / 2 },
    fixed: false,
  },
  {
    type: 'triangle',
    x: 320,
    y: STAGE_SIZE + SHAPES_BAR_HEIGHT / 2,
    color: '#f5a623',
    isDragging: false,
    origin: { x: 320, y: STAGE_SIZE + SHAPES_BAR_HEIGHT / 2 },
    fixed: false,
  },
];

// 스테이지의 정답 도형 (삼각형)
const answerShape = {
  type: 'triangle',
  x: STAGE_CENTER.x,
  y: STAGE_CENTER.y,
  color: '#bbb',
  size: SHAPE_SIZE,
};

let draggingShape = null;
let offset = { x: 0, y: 0 };
let isDragging = false;

// --- 도형 그리기 함수 ---
function drawTriangle(ctx, x, y, size, color) {
  const height = size * Math.sqrt(3) / 2;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x, y - height / 2);
  ctx.lineTo(x - size / 2, y + height / 2);
  ctx.lineTo(x + size / 2, y + height / 2);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawCircle(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawSquare(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x - size / 2, y - size / 2, size, size);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.restore();
}

function drawShape(ctx, shape) {
  if (shape.type === 'circle') drawCircle(ctx, shape.x, shape.y, SHAPE_SIZE, shape.color);
  else if (shape.type === 'square') drawSquare(ctx, shape.x, shape.y, SHAPE_SIZE, shape.color);
  else if (shape.type === 'triangle') drawTriangle(ctx, shape.x, shape.y, SHAPE_SIZE, shape.color);
}

// --- 전체 캔버스 그리기 ---
function render() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // 스테이지(상단 400x400) 영역 배경
  ctx.save();
  ctx.fillStyle = '#f0f0f0';
  ctx.fillRect(0, 0, CANVAS_WIDTH, STAGE_SIZE);
  ctx.restore();
  // 정답 도형(회색 삼각형)
  drawTriangle(ctx, answerShape.x, answerShape.y, answerShape.size, answerShape.color);
  // 고정된 도형이 있으면 스테이지 중앙에 그리기
  shapes.forEach(shape => {
    if (shape.fixed) {
      drawShape(ctx, answerShape); // 정답 도형 위에 고정된 도형을 그린다
      drawShape(ctx, { ...shape, x: answerShape.x, y: answerShape.y });
    }
  });
  // 하단 도형 바 영역 배경
  ctx.save();
  ctx.fillStyle = '#f9f9f9';
  ctx.fillRect(0, STAGE_SIZE, CANVAS_WIDTH, SHAPES_BAR_HEIGHT);
  ctx.restore();
  // 하단 도형들(드래그 중이 아닌 도형만 먼저 그림)
  shapes.forEach(shape => {
    if (!shape.fixed && !shape.isDragging) drawShape(ctx, shape);
  });
  // 드래그 중인 도형을 가장 위에 그림
  if (draggingShape && draggingShape.isDragging) {
    drawShape(ctx, draggingShape);
  }
}

// --- 마우스 이벤트 핸들러 ---
function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function isPointInShape(shape, x, y) {
  if (shape.type === 'circle') {
    const dx = x - shape.x;
    const dy = y - shape.y;
    return dx * dx + dy * dy <= (SHAPE_SIZE / 2) * (SHAPE_SIZE / 2);
  } else if (shape.type === 'square') {
    return (
      x >= shape.x - SHAPE_SIZE / 2 &&
      x <= shape.x + SHAPE_SIZE / 2 &&
      y >= shape.y - SHAPE_SIZE / 2 &&
      y <= shape.y + SHAPE_SIZE / 2
    );
  } else if (shape.type === 'triangle') {
    // 삼각형 hit test (barycentric 좌표계 사용)
    const size = SHAPE_SIZE;
    const height = size * Math.sqrt(3) / 2;
    // 삼각형 꼭지점 좌표 계산
    const ax = shape.x;
    const ay = shape.y - height / 2;
    const bx = shape.x - size / 2;
    const by = shape.y + height / 2;
    const cx = shape.x + size / 2;
    const cy = shape.y + height / 2;
    // barycentric 좌표계
    const denom = ((by - cy)*(ax - cx) + (cx - bx)*(ay - cy));
    const w1 = ((by - cy)*(x - cx) + (cx - bx)*(y - cy)) / denom;
    const w2 = ((cy - ay)*(x - cx) + (ax - cx)*(y - cy)) / denom;
    const w3 = 1 - w1 - w2;
    return w1 >= 0 && w2 >= 0 && w3 >= 0;
  }
  return false;
}

canvas.addEventListener('mousedown', (e) => {
  if (isDragging) return;
  const pos = getMousePos(canvas, e);
  // 주황 삼각형을 우선적으로 hit test
  for (let i = shapes.length - 1; i >= 0; i--) {
    const shape = shapes[i];
    if (!shape.fixed && shape.type === 'triangle' && isPointInShape(shape, pos.x, pos.y)) {
      draggingShape = shape;
      shape.isDragging = true;
      isDragging = true;
      break;
    }
  }
  // 다른 도형들도 hit test (주황 삼각형이 아니면 기존대로)
  if (!isDragging) {
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      if (!shape.fixed && shape.type !== 'triangle' && isPointInShape(shape, pos.x, pos.y)) {
        draggingShape = shape;
        shape.isDragging = true;
        isDragging = true;
        break;
      }
    }
  }
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging || !draggingShape) return;
  const pos = getMousePos(canvas, e);
  // 드래그 이동 시 도형 중심이 마우스 포인터 위치로 이동
  draggingShape.x = pos.x;
  draggingShape.y = pos.y;
  render();
});

window.addEventListener('mouseup', (e) => {
  if (!isDragging || !draggingShape) return;
  const pos = getMousePos(canvas, e);
  // 스테이지 중앙 hit test (400x400 영역 내, 정답 도형 위)
  let isOnStage = false;
  if (
    pos.x >= STAGE_CENTER.x - SHAPE_SIZE / 2 &&
    pos.x <= STAGE_CENTER.x + SHAPE_SIZE / 2 &&
    pos.y >= STAGE_CENTER.y - SHAPE_SIZE / 2 &&
    pos.y <= STAGE_CENTER.y + SHAPE_SIZE / 2
  ) {
    isOnStage = true;
  }
  if (isOnStage && draggingShape.type === answerShape.type) {
    // 정답: 스테이지 중앙에 고정
    draggingShape.fixed = true;
    draggingShape.x = STAGE_CENTER.x;
    draggingShape.y = STAGE_CENTER.y;
  } else {
    // 오답: 원래 위치로 복귀
    draggingShape.x = draggingShape.origin.x;
    draggingShape.y = draggingShape.origin.y;
  }
  draggingShape.isDragging = false;
  draggingShape = null;
  isDragging = false;
  render();
});

// 최초 렌더링
render(); 