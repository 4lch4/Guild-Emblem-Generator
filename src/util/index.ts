/**
 * Generates a random number between two numbers, min (inclusive) and max
 * (exclusive).
 *
 * @param min Minimum value (inclusive).
 * @param max Maximum value (exclusive).
 */
const getRandom = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min)

export { getRandom }

export { Modifier } from './Modifier'
export { Retriever } from './Retriever'
export { CanvasManager } from './CanvasManager'
