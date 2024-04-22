export class Eleve {
  IDELEVE!: number
  DateEntree!: string
  DateSortie!: string
  IDNIVEAU!: number
  IDBRANCHE!: number
  IDCLASSES!: number
  CodeEleve!: string
  Civilite!: number
  DateNaissance!: string
  Telephone!: string
  Courriel!: string
  Fr_Nom!: string
  Fr_Prenom!: string
  Fr_LieuNaissance!: string
  Fr_Adresse1!: string
  Fr_Adresse2!: string
  Fr_Ville!: string
  PassWord!: string
  Photo!: string;
  IDClasseAvenir!: number
  TypeEleve!: number
  Boursier!: boolean
  TypeBourse!: number
  IDNationalite!: number
  ClassesDoublees!: string
  EtatEleve!: string
  IDCYCLES!: number
  IDFRATRIE!: number
  IDSTATUTELEVE!: number
  IDSITE!: number
  IDINSCRIPTIONS!: number
  IDSORTIES!: number
  EtablissementOrigine!: number
  SituationSociale!: number
  ProfessionPere!: string
  ProfessionMere!: string
  LangueVivante1!: string
  LangueVivante2!: string
  LangueVivante3!: string
  NombreFreres!: number
  NombreSoeurs!: number
  Fr_Observations!: string
  ExempteDuSport!: boolean
  EtatSanitaire!: string
  Commentaire_Fr!: string
  NumOrdreClasse!: number
  Login!: string
  FraisInscriptionPayes!: boolean
  NouveauDansAnneeCourante!: number
  TelMobilePere!: string
  EmailPere!: string
  TelMobileMere!: string
  EmailMere!: string
  TelMobile!: string
  TauxReductionFraisScolaires!: number
  TauxReductionFraisOccasionnels!: number
  MontantReductionFraisScolaires!: number
  MontantReductionFraisOccasionnels!: number
  ProduitsExoneres!: string
  TauxMajorationFraisScolaires!: number
  MontantMajorationFraisScolaires!: number
  Fr_NomPrenomTuteur!: string
  ProfessionTuteur!: number
  EmailTuteur!: string
  TelMobileTuteur!: string
  bPleinTemps!: boolean
  bMarie!: boolean
  SMS_ParentParDefaut!: number
  Travailleur!: boolean
  NumCNI!: string
  BEPC_Annee!: number
  BEPC_Ecole_Fr!: string
  moImpayesAnneePrec!: number
  moImpayesAnneePrecRegularises!: number
  IdentifiantNational!: string
  IdentifiantBadge!: string
  DroitImage!: boolean
  PersonnesDeConfiance!: string
  Fr_Departement!: string
  Fr_Arrondissement!: string
  CodeEtab!: string
  AccepteInfosPersoPortail!: boolean
  ConfirmeReinscriptionAnneeSuivante!: number
  ConfirmeReinscriptionAnneeCourante!: number
  DateAutortisationPortail!: string
  IDCENTRE_EXAMEN!: number
  DatesEcheancesProduits!: string
  ClasseEcolePublique!: string
  CommentaireCompta!: string
  PeutSortirSeul!: boolean
  ChampLibre_1!: string
  ChampLibre_2!: string
  ChampLibre_3!: string
  ChampLibre_4!: string
  ChampLibre_5!: string
  ChampLibre_6!: string
  Redoublant!: number
  ParentsDivorces!: boolean
  SiParentsDivorces_QuiChercheEnfant!: number
  SiParentsDivorces_QuiChercheEnfant_Autre!: string
  Nationalite!: string
  NumeroSortie!: string
  Cycle!: string
  Site!: string
  Statut!: string
  GroupeSanguin!: string
  CodeBranche!: string
  CodeNiveau!: string
  CodeClasse!: string
  CodeOption!: string
  CentreExamen!: string
  EtablissementProvenance!: string
  DepartementResidence!: string
  DepartementNaissance!: string
  Etat!: string
  body: any
  Fr_NomPrenomMere!: string;
  Fr_NomPrenomPere!: string;
  IDLangueVivante1!: number;
  IDLangueVivante2!: number;
  IDLangueVivante3!: number;
  IDProfessionMere!: number;
  IDProfessionPere!: number
  IDProfessionTuteur!: number;
  nNumero!:number
  Mobile!:string
  Numero!:number
  Message!:string
  TelMobileEleve!:string
}


