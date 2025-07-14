const shapes = [
  {
    type: 'circle',
    x: 200,
    y: 200,
    radius: 60,
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/June_odd-eyed-cat.jpg/320px-June_odd-eyed-cat.jpg',
  },
  {
    type: 'rect',
    x: 400,
    y: 150,
    width: 120,
    height: 100,
    imageSrc: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=facearea&w=320&h=320',
  }
];

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 각 shape별 이미지 객체를 저장
const shapeImages = shapes.map(shape => {
  const img = new Image();
  img.src = shape.imageSrc;
  return img;
});

let imagesLoaded = 0;
shapeImages.forEach(img => {
  img.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === shapeImages.length) {
      draw();
    }
  };
});

let offsetX, offsetY;
let draggingShape = null;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach((shape, idx) => {
    ctx.save();
    const img = shapeImages[idx];
    if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, shape.x - shape.radius, shape.y - shape.radius, shape.radius * 2, shape.radius * 2);
    } else if (shape.type === 'rect') {
      ctx.beginPath();
      ctx.rect(shape.x, shape.y, shape.width, shape.height);
      ctx.clip();
      ctx.drawImage(img, shape.x, shape.y, shape.width, shape.height);
    }
    ctx.restore();

    // 테두리
    ctx.strokeStyle = STROKE_STYLE;
    ctx.lineWidth = LINE_WIDTH;
    if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape.type === 'rect') {
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

// 상수 선언
const STROKE_STYLE = 'gray';
const LINE_WIDTH = 2;

// shape 타입별 메서드화 예시
function isCircleHit(shape, x, y) {
  const dx = x - shape.x;
  const dy = y - shape.y;
  return Math.sqrt(dx * dx + dy * dy) <= shape.radius;
}

function isRectHit(shape, x, y) {
  return x >= shape.x && x <= shape.x + shape.width &&
         y >= shape.y && y <= shape.y + shape.height;
}

// 이벤트 핸들러 분리
function handleMouseDown(e) {
  const { x, y } = getMousePos(e);
  draggingShape = null;

  shapes.forEach(shape => {
    if (shape.type === 'circle') {
      if (isCircleHit(shape, x, y)) {
        draggingShape = shape;
        offsetX = x - shape.x;
        offsetY = y - shape.y;
      }
    } else if (shape.type === 'rect') {
      if (isRectHit(shape, x, y)) {
        draggingShape = shape;
        offsetX = x - shape.x;
        offsetY = y - shape.y;
      }
    }
  });
}

function handleMouseMove(e) {
  if (draggingShape) {
    const { x, y } = getMousePos(e);
    if (draggingShape.type === 'circle') {
      draggingShape.x = x - offsetX;
      draggingShape.y = y - offsetY;
    } else if (draggingShape.type === 'rect') {
      draggingShape.x = x - offsetX;
      draggingShape.y = y - offsetY;
    }
    draw();
  }
}

function handleMouseUp() {
  draggingShape = null;
}

function handleMouseLeave() {
  draggingShape = null;
}

canvas.addEventListener('mousedown', handleMouseDown);
canvas.addEventListener('mousemove', handleMouseMove);
canvas.addEventListener('mouseup', handleMouseUp);
canvas.addEventListener('mouseleave', handleMouseLeave);
