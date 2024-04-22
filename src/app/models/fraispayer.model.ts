export class FraisPayer {
  FraisScolaires!: FraisScolaire[]
  DossierEleve!: DossierEleve
}

export class PaiementFrais {
  CompteAssocie!: string
  CompteProduitEleve!: string
  IDPRODUIT!: number
  CodeProduit!: string
  MontantTotal!: number
  Deja_Paye!: number
  Reste_A_Payer!: number
  MontantImpaye!: number
  Montant_A_Paye!: number
}


export class FraisScolaire extends PaiementFrais{
  bExonere!: boolean
  sLibelleProduit!: string
  DateEcheance!: string
  NumOrdre!: number
}

export class DossierEleve {
  IDELEVE!: number
  IDNIVEAU!: number
  IDBRANCHE!: number
  IDCLASSES!: number
  CodeEleve!: string
  Civilite!: number
  DateNaissance!: string
  Courriel!: string
  Fr_Nom!: string
  Fr_Prenom!: string
  Fr_LieuNaissance!: string
  Nationalite!: string
  CodeBranche!: string
  CodeNiveau!: string
  CodeClasse!: string
  TypeEleve!: number
  Boursier!: boolean
  TypeBourse!: number
  IDNationalite!: number
  EtatEleve!: number
  IDCYCLES!: number
  IDFRATRIE!: number
  IDSTATUTELEVE!: number
  EtatSanitaire!: string
  NouveauDansAnneeCourante!: boolean
  IDCENTRE_EXAMEN!: number
  Redoublant!: boolean
  IDSITE!: number
  IDINSCRIPTIONS!: number
  IDSORTIES!: number
  EtablissementOrigine!: number
  SituationSociale!: number
  Login!: string
  TelMobilePere!: string
  EmailPere!: string
  TelMobileMere!: string
  EmailMere!: string
  TelMobile!: string
  Fr_NomPrenomTuteur!: string
  ProfessionTuteur!: number
  EmailTuteur!: string
  TelMobileTuteur!: string
  SMS_ParentParDefaut!: number
  IdentifiantNational!: string
  IdentifiantBadge!: string
  Fr_Departement!: string
  CodeEtab!: string
  NumeroSortie!: string
  Cycle!: string
  Site!: string
  Statut!: string
  GroupeSanguin!: string
  CodeOption!: string
  CentreExamen!: string
  EtablissementProvenance!: string
  DepartementResidence!: string
  DepartementNaissance!: string
  Solde!: number
  Photo!: string
}


  export class ResultEtatPaiement {
    IDELEVE!: number
    IDNIVEAU!: number
    IDBRANCHE!: number
    IDCLASSES!: number
    CodeEleve!: string
    Fr_Nom!: string
    Fr_Prenom!: string
    Civilite!: number
    DateNaissance!: string
    Fr_CodeClasse!: string
    bExonere!: boolean
    sLibelleProduit!: string
    CompteAssocie!: string
    CompteProduitEleve!: string
    DateEcheance!: string
    NumOrdre!: number
    IDPRODUIT!: number
    CodeProduit!: string
    MontantTotal!: number
    Deja_Paye!: number
    Reste_A_Payer!: number
    MontantImpaye!: number
    Montant_A_Paye!: number
}

export interface echeanceMensuel {
  CodeProduit: string
  NumOrdre: number
  Libelle: string
}