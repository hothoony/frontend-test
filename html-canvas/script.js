const shapes = [
  {
    type: 'ellipse',
    x: 200,
    y: 200,
    radiusX: 60,
    radiusY: 60,
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

const HANDLE_SIZE = 8;

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
  selectedShape: null,
  STROKE_STYLE: 'gray',
  LINE_WIDTH: 2,

  draw(shapes) {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    shapes.forEach((shape, idx) => {
      ctx.save();
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

      // 테두리
      ctx.strokeStyle = this.STROKE_STYLE;
      ctx.lineWidth = this.LINE_WIDTH;
      if (shape.type === 'ellipse') {
        ctx.beginPath();
        ctx.ellipse(shape.x, shape.y, shape.radiusX, shape.radiusY, 0, 0, Math.PI * 2);
        ctx.stroke();
        if (this.selectedShape === shape) {
          this.drawEllipseHandles(shape);
        }
      } else if (shape.type === 'rect') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        if (this.selectedShape === shape) {
          this.drawHandles(shape);
        }
      }
    });
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

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },

  isEllipseHit(shape, x, y) {
    // 타원 hit test: ((x-x0)/rx)^2 + ((y-y0)/ry)^2 <= 1
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
    this.selectedShape = null;

    // 핸들 hit test (ellipse, rect 모두)
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      if (shape.type === 'rect') {
        const handle = this.getHandleUnderMouseRect(shape, x, y);
        if (handle) {
          this.resizingShape = shape;
          this.resizingHandle = handle.pos;
          this.selectedShape = shape;
          this.draw(shapes);
          return;
        }
      } else if (shape.type === 'ellipse') {
        const handle = this.getHandleUnderMouseEllipse(shape, x, y);
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
      if (shape.type === 'ellipse' && this.isEllipseHit(shape, x, y)) {
        this.draggingShape = shape;
        this.offsetX = x - shape.x;
        this.offsetY = y - shape.y;
        this.selectedShape = shape;
        this.draw(shapes);
        return;
      } else if (shape.type === 'rect' && this.isRectHit(shape, x, y)) {
        this.draggingShape = shape;
        this.offsetX = x - shape.x;
        this.offsetY = y - shape.y;
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
    // 핸들 위 커서 변경 (ellipse, rect 모두)
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      let handle = null;
      if (shape.type === 'rect') {
        handle = this.getHandleUnderMouseRect(shape, x, y);
      } else if (shape.type === 'ellipse') {
        handle = this.getHandleUnderMouseEllipse(shape, x, y);
      }
      if (handle) {
        cursor = handle.cursor;
        overHandle = true;
        break;
      }
    }
    if (!overHandle) {
      // shape 위면 move, 아니면 default
      for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if ((shape.type === 'ellipse' && this.isEllipseHit(shape, x, y)) ||
            (shape.type === 'rect' && this.isRectHit(shape, x, y))) {
          cursor = 'move';
          break;
        }
      }
    }
    this.canvas.style.cursor = cursor;

    // 핸들 드래그 중이면 크기 조절
    if (this.resizingShape && this.resizingHandle) {
      if (this.resizingShape.type === 'rect') {
        this.resizeRect(this.resizingShape, this.resizingHandle, x, y);
      } else if (this.resizingShape.type === 'ellipse') {
        this.resizeEllipse(this.resizingShape, this.resizingHandle, x, y);
      }
      this.draw(shapes);
      return;
    }

    // shape 드래그
    if (this.draggingShape) {
      if (this.draggingShape.type === 'ellipse') {
        this.draggingShape.x = x - this.offsetX;
        this.draggingShape.y = y - this.offsetY;
      } else if (this.draggingShape.type === 'rect') {
        this.draggingShape.x = x - this.offsetX;
        this.draggingShape.y = y - this.offsetY;
      }
      this.draw(shapes);
    }
  },

  handleMouseUp() {
    this.draggingShape = null;
    this.resizingShape = null;
    this.resizingHandle = null;
  },

  handleMouseLeave() {
    this.draggingShape = null;
    this.resizingShape = null;
    this.resizingHandle = null;
  },

  resizeRect(rect, handlePos, mx, my) {
    const minSize = 20;
    let { x, y, width, height } = rect;
    const x2 = x + width;
    const y2 = y + height;
    switch (handlePos) {
      case 'tl':
        rect.x = Math.min(mx, x2 - minSize);
        rect.y = Math.min(my, y2 - minSize);
        rect.width = x2 - rect.x;
        rect.height = y2 - rect.y;
        break;
      case 'tm':
        rect.y = Math.min(my, y2 - minSize);
        rect.height = y2 - rect.y;
        break;
      case 'tr':
        rect.y = Math.min(my, y2 - minSize);
        rect.width = Math.max(mx - x, minSize);
        rect.height = y2 - rect.y;
        break;
      case 'mr':
        rect.width = Math.max(mx - x, minSize);
        break;
      case 'br':
        rect.width = Math.max(mx - x, minSize);
        rect.height = Math.max(my - y, minSize);
        break;
      case 'bm':
        rect.height = Math.max(my - y, minSize);
        break;
      case 'bl':
        rect.x = Math.min(mx, x2 - minSize);
        rect.width = x2 - rect.x;
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
    switch (handlePos) {
      case 'tl':
      case 'br':
        ellipse.radiusX = Math.max(Math.abs(dx), minRadius);
        ellipse.radiusY = Math.max(Math.abs(dy), minRadius);
        break;
      case 'tr':
      case 'bl':
        ellipse.radiusX = Math.max(Math.abs(dx), minRadius);
        ellipse.radiusY = Math.max(Math.abs(dy), minRadius);
        break;
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
    this.canvas.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  },

  init(shapes) {
    this.canvas = document.getElementById('myCanvas');
    this.context = this.canvas.getContext('2d');
    this.imagesLoaded = 0;
    this.loadImagesAndDraw(shapes);
    this.addEventListeners(shapes);
  }
};

// window.addEventListener('DOMContentLoaded', function() {
//   canvasUtil.init(shapes);
// });
