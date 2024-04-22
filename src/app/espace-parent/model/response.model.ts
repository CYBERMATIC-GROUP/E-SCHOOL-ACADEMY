export interface ResponseLoginParent {
    Etable: Etable
    Tuteur: Tuteur
    Famille: any[]
    ElevesAbonnes: any[]
  }
  
  export interface Etable {
    IDETAB: number
    CodeEtab: string
    TypeEtablissement: number
    CodePostal: string
    Téléphone: string
    Télécopie: string
    SiteInternet: string
    Courriel: string
    Licence: string
    NomEtab: string
    Adresse1: string
    Adresse2: string
    Ville: string
    Logo: string
    Monnaie: string
    LebelleEleve: string
    MontantTimbreFacture: number
  }
  
  export class  Tuteur {
    IDCOMPTE_UTILISATEUER!: number
    email!: string
    Password!: string
    Mobile!: string
    Nom!: string
    Prenom!: string
    Mobile2!: string
    IDFRATRIE!: number
  }