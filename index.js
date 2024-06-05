function knightMoves(start, end) {
  // define possible moves
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  // check coordinates are within bounds of chessboard
  function isValid(x, y) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function bfs(start, end) {
    // initialise queue with starting position
    const queue = [[start]];

    // initialise set to track visited positions
    const visited = new Set();

    // mark the starting position as visited
    visited.add(start.toString());

    // iterate while there are positions in the queue
    while (queue.length > 0) {
      // deque
      const path = queue.shift();
      const [x, y] = path[path.length - 1];

      // current position == destination -> return path
      if (x === end[0] && y === end[1]) {
        return path;
      }

      // check possible moves from current position
      for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;
        const newPos = [newX, newY];

        // new position is valid and not visited
        if (isValid(newX, newY) && !visited.has(newPos.toString())) {
          // new position -> visited
          visited.add(newPos.toString());
          // new position -> enqueue
          queue.push([...path, newPos]);
        }
      }
    }

    // destination can't be reached -> null
    return null;
  }

  const path = bfs(start, end);
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((square) => console.log(square));
  return path;
}

// test cases
console.log(knightMoves([3, 3], [4, 3]));
console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([0, 0], [7, 7]));
