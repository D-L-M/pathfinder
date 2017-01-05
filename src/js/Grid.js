class Grid
{


    /**
     * Instantiate a Grid object with a set width and height
     * @param {int}   width   Width of grid
     * @param {int}   height  Height of grid
     * @param {array} blocked Array of blocked coordinates
     */
    constructor(width = 10, height = 10, blocked = [])
    {

        this.width  = width;
        this.height = height;
        this.blocks = [];

        /*
         * Create all blocks within the grid
         */
        for (let x = 1; x <= width; x++)
        {

            this.blocks[x] = [];

            for (let y = 1; y <= height; y++)
            {
                let isBlocked     = (blocked.indexOf(x + ',' + y) > -1);
                this.blocks[x][y] = new Block(this, x, y, isBlocked);
            }

        }

    }


    /**
     * Get the block at given coordinates
     * @param  {int}   x X coordinate
     * @param  {int}   y Y coordinate
     * @return {Block}   Block object
     * @throws exception if a block does not exist at the given coordinates
     */
    getBlockAtCoordinate(x = 1, y = 1)
    {

        let blocks = this.blocks;

        if (typeof(blocks[x]) !== 'undefined' && typeof(blocks[x][y]) !== 'undefined')
        {
            return blocks[x][y];
        }

        throw 'Block at grid coordinate ' + x + ',' + y + ' does not exist';

    }


    /**
     * Get blocks adjacent to a given block
     * @param  {Block}      block          Block object to get adjacent blocks to
     * @param  {bool}       includeBlocked Whether to include blocks that have been marked as 'blocked'
     * @param  {Block|null} targetBlock    Optional path target block
     * @return {array}                     Array of Block objects
     */
    getAdjacentBlocks(block, includeBlocked = true, targetBlock = null)
    {

        let nearby   = [];
        let xFrom    = -1;
        let yFrom    = -1;
        let xTo      = 1;
        let yTo      = 1;
        let xToLimit = 2;
        let yToLimit = 2;

        /*
         * If a target block has been passed, set the direction in which we
         * will traverse the neighbouring blocks so that those nearest the
         * target block are at the top of the array that is returned
         */
        if (targetBlock !== null)
        {

            if (targetBlock.x > block.x)
            {
                xFrom    = 1;
                xTo      = -1;
                xToLimit = -2;
            }

            if (targetBlock.y > block.y)
            {
                yFrom    = 1;
                yTo      = -1;
                yToLimit = -2;
            }

        }

        let x = xFrom;

        /*
         * Traverse the rows
         */
        while (x != xToLimit)
        {

            let y = yFrom;

            /*
            * Traverse the columns
            */
            while (y != yToLimit)
            {

                let targetX       = (block.x + x);
                let targetY       = (block.y + y);
                let isCentreBlock = (x == 0 & y == 0);
                let isOnGrid      = (targetX > 0 && targetX <= this.width && targetY > 0 && targetY <= this.height);

                /*
                 * Only include blocks that are actual neighbours and haven't
                 * been marked as 'blocked'
                 */
                if (!isCentreBlock && isOnGrid)
                {

                    let targetBlock = this.blocks[targetX][targetY];

                    if (includeBlocked || !targetBlock.isBlocked)
                    {
                        nearby.push(targetBlock);
                    }

                }

                /*
                 * Increase or decrease the active column count
                 */
                if (yTo > yFrom)
                {
                    y++;
                }

                else
                {
                    y--;
                }
                
            }

            /*
             * Increase or decrease the active row count
             */
            if (xTo > xFrom)
            {
                x++;
            }

            else
            {
                x--;
            }

        }

        return nearby;

    }


}