# Pathfinder

![](https://travis-ci.org/D-L-M/pathfinder.svg?branch=master)

Pathfinder is a simple JavaScript library that allows you to create a grid complete with traversable and non-traversable blocks, then plot a path between two points.

The pathfinding algorithm models human behaviour, best described by the analogy of a person wandering a busy city, exploring random streets but always favouring those that lead in the direction of their destination (imagine searching for a tall landmark that you can see in the distance).

This method of searching (loosely based on the A* algorithm) is generally fairly accurate, although does result in some interesting anomalies such as occasionally looping back on itself, making it suitable for pathfinding that aims to mimic that undertaken by a human.

## Setting Up

To compile the Pathfinder library, run `npm install` and then `gulp all`. The library will be compiled and minified to `dist/pathfinder.min.js`.

## Usage

See `dist/example.html` for an example of usage to plot a path through a random assortment of obstacles.

Basic usage is:

```
var width      = 100;  // Number of blocks wide
var height     = 50;  // Number of blocks tall
var obstacles  = ['2,10', '2,11', '33,24'];  // Array of x,y coordinates
var pathfinder = new Pathfinder(width, height, obstacles);
var start      = pathfinder.getBlockAtCoordinates(13, 5);  // x, y
var finish     = pathfinder.getBlockAtCoordinates(75, 47);  // x, y
var options    = {allowDiagonals: true};  // Whether to allow diagonal movement
var solution   = pathfinder.getNavigationPath(start, finish, options);
```

In the above example, the `solution` variable has two useful properties: `path`, which is an array of all blocks that comprise the final path; and `explored`, which is an array of all blocks explored, in the order that they were visited.

If it is easier to define a list of coordinates that are _not_ blocked, pass `true` as a fourth argument to `new Pathfinder()`.

If a path cannot be found an exception will be thrown by `getNavigationPath()`.

If obstacles regularly move, their blocked state can be set in the following manner:

```
pathfinder.getBlockAtCoordinates(4, 12).isBlocked = true;
```