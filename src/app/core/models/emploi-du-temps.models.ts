export class EmploiDuTemps{
  IDLIG_EMPLOI!: number
  IDCLASSES!: number
  IndJour!: number
  IndSeance!: number
  IDMATIERE!: number
  IDSALLES!: number
  NumGroupe!: string
  IDEMPLOIDUTEMPS!: number
  CodeClasse!: string
  CodeMatiere!: string
  NomMatiere!: string
  CodeSalle!: string
  Jour!: string
  Heure!: string
  IDENSEIGNANT!: number
  NomEnseignant!: string
}

export interface responseEmploiDuTemps {
  Seance: Seance[]
  tabJours: any[]
  tabEmploiDuTemps: EmploiDuTemps[]
}

export interface Seance {
  NumeroSeance: number
  HeureSeance: string
}


export class GroupeEmploiDuTemps {
  IDEMPLOIDUTEMPS!: number
  DateDebut!: string
  Description!: string
  NumOrdre!: number
}
