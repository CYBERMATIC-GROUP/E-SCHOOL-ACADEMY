

export class Ecole{
  IDECOLES!: number
  CodeEtab!: string
  Ar_NomEcole!: string
  Fr_NomEcole!: string
  Ar_Adresse!: string
  Fr_Adresse!: string
  CodeEcoleDEC!: string
  Telephone!: string
  NomPrenomResponsable!: string
  QualiteResponsable!: string
  TelephoneResponsable!: string
  Fr_Ville!: string
  Departement!: string
  Ar_Commune!: string
  Commune!: string
  Arrondissement!: string
  IdentifiantEtab!: string
  NbEleves!: number
  Cycle_Prescolaire!: boolean
  Cycle_Primaire!: boolean
  Cycle_College!: boolean
  Cycle_Lycee!: boolean
  Cycle_Superieur!: boolean
  Courriel!: string
  NumInscriptionDernier!: number
  IDINSPECTIONS!: number
  IDCENTRE_EXAMEN!: number
  PositionGPS!: string
  CodeDepartement!: string
  Nature!: number
  IDZone!: number
  IDDEPARTEMENT!: number
  IDARRONDISSEMENT!: number
  IDQUARTIER!: number
  NomArrondissement!: string
  NomDepartement!: string
  NomZone!: string
  NomQuartier!: string
  CodeCompte!: string
  CODE_ECOLE?: string
  ANNEE?:number
  IDENTIFIANT?:string
  CLE_API?:string
  UTILISATEUER_LOGIN?:string
  UTILISATEUER_TOKEN?:string
  ACTION?:number
  TYPE_UTILISATEUR?:number
  MontantTimbreFacture?: number
}

export interface schoolLogin {
  Adresse1: string
  Adresse2:  string
  CodeEtab: string
  CodePostal: string
  Courriel: string
  IDETAB: string
  Licence: string
  Logo: string
  NomEtab: string
  SiteInternet: string
  TypeEtablissement: string
  Télécopie: string
  Téléphone: string
  Ville: string
  Monnaie: string
  MontantTimbreFacture: number
}
