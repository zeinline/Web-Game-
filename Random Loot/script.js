function game_save() {
  localStorage.setItem('Random Loot', JSON.stringify(chests));
}
function game_load() {
  if (JSON.parse(localStorage.getItem('Random Loot'))) {
    return JSON.parse(localStorage.getItem('Random Loot'));
  } else {
    return [];
  }
}

if (true) {
  var chests = game_load();
  if (chests.length == 0) {
    let df_chest = {
      chest: {
        chest_title: 'обычный сундук',
        chest_backgr: 'img/фоны/bg.png',
        chest_image: 'img/сундуки/обычный%20сундук.png',
        chest_items: 4
      },
      item_0: {
        title: ['посох духов', 'посох леса', 'посох тьмы'],
        image: ['img/экипировка/посох%20духов.png', 'img/экипировка/посох%20леса.png', 'img/экипировка/посох%20тьмы.png'],
        rand: 5,
        min: 0,
        max: 1
      },
      item_1: {
        title: ['книга демонических ритуалов', 'книга магии лечения', 'книга огненой магии', 'кольцо'],
        image: ['img/предметы/книга%20демонических%20ритуалов.png', 'img/предметы/книга%20магии%20лечения.png', 'img/предметы/книга%20огненой%20магии.png', 'img/предметы/кольцо.png'],
        rand: 20,
        min: 0,
        max: 1
      },
      item_2: {
        title: ['зелье'],
        image: ['img/расходники/зелье%20здоровья.png'],
        rand: 30,
        min: 0,
        max: 2
      },
      item_3: {
        title: ['золото'],
        image: ['img/деньги/золото.png'],
        rand: 50,
        min: 10,
        max: 50
      }
    }
    chests[0] = df_chest;
    game_save();
  }
  var st_chest = {
    chest: {
      chest_title: 'новый сундук',
      chest_backgr: 'img/фоны/bg.png',
      chest_image: 'img/сундуки/обычный%20сундук.png',
      chest_items: 1
    },
    item_0: {
      title: ['золото'],
      image: ['img/деньги/золото.png'],
      rand: 50,
      min: 10,
      max: 50
    }
  }
  var cr_chest = {};
  var items_id = {
    item: [],
    rand: [],
    min: [],
    max: [],
    bt_plus: [],
    bt_delete: [],
    bt_delete_child: [],
    block_2: [],
    img_item: [],
    tx_item: [],
    src_item: []
  };
  var num_room = 0;
  var inventory = [];

  var id_room_open = document.getElementById('room_open');
  var id_room_choose = document.getElementById('room_choose');
  var id_room_create = document.getElementById('room_create');

  var id_title_chest = document.getElementById('title_chest');
  var id_background_chest = document.getElementById('background_chest');
  var id_image_chest = document.getElementById('image_chest');
  var id_inventory = document.getElementById('inventory');

  var id_field_title = document.getElementById('field_title');
  var id_create_background = document.getElementById('create_background');
  var id_field_background = document.getElementById('field_background');
  var id_create_image = document.getElementById('create_image');
  var id_field_image = document.getElementById('field_image');
  var id_create_inventory = document.getElementById('create_inventory');
}


function room_open(num) {
  id_room_choose.style.display = 'none';
  id_room_open.style.display = 'block';

  num_room = num;
  id_title_chest.innerHTML = chests[num_room].chest.chest_title;
  id_background_chest.style.background = "url('"+chests[num_room].chest.chest_backgr+"')";
  id_background_chest.onerror = function() { id_background_chest.style.background = "url('"+st_chest.chest.chest_backgr+"')"; }
  id_image_chest.src = chests[num_room].chest.chest_image;
  id_image_chest.onerror = function() { id_image_chest.src = st_chest.chest.chest_image; }
  id_inventory.innerHTML = "<p id='inventory_header'>инвентарь</p>";
  inventory = [];
  for (let i = 0; i < chests[num_room].chest.chest_items; i++) {
    inventory[i] = [];
    for (let j = 0; j < chests[num_room]['item_'+i].title.length; j++) {
      inventory[i][j] = 0;
    }
  }
}

