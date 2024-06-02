// export interface reductionExoneration {
//     IDFraisScolaires: number
//     CodeEcole: string
//     Annee: number
//     CodeEleve: string
//     CodeProduit: string
//     Montant: number
//     MontantReduction: number
//     MontantMajoration: number
//     bExonere: boolean
//     IDPRODUIT: number
//     IDCOMPTE: number
//     Montant_A_Payer: number
//     Libelle: string
// }

export interface TabProduitsExonere {
    IDELEVE: number
    TauxReductionFraisScolaires: string
    MontantReductionFraisScolaires: string
    TauxMajorationFraisScolaires: string
    MontantMajorationFraisScolaires: string
    MontantReductionFraisOccasionnels: string
    TauxReductionFraisOccasionnels: string
    tabProduitsExoneres: reductionExoneration[]
  }
  
  export interface reductionExoneration  {
    IDFraisScolaires: number
    IDPRODUIT: number
    CodeEcole: string
    Annee: number
    CodeEleve: string
    CodeProduit: string
    Montant: number
    MontantReduction: number
    MontantMajoration: number
    bExonere: boolean
    Montant_A_Payer: number
    Libelle: string
  }
  