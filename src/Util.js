export function getRandomSubset(arr, n) {
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = arr.sort(() => 0.5 - Math.random());
  
    // Get subset of `n` elements
    return shuffled.slice(0, n);
  }
  
export const N_OPTIONS = 9;