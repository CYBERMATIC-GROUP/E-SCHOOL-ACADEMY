export class OperationsDivers {
  IDMOUVEMENT!: number
  DateHeure!: string
  TotalDebits!: number
  TotalCredits!: number
  Montant!: number
  Libelle!: string
  IDCaissier!: number
  IDCAISSE!: number
  Valide!: boolean
  NumeroPiece!: string
  DescriptionPiece!: string
  Caissier!: string
  DetailOD!: DetailOd[]
}

export class DetailOd {
  NumeroMouvement!: number
  IDECRITURE!: number
  DateHeure!: string
  LibelleEcriture!: string
  CodeCompte!: string
  MontantDebit!: number
  MontantCredit!: number
  Validee!: boolean
  NumeroPiece!: string
  LibelleCompte!: string
}
