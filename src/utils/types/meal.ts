export interface Meal{
  id: string,
  name: string,
  ingredients: string[],
  timestamp: number,
/*  $key: string,
  $exists: () => boolean*/
}
