import { Block } from '../Block';


/**
 * IBlockObject interface, to type hint objects whose values will only be Block
 * objects
 */
export interface IBlockObject
{
    [name: string]: Block;
}
