export interface Meal{
  id: string,
  name: string,
  ingredients: string[],
  timestamp: number,
/*  $key: string,
  $exists: () => boolean*/
}

export function instanceOfMeal(data: any): data is Meal{
  return 'id' in data && 'name' in data && 'ingredients' in data;
}
