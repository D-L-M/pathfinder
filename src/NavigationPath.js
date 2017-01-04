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

    }


}