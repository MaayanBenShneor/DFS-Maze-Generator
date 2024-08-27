var w  = 40;
var rows, cols;
var grid = [];
var current;
var stack = [];
var complete = false;
var finish;
var solved = false;
var solve = false;

function setup() {
  createCanvas(800, 800);
  cols = floor(width/w);
  rows = floor(height/w);
  for(var i = 0; i < cols; i++)
  {
    for(var j = 0; j < rows; j++)
    {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  finish = grid[grid.length - 1];

  createButton("Solve").mousePressed(function(){
    if(complete)
      solve = true;
  })
}

function draw() {
  background(50);
  for(var i = 0; i < grid.length; i++)
  {
    grid[i].show();
  }

  if(!complete)
    generateMazeDFS();
  else if(!solved && solve)
  {
    solveDFS(finish);
  }
}

function generateMazeDFS()
{
  current.visited = true;
  var next = current.checkNeighbors();
  
  if(next)
  {
    next.visited = true;
    stack.push(current);
    current.removeWalls(next);
    current = next;
  }
  else if(stack.length > 0)
    current = stack.pop();
  else
  {
    complete = true;
    reset();
  }
}

function solveDFS(finish)
{
  if(!solved)
  {
    var next = current.checkNeighborsInPath();

    if(next)
    {
      next.visited = true;
      stack.push(current);
      current = next;
    }
    else if(stack.length > 0)
      current = stack.pop();

    if(current === finish)
    {
      stack.push(current);
      solved = true;
    }
  }
}

function reset()
{
  for(var i = 1; i < grid.length; i++)
  {
    grid[i].visited = false;
  }

  current = grid[0];
}

