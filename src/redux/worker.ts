import { Cell, newgen } from "./field";
import { calculateNewGeneration } from "./fieldUtils";

// self.onmessage = (
//   message: MessageEvent<{
//     rowsLength: number;
//     columntLength: number;
//     buffer: ArrayBufferLike;
//   }>
// ) => {
//   console.log(message);
//   const t1 = performance.now();

//   const view = new Int32Array(message.data.buffer);
//   const result: Cell[][] = [];
//   const viewArr = Array.from(view) as number[];

//   console.log(viewArr);

//   for (let rowIndes = 0; rowIndes < message.data.rowsLength; rowIndes++) {
//     const row = viewArr.splice(0, message.data.rowsLength * 2);
//     const cellRow: Cell[] = [];

//     for (let colIndex = 0; colIndex < row.length; colIndex += 2) {
//       const cell = [row[colIndex], row[colIndex + 1]] as Cell;
//       cellRow.push(cell);
//     }

//     result.push(cellRow);
//   }

//   const newGen = calculateNewGeneration(result);

//   const t2 = performance.now();

//   console.log(t2 - t1, "worker calc");

//   const rowsLength = newGen.cells.length;
//   const columntLength = newGen.cells[0].length;

//   const fl = newGen.cells.flat(2);

//   const buffer = new ArrayBuffer(4 * fl.length);
//   const resview = new Int32Array(buffer);

//   resview.set(fl);

//   self.postMessage(
//     {
//       rowsLength,
//       columntLength,
//       buffer: resview.buffer,
//       aliveCount: newGen.aliveCount,
//       newbornCount: newGen.newbornCount,
//     },
//     { transfer: [resview.buffer] }
//   );
// };

self.onmessage = (message: MessageEvent<Int8Array[]>) => {
  const t1 = performance.now();

  const cells = message.data as unknown as Cell[][];

  // message.data.forEach((val) => {
  //   const view = new Int8Array(val);
  //   const viewArr = Array.from(view) as Cell[];
  //   cells.push(viewArr);
  // });

  const newGen = calculateNewGeneration(cells);

  const t2 = performance.now();

  // console.log(t2 - t1, "worker calc");

  const views: Int8Array[] = [];
  const buffs: ArrayBufferLike[] = [];

  for (let index = 0; index < newGen.cells.length; index++) {
    const row = newGen.cells[index];
    //const buffer = new ArrayBuffer(4 * row.length);
    const view = new Int8Array(row);
    //view.set(row);
    buffs.push(view.buffer);
    views.push(view);
  }

  postMessage(
    {
      aliveCount: newGen.aliveCount,
      newbornCount: newGen.aliveCount,
      buffs: views,
    },
    // @ts-ignore
    buffs
  );

  // self.postMessage(null);

  // self.postMessage(newGen);
};
