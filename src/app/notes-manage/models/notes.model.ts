export interface Note {
    Eleves: EleveNote[]
    tbLesNotes: TabNote[]
    tabConfigNote: TabConfigNote[]
  }

  export interface EleveNote {
    IDELEVE: number
    CodeEleve: string
    Fr_Nom: string
    Fr_Prenom: string
    Coef: number
  }

  export interface TabConfigNote {
    NumeroOrdre: number
    IDNOTES: number
    Libelle: string
    BorneMaxi: number
    Coefficient: number
  }

  export interface TabNote {
    Identifiant?: number
    IDLES_NOTES: number
    IDELEVE: number
    IDMATIERE: number
    IDNOTES: number
    numTrimestre: number
    Note: number
    EtatNote: number
    sEtatNote?: string
  }


export class NoteModelCreateOrUpdate {
  IDLES_NOTES?: number
  IDELEVE!: number
  IDMATIERE!: number
  IDNOTES!: number
  NumTrimestre!: number
  EtatNote?: number
  Note!: number
}
