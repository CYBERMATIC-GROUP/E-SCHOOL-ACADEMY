export const constantes = {
  requestCache: {
    statsEleve: 'statistiqueEleve',
    typesalle: 'typesalle',
    etatPaiementDroitScolaire: 'etatPaiementScolaire',
    echeancesDroitScolaire: 'echeancesDroitScolaire',
    classesList: 'classesList',
    gradeList: 'gradeList',
    departementList: 'departementList',
    elevesList: 'elevesList',
    agentList: 'agentList',
    quartierList: 'quartierList',
    enseignantList: 'enseignantList',
    groupeMatiereList: 'groupeMatiereList',
    niveauxList: 'niveauxList',
    compteList: 'compteList',
    branchesList: 'branchesList',
    sitesList: 'sitesList',
    cyclesList: 'cyclesList',
    commpteList: 'commpteList',
    languesList: 'languesList',
    nationalitesList: 'nationalitesList',
    arrondissementList:'arrondissementList',
    professionList: 'professionList',
    situationSocialeList: 'situationSocialeList',
    statutEleveList: 'statutEleveList',
    qualiteens: 'qualiteens',
    isAllParamsListIsSet: 'isAllParamsListIsSet',
    etablissementsScolaires: 'etablissementsScolaires',
    modePaiementList: 'modePaiementList',
    comptesJournaux: 'comptesJournaux',
    classeWithStat: 'ClasseWithStat',
    fraisEleve: 'FRaiseleveList',
    status: 'satus',
    caisse: 'caisseList',
    categorie: 'categorieList',
    centreExamenList: 'centreExamenList',
    DiplomeList: 'DiplomeList',
    echelonList: 'echelonList',
    etablissementList: 'etablissementList',
    fonctionList: 'fonctionList',
    niveauList: 'niveauList',
    qualiteList: 'qualiteList',
    specialiteList: 'specialiteList',
    etatSanitaire: 'etatSanitaire',
    departementsList: 'DEPARTEMENTS',
    mentionnslist: 'Mentions',
    objectiflist: 'objectifs',
    matiereniveaubrancheclasselist: 'matiereniveaubrancheclasse'

  },
  etatPaiementCache: {
    loadDataOnSelection: 'loadDataOnSelection',
  },
  auth: {
    lastAction: 'lastAction',
    agent: 'agent',
    school: 'school',
    header: 'header',
    eleve: 'eleve-auth',
    lastTypeUser: 'last-type-user',
    enseignant: 'enseignant',
    parent: 'responseloginparent'
  },
};

export const apiUris = {
  etablissement: {
    etablissementList: 'ETABLISSEMENTS',
  },
  agent: 'AGENT_ListeFiltre',
  eleve: 'ELEVES_Liste_Filtre',
  enseignant: 'ENSEIGNANT',
};

export enum TypeCompte {
  comptesCapitaux = 1,
  comptesImmobilisations = 2,
  stocksEnCours = 3,
  comptesFournisseurs = 4,
  comptesClients = 411,
  comptesFinanciers = 5,
  comptesCharge = 6,
  comptesProduit = 7,
  comptesSpéciaux = 8,
}

export enum epayService {
  creationEcole = 1,
}

export enum momoFrais {
  mtn = 4,
  airtel = 2,
}

export enum sms_parent {
  PERE=1,
  MERE=2,
  TUTEUR=3,
  ELEVE=4
}

export enum trimetres {
  PREMIER=1,
  DEUXIEME=2,
  TROISIEME=3
}

export enum etatNote {
  CST_ETAT_NOTE_SAISIE=1,
	CST_ETAT_NOTE_NON_SAISIE=2,
	CST_ETAT_NOTE_ABSENCE_JUSTIFIEE=3,
	CST_ETAT_NOTE_ABSENCE_NON_JUSTIFIEE=4
}

export enum typeNote{
  CST_TYPE_NOTE_CALCULE=2,
	CST_TYPE_NOTE_SAISISSABLE=1,
	CST_NOTE_PARENT=0,
}

export enum matiere {
  CST_TOUTES_MATIERES_AVEC_COEF=1,
	CST_TOUTES_MATIERES_SANS_COEF=2,
	CST_MATIERES_ESS_AVEC_COEF=3,
	CST_MATIERES_ESS_SANS_COEF=4,
	CST_MATIERES_PAS_ESS_AVEC_COEF=5,
	CST_MATIERES_PAS_ESS_SANS_COEF=6,
	CST_MATIERES_GROUPE_AVEC_COEF=7,
	CST_MATIERES_GROUPE_SANS_COEF=8,
	CST_UNE_MATIERE_AVEC_COEF=9,
	CST_UNE_MATIERE_SANS_COEF=10,
	CST_BORNE_NOTE_MAXI=10
}

export enum etatELeve {
  SUPPRESSION_DEFINITIVE=-1,
  SUPPRESSION_AVEC_CONSERVATION=3
}

export enum indiceDays {
  LUNDI = 1,
  MARDI = 2,
  MERCREDI = 3,
  JEUDI = 4,
  VENDREDI = 5,
  SAMEDI = 6,
  DIMANCHE = 7
}

export enum typeAbsence {
  ABSENCE = 1,
  RETARD = 2,
}

export enum actionOnForm{
  CREATE="ajouter",
  MODIFIER="modification",
  VIEW="voir"
}

export const versionApp = "V.1.1.0"


export const storeData = {
  statEleveByBrancheNiveauClasse: 'statEleveByBrancheNiveauClasse',
  notifications: "NOTIFICATIONS"
}