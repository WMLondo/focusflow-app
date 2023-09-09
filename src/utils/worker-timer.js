let nextInterval = 0;
let intervals = {};

export const setWorkerInterval = (callback, interval) => {
  const intervalId = nextInterval++;
  let blob = new Blob([
    `onmessage = function(e) {
      if (e.data === 'start') {
        setInterval(function() {
          postMessage('tick');
        }, ${interval});
      }
    }`,
  ]);

  let blobURL = URL.createObjectURL(blob);

  const worker = new Worker(blobURL);

  worker.onmessage = function (e) {
    if (e.data === "tick") {
      callback();
    }
  };

  worker.postMessage("start");

  intervals[intervalId] = {
    worker: worker,
    blobURL: blobURL,
  };

  return intervalId;
};

export const clearWorkerInterval = (intervalId) => {
  const interval = intervals[intervalId];

  if (interval) {
    interval.worker.terminate();
    URL.revokeObjectURL(interval.blobURL);
    delete intervals[interval];
    return;
  }
  throw new Error(`${intervalId} does not exist in the current context`);
};
