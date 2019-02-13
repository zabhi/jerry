import RangeCollection from './range-collection';

describe('range-collection returns correct values', () => {
  console.log = jest.fn();

  const rc = new RangeCollection();

  test('adding range "[1, 5]" returns "[1, 5)"', () => {
    rc.add([1, 5]);
    rc.print();
    // Should display: [1, 5)
    expect(console.log).toHaveBeenCalledWith('[1, 5)');
  });

  test('adding range "[10, 20]" returns "[1, 5) [10, 20)"', () => {
    rc.add([10, 20]);
    rc.print();
    // Should display: [1, 5) [10, 20)
    expect(console.log).toHaveBeenCalledWith('[1, 5) [10, 20)');
  });

  test('adding range "[20, 20]" returns "[1, 5) [10, 20)"', () => {
    rc.add([20, 20]);
    rc.print();
    // Should display: [1, 5) [10, 20)
    expect(console.log).toHaveBeenCalledWith('[1, 5) [10, 20)');
  });

  test('adding range "[20, 21]" returns "[1, 5) [10, 21)"', () => {
    rc.add([20, 21]);
    rc.print();
    // Should display: [1, 5) [10, 21)
    expect(console.log).toHaveBeenCalledWith('[1, 5) [10, 21)');
  });

  test('adding range "[2, 4]" returns "[1, 5) [10, 21)"', () => {
    rc.add([2, 4]);
    rc.print();
    // Should display: [1, 5) [10, 21)
    expect(console.log).toHaveBeenCalledWith('[1, 5) [10, 21)');
  });

  test('adding range "[3, 8]" returns "[1, 8) [10, 21)"', () => {
    rc.add([3, 8]);
    rc.print();
    // Should display: [1, 8) [10, 21)
    expect(console.log).toHaveBeenCalledWith('[1, 8) [10, 21)');
  });

  test('removing range "[10, 10]" returns "[1, 8) [10, 21)"', () => {
    rc.remove([10, 10]);
    rc.print();
    // Should display: [1, 8) [10, 21)
    expect(console.log).toHaveBeenCalledWith('[1, 8) [10, 21)');
  });

  test('removing range "[10, 11]" returns "[1, 8) [11, 21)"', () => {
    rc.remove([10, 11]);
    rc.print();
    // Should display: [1, 8) [11, 21)
    expect(console.log).toHaveBeenCalledWith('[1, 8) [11, 21)');
  });

  test('removing range "[15, 17]" returns "[1, 8) [11, 15) [17, 21)"', () => {
    rc.remove([15, 17]);
    rc.print();
    // Should display: [1, 8) [11, 15) [17, 21)
    expect(console.log).toHaveBeenCalledWith('[1, 8) [11, 15) [17, 21)');
  });

  test('removing range "[3, 19]" returns "[1, 3) [19, 21)"', () => {
    rc.remove([3, 19]);
    rc.print();
    // Should display: [1, 3) [19, 21)
    expect(console.log).toHaveBeenCalledWith('[1, 3) [19, 21)');
  });
});
