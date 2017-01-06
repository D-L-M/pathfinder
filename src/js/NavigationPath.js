class NavigationPath
{


    /**
     * Instantiate a NavigationPath object and plot the requested path
     * @param {Block}        from     Start block object
     * @param {Block}        to       Finish block object
     * @param {Grid}         grid     Grid object
     * @param {closure|null} callback Optional closure that blocks are passed to as they are inspected
     */
    constructor(grid, from, to, callback = null)
    {

        this.grid     = grid;
        this.from     = from;
        this.to       = to;
        this.path     = [];
        this.callback = (callback !== null ? callback : function() {});

        this._calculatePath();

    }


    /**
     * Reorder an array of adjacent blocks so that the nearest blocks to the
     * finish block are at the top
     * @param  {array} adjacentBlocks Array of Block objects
     * @return {array}                Ordered array of Block objects
     */
    _reorderAdjacentBlocks(adjacentBlocks = [])
    {

        let result = [];

        for (let i in adjacentBlocks)
        {
            let distance  = this.grid.calculateDistanceBetweenBlocks(adjacentBlocks[i], this.to);
            let index     = Math.round(distance * 1000);
            result[index] = adjacentBlocks[i];
        }

        return result;

    }


    /**
     * Calculate the quickest path between the start and end points
     * @throws exception if it is not possible to plot a path
     * @todo Allow diagonal movements, but make them 1.41421 times more expensive to make
     */
    _calculatePath()
    {

        this._resetPathHeadCache();

        let from = this.from;
        let to   = this.to;
        
        /*
         * Set up an initial path head (a head is the latest block used in a
         * given path) to be the starting block
         */
        this._pathHeads.push(from);

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
            for (let i in this._pathHeads)
            {

                let block = this._pathHeads[i];

                if (block !== null)
                {

                    /*
                     * If the block has been visited already (two or more
                     * neighbours pushed it onto the stack in the last
                     * iteration) then skip to the next path head
                     */
                    if (typeof(this._visitedBlocks[block.getCoordinates()]) !== 'undefined')
                    {
                        continue;
                    }

                    /*
                     * Get adjacent blocks to the head and loop through them
                     */
                    foundFreeBlock         = true;
                    let adjacentBlocks     = this._reorderAdjacentBlocks(block.getAdjacentBlocks(false, to));
                    let headCoordinates    = block.getCoordinates();
                    let adjacentBlockCount = 1;
                    let closestBlocks      = [];

                    for (let j in adjacentBlocks)
                    {

                        let adjacentBlock            = adjacentBlocks[j];
                        let adjacentBlockCoordinates = adjacentBlock.getCoordinates();

                        /*
                         * If an adjacent block hasn't yet been visited, add it
                         * as a path head and add the current head to the path
                         * head history, tagged with the coordinates of the
                         * adjacent block (this way, blocks that comprise a
                         * successful path can be retraced)
                         */
                        if (typeof(this._visitedBlocks[adjacentBlockCoordinates]) === 'undefined')
                        {

                            /*
                             * Save the closest blocks to be added to the stack
                             * later (they need to be added in reverse order at
                             * the top, so they cannot be added at this time)
                             */
                            if (adjacentBlockCount <= Math.ceil(adjacentBlocks.length / 2))
                            {
                                closestBlocks.unshift(adjacentBlock);
                            }

                            /*
                             * Add the furthest-away blocks to the end of the
                             * stack, to be explored as last resorts
                             */
                            else
                            {
                                this._pathHeads.push(adjacentBlock);
                            }

                            this._pathHeadHistory[adjacentBlockCoordinates] = block;

                            /*
                             * Alert the callback to the fact that this block
                             * was inspected
                             */
                            this.callback(adjacentBlock);

                        }

                        /*
                         * If the adjacent block is the ending block, look up
                         * the blocks that comprised the path and add them to
                         * this.path
                         */
                        if (adjacentBlock.x == to.x && adjacentBlock.y == to.y)
                        {

                            let previousPathHead = adjacentBlock;

                            while (typeof(previousPathHead) !== 'undefined')
                            {

                                this.path.push(previousPathHead);

                                previousPathHead = this._pathHeadHistory[previousPathHead.getCoordinates()];

                            }

                            return;

                        }

                        adjacentBlockCount++;

                    }

                    /*
                     * Place the closest adjacent blocks onto the top of the
                     * stack
                     */
                    for (let k in closestBlocks)
                    {
                        this._pathHeads.unshift(closestBlocks[k]);
                    }

                    /*
                     * Once a block has been dealt with, nullify it so that it
                     * is no longer a path head and other heads know that they
                     * were too slow and should not consider this block
                     */
                    this._visitedBlocks[headCoordinates] = true;

                    /*
                     * Break out of the loop, so that the most direct path will
                     * always be explored first
                     */
                    break;

                }

            }

            /*
             * If no adjacent blocks were found for any of the path heads,
             * throw an exception
             */
            if (!foundFreeBlock)
            {
                throw 'No path exists between the requested start and end point';
            }

        }

    }


    /**
     * Empty the objects that store path heads and their histories
     */
    _resetPathHeadCache()
    {

        this._pathHeads       = [];
        this._visitedBlocks   = {};
        this._pathHeadHistory = {};

    }


}