export interface classementEleve {
    TitresNotes: any[]
    tabLesNotes: any[]
    Resultats: Resultat[]
    tTitrePeriodes: TTitrePeriodes
  }
  
  export interface Resultat {
    COL_IDELEVE: number
    COL_Rang: number
    COL_CodeEleve: string
    COL_NomPrenom: string
    COL_Sexe: string
    COL_Classe: string
    COL_Periode1: number
    COL_Periode2: number
    COL_Periode3: number
    COL_TPoints: number
    COL_TCoef: number
    COL_Moy: string
    COL_Credit: number
    COL_Mention: string
    COL_DecisionConseilClasse: string
    DetailNotes: any[]
  }
  
  export interface TTitrePeriodes {
    MoyennePeriode1Libelle: string
    bMoyennePeriode1Visible: boolean
    MoyennePeriode2Libelle: string
    bMoyennePeriode2Visible: boolean
    MoyennePeriode3Libelle: string
    bMoyennePeriode3Visible: boolean
    MoyenneLibelle: string
    bMoyenneVisible: boolean
    bCreditVisible: boolean
    bTotapointsVisible: boolean
    bTotalCoefficient: boolean
    bMentionVisible: boolean
    bDecisionConseilVisible: boolean
  }
  

export interface paramClassement {
    IDNIVEAU?: number
    IDBRANCHE?: number
    IDCLASSES?: number
    NumeroTrimestre?: number
    NumeroSequence?: number
    TypeMoyenne?: number
    GoupeMatiere?: number
    TenirCompteCoeffMatieres?: boolean
    ClassementOuReleveNotes?: boolean
  }