import type { Vector2 } from '../types.ts';

export type QueryMethod<T> = (
  position: Vector2,
  range: number,
  callBack: (item: T) => void,
) => void;

interface SpatialHash<T> {
  build: (items: T[]) => void;
  query: QueryMethod<T>;
}

export function spatialHash<T extends { position: Vector2 }>(
  width: number,
  height: number,
  cellSize: number,
): SpatialHash<T> {
  let array: T[][] = [];

  const cellsX = Math.ceil(width / cellSize);
  const cellsY = Math.ceil(height / cellSize);

  function indexOf(x: number, y: number) {
    return Math.floor(x / cellSize) + Math.floor(y / cellSize) * cellsX;
  }

  function build(items: T[]) {
    array = [];
    for (let i = 0; i < cellsX * cellsY; i++) {
      array.push([]);
    }

    items.forEach((item) => {
      const index = indexOf(item.position.x, item.position.y);
      // console.log(item.position, "index:", index, "w:", width, "k:", height, cellSize, "cx:", cellsX, "cy:", cellsY, "cn:", cellsX * cellsY);
      array[index]?.push(item);
    });
  }

  function query(
    position: Vector2,
    range: number,
    callBack: (item: T) => void,
  ) {
    const minX = Math.max(0, Math.floor((position.x - range) / cellSize));
    const maxX = Math.min(cellsX, Math.floor((position.x + range) / cellSize));
    const minY = Math.max(0, Math.floor((position.y - range) / cellSize));
    const maxY = Math.min(cellsY, Math.floor((position.y + range) / cellSize));

    for (let ox = minX; ox <= maxX; ox++) {
      for (let oy = minY; oy <= maxY; oy++) {
        const index = ox + oy * cellsX;
        // console.log(position.x, position.y, "rowIndex:", indexOf(position.x, position.y), "index:", index, ox, oy);
        const entries = array[index];
        entries?.forEach((item) => callBack(item));
      }
    }
  }

  return {
    build,
    query,
  };
}
