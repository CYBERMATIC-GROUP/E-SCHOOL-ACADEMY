export class ProduitFrais{
  IDPRODUIT!: number
  CodeProduit!: string
  LibelleProduit_Fr!: string
  Occasionnel!: boolean
  NumOrdre!: number
  Montant!: number
  ObligatoireInscription!: boolean
  DateEcheance!: string
  CompteAssocie!: string
  NouveauxEleves!: boolean
  ElevesInternes!: boolean
  AnciensEleves!: boolean
  AccepteReduction!: boolean
  AccepteMajoration!: boolean
  LiasseDebit!: string
  LiasseCredit!: string
  tabReductionsFratrie!: string
  TauxTVA!: number
  ObligatoirePourDocuments!: boolean
  ElevesDemiPensionnaires!: boolean
}
