export interface PopulationByYear {
  year: string,
  value: string
}

export interface PropPopulation {
  label: string,
  data: PopulationByYear[]
}

export interface PrefPopulation {
  boundaryYear: string,
  data: PropPopulation[]
}