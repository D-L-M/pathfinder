import Block from './Block';


export default class Grid
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
     * Calculate the distance between two blocks
     * @param  {Block} firstBlock  First block to check distance between
     * @param  {Block} secondBlock Second block to check distance between
     * @return {float}             Distance between blocks
     */
    calculateDistanceBetweenBlocks(firstBlock, secondBlock)
    {

        let xDiff    = Math.abs(firstBlock.x - secondBlock.x);
        let yDiff    = Math.abs(firstBlock.y - secondBlock.y);
        let distance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));

        return distance;

    }


    /**
     * Calculate the degrees between the arc of two blocks
     * @param  {Block} centreBlock   The centre block
     * @param  {Block} outlyingBlock The outlying block that forms the arc limit
     * @return {float}               Degrees between blocks
     */
    calculateDegreesBetweenBlocks(centreBlock, secondBlock)
    {

        let xDiff   = (centreBlock.x - secondBlock.x);
        let yDiff   = (centreBlock.y - secondBlock.y);
        let degrees = (Math.atan2(yDiff, xDiff) * (180 / Math.PI));

        if (degrees < 0)
        {
            degrees = (360 + degrees);
        }

        return degrees

    }


    /**
     * Get blocks adjacent to a given block
     * @param  {Block} block          Block object to get adjacent blocks to
     * @param  {bool}  includeBlocked Whether to include blocks that have been marked as 'blocked'
     * @param  {bool}  allowDiagonals Whether to allow blocks that are diagonally adjacent
     * @return {array}                Array of Block objects
     */
    getAdjacentBlocks(block, includeBlocked = true, allowDiagonals = true)
    {

        let nearby   = [];
        
        /*
         * Traverse the rows
         */
        for (let x = -1; x <= 1; x++)
        {

            /*
            * Traverse the columns
            */
            for (let y = -1; y <= 1; y++)
            {

                let targetX       = (block.x + x);
                let targetY       = (block.y + y);
                let isCentreBlock = (x == 0 & y == 0);
                let isOnGrid      = (targetX > 0 && targetX <= this.width && targetY > 0 && targetY <= this.height);
                let isDiagonal    = ((x == -1 && y == -1) || (x == -1 && y == 1) || (x == 1 && y == 1) || (x == 1 && y == -1));

                /*
                 * Only include blocks that are actual neighbours and haven't
                 * been marked as 'blocked'
                 */
                if (!isCentreBlock && isOnGrid && (!isDiagonal || allowDiagonals))
                {

                    let targetBlock = this.blocks[targetX][targetY];

                    if (includeBlocked || !targetBlock.isBlocked)
                    {
                        nearby.push(targetBlock);
                    }

                }
                
            }

        }

        return nearby;

    }


}