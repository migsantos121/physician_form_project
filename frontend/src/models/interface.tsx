
export interface Formulation {
    id: number,
    name: string
}

export interface Ingredient {
    id: number,
    name: string,
    minimum_percentage: number,
    maximum_percentage: number,
    percentage: number,
    description: string,
    classes: string[]
}
