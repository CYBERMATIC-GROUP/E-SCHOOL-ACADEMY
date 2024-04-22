export class Agent {
  IDAGENT!: number
  CodeAgent!: string
  Fr_Nom!: string
  Fr_Prenom!: string
  bDroit_ConsultationEleves!: boolean
  bDroit_ModificationEleves!: boolean
  bDroit_InscriptionEleves!: boolean
  bDroit_RadiationEleves!: boolean
  bDroit_ChangementEtatEleves!: boolean
  bDroit_SaisieNotes!: boolean
  bDroit_SaisieNotesAnonyme!: boolean
  bDroit_SaisieAbsencesEleves!: boolean
  bDroit_SaisieAbsenceEnseignants!: boolean
  bDroit_SaisieAbsenceAgents!: boolean
  bDroit_ImpressionCertificatsScolarite!: boolean
  bDroit_ImpressionCartesScolaires!: boolean
  bDroit_ImpressionBulletins!: boolean
  bDroit_ImpressionClassementEleve!: boolean
  bDroit_ImpressionAbsences!: boolean
  bDroit_ImpressionEmploiDuTemps!: boolean
  bDroit_GestionProjetsPedagogiques!: boolean
  bDroit_PersonnalisationNotesEtMatieres!: boolean
  bDroit_ModifcationEmploiDuTemps!: boolean
  bDroit_GestionEnseignants!: boolean
  bDroit_GestionAgents!: boolean
  bDroit_Statistiques!: boolean
  bDroit_SauvegardeBDD!: boolean
  bDroit_RestaurationBDD!: boolean
  bDroit_MiseAJourPortail!: boolean
  bDroit_ModifEcolesInspection!: boolean
  bDroit_GestionDiplomes!: boolean
  bDroit_AttributionDiplomes!: boolean
  Login!: string
  CaisseAssociee!: number
  bDroit_SuperviseurCaisses!: boolean
  DateNaissance!: string
  IDFONCTION!: number
  CompteFictif!: boolean
  bDroit_FraisOfficielsPayes!: boolean
  bDroit_ConsultationComptes!: boolean
  bDroit_ConsultationCaisses!: boolean
  bDroit_HistoriqueRetraitsCaisses!: boolean
  bDroit_HistoriqueVersementsCaisses!: boolean
  bDroit_JournalCompta!: boolean
  bDroit_GrandLivre!: boolean
  bDroit_BalanceCompta!: boolean
  bDroit_BilanCompta!: boolean
  bDroit_CompteResultat!: boolean
  bDroit_DefinirReductionsFraisEleves!: boolean
  bDroit_ImportPaiements!: boolean
  bDroit_ValiderOperationsDiverses!: boolean
  bDroit_EncaisserDroitsScolaires!: boolean
  bDroit_EncaisserFraisOccasionnels!: boolean
  bDroit_BordereauGeneralSalaire!: boolean
  bDroit_AccorderAvances!: boolean
  bDroit_ReglerDesCharges!: boolean
  ModeRemuneration!: number
  RemunerationBase!: number
  Retenue_CNSS!: number
  Retenue_Assurance!: number
  Retenue_CasSocial!: number
  Retenue_Autre!: number
  IndemniteMensuelle!: number
  Retenue_EnfantsACharge!: number
  Courriel!: string
  Telephone!: string
  TelMobile!: string
  IdentifiantBadge!: string
  Fr_Adresse1!: string
  Fr_Adresse2!: string
  Civilite!: number
  CodePostal!: string
  Fr_Ville!: string
  Fr_LieuNaissance!: string
  NumCNI!: string
  MontantsPrimesDefaut!: string
  MontantsRetenuesDefaut!: string
  NumCompteBancaire!: string
  NumSecuriteSociale!: string
  SituationFamiliale!: number
  NombreEnfants!: number
  NombrePartsImpots!: number
  EstImposable!: boolean
  IDSITE!: number
  Nationalite!: string
  Fr_Departement!: string
  Fr_Arrondissement!: string
  IDCENTRE_EXAMEN!: number
  ClassesAutoriseesSaisieNotes!: string
  ModifPasswordNecessaire!: boolean
  CodeEtab!: string
  Site!: string
  Fonction!: string
  CodeCaisse!: string
  IDDEPARTEMENT_NAISS!: number
  Departement_Naiss!: number
  IDSpecialite!: number
  Specialite!: number
  IDEchelon!: number
  Echelon!: number
  IDCategorie!: number
  Categorie!: number
  IDQUARTIER!: number
  IDGRADE!: number
  GRADE!: number
  IDNationalite!: number
  IDARRONDISSEMENT!: number

  nNumero!:number
  Message!: string
  TypeDestinateur!:number
  Numero!:number
  Mobile!:string
}


export class ModelAbsenceAgent {
  IDABSENCeS_AGENTS!: number
  IDAGENT!: number
  Date!: string
  ApresMidi!: boolean
  Matin!: boolean
  NomPrenom!: string
  MatinOuApresMidi!: number
}




/*export class Agent {
  IDAGENT!: number
  CodeAgent!: string
  Fr_Nom!: string
  Fr_Prenom!: string
  DateNaissance!: string
  IDFONCTION!: number
  TelMobile!: string
  IdentifiantBadge!: string
  Fr_Adresse1!: string
  Fr_Adresse2!: string
  Civilite!: number
  Fr_Ville!: string
  Fr_LieuNaissance!: string
  IDSITE!: number
  Nationalite!: string
  Fr_Departement!: string
  Fr_Arrondissement!: string
  CodeEtab!: string
  Site!: string
  Fonction!: string
  Photo!: string
}*/


