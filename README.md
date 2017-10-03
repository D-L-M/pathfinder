# Pathfinder

![](https://travis-ci.org/D-L-M/pathfinder.svg?branch=master)

Pathfinder is a simple Node.js/TypeScript library that allows you to create a grid complete with traversable and non-traversable blocks, then plot a path between two points.

The pathfinding algorithm is loosely based upon the A* algorithm, operating by exploring adjacent blocks but favouring those that provide the shortest line-of-sight to the destination. The resultant paths are fairly accurate, although do sometimes contain interesting anomalies such as looping back on themselves, making the library suitable for pathfinding that aims to mimic that undertaken by a human.

## Installation

```bash
$ npm install --save simple-pathfinder
```

## Usage

Basic usage is as follows:

```typescript
import { Pathfinder, Block, INavigationPathOptions, NavigationPath } from 'simple-pathfinder';

let width: number                   = 100;  // Number of blocks wide
let height: number                  = 50;  // Number of blocks tall
let obstacles: string[]             = ['2,10', '2,11', '33,24'];  // Array of x,y coordinates
let pathfinder: Pathfinder          = new Pathfinder(width, height, obstacles);
let start: Block                    = pathfinder.getBlockAtCoordinates(13, 5);  // x, y
let finish: Block                   = pathfinder.getBlockAtCoordinates(75, 47);  // x, y
let options: INavigationPathOptions = {allowDiagonals: true};  // Whether to allow diagonal movement
let solution: NavigationPath        = pathfinder.getNavigationPath(start, finish, options);
```

In the above example, the `solution` variable has two useful properties: `path`, which is an array of all blocks that comprise the final path; and `explored`, which is an array of all blocks explored, in the order that they were visited.

If it is easier to define a list of coordinates that are _not_ blocked, pass `true` as a fourth argument to `new Pathfinder()`.

If a path cannot be found an exception will be thrown by `getNavigationPath()`.

If obstacles regularly move, their blocked state can be set in the following manner:

```typescript
pathfinder.getBlockAtCoordinates(4, 12).isBlocked = true;
```
