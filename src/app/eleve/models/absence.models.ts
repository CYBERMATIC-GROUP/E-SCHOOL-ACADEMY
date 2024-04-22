export class AbsenceEleve {
  IDABSENCE!: number
  IDELEVE!: number
  IDCLASSES!: number
  Date!: string
  NumSeance!: number
  bAbsenceJustifiee!: boolean
  MotifAbsence!: string
  Observation!: string
  nTypeAbsence!: number
  DureeAbsence!: string
  Discipline!: string
  TypeAbsence!: string
  CodeCalasse!: string
  NumeroJour!: number
  Couleur!: string
  MATIERES!: string
}


export interface statAbsence {
  ABSE: Abse
  tabResumeAbsence: TabResumeAbsence[]
  tabResumeRetard: TabResumeRetard[]
  Les_Notes: LesNote[]
  NoteMaxi: number
}

export interface Abse {
  NbreAbsece: number
  NbreRetard: number
  NbreAbseceJustifiee: number
  NbreAbseceNonJustifiee: number
  NbreRetardJustifiee: number
  NbreRetardNonJustifiee: number
  NbrePunition: number
  NbreSanction: number
  TabDetail: TabDetail[]
}

export interface TabDetail {
  Date: string
  ABSJ: boolean
  TypeABS: string
  Couleur: string
}

export interface TabResumeAbsence {
  Date: number
  NbreAbsece: number
  NbreAbseceJustifiee: number
  NbreAbseceNonJustifiee: number
  Couleur: string
}

export interface TabResumeRetard {
  Date: number
  NbreRetard: number
  NbreRetardJustifiee: number
  NbreRetardNonJustifiee: number
  Couleur: string
}

export interface LesNote {
  Date: string
  Matiere: string
  sNote: string
  Couleur: string
}