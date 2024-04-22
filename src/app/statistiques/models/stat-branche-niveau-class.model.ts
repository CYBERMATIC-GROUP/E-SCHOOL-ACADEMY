export interface globalStatClassNiveauBranch {
    tabEleveParClasse: TabEleveParClasse[]
    tabEleveParNiveau: TabEleveParNiveau[]
    tabEleveParBranche: TabEleveParBranche[]
  }
  
  export interface TabEleveParClasse {
    CocdeClasse: string
    nNbreEleve: number
    nNbreHomme: number
    nNbreFemme: number
  }
  
  export interface TabEleveParNiveau {
    CocdeNiveau: string
    nNbreEleve: number
    nNbreHomme: number
    nNbreFemme: number
  }
  
  export interface TabEleveParBranche {
    CocdeBranche: string
    nNbreEleve: number
    nNbreHomme: number
    nNbreFemme: number
  }