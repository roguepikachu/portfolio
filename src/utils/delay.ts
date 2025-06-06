export const LOADING_DELAY = 1000; // 1 second delay

export const delay = (ms: number = LOADING_DELAY) => new Promise(resolve => setTimeout(resolve, ms)); 