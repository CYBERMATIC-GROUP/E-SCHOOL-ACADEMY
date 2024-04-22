

export interface PyramideEleve {
    TousLesEleves: TousLesElfe[]
    ElevesEtrangers: ElevesEtranger[]
    ElevesRedoulants: ElevesRedoulant[]
    LesAnnees: LesAnnee[]
    Total: Total
  }
  
  export interface TousLesElfe {
    Homme: number
    Femme: number
    Total: number
  }
  
  export interface ElevesEtranger {
    Homme: number
    Femme: number
    Total: number
  }
  
  export interface ElevesRedoulant {
    Homme: number
    Femme: number
    Total: number
  }
  
  export interface LesAnnee {
    nAnnee: number
    nAge: number
  }
  
  export interface Total {
    TotalEleve: number
    TotalEleveHomme: number
    TotalEleveFemme: number
    TotalEleveEtrangers: number
    TotalEleveEtrangersHomme: number
    TotalEleveEtrangersFemme: number
    TotalEleveRedoulants: number
    TotalEleveRedoulantsHomme: number
    TotalEleveRedoulantsFemme: number
  }