export class ProduitListeFraisScolaire {

  IDPRODUIT!: number
  CodeProduit!: string
  LibelleProduit_Fr!: string
  Occasionnel!: boolean
  IDNIVEAU!: number
  IDBRANCHE!: number
  NumOrdre!: number
  Montant!: number
  ObligatoireInscription!: boolean
  DateEcheance!: string
  CompteAssocie!: string
  PrefixeCompteEleve!: string
  NouveauxEleves!: boolean
  ElevesInternes!: boolean
  AnciensEleves!: boolean
  AccepteReduction!: boolean
  AccepteMajoration!: boolean
  LiasseDebit!: string
  LiasseCredit!: string
  ReductionsFratrie!: string
  TauxTVA!: number
  Libelle!:string
  ObligatoirePourDocuments!: boolean
  ElevesDemiPensionnaires!: boolean
  
}

export class ProduitListeAjout{

  CodeProduit!: string
  Libelle!:string
  NumOrdre!:number
  Montant!:number

}
