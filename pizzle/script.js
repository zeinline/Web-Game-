const game = document.getElementById('game');
const starting = document.getElementById('starting');
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
const buttons = document.getElementById('buttons');
const comp = document.getElementById('compare');

let ground = new Image();
let choose = new Image();   choose.src = 'img/choose.png';
let x, y;
let blocks_x, blocks_y;

let use_block_x = -1, use_block_y = -1;
let lvl = [];

function gcp(cvs, e) {
  const rect = canvas.getBoundingClientRect();
  const mouse_x = event.clientX - rect.left;
  const mouse_y = event.clientY - rect.top;
  click_block(Math.floor(mouse_x / x), Math.floor(mouse_y / y));
}
cvs.addEventListener('mousedown', function(e) { gcp(cvs, e) });

function start() {
  blocks_x = document.getElementById('blocks_x').value;
  blocks_y = document.getElementById('blocks_y').value;
  cvs.width = document.getElementById('pix_x').value;
  cvs.height = document.getElementById('pix_y').value;
  ground.src = document.getElementById('ground').value;
  x = cvs.width / blocks_x;
  y = cvs.height / blocks_y;
  comp.style.background = "url('"+ground.src+"')";
  comp.style.width = cvs.width+'px';
  comp.style.height = cvs.height+'px';

  for (let i = 0; i < blocks_x; i++) {
    lvl[i] = [];
    for (let j = 0; j < blocks_y; j++) {
      lvl[i][j] = [i, j];
    }
  }
  for (let i = 0; i < lvl.length; i++) {
    for (let j = 0; j < lvl[i].length; j++) {
      use_block_x = Math.floor(Math.random() * blocks_x);
      use_block_y = Math.floor(Math.random() * blocks_y);
      let pred_block_x = lvl[i][j][0];
      let pred_block_y = lvl[i][j][1];
      lvl[i][j][0] = lvl[use_block_x][use_block_y][0];
      lvl[i][j][1] = lvl[use_block_x][use_block_y][1];
      lvl[use_block_x][use_block_y][0] = pred_block_x;
      lvl[use_block_x][use_block_y][1] = pred_block_y;
    }
  }

  setTimeout(draw_block, 10);

  starting.style.display = 'none';
  cvs.style.display = 'block';
  buttons.style.display = 'block';
}

function back() {
  comp.style.display = 'none';
  buttons.style.display = 'none';
  cvs.style.display = 'none';
  starting.style.display = 'block';
}

function compare() {
  if (comp.style.display == 'block') {
    comp.style.display = 'none';
    cvs.style.display = 'block';
  }
  else {
    cvs.style.display = 'none';
    comp.style.display = 'block';
  }
}

function click_block(i, j) {
  if (i > -1 && i < blocks_x && j > -1 && j < blocks_y) {
    if (use_block_x == -1 || use_block_y == -1) {
      use_block_x = i;
      use_block_y = j;
      ctx.drawImage(choose, 0, 0, 100, 100, x*i, y*j, x, y);
    }
    else {
      let pred_block_x = lvl[i][j][0];
      let pred_block_y = lvl[i][j][1];
      lvl[i][j][0] = lvl[use_block_x][use_block_y][0];
      lvl[i][j][1] = lvl[use_block_x][use_block_y][1];
      lvl[use_block_x][use_block_y][0] = pred_block_x;
      lvl[use_block_x][use_block_y][1] = pred_block_y;
      use_block_x = -1;
      use_block_y = -1;

      draw_block();
      processing();
    }
  }
}

function draw_block() {
  for (let i = 0; i < blocks_x; i++) {
    for (let j = 0; j < blocks_y; j++) {
      ctx.drawImage(ground, x*lvl[i][j][0], y*lvl[i][j][1], x, y, x*i, y*j, x, y);
    }
  }
}

function processing() {
  let win = true;

  for (let i = 0; i < blocks_x; i++) {
    for (let j = 0; j < blocks_y; j++) {
      if (lvl[i][j][0] != i || lvl[i][j][1] != j) {
        win = false;
        i = blocks_x;
        j = blocks_y;
      }
    }
  }

  if (win) { alert('you win'); }
}













//
