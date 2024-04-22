export class Compte {
  IDCOMPTE!: number
  CodeCompte!: string
  LibelleCompte!: string
  SoldeDebit!: number
  SoldeCredit!: number
  LiasseDebit!: string
  LiasseCredit!: string
  SensDC!: number
  CompteDeContrePartie!: string
  CompteDeCumul!: string
  CompteDeBanque!: boolean
  IDPersonneAssociee!: number
  TypePersonneAssociee!: number
  EstUnChapitre!: boolean
  nClasse!: number
  body!:any[]
}


export interface consulTationCompte {
  IDECRITURE: number
  LibelleEcriture: string
  NumeroMouvement: number
  CodeCompte: string
  MontantDebit: number
  MontantCredit: number
  CompteCredit: string
  IDPRODUIT: number
  Validee: boolean
  DateHeure: string
}