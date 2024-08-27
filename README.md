# DFS-Maze-Generator
Click <a href="https://maayanbenshneor.github.io/DFS-Maze-Generator/" target="_blank"><b>here</b></a> to test it out yourself.

## About
A maze generator and solver using the <a href="https://en.wikipedia.org/wiki/Depth-first_search" target="_blank"><b>depth first search</b></a> algorithm.

## How Does It Work
The grid is an array of cells, each cell marked as visited by the algorithm or not. The algorithm starts at the first cell and chooses a random
neighbor (excluding diagonals) which is not yet visited already, then it "breaks" the seperating wall between the two cells and creates a new pathway.
if the algorithm gets stuck and all of his neighbors are visited, it will go back to the last cell that has a non visited neighbor.

## Limitations
Could take some time to walk through every cell, especially on larger grids.
