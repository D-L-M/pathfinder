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
     */
    _calculatePath()
    {

        if (false) // @todo Add check for impossible path
        {
            throw 'No path exists between the requested start and end point';
        }

    }


}