export class CompteBancaire {
    CodeJournal!: string
    IDMOUVEMENT!: number
    DateHeure!: string
    TotalDebits!: number
    TotalCredits!: number
    SoldeDebit!: number
    SoldeCredit!: number
    Montant!: number
    Solde!: number
    Libelle!: string
    CodeCaisse!: string
    CodeCompte!: string
    CompteDebit!: string
    CompteCredit!: string
    IDCaissier!: number
    IDCAISSE!: number
    IDCAISSEDestination!: number
    IDCAISSEProvenance!: number
    NomCaissier!: number
  }

export interface retraitCaisseEspece {
  Montant:2000, 
  Libelle: string,
  DatailOperation: string,
  CompteFounisseur: string, 
  CompteCharge: string,
  IDAGENT: string, 
  IDCAISSE: number,
  Date: string
}

export interface compteModel {
  IDCOMPTE: number
  CodeCompte: string
  LibelleCompte: string
}