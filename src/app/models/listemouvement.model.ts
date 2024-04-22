export class ListeMouvement {
  IDMOUVEMENT!: number
  DateHeure!: string
  TotalDebits!: number
  TotalCredits!: number
  Libelle!: string
  IDCaissier!: number
  IDCAISSE!: number
  NomCaissier!: number
  body!:string
}

export class  AnnulationMouvement{
  RaisonAnnulation!:string
}