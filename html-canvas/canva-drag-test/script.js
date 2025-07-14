const shapes = [
  {
    type: 'ellipse',
    x: 200,
    y: 200,
    radiusX: 50,
    radiusY: 50,
    rotation: 0,
    imageSrc: './resources/cat.jpg',
  },
  {
    type: 'rect',
    x: 400,
    y: 150,
    width: 100,
    height: 100,
    rotation: 0,
    imageSrc: './resources/dog.jpg',
  }
];

let aspectRatioLocked = false;

const HANDLE_SIZE = 8;
const ROTATE_HANDLE_OFFSET = 16;
const ROTATE_HANDLE_RADIUS = 7;

const canvasUtil = {
  canvas: null,
  context: null,
  shapeImages: [],
  imagesLoaded: 0,
  offsetX: 0,
  offsetY: 0,
  draggingShape: null,
  resizingShape: null,
  resizingHandle: null,
  rotatingShape: null,
  rotatingHandleIndex: null,
  selectedShape: null,
  startAngle: 0,
  startRotation: 0,
  STROKE_STYLE: 'gray',
  LINE_WIDTH: 2,

  draw(shapes) {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    shapes.forEach((shape, idx) => {
      ctx.save();
      // 중심 기준 회전 적용
      const center = this.getShapeCenter(shape);
      ctx.translate(center.x, center.y);
      ctx.rotate(shape.rotation || 0);
      ctx.translate(-center.x, -center.y);
      const img = this.shapeImages[idx];
      if (shape.type === 'ellipse') {
        ctx.beginPath();
        ctx.ellipse(shape.x, shape.y, shape.radiusX, shape.radiusY, 0, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, shape.x - shape.radiusX, shape.y - shape.radiusY, shape.radiusX * 2, shape.radiusY * 2);
      } else if (shape.type === 'rect') {
        ctx.beginPath();
        ctx.rect(shape.x, shape.y, shape.width, shape.height);
        ctx.clip();
        ctx.drawImage(img, shape.x, shape.y, shape.width, shape.height);
      }
      ctx.restore();

      // 테두리 및 핸들/회전핸들
      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(shape.rotation || 0);
      ctx.translate(-center.x, -center.y);
      ctx.strokeStyle = this.STROKE_STYLE;
      ctx.lineWidth = this.LINE_WIDTH;
      if (shape.type === 'ellipse') {
        ctx.beginPath();
        ctx.ellipse(shape.x, shape.y, shape.radiusX, shape.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        if (this.selectedShape === shape) {
          this.drawEllipseHandles(shape);
          this.drawRotateHandles(shape);
        }
      } else if (shape.type === 'rect') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        if (this.selectedShape === shape) {
          this.drawHandles(shape);
          this.drawRotateHandles(shape);
        }
      }
      ctx.restore();
    });
  },

  getShapeCenter(shape) {
    if (shape.type === 'rect') {
      return { x: shape.x + shape.width / 2, y: shape.y + shape.height / 2 };
    } else if (shape.type === 'ellipse') {
      return { x: shape.x, y: shape.y };
    }
  },

  // 사각형 핸들
  getRectHandles(rect) {
    const { x, y, width, height } = rect;
    return [
      { x: x, y: y, cursor: 'nwse-resize', pos: 'tl' },
      { x: x + width / 2, y: y, cursor: 'ns-resize', pos: 'tm' },
      { x: x + width, y: y, cursor: 'nesw-resize', pos: 'tr' },
      { x: x + width, y: y + height / 2, cursor: 'ew-resize', pos: 'mr' },
      { x: x + width, y: y + height, cursor: 'nwse-resize', pos: 'br' },
      { x: x + width / 2, y: y + height, cursor: 'ns-resize', pos: 'bm' },
      { x: x, y: y + height, cursor: 'nesw-resize', pos: 'bl' },
      { x: x, y: y + height / 2, cursor: 'ew-resize', pos: 'ml' },
    ];
  },

  // ellipse 핸들 (bounding box 기준 8방향)
  getEllipseHandles(ellipse) {
    const { x, y, radiusX, radiusY } = ellipse;
    return [
      { x: x - radiusX, y: y - radiusY, cursor: 'nwse-resize', pos: 'tl' },
      { x: x, y: y - radiusY, cursor: 'ns-resize', pos: 'tm' },
      { x: x + radiusX, y: y - radiusY, cursor: 'nesw-resize', pos: 'tr' },
      { x: x + radiusX, y: y, cursor: 'ew-resize', pos: 'mr' },
      { x: x + radiusX, y: y + radiusY, cursor: 'nwse-resize', pos: 'br' },
      { x: x, y: y + radiusY, cursor: 'ns-resize', pos: 'bm' },
      { x: x - radiusX, y: y + radiusY, cursor: 'nesw-resize', pos: 'bl' },
      { x: x - radiusX, y: y, cursor: 'ew-resize', pos: 'ml' },
    ];
  },

  // 회전 핸들 (모서리 바깥쪽)
  getRotateHandles(shape) {
    const center = this.getShapeCenter(shape);
    let corners;
    if (shape.type === 'rect') {
      corners = [
        { x: shape.x, y: shape.y },
        { x: shape.x + shape.width, y: shape.y },
        { x: shape.x + shape.width, y: shape.y + shape.height },
        { x: shape.x, y: shape.y + shape.height },
      ];
    } else if (shape.type === 'ellipse') {
      corners = [
        { x: shape.x - shape.radiusX, y: shape.y - shape.radiusY },
        { x: shape.x + shape.radiusX, y: shape.y - shape.radiusY },
        { x: shape.x + shape.radiusX, y: shape.y + shape.radiusY },
        { x: shape.x - shape.radiusX, y: shape.y + shape.radiusY },
      ];
    }
    // 각 코너에서 중심 방향으로 벡터를 구해 바깥쪽으로 연장
    return corners.map(corner => {
      const dx = corner.x - center.x;
      const dy = corner.y - center.y;
      const len = Math.sqrt(dx*dx + dy*dy);
      return {
        x: center.x + (dx / len) * (len + ROTATE_HANDLE_OFFSET),
        y: center.y + (dy / len) * (len + ROTATE_HANDLE_OFFSET),
        cursor: 'grab',
        pos: 'rotate'
      };
    });
  },

  drawHandles(rect) {
    const ctx = this.context;
    this.getRectHandles(rect).forEach(handle => {
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(handle.x - HANDLE_SIZE/2, handle.y - HANDLE_SIZE/2, HANDLE_SIZE, HANDLE_SIZE);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
  },

  drawEllipseHandles(ellipse) {
    const ctx = this.context;
    this.getEllipseHandles(ellipse).forEach(handle => {
      ctx.save();
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#2196f3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(handle.x - HANDLE_SIZE/2, handle.y - HANDLE_SIZE/2, HANDLE_SIZE, HANDLE_SIZE);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    });
  },

  drawRotateHandles(shape) {
    const ctx = this.context;
    const handles = this.getRotateHandles(shape);
    // 각 핸들별 각도(라디안): 좌상, 우상, 우하, 좌하
    const angles = [
      Math.PI * 0.25, 
      Math.PI * 0.75,
      Math.PI * 1.25, 
      Math.PI * 1.75, 
    ];
    // 곡선이 아이템을 감싸도록 (시계방향)
    handles.forEach((handle, idx) => {
      this.drawArrowHandle(ctx, handle.x, handle.y, angles[idx], '#2196f3', true);
    });
  },

  drawArrowHandle(ctx, x, y, angle, color, wrap = true) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    // 아이템을 감싸는 곡선: 1/4원, 시계방향
    const r = 8;
    let startAngle = Math.PI * 0.75;
    let endAngle = Math.PI * 1.25;
    if (wrap) {
      // 시계방향으로 감싸는 형태 (아크가 바깥쪽)
      startAngle = Math.PI * 0.75;
      endAngle = Math.PI * 1.25;
    }

    // 1/4원 곡선만
    ctx.beginPath();
    ctx.arc(0, 0, r, startAngle, endAngle, false);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // 화살촉 그리기 함수 (곡선 접선 방향)
    function drawArrowHead(px, py, theta) {
      const size = 8;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(theta);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-size, -size * 0.5);
      ctx.lineTo(-size, size * 0.5);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    }

    // 시작점, 끝점 좌표 및 접선 각도
    const sx = r * Math.cos(startAngle);
    const sy = r * Math.sin(startAngle);
    const ex = r * Math.cos(endAngle);
    const ey = r * Math.sin(endAngle);

    // 접선 각도: θ+π/2 (시계방향), θ-π/2 (반시계방향)
    drawArrowHead(sx, sy, startAngle + Math.PI / 2);
    drawArrowHead(ex, ey, endAngle - Math.PI / 2);

    ctx.restore();
  },

  getHandleUnderMouseRect(rect, mx, my) {
    return this.getRectHandles(rect).find(handle =>
      Math.abs(mx - handle.x) < HANDLE_SIZE &&
      Math.abs(my - handle.y) < HANDLE_SIZE
    );
  },

  getHandleUnderMouseEllipse(ellipse, mx, my) {
    return this.getEllipseHandles(ellipse).find(handle =>
      Math.abs(mx - handle.x) < HANDLE_SIZE &&
      Math.abs(my - handle.y) < HANDLE_SIZE
    );
  },

  getRotateHandleUnderMouse(shape, mx, my) {
    return this.getRotateHandles(shape).find((handle, idx) =>
      Math.sqrt((mx - handle.x) ** 2 + (my - handle.y) ** 2) < ROTATE_HANDLE_RADIUS + 2
    );
  },

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },

  isEllipseHit(shape, x, y) {
    const dx = x - shape.x;
    const dy = y - shape.y;
    return (dx * dx) / (shape.radiusX * shape.radiusX) + (dy * dy) / (shape.radiusY * shape.radiusY) <= 1;
  },

  isRectHit(shape, x, y) {
    return x >= shape.x && x <= shape.x + shape.width &&
           y >= shape.y && y <= shape.y + shape.height;
  },

  handleMouseDown(e, shapes) {
    const { x, y } = this.getMousePos(e);
    this.draggingShape = null;
    this.resizingShape = null;
    this.resizingHandle = null;
    this.rotatingShape = null;
    this.rotatingHandleIndex = null;
    this.selectedShape = null;

    // 회전 핸들 hit test (우선순위)
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      const center = this.getShapeCenter(shape);
      // 마우스 좌표를 shape의 회전 좌표계로 변환
      const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
      const rotateHandle = this.getRotateHandleUnderMouse(shape, local.x, local.y);
      if (rotateHandle) {
        this.rotatingShape = shape;
        this.selectedShape = shape;
        this.startAngle = Math.atan2(local.y - center.y, local.x - center.x);
        this.startRotation = shape.rotation || 0;
        this.draw(shapes);
        return;
      }
    }

    // 크기조절 핸들 hit test
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      const center = this.getShapeCenter(shape);
      const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
      if (shape.type === 'rect') {
        const handle = this.getHandleUnderMouseRect(shape, local.x, local.y);
        if (handle) {
          this.resizingShape = shape;
          this.resizingHandle = handle.pos;
          this.selectedShape = shape;
          this.draw(shapes);
          return;
        }
      } else if (shape.type === 'ellipse') {
        const handle = this.getHandleUnderMouseEllipse(shape, local.x, local.y);
        if (handle) {
          this.resizingShape = shape;
          this.resizingHandle = handle.pos;
          this.selectedShape = shape;
          this.draw(shapes);
          return;
        }
      }
    }

    // shape hit test
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      const center = this.getShapeCenter(shape);
      const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
      if (shape.type === 'ellipse' && this.isEllipseHit(shape, local.x, local.y)) {
        this.draggingShape = shape;
        this.offsetX = local.x - shape.x;
        this.offsetY = local.y - shape.y;
        this.selectedShape = shape;
        this.draw(shapes);
        return;
      } else if (shape.type === 'rect' && this.isRectHit(shape, local.x, local.y)) {
        this.draggingShape = shape;
        this.offsetX = local.x - (shape.x);
        this.offsetY = local.y - (shape.y);
        this.selectedShape = shape;
        this.draw(shapes);
        return;
      }
    }
    this.selectedShape = null;
    this.draw(shapes);
  },

  handleMouseMove(e, shapes) {
    const { x, y } = this.getMousePos(e);
    let cursor = 'default';
    let overHandle = false;
    // 회전 핸들 커서
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      const center = this.getShapeCenter(shape);
      const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
      const rotateHandle = this.getRotateHandleUnderMouse(shape, local.x, local.y);
      if (rotateHandle) {
        cursor = 'grab';
        overHandle = true;
        break;
      }
    }
    // 크기조절 핸들 커서
    if (!overHandle) {
      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        const center = this.getShapeCenter(shape);
        const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
        let handle = null;
        if (shape.type === 'rect') {
          handle = this.getHandleUnderMouseRect(shape, local.x, local.y);
        } else if (shape.type === 'ellipse') {
          handle = this.getHandleUnderMouseEllipse(shape, local.x, local.y);
        }
        if (handle) {
          cursor = handle.cursor;
          overHandle = true;
          break;
        }
      }
    }
    // shape move 커서
    if (!overHandle) {
      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        const center = this.getShapeCenter(shape);
        const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
        if ((shape.type === 'ellipse' && this.isEllipseHit(shape, local.x, local.y)) ||
            (shape.type === 'rect' && this.isRectHit(shape, local.x, local.y))) {
          cursor = 'move';
          break;
        }
      }
    }
    this.canvas.style.cursor = cursor;

    // 회전 핸들 드래그
    if (this.rotatingShape) {
      const shape = this.rotatingShape;
      const center = this.getShapeCenter(shape);
      const local = this.getLocalCoords(x, y, center, 0);
      const angle = Math.atan2(local.y - center.y, local.x - center.x);
      shape.rotation = this.startRotation + (angle - this.startAngle);
      this.draw(shapes);
      return;
    }

    // 크기조절 핸들 드래그
    if (this.resizingShape && this.resizingHandle) {
      const shape = this.resizingShape;
      const center = this.getShapeCenter(shape);
      const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
      if (shape.type === 'rect') {
        this.resizeRect(shape, this.resizingHandle, local.x, local.y);
      } else if (shape.type === 'ellipse') {
        this.resizeEllipse(shape, this.resizingHandle, local.x, local.y);
      }
      this.draw(shapes);
      return;
    }

    // shape 드래그
    if (this.draggingShape) {
      const shape = this.draggingShape;
      const center = this.getShapeCenter(shape);
      const local = this.getLocalCoords(x, y, center, -(shape.rotation || 0));
      if (shape.type === 'ellipse') {
        shape.x = local.x - this.offsetX;
        shape.y = local.y - this.offsetY;
      } else if (shape.type === 'rect') {
        shape.x = local.x - this.offsetX;
        shape.y = local.y - this.offsetY;
      }
      this.draw(shapes);
    }
  },

  handleMouseUp() {
    this.draggingShape = null;
    this.resizingShape = null;
    this.resizingHandle = null;
    this.rotatingShape = null;
    this.rotatingHandleIndex = null;
  },

  getLocalCoords(x, y, center, angle) {
    // (x, y)를 center 기준 angle만큼 반시계 회전한 좌표로 변환
    const dx = x - center.x;
    const dy = y - center.y;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return {
      x: center.x + dx * cos - dy * sin,
      y: center.y + dx * sin + dy * cos
    };
  },

  resizeRect(rect, handlePos, mx, my) {
    const minSize = 20;
    let { x, y, width, height } = rect;
    const x2 = x + width;
    const y2 = y + height;
    const aspect = width / height;
    switch (handlePos) {
      case 'tl':
        if (aspectRatioLocked) {
          // 비율 유지: dx, dy 중 작은 변화량을 기준
          let dx = Math.min(mx, x2 - minSize) - x;
          let dy = Math.min(my, y2 - minSize) - y;
          let delta = Math.max(dx, dy);
          rect.x = x2 - Math.max(minSize, aspect * (y2 - (y + delta)));
          rect.y = y2 - Math.max(minSize, (x2 - (x + delta)) / aspect);
          rect.width = x2 - rect.x;
          rect.height = y2 - rect.y;
        } else {
          rect.x = Math.min(mx, x2 - minSize);
          rect.y = Math.min(my, y2 - minSize);
          rect.width = x2 - rect.x;
          rect.height = y2 - rect.y;
        }
        break;
      case 'tr':
        if (aspectRatioLocked) {
          let dx = Math.max(mx - x, minSize) - width;
          let dy = Math.min(my, y2 - minSize) - y;
          let delta = Math.max(dx, y - Math.min(my, y2 - minSize));
          rect.y = y2 - Math.max(minSize, (width + delta) / aspect);
          rect.width = Math.max(mx - x, minSize);
          rect.height = y2 - rect.y;
        } else {
          rect.y = Math.min(my, y2 - minSize);
          rect.width = Math.max(mx - x, minSize);
          rect.height = y2 - rect.y;
        }
        break;
      case 'br':
        if (aspectRatioLocked) {
          let dx = Math.max(mx - x, minSize) - width;
          let dy = Math.max(my - y, minSize) - height;
          let delta = Math.max(dx, dy);
          rect.width = Math.max(width + delta, minSize);
          rect.height = rect.width / aspect;
        } else {
          rect.width = Math.max(mx - x, minSize);
          rect.height = Math.max(my - y, minSize);
        }
        break;
      case 'bl':
        if (aspectRatioLocked) {
          let dx = Math.min(mx, x2 - minSize) - x;
          let dy = Math.max(my - y, minSize) - height;
          let delta = Math.max(x - Math.min(mx, x2 - minSize), dy);
          rect.x = x2 - Math.max(minSize, aspect * (height + delta));
          rect.width = x2 - rect.x;
          rect.height = rect.width / aspect;
        } else {
          rect.x = Math.min(mx, x2 - minSize);
          rect.width = x2 - rect.x;
          rect.height = Math.max(my - y, minSize);
        }
        break;
      // 중앙 핸들은 기존대로 동작
      case 'tm':
        rect.y = Math.min(my, y2 - minSize);
        rect.height = y2 - rect.y;
        break;
      case 'mr':
        rect.width = Math.max(mx - x, minSize);
        break;
      case 'bm':
        rect.height = Math.max(my - y, minSize);
        break;
      case 'ml':
        rect.x = Math.min(mx, x2 - minSize);
        rect.width = x2 - rect.x;
        break;
    }
  },

  resizeEllipse(ellipse, handlePos, mx, my) {
    const minRadius = 10;
    let dx = mx - ellipse.x;
    let dy = my - ellipse.y;
    const aspect = ellipse.radiusX / ellipse.radiusY;
    switch (handlePos) {
      case 'tl':
      case 'br':
        if (aspectRatioLocked) {
          let delta = Math.max(Math.abs(dx), Math.abs(dy));
          ellipse.radiusX = Math.max(delta, minRadius);
          ellipse.radiusY = ellipse.radiusX / aspect;
        } else {
          ellipse.radiusX = Math.max(Math.abs(dx), minRadius);
          ellipse.radiusY = Math.max(Math.abs(dy), minRadius);
        }
        break;
      case 'tr':
      case 'bl':
        if (aspectRatioLocked) {
          let delta = Math.max(Math.abs(dx), Math.abs(dy));
          ellipse.radiusX = Math.max(delta, minRadius);
          ellipse.radiusY = ellipse.radiusX / aspect;
        } else {
          ellipse.radiusX = Math.max(Math.abs(dx), minRadius);
          ellipse.radiusY = Math.max(Math.abs(dy), minRadius);
        }
        break;
      // 중앙 핸들은 기존대로 동작
      case 'tm':
      case 'bm':
        ellipse.radiusY = Math.max(Math.abs(dy), minRadius);
        break;
      case 'mr':
      case 'ml':
        ellipse.radiusX = Math.max(Math.abs(dx), minRadius);
        break;
    }
  },

  loadImagesAndDraw(shapes) {
    this.shapeImages = shapes.map(shape => {
      const img = new Image();
      img.src = shape.imageSrc;
      img.onload = () => {
        this.imagesLoaded++;
        if (this.imagesLoaded === shapes.length) {
          this.draw(shapes);
        }
      };
      return img;
    });
  },

  addEventListeners(shapes) {
    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e, shapes));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e, shapes));
    this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this));
  },

  init(shapes) {
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');
    this.imagesLoaded = 0;
    this.loadImagesAndDraw(shapes);
    this.addEventListeners(shapes);
  }
};

document.getElementById('saveImageBtn').addEventListener('click', function() {
  const canvas = document.getElementById('myCanvas');
  const link = document.createElement('a');
  link.download = 'canvas-image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
