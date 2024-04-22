
export interface historiqueFraisEleve {
    IDMOUVEMENT: number
    DateHeure: string
    TotalDebits: number
    TotalCredits: number
    Libelle: string
    IDCaissier: number
    IDCAISSE: number
    Valide: boolean
    NumPiece: string
    DescriptionPiece: string
    ModePaiement: number
    MontantTVA: number
  }