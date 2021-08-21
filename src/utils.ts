export function getHungryTime(): number {
  return Math.floor(Math.random() * 3) + 5;
}

export function getDieTime(): number {
  return Math.floor(Math.random() * 3) + 2;
}

export function getPoopTime(): number {
  return Math.floor(Math.random() * 3) + 4;
}
