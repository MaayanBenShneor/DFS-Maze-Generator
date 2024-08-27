class Cell{
    
    TOPWALL = 0;
    RIGHTWALL = 1;
    BOTTOMWALL = 2;
    LEFTWALL = 3;

    constructor(col, row)
    {
        this.col = col;
        this.row = row;
        this.walls = [true, true, true, true];
        this.visited = false;

        this.x = this.col * w;
        this.y = this.row * w;

        this.centerX = this.col * w + w/2;
        this.centerY = this.row * w + w/2;
    }

    show() 
    {
        const xw = this.x + w;
        const yw = this.y + w;

        stroke(255);
        strokeWeight(1);

        if (this.walls[this.TOPWALL]) line(this.x, this.y, xw, this.y); // top line
        if (this.walls[this.RIGHTWALL]) line(xw, this.y, xw, yw); // right line
        if (this.walls[this.BOTTOMWALL]) line(xw, yw, this.x, yw); // bottom line
        if (this.walls[this.LEFTWALL]) line(this.x, yw, this.x, this.y); // left line

        noStroke();

        if (!complete) 
        {
            if (current === this) 
            {
                fill(100, 255, 100, 255);
                rect(this.x, this.y, w, w);
            } 
            else if (this.visited) 
            {
                fill(100, 255, 100, 80);
                rect(this.x, this.y, w, w);
            }
        } 
        else 
        {   
            fill(0, 255, 0);
            circle(current.centerX, current.centerY, 20);
            
            strokeWeight(2);
            stroke(0, 255, 0);

            for (let i = 1; i < stack.length; i++) 
            {
                line(stack[i].centerX, stack[i].centerY, stack[i - 1].centerX, stack[i - 1].centerY);
            }
        }
    }

    checkNeighbors()
    {
        var neighbors = [];

        var top = grid[this.index(this.col, this.row - 1)];
        var right = grid[this.index(this.col + 1, this.row)];
        var bottom = grid[this.index(this.col, this.row + 1)];
        var left = grid[this.index(this.col - 1, this.row)];

        if(top && !top.visited)
            neighbors.push(top);

        if(right && !right.visited)
            neighbors.push(right);

        if(bottom && !bottom.visited)
            neighbors.push(bottom);

        if(left && !left.visited)
            neighbors.push(left);

        
        if(neighbors.length > 0)
        {
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        }
        else
            return undefined;
    }

    index(j, i)
    {   
        if(i < 0 || j < 0 || i > cols-1 || j > rows-1)
            return -1;

        return i + j * cols;
    }

    removeWalls(neighbor)
    {
        var x = this.col - neighbor.col;
        var y = this.row - neighbor.row;

        if(x === 1) //neighbor is on the left
        {
            this.walls[this.LEFTWALL] = false;
            neighbor.walls[this.RIGHTWALL] = false;
        }
        else if(x === -1) //neighbor is on the right
        {
            this.walls[this.RIGHTWALL] = false;
            neighbor.walls[this.LEFTWALL] = false;
        }

        if(y === 1) //neighbor is on the left
        {
            this.walls[this.TOPWALL] = false;
            neighbor.walls[this.BOTTOMWALL] = false;
        }
        else if(y === -1) //neighbor is on the right
        {
            this.walls[this.BOTTOMWALL] = false;
            neighbor.walls[this.TOPWALL] = false;
        }
    }

    checkNeighborsInPath()
    {
        var neighbors = [];

        var top = grid[this.index(this.col, this.row - 1)];
        var right = grid[this.index(this.col + 1, this.row)];
        var bottom = grid[this.index(this.col, this.row + 1)];
        var left = grid[this.index(this.col - 1, this.row)];

        if(top && !top.visited && !this.walls[this.TOPWALL])
            neighbors.push(top);

        if(right && !right.visited && !this.walls[this.RIGHTWALL])
            neighbors.push(right);

        if(bottom && !bottom.visited && !this.walls[this.BOTTOMWALL])
            neighbors.push(bottom);

        if(left && !left.visited && !this.walls[this.LEFTWALL])
            neighbors.push(left);

        
        if(neighbors.length > 0)
        {
            for(var n of neighbors)
            {
                if(n === finish)
                {
                    return n;
                }
                    
            }
            var r = floor(random(0, neighbors.length));
            return neighbors[r];
        }
        else
            return undefined;
    }
}