function open_chest() {
  id_inventory.innerHTML = "<p id='inventory_header'>инвентарь</p>";

  for (let i = 0; i < chests[num_room].chest.chest_items; i++) {
    let num_loot = Math.floor(Math.random() * chests[num_room]['item_'+i].title.length);
    if (chests[num_room]['item_'+i].min > 0) { inventory[i][num_loot] += chests[num_room]['item_'+i].min; }

    for (let j = 0; j < chests[num_room]['item_'+i].max - chests[num_room]['item_'+i].min; j++) {
      let loot = Math.floor(Math.random() * 100);
      if (chests[num_room]['item_'+i].rand >= loot) { inventory[i][num_loot]++; }
    }

    for (let j = 0; j < chests[num_room]['item_'+i].title.length; j++) {
      if (inventory[i][j] > 0) {
        id_inventory.innerHTML +=
        "<div class='item'>"+
    			"<img class='img_item' src='"+chests[num_room]['item_'+i].image[j]+"' onerror='this.src = st_chest.item_0.image[0]'><p class='kol_item'>"+inventory[i][j]+"</p></img>"+
    			"<p class='tx_item'>"+chests[num_room]['item_'+i].title[j]+"</p>"+
    		"</div>";
      }
    }
  }
}


function room_choose() {
  id_room_open.style.display = 'none';
  id_room_create.style.display = 'none';
  id_room_choose.style.display = 'block';

  id_room_choose.innerHTML =
  "<button id='new_object' type='button' onclick='room_create(-1);'>+ новый объект</button>";
  for (let i = 0; i < chests.length; i++) {
    id_room_choose.innerHTML +=
    "<div class='block_choose'>"+
      "<button class='button_choose' type='button' onclick='room_open("+i+");'>"+
        chests[i].chest.chest_title+
        "<button class='button_create' type='button' onclick='room_create("+i+");'>"+
          "<img src='img/setting.png'>"+
        "</button>"+
      "</button>"+
    "</div>";
  }
}


function room_create(num) {
  id_room_choose.style.display = 'none';
  id_room_create.style.display = 'block';

  num_room = num;
  if (num_room > -1) { cr_chest = JSON.parse(JSON.stringify(chests[num_room])); }
  else { cr_chest = JSON.parse(JSON.stringify(st_chest)); }

  id_field_title.value = cr_chest.chest.chest_title;
  id_field_background.value = cr_chest.chest.chest_backgr;
  id_create_background.style.background = "url('"+cr_chest.chest.chest_backgr+"')";
  id_create_background.onerror = function() { id_create_background.style.background = "url('"+st_chest.chest.chest_backgr+"')"; }
  id_field_image.value = cr_chest.chest.chest_image;
  id_create_image.src = cr_chest.chest.chest_image;
  id_create_image.onerror = function() { id_create_image.src = st_chest.chest.chest_image; }

  redraw_items();
}

function save_setting() {
  if (num_room == -1) { chests[chests.length] = JSON.parse(JSON.stringify(cr_chest)); }
  else { chests[num_room] = JSON.parse(JSON.stringify(cr_chest)); }
  game_save();
  room_choose();
}
function delete_chest() {
  let yes_no = confirm('удалить сундук?');
  if (yes_no) {
    if (num_room > -1) { chests.splice(num_room, 1); }
    game_save();
    room_choose();
  }
}

function field_title() {
  cr_chest.chest.chest_title = id_field_title.value;
}
function field_image() {
  id_create_image.src = id_field_image.value;
  cr_chest.chest.chest_image = id_field_image.value;
  id_create_image.onerror = function() { id_create_image.src = st_chest.chest.chest_image; }
}
function field_background() {
  id_create_background.style.background = "url('"+id_field_background.value+"')";
  cr_chest.chest.chest_backgr = id_field_background.value;
  id_create_background.onerror = function() { id_create_background.style.background = "url('"+st_chest.chest.chest_backgr+"')"; }
}

function bt_plus() {
  create_item();
  redraw_items();
}
function bt_plus_child(id) {
  create_item_child(id);
  redraw_items_child(id);
}

