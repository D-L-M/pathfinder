class NavigationPath
{


    /**
     * Instantiate a NavigationPath object and plot the requested path
     * @param {Block} from Start block object
     * @param {Block} to   Finish block object
     * @param {Grid}  grid Grid object
     */
    constructor(grid, from, to)
    {

        this.grid = grid;
        this.from = from;
        this.to   = to;
        this.path = [];

        this._calculatePath();

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
        this._pathHeads[from.getCoordinates()] = from;

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
            for (let block in this._pathHeads)
            {

                let block = this._pathHeads[block];

                if (block !== null)
                {

                    /*
                     * Get adjacent blocks to the head and loop through them
                     */
                    foundFreeBlock      = true;
                    let adjacentBlocks  = block.getAdjacentBlocks(false, to);
                    let headCoordinates = block.getCoordinates();

                    for (let i in adjacentBlocks)
                    {

                        let adjacentBlock            = adjacentBlocks[i];
                        let adjacentBlockCoordinates = adjacentBlock.getCoordinates();

                        /*
                         * If an adjacent block hasn't yet been visited, add it
                         * as a path head and add the current head to the path
                         * head history, tagged with the coordinates of the
                         * adjacent block (this way, blocks that comprise a
                         * successful path can be retraced)
                         */
                        if (typeof(this._pathHeads[adjacentBlockCoordinates]) === 'undefined')
                        {
                            this._pathHeads[adjacentBlockCoordinates]       = adjacentBlock;
                            this._pathHeadHistory[adjacentBlockCoordinates] = block;
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

                    }

                    /*
                     * Once a block has been dealt with, nullify it so that it
                     * is no longer a path head and other heads know that they
                     * were too slow and should not consider this block
                     */
                    this._pathHeads[headCoordinates] = null;

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

        this._pathHeads       = {};
        this._pathHeadHistory = {};

    }


}