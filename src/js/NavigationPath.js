import Grid from './Grid';
import Block from './Block';


export default class NavigationPath
{


    /**
     * Instantiate a NavigationPath object and plot the requested path
     * @param {Block}  from    Start block object
     * @param {Block}  to      Finish block object
     * @param {Grid}   grid    Grid object
     * @param {object} options Optional options object
     * @throws {Error} if grid is not a Grid object
     * @throws {Error} if from and to are not both Block objects
     * @throws {Error} if it is not possible to plot a path
     */
    constructor(grid, from, to, options = {})
    {

        if (!(grid instanceof Grid))
        {
            throw new Error('Grid object not provided');
        }

        if (!(from instanceof Block) || !(to instanceof Block))
        {
            throw new Error('Two Block objects not provided');
        }

        this.grid    = grid;
        this.from    = from;
        this.to      = to;
        this.options = options;

        if (typeof this.options.allowDiagonals === 'undefined')
        {
            this.options.allowDiagonals = true;
        }

        this._calculatePath();

    }


    /**
     * Reorder an array of blocks so that the nearest blocks to the finish
     * block are at the top
     * @param  {array}        blocks       Array of Block objects
     * @param  {array|object} ignoreBlocks Array or object of Block objects to ignore
     * @return {array}                     Ordered array of Block objects
     */
    _reorderBlocks(blocks = [], ignoreBlocks = [])
    {

        let result   = [];
        let ordered  = [];
        let toIgnore = {};

        /*
         * Reconstruct the 'ignore' object with the blocks' coordinates as keys
         */
        for (let i in ignoreBlocks)
        {
            let blockToIgnore             = ignoreBlocks[i];
            let coordinatesToIgnore       = blockToIgnore.getCoordinates();
            toIgnore[coordinatesToIgnore] = blockToIgnore;
        }

        /*
         * Add each block into a new array, using its rounded distance as its
         * key
         */
        for (let j in blocks)
        {

            let block       = blocks[j];
            let coordinates = block.getCoordinates();

            if (typeof(toIgnore[coordinates]) === 'undefined')
            {
                let index      = this._deriveKeyFromDistance(block);
                ordered[index] = block;
            }

        }

        /*
         * Create a final version of the above, using incremental keys instead
         */
        for (let k in ordered)
        {
            result.push(ordered[k]);
        }

        return result;

    }


    /**
     * Generate a key suitable for use in an array based on a block's distance
     * from the destination block
     * @param  {Block} block Block object to calculate key for
     * @return {int}         Numeric index key
     * @throws {Error} if block is not a Block object
     */
    _deriveKeyFromDistance(block)
    {

        if (!(block instanceof Block))
        {
            throw new Error('Block object not provided');
        }

        let distance = this.grid.calculateDistanceBetweenBlocks(block, this.to);
        let degrees  = this.grid.calculateDegreesBetweenBlocks(block, this.to);

        return parseInt(Math.round(distance * 10).toString() + ('000' + Math.round(degrees).toString()).slice(-3));

    }


    /**
     * Calculate the quickest path between the start and end points
     * @throws {Error} if it is not possible to plot a path
     */
    _calculatePath()
    {

        this.path     = [];
        this.explored = [];

        let from            = this.from;
        let to              = this.to;
        let pathHeads       = [];
        let visitedBlocks   = {};
        let pathHeadHistory = {};
        
        /*
         * Set up an initial path head (a head is the latest block used in a
         * given path) to be the starting block
         */
        let index        = this._deriveKeyFromDistance(from);
        pathHeads[index] = from;

        /*
         * this.path will eventually be populated with blocks that form a
         * 'winning' path, so for as long as it is empty, the search continues
         */
        while (this.path.length == 0)
        {

            let foundFreeBlock = false;

            /*
             * Iterate through all path heads and work on those that haven't
             * yet been nullified (will be the latest generation of heads)
             */
            for (let i in pathHeads)
            {

                let block = pathHeads[i];

                /*
                 * If the block has been visited already then skip to the next
                 * path head
                 */
                if (typeof(visitedBlocks[block.getCoordinates()]) !== 'undefined')
                {
                    continue;
                }

                /*
                * Get adjacent blocks to the head and loop through them
                */
                foundFreeBlock      = true;
                let allowDiagonals  = this.options.allowDiagonals;
                let adjacentBlocks  = this._reorderBlocks(block.getAdjacentBlocks(false, allowDiagonals), visitedBlocks);
                let headCoordinates = block.getCoordinates();

                for (let j in adjacentBlocks)
                {

                    let adjacentBlock            = adjacentBlocks[j];
                    let adjacentBlockCoordinates = adjacentBlock.getCoordinates();

                    /*
                    * Add each adjacent block as a path head and add the
                    * current head to the path head history, tagged with the
                    * coordinates of the adjacent block (this way, blocks that
                    * comprise a successful path can be retraced)
                    */
                    pathHeadHistory[adjacentBlockCoordinates] = block;

                    let index        = this._deriveKeyFromDistance(adjacentBlock);
                    pathHeads[index] = adjacentBlock;

                    if (this.explored.indexOf(adjacentBlock) === -1)
                    {
                        this.explored.push(adjacentBlock);
                    }

                    /*
                    * If the adjacent block is the ending block, look up the
                    * blocks that comprised the path and add them to this.path
                    */
                    if (adjacentBlock.x == to.x && adjacentBlock.y == to.y)
                    {

                        let previousPathHead = adjacentBlock;

                        while (typeof(previousPathHead) !== 'undefined')
                        {

                            this.path.unshift(previousPathHead);

                            previousPathHead = pathHeadHistory[previousPathHead.getCoordinates()];

                        }

                        return;

                    }

                }

                /*
                * Once a block has been dealt with, nullify it so that it is no
                * longer a path head and other heads know that they were too
                * slow and should not consider this block
                */
                visitedBlocks[headCoordinates] = block;

                pathHeads.splice(i, 1);

                /*
                * Break out of the loop, so that the most direct path will
                * always be explored first
                */
                break;

            }

            /*
             * If no adjacent blocks were found for any of the path heads,
             * throw an exception
             */
            if (!foundFreeBlock)
            {
                throw new Error('No path exists between the requested start and end point');
            }

        }

    }


}