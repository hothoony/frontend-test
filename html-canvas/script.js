const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const image = new Image();
image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/June_odd-eyed-cat.jpg/320px-June_odd-eyed-cat.jpg';

const shapes = [
  {
    type: 'circle',
    x: 200,
    y: 200,
    radius: 60,
    isDragging: false,
  },
  {
    type: 'rect',
    x: 400,
    y: 150,
    width: 120,
    height: 100,
    isDragging: false,
  }
];

let offsetX, offsetY;
let draggingShape = null;

image.onload = () => {
  draw();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach(shape => {
    ctx.save();
    if (shape.type === 'circle') {
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(image, shape.x - shape.radius, shape.y - shape.radius, shape.radius * 2, shape.radius * 2);
    } else if (shape.type === 'rect') {
      ctx.beginPath();
      ctx.rect(shape.x, shape.y, shape.width, shape.height);
      ctx.clip();
      ctx.drawImage(image, shape.x, shape.y, shape.width, shape.height);
    }
    ctx.restore();

    // 테두리
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 2;
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

canvas.addEventListener('mousedown', (e) => {
  const { x, y } = getMousePos(e);
  draggingShape = null;

  shapes.forEach(shape => {
    if (shape.type === 'circle') {
      const dx = x - shape.x;
      const dy = y - shape.y;
      if (Math.sqrt(dx*dx + dy*dy) <= shape.radius) {
        draggingShape = shape;
        offsetX = dx;
        offsetY = dy;
      }
    } else if (shape.type === 'rect') {
      if (x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height) {
        draggingShape = shape;
        offsetX = x - shape.x;
        offsetY = y - shape.y;
      }
    }
  });
});

canvas.addEventListener('mousemove', (e) => {
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
});

canvas.addEventListener('mouseup', () => {
  draggingShape = null;
});
canvas.addEventListener('mouseleave', () => {
  draggingShape = null;
}); 