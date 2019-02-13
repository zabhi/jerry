import { Range } from './range';

/**
 * RangeCollection class
 * NOTE: Feel free to add any extra member variables/functions you like.
 */
export default class RangeCollection {
  ranges: Array<Range> = [];
  /**
   * Adds a range to the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  public add(range: Array<number>) {
    const [start, stop] = range;
    const ranges = [...this.ranges, { start, stop }] // append new range
      .sort((rangeA, rangeB) => rangeA.start - rangeB.start) // sort by start of ranges
      .filter(cRange => cRange.start <= cRange.stop) // remove 0 length ranges
      .reduce((acc: Array<Range>, cRange: Range) => {
        if (acc.length > 0) {
          const prev = acc.pop() as Range;
          if (prev.start === cRange.start || prev.stop >= cRange.start) {
            prev.stop = Math.max(prev.stop, cRange.stop);
            acc.push(prev);
          } else {
            acc.push(prev, cRange);
          }
        } else {
          acc.push(cRange);
        }
        return acc;
      }, []);

    this.ranges = ranges;
  }

  /**
   * Removes a range from the collection
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  public remove(range: Array<number>) {
    const [start, stop] = range;

    const ranges = this.ranges.reduce((acc: Array<Range>, cRange: Range) => {
      const isRangeStartUnsafe = cRange.start >= start && cRange.start < stop;
      const isRangeStopUnsafe = cRange.stop - 1 >= start && cRange.stop < stop;
      const isRangeUnsafeSuperset = cRange.start < start && cRange.stop > stop;
      if (isRangeStartUnsafe && isRangeStopUnsafe) {
        // range is subset of range being removed
        // forget this value
      } else if (isRangeStartUnsafe) {
        acc.push({ start: stop, stop: cRange.stop });
      } else if (isRangeStopUnsafe) {
        acc.push({ start: cRange.start, stop: start });
      } else if (isRangeUnsafeSuperset) {
        acc.push({ start: cRange.start, stop: start }, { start: stop, stop: cRange.stop });
      } else {
        acc.push(cRange);
      }
      return acc;
    }, []);

    this.ranges = ranges;
  }

  /**
   * Prints out the list of ranges in the range collection
   */
  public print() {
    console.log(this.ranges.map(cRange => `[${cRange.start}, ${cRange.stop})`).join(' '));
  }
}
