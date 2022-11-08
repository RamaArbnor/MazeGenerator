// let s = 40; //size
var cols, rows;
var s = 40;

let blocks = [];
let stack = [];
let current;

function setup() {
  // put setup code here
  createCanvas(800, 800);
  // frameRate(5)
  cols = floor(width / s);
  rows = floor(height / s);
  background(51);
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      blocks.push(new Block(i, j));
    }
  }

  current = blocks[0];
}

function draw() {
  // put drawing code here
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].draw();
  }

  current.visited = true;
  current.visit();
  console.log(current);
  // blocks[1].visited = true;
  // blocks[1].visit()
  var next = current.checkNeighbours();
  if (next) {
    next.visited = true;
    stack.push(current);

    removeWalls(current, next);

    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(curr, next) {
  if (curr.i - next.i === 1) {
    curr.walls[3] = false;
    next.walls[1] = false;
  }
  if (curr.j - next.j == 1) {
    curr.walls[0] = false;
    next.walls[2] = false;
  }
  if (curr.i - next.i == -1) {
    curr.walls[1] = false;
    next.walls[3] = false;
  }
  if (curr.j - next.j == -1) {
    curr.walls[2] = false;
    next.walls[0] = false;
  }
}

class Block {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.visited = false;
    this.walls = [true, true, true, true];
    //up,  right, down, left.
  }

  checkNeighbours() {
    var neighbours = [];

    var top = blocks[index(this.i, this.j - 1)];
    var right = blocks[index(this.i + 1, this.j)];
    var down = blocks[index(this.i, this.j + 1)];
    var left = blocks[index(this.i - 1, this.j)];

    // var top = grid[index(i, j - 1)];
    // var right = grid[index(i + 1, j)];
    // var bottom = grid[index(i, j + 1)];
    // var left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      neighbours.push(top);
      console.log(top);
    }

    if (right && !right.visited) {
      neighbours.push(right);
      console.log(right);
    }

    if (down && !down.visited) {
      neighbours.push(down);
      console.log(down);
    }

    if (left && !left.visited) {
      neighbours.push(left);
      console.log(left);
    }

    // console.log(neighbours[0])

    if (neighbours.length > 0) {
      let r = floor(random(0, neighbours.length));
      console.log("this chooooseeen");
      neighbours[r];
      return neighbours[r];
    } else return undefined;
  }

  draw() {
    // TODO
    // Finish the lines to draw a blcok
    var x = this.i * s;
    var y = this.j * s;

    // fill(255,0,0);
    stroke(0, 0, 0);
    if (this.walls[0]) line(x, y, x + s, y); //up
    if (this.walls[1]) line(x + s, y, x + s, y + s); //right
    if (this.walls[2]) line(x + s, y + s, x, y + s); //down
    if (this.walls[3]) line(x, y + s, x, y); //left

    // line(40,40,0+40,0)
    if (this.visited) {
      var x = this.i * s;
      var y = this.j * s;
      noStroke();
      fill(0, 255, 0, 100);
      rect(x, y, s, s);
    }
  }

  visit() {
    var x = this.i * s;
    var y = this.j * s;
    fill(0, 0, 255);
    rect(x, y, s, s);
  }
}
