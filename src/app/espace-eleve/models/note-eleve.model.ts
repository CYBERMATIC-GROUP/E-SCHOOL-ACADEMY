export interface NoteForEleve {
    Eleves: Eleves
    tbLesNotes: TbLesNote[]
    tabConfigNote: TabConfigNote[]
    dMoyennes: DMoyennes
  }
  
  export interface Eleves {
    nNumero: number
    IDELEVE: number
    CodeEleve: string
    Fr_Nom: string
    Fr_Prenom: string
    Moyenne: string
    Coef: number
    TotalPoint: string
    Observations: string
  }
  
  export interface TbLesNote {
    Identifiant: number
    IDLES_NOTES: number
    IDELEVE: number
    IDMATIERE: number
    IDNOTES: number
    numTrimestre: number
    Note: number
    EtatNote: number
    sEtatNote: string
  }
  
  export interface TabConfigNote {
    NumeroOrdre: number
    IDNOTES: number
    Libelle: string
    BorneMaxi: number
    Coefficient: number
  }
  
  export interface DMoyennes {
    IDELEVE: number
    Moyenne: string
    Coef: number
    TotalPoint: string
    Observations: string
  }
  