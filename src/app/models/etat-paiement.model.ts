export class ParamFilterState {
    IDELEVE!: number
    IDNIVEAU!: number
    IDBRANCHE!: number
    IDPRODUIT!: number
    tabCodeProduit!: {CodeProduit: string}[]
    tabIDCLASSES!: TabIdclasses[]
    bEleveEnRetardPaiement!: number
    bEleveEnRegelePaiement!: number
    bEleveInscrits!: number 
    bEleveRadie!: number
    DateConsideree!: string
    IDSITE!: number
  }
  
  
  export interface TabIdclasses {
    IDCLASSES: number
  }

export class EtatPaiementByClass {
  sClasse!: string
  Deja_Paye!: number
  Reste_A_Payer!: number
  MontantImpaye!: number
  Montant!: number
}

export interface EtatPaiementTotaux {
  stUnResume: StUnResume
  tabFraisScolaires: TabFraisScolaire[]
  tabResumeClasse: TabResumeClasse[]
}

export interface StUnResume {
  Deja_Paye: number
  Reste_A_Payer: number
  MontantImpaye: number
  Montant: number
}

export interface TabFraisScolaire {
  IDELEVE: number
  CodeEleve: string
  Fr_Nom: string
  Fr_Prenom: string
  Fr_CodeClasse: string
  bExonere: boolean
  DateEcheance: string
  MontantTotal: number
  Deja_Paye: number
  Reste_A_Payer: number
  MontantImpaye: number
}

export interface TabResumeClasse {
  sClasse: string
  Deja_Paye: number
  Reste_A_Payer: number
  MontantImpaye: number
  Montant: number
}

export class AvisPaiement {
  IDELEVE!: number
  IDNIVEAU!: number
  IDBRANCHE!: number
  DateConsideree!: string
  tabIDCLASSES!: TabIdclasses[]
  tabCodeProduit!: TabCodeProduit[]
}

export class TabIdclasses {
  IDCLASSES!: number
}

export class TabCodeProduit {
  CodeProduit!: string
}
