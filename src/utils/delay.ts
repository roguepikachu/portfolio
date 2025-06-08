export const LOADING_DELAY = 500; // 0.5 second delay

export const delay = (ms: number = LOADING_DELAY) => new Promise(resolve => setTimeout(resolve, ms)); 