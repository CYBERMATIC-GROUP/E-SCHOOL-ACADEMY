export class ReleveGlobal {
  Eleves!: Elfe[]
  tbLesNotes!: TbLesNote[]
  tabConfigNote!: TabConfigNote[]
  tabMoyennes!: TabMoyenne[]
  tabTatbLibelleColonne!: TabTatbLibelleColonne[]
}

export interface Elfe {
  IDELEVE: number
  CodeEleve: string
  Fr_Nom: string
  Fr_Prenom: string
  Moyenne: string
  Coef: number
  TotalPoint: string
  Observations: string
  nNumero: string
}

export interface TbLesNote {
  Identifiant: number
  IDLES_NOTES: number
  IDELEVE: number
  IDMATIERE: number
  IDNOTES: number
  numTrimestre: number
  Note: number
  EtatNote: number
  sEtatNote: string
}

export interface TabConfigNote {
  NumeroOrdre: number
  IDNOTES: number
  Libelle: string
  BorneMaxi: number
  Coefficient: number
}

export interface TabMoyenne {
  IDELEVE: number
  Moyenne: string
  Coef: number
  TotalPoint: string
  Observations: string
}

export interface TabTatbLibelleColonne {
  LibelleColonne: string
}