function bt_delete(id) {
  delete_item(id);
  redraw_items();
}
function bt_delete_child(id, id_j) {
  delete_item_child(id, id_j);
  redraw_items_child(id);
}

function create_item() {
  cr_chest['item_'+cr_chest.chest.chest_items] = {
    title: ['золото'],
    image: ['img/деньги/золото.png'],
    rand: 50,
    min: 10,
    max: 50
  };
  cr_chest.chest.chest_items++;
}
function create_item_child(id) {
  cr_chest['item_'+id].title[cr_chest['item_'+id].title.length] = 'золото';
  cr_chest['item_'+id].image[cr_chest['item_'+id].image.length] = 'img/деньги/золото.png';
}

function delete_item(id) {
  let _cr_chest = JSON.parse(JSON.stringify(cr_chest));
  for (let i = id; i < cr_chest.chest.chest_items-1; i++) {
    cr_chest['item_'+i].title = _cr_chest['item_'+(i+1)].title;
    cr_chest['item_'+i].image = _cr_chest['item_'+(i+1)].image;
    cr_chest['item_'+i].rand = _cr_chest['item_'+(i+1)].rand;
    cr_chest['item_'+i].min = _cr_chest['item_'+(i+1)].min;
    cr_chest['item_'+i].max = _cr_chest['item_'+(i+1)].max;
  }
  cr_chest.chest.chest_items--;
  delete cr_chest['item_'+cr_chest.chest.chest_items];
}
function delete_item_child(id, id_j) {
  let _title = cr_chest['item_'+id].title;
  let _image = cr_chest['item_'+id].image;
  cr_chest['item_'+id].title = [];
  cr_chest['item_'+id].image = [];
  for (let i = 0; i < _title.length-1; i++) {
    if (id_j > i) {
      cr_chest['item_'+id].title[i] = _title[i];
      cr_chest['item_'+id].image[i] = _image[i];
    } else {
      cr_chest['item_'+id].title[i] = _title[i+1];
      cr_chest['item_'+id].image[i] = _image[i+1];
    }
  }
}

function redraw_items() {
  id_create_inventory.innerHTML = "<button id='add_item' type='button' onclick='bt_plus();'>добавить новый предмет</button>";
  for (let i = 0; i < cr_chest.chest.chest_items; i++) {
    draw_item(i);
  }
}
function redraw_items_child(id) {
  document.getElementById(items_id.item[id].id).innerHTML =
    "<div class='new_br'></div>"+
    "<div class='new_block_1'>"+
      "<button id='new_bt_plus_"+id+"' class='new_bt_plus' type='button' onclick='bt_plus_child("+id+");'>+</button>"+
      "<p>шанс в %<input id='new_rand_"+id+"' type='number' value='"+cr_chest['item_'+id].rand+"' onblur='bt_rand("+id+");'></p>"+
      "<p>минимум<input id='new_min_"+id+"' type='number' value='"+cr_chest['item_'+id].min+"' onblur='bt_min("+id+");'></p>"+
      "<p>максимум<input id='new_max_"+id+"' type='number' value='"+cr_chest['item_'+id].max+"' onblur='bt_max("+id+");'></p>"+
      "<button id='new_bt_delete_"+id+"' class='new_bt_delete' type='button' onclick='bt_delete("+id+");'>x</button>"+
    "</div>";

  items_id.rand[id] = document.getElementById('new_rand_'+id);
  items_id.min[id] = document.getElementById('new_min_'+id);
  items_id.max[id] = document.getElementById('new_max_'+id);
  items_id.bt_plus[id] = document.getElementById('new_bt_plus_'+id);
  items_id.bt_delete[id] = document.getElementById('new_bt_delete_'+id);
  items_id.bt_delete_child[id] = [];
  items_id.block_2[id] = [];
  items_id.img_item[id] = [];
  items_id.tx_item[id] = [];
  items_id.src_item[id] = [];

  draw_item_child(id);
}

function draw_item(i) {
  id_create_inventory.innerHTML +=
  "<div id='new_item_"+i+"' class='new_item'>"+
    "<div class='new_br'></div>"+
    "<div class='new_block_1'>"+
      "<button id='new_bt_plus_"+i+"' class='new_bt_plus' type='button' onclick='bt_plus_child("+i+");'>+</button>"+
      "<p>шанс в %<input id='new_rand_"+i+"' type='number' value='"+cr_chest['item_'+i].rand+"' onblur='bt_rand("+i+");'></p>"+
      "<p>минимум<input id='new_min_"+i+"' type='number' value='"+cr_chest['item_'+i].min+"' onblur='bt_min("+i+");'></p>"+
      "<p>максимум<input id='new_max_"+i+"' type='number' value='"+cr_chest['item_'+i].max+"' onblur='bt_max("+i+");'></p>"+
      "<button id='new_bt_delete_"+i+"' class='new_bt_delete' type='button' onclick='bt_delete("+i+");'>x</button>"+
    "</div>";

  items_id.item[i] = document.getElementById('new_item_'+i);
  items_id.rand[i] = document.getElementById('new_rand_'+i);
  items_id.min[i] = document.getElementById('new_min_'+i);
  items_id.max[i] = document.getElementById('new_max_'+i);
  items_id.bt_plus[i] = document.getElementById('new_bt_plus_'+i);
  items_id.bt_delete[i] = document.getElementById('new_bt_delete_'+i);
  items_id.bt_delete_child[i] = [];
  items_id.block_2[i] = [];
  items_id.img_item[i] = [];
  items_id.tx_item[i] = [];
  items_id.src_item[i] = [];

  draw_item_child(i);

  id_create_inventory.innerHTML += "</div>";
}
function draw_item_child(i) {
  for (let j = 0; j < cr_chest['item_'+i].title.length; j++) {
    document.getElementById(items_id.item[i].id).innerHTML +=
      "<div id='new_block_2_"+i+"_"+j+"' class='new_block_2'>"+
        "<button id='new_bt_delete_child_"+i+"_"+j+"' class='new_bt_delete_child' type='button' onclick='bt_delete_child("+i+", "+j+");'>x</button>"+
        "<img id='new_img_item_"+i+"_"+j+"' class='new_img_item' src='"+cr_chest['item_'+i].image[j]+"' onerror='this.src = st_chest.item_0.image[0];'>"+
          "<input id='new_tx_item_"+i+"_"+j+"' class='new_tx_item' type='text' value='"+cr_chest['item_'+i].title[j]+"' onblur='bt_tx_item("+i+", "+j+");'>"+
          "<input id='new_src_item_"+i+"_"+j+"' class='new_src_item' type='text' value='"+cr_chest['item_'+i].image[j]+"' onblur='bt_src_item("+i+", "+j+");'>"+
          "<p>название</p>"+
          "<p>путь к файлу</p>"+
        "</img>"+
      "</div>";

    items_id.bt_delete_child[i][j] = document.getElementById('new_bt_delete_child_'+i+'_'+j);
    items_id.block_2[i][j] = document.getElementById('new_block_2_'+i+'_'+j);
    items_id.img_item[i][j] = document.getElementById('new_img_item_'+i+'_'+j);
    items_id.tx_item[i][j] = document.getElementById('new_tx_item_'+i+'_'+j);
    items_id.src_item[i][j] = document.getElementById('new_src_item_'+i+'_'+j);
  }
}

function bt_rand(i) {
  cr_chest['item_'+i].rand = Number(document.getElementById(items_id.rand[i].id).value);
}
function bt_min(i) {
  cr_chest['item_'+i].min = Number(document.getElementById(items_id.min[i].id).value);
}
function bt_max(i) {
  cr_chest['item_'+i].max = Number(document.getElementById(items_id.max[i].id).value);
}
function bt_tx_item(i, j) {
  cr_chest['item_'+i].title[j] = document.getElementById(items_id.tx_item[i][j].id).value;
}
function bt_src_item(i, j) {
  cr_chest['item_'+i].image[j] = document.getElementById(items_id.src_item[i][j].id).value;
  items_id.img_item[i][j].src = document.getElementById(items_id.src_item[i][j].id).value;
  redraw_items_child(i);
}

/* start */ room_choose();














//
