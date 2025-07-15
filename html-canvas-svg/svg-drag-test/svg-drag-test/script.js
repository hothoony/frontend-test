// 도형 정보 및 상태 저장
const shapes = {
  'draggable-circle': {
    type: 'circle',
    original: { x: 70, y: 270 },
    fixed: false
  },
  'draggable-rect': {
    type: 'rect',
    original: { x: 170, y: 230 },
    fixed: false
  },
  'draggable-triangle': {
    type: 'triangle',
    original: { points: [ [330,230], [300,290], [360,290] ] },
    fixed: false
  }
};

let dragging = null;
let offset = { x: 0, y: 0 };
let startMouse = { x: 0, y: 0 };
let startPos = null;

function getMousePosition(evt, svg) {
  const rect = svg.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function onDragStart(e) {
  if (dragging) return;
  const target = e.target;
  if (!target.classList.contains('draggable-shape')) return;
  if (shapes[target.id].fixed) return;
  dragging = target;
  dragging.classList.add('dragging');
  const svg = target.ownerSVGElement;
  svg.appendChild(target); // z-order 최상위
  const mouse = getMousePosition(e, svg);
  if (dragging.tagName === 'circle') {
    offset.x = mouse.x - parseFloat(dragging.getAttribute('cx'));
    offset.y = mouse.y - parseFloat(dragging.getAttribute('cy'));
    startPos = { cx: parseFloat(dragging.getAttribute('cx')), cy: parseFloat(dragging.getAttribute('cy')) };
  } else if (dragging.tagName === 'rect') {
    offset.x = mouse.x - parseFloat(dragging.getAttribute('x'));
    offset.y = mouse.y - parseFloat(dragging.getAttribute('y'));
    startPos = { x: parseFloat(dragging.getAttribute('x')), y: parseFloat(dragging.getAttribute('y')) };
  } else if (dragging.tagName === 'polygon') {
    const points = dragging.getAttribute('points').split(' ')[0].split(',');
    offset.x = mouse.x - parseFloat(points[0]);
    offset.y = mouse.y - parseFloat(points[1]);
    startPos = dragging.getAttribute('points');
  }
  startMouse = { x: e.clientX, y: e.clientY };
  document.addEventListener('mousemove', onDragMove);
  document.addEventListener('mouseup', onDragEnd);
}

function onDragMove(e) {
  if (!dragging) return;
  const svg = dragging.ownerSVGElement;
  const mouse = getMousePosition(e, svg);
  if (dragging.tagName === 'circle') {
    dragging.setAttribute('cx', mouse.x - offset.x);
    dragging.setAttribute('cy', mouse.y - offset.y);
  } else if (dragging.tagName === 'rect') {
    dragging.setAttribute('x', mouse.x - offset.x);
    dragging.setAttribute('y', mouse.y - offset.y);
  } else if (dragging.tagName === 'polygon') {
    // 삼각형: 모든 점을 이동
    const origPoints = dragging.getAttribute('points').split(' ').map(pt => pt.split(',').map(Number));
    const dx = mouse.x - offset.x - origPoints[0][0];
    const dy = mouse.y - offset.y - origPoints[0][1];
    const newPoints = origPoints.map(([x, y]) => [x + dx, y + dy]);
    dragging.setAttribute('points', newPoints.map(pt => pt.join(',')).join(' '));
  }
}

function onDragEnd(e) {
  if (!dragging) return;
  const shapeId = dragging.id;
  const shapeType = shapes[shapeId].type;
  const stage = document.getElementById('stage');
  const target = document.getElementById('target-shape');
  const targetBBox = target.getBBox();
  let dragCenter = { x: 0, y: 0 };
  if (dragging.tagName === 'circle') {
    dragCenter.x = parseFloat(dragging.getAttribute('cx'));
    dragCenter.y = parseFloat(dragging.getAttribute('cy'));
  } else if (dragging.tagName === 'rect') {
    dragCenter.x = parseFloat(dragging.getAttribute('x')) + parseFloat(dragging.getAttribute('width'))/2;
    dragCenter.y = parseFloat(dragging.getAttribute('y')) + parseFloat(dragging.getAttribute('height'))/2;
  } else if (dragging.tagName === 'polygon') {
    const pts = dragging.getAttribute('points').split(' ').map(pt => pt.split(',').map(Number));
    dragCenter.x = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
    dragCenter.y = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
  }
  const inTarget = (
    dragCenter.x > targetBBox.x && dragCenter.x < targetBBox.x + targetBBox.width &&
    dragCenter.y > targetBBox.y && dragCenter.y < targetBBox.y + targetBBox.height
  );
  const isMatch = (shapeType === 'triangle');
  if (inTarget && isMatch) {
    if (dragging.tagName === 'polygon') {
      const targetPts = target.getAttribute('points').split(' ').map(pt => pt.split(',').map(Number));
      const tCenter = {
        x: (targetPts[0][0] + targetPts[1][0] + targetPts[2][0]) / 3,
        y: (targetPts[0][1] + targetPts[1][1] + targetPts[2][1]) / 3
      };
      const dragPts = dragging.getAttribute('points').split(' ').map(pt => pt.split(',').map(Number));
      const dCenter = {
        x: (dragPts[0][0] + dragPts[1][0] + dragPts[2][0]) / 3,
        y: (dragPts[0][1] + dragPts[1][1] + dragPts[2][1]) / 3
      };
      const dx = tCenter.x - dCenter.x;
      const dy = tCenter.y - dCenter.y;
      const newPoints = dragPts.map(([x, y]) => [x + dx, y + dy]);
      dragging.setAttribute('points', newPoints.map(pt => pt.join(',')).join(' '));
    }
    dragging.classList.add('fixed');
    shapes[shapeId].fixed = true;
  } else {
    // 원래 자리로 복귀
    if (dragging.tagName === 'circle') {
      dragging.setAttribute('cx', shapes[shapeId].original.x);
      dragging.setAttribute('cy', shapes[shapeId].original.y);
    } else if (dragging.tagName === 'rect') {
      dragging.setAttribute('x', shapes[shapeId].original.x);
      dragging.setAttribute('y', shapes[shapeId].original.y);
    } else if (dragging.tagName === 'polygon') {
      dragging.setAttribute('points', shapes[shapeId].original.points.map(pt => pt.join(',')).join(' '));
    }
  }
  dragging.classList.remove('dragging');
  dragging = null;
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
}

// 이벤트 바인딩
window.addEventListener('DOMContentLoaded', () => {
  const svg = document.getElementById('stage');
  svg.addEventListener('mousedown', onDragStart);
}); 