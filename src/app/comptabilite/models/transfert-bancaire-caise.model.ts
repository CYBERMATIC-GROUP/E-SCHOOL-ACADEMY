export interface retrait { 
    Montant: string, 
    Libelle:string,
    CodeCompte: string,
    CompteDebit: string,
    CompteCredit: string,
    IDCAISSE: number
}

export interface pendingTransfert {
    IDTRANSFERTCAISSE: number
    IDCaisseSource: number
    IDCaisseDestination: number
    DateCreation: string
    DateValidation: string
    Valide: boolean
    Montant: number
    Libelle: string
    MouvementDeValidation: number
    IDCaissierSource: number
    IDCaissierDestination: number
    CodeCaisseSource: string
    CodeCaisseDestination: string
    NomCaissierSource: string
    NomCaissierDestination: string
  }

  export interface transfertArgent { 
    Montant: number, 
    Libelle: string, 
    IDCaisseSource: number, 
    IDCaisseDestination: number, 
    IDAGENT: number, 
    Date: string 
    IDCAISSE: number
  }