export class EleveInscription {
  IDELEVE!: number
  IDNIVEAU!: number
  IDBRANCHE!: number
  IDCLASSES!: number
  CodeEleve!: string
  Civilite!: number
  DateNaissance!: string
  Telephone!: string
  Courriel!: string
  Fr_Nom!: string
  Fr_Prenom!: string
  Fr_LieuNaissance!: string
  Fr_Adresse1!: string
  Fr_Adresse2!: string
  Fr_Ville!: string
  PassWord!: string
  IDClasseAvenir!: number
  TypeEleve!: number
  Boursier!: boolean
  TypeBourse!: number
  IDNationalite!: number
  ClassesDoublees!: string
  EtatEleve!: number
  IDCYCLES!: number
  IDFRATRIE!: number
  IDSTATUTELEVE!: number
  EtatSanitaire!: number
  NouveauDansAnneeCourante!: number
  IDCENTRE_EXAMEN!: number
  Redoublant!: number
  IDSITE!: number
  IDINSCRIPTIONS!: number
  IDSORTIES!: number
  EtablissementOrigine!: number
  SituationSociale!: number
  ProfessionPere!: number
  ProfessionMere!: number
  LangueVivante1!: number
  LangueVivante2!: number
  LangueVivante3!: number
  NombreFreres!: number
  NombreSoeurs!: number
  Fr_Observations!: string
  ExempteDuSport!: boolean
  Commentaire_Fr!: string
  Login!: string
  FraisInscriptionPayes!: boolean
  TelMobilePere!: string
  EmailPere!: string
  TelMobileMere!: string
  EmailMere!: string
  TelMobile!: string
  TauxReductionFraisScolaires!: number
  TauxReductionFraisOccasionnels!: number
  MontantReductionFraisScolaires!: number
  MontantReductionFraisOccasionnels!: number
  TauxMajorationFraisScolaires!: number
  MontantMajorationFraisScolaires!: number
  Fr_NomPrenomTuteur!: string
  ProfessionTuteur!: number
  EmailTuteur!: string
  TelMobileTuteur!: string
  bPleinTemps!: boolean
  bMarie!: boolean
  SMS_ParentParDefaut!: number
  Travailleur!: boolean
  NumCNI!: string
  IdentifiantNational!: string
  IdentifiantBadge!: string
  Fr_Departement!: string
  Fr_Arrondissement!: string
  CodeEtab!: string
  ParentsDivorces!: boolean
  Photo!: string;
  Fr_NomPrenomMere!: string;
  Fr_NomPrenomPere!: string;
  IDLangueVivante1!: number;
  IDLangueVivante2!: number;
  IDLangueVivante3!: number;
}

export class classeEffectif {
  IDCLASSES!: number
  IDNIVEAU!: number
  IDBRANCHE!: number
  nNbreEleve!: number
  nNbreHomme!: number
  nNbreFemme!: number
  nCapacite!: number
  NumClasse!: number
  CodeClasse!: string
  NomClasse!: string
  IDSALLES!: number
  IDENSEIGNANT_Principal!: number
  CodeNiveau!: string
  CodeBranche!: string
  CodeSalle!: string
}


export interface impressionDocEleveType {
  CERTIFICAT_DE_SCOLARITE: number
  CERTIFICAT_DE_FRENQENTATION: number
  CERTIFICAT_INSCRIPTIN: number
  DOSSIER_ELEVE: number
  CARTE_SCOLAIRE: number
}

export  class EnvoieSMS {
  TelMobilePere!: string;
  TelMobileTuteur!:string
  TelMobileMere!:string
  TelMobile!:string
  TypeDestinateur!:number
  Numero!: number
  Mobile!: string
  Message!:string
  }

  export class SMSEnvoie{
    Mobile!: string
    Message!:string
    TypeDestinateur!:number
  }
  

  export class SMSEnvoieAgent{
    Mobile!: string
    Message!:string
    TypeDestinateur!:number
    IDAGENT!: number
    nNumero: any
  }

  export class ReadSMS{
    Mobile!: string
    Message!:string
  }
  export class SMSEnvoieEnseignant{
    Mobile!: string
    Message!:string
    TypeDestinateur!:number
    IDENSEIGNANT!: number
    nNumero: any
  }

  export class PeriodeEleve {
    NumPeriode!: number
    NomPeriode!: string
  }
  
  export class ImprimeNoteClassement {
    IDNIVEAU!: number
    IDBRANCHE!: number
    IDCLASSES!: number
    NumeroTrimestre!: number
    NumeroSequence!: number
    TypeMoyenne!: number
    GoupeMatiere!: number
    TenirCompteCoeffMatières!: number
    ClassementOuRelevéNotes!: number
  }
  

  export class SearchEleveSimplifie {
    Nom!: string
    Prenom!: string
  }

  export class ListeEleveSimplifie{
    IDCLASSE!:number
    IDELEVE!: number
    Metricule!: string
    NomPrenom!: string
    DateNaissance!: string
    LieuNaissance!: string
    Classe!: string
    Photo!: string
    ElevesAbonnes?: any
  }
  