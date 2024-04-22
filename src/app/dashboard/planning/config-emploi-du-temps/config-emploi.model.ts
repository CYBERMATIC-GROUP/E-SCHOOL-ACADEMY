export class ConfigEmploi {
  IDCONFIG_PLANNING!: number
  Annee!: number
  PremierJourSemaine!: number
  HeureDebut!: string
  NombreHeureJour!: number
  DureeSeanceEnMinutes!: number
  tabPouse!: TabPouse[]
  tabSeance!: TabSeance[]
  tabJours!: TabJour[]
}

export class TabPouse {
  NumeroSeance!: number
  DureePauseEnMinutes!: number
  LibellePause!: string
  ApresLaSeance!: string
}

export class TabSeance {
  NumeroSeance!: number
  HeureSeance!: string
  EnseigneOui!: boolean
}

export class TabJour {
  NumeroJour!: number
  Jour!: string
  JoursSansCours!: boolean
  Seances!: Seance[]
}

export class SeanceWithoutEnseigneBool {
  NumeroSeance!: number
  HeureSeance!: string
}

export class Seance extends SeanceWithoutEnseigneBool {
  EnseigneOui!: boolean
}
