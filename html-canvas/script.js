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

const canvasUtil = {
  canvas: null,
  context: null,
  shapeImages: [],
  imagesLoaded: 0,
  offsetX: 0,
  offsetY: 0,
  draggingShape: null,
  STROKE_STYLE: 'gray',
  LINE_WIDTH: 2,

  draw(shapes) {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    shapes.forEach((shape, idx) => {
      ctx.save();
      const img = this.shapeImages[idx];
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
      ctx.strokeStyle = this.STROKE_STYLE;
      ctx.lineWidth = this.LINE_WIDTH;
      if (shape.type === 'circle') {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
        ctx.stroke();
      } else if (shape.type === 'rect') {
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
      }
    });
  },

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  },

  isCircleHit(shape, x, y) {
    const dx = x - shape.x;
    const dy = y - shape.y;
    return Math.sqrt(dx * dx + dy * dy) <= shape.radius;
  },

  isRectHit(shape, x, y) {
    return x >= shape.x && x <= shape.x + shape.width &&
           y >= shape.y && y <= shape.y + shape.height;
  },

  handleMouseDown(e, shapes) {
    const { x, y } = this.getMousePos(e);
    this.draggingShape = null;
    shapes.forEach(shape => {
      if (shape.type === 'circle') {
        if (this.isCircleHit(shape, x, y)) {
          this.draggingShape = shape;
          this.offsetX = x - shape.x;
          this.offsetY = y - shape.y;
        }
      } else if (shape.type === 'rect') {
        if (this.isRectHit(shape, x, y)) {
          this.draggingShape = shape;
          this.offsetX = x - shape.x;
          this.offsetY = y - shape.y;
        }
      }
    });
  },

  handleMouseMove(e, shapes) {
    const { x, y } = this.getMousePos(e);
    let overShape = false;
    for (let i = shapes.length - 1; i >= 0; i--) {
      const shape = shapes[i];
      if ((shape.type === 'circle' && this.isCircleHit(shape, x, y)) ||
          (shape.type === 'rect' && this.isRectHit(shape, x, y))) {
        overShape = true;
        break;
      }
    }
    this.canvas.style.cursor = overShape ? 'move' : 'default';

    if (this.draggingShape) {
      if (this.draggingShape.type === 'circle') {
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
  },

  handleMouseLeave() {
    this.draggingShape = null;
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
