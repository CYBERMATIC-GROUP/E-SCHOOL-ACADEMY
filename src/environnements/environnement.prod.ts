  export const environment = {
    production: true,
    apiUrl: 'https://cybclient.com/eschool/V1/',
    regexMtnNumber: /^(06)[0-9]{7}$/,
    regexAirtelNumber: /^(04|05)[0-9]{7}$/,
    regexMtnAirtel: /^(06|05|04)[0-9]{7}$/,
    errorCode: {
      token: '401',
    },
    


  TypeUserConst: {
    CST_TYPE_USER_AGENT: 3,
    CST_TYPE_USER_ENSEIGNANT: 4,
    CST_TYPE_USER_ELEVE: 2,
    CST_TYPE_USER_PARENT:1

  },


  TypeImpressionEleve: {
    CERTIFICAT_DE_SCOLARITE: 1,
    CERTIFICAT_DE_FRENQENTATION: 2,
    CERTIFICAT_INSCRIPTIN: 3,
    DOSSIER_ELEVE: 4,
    CARTE_SCOLAIRE: 5,
  },


  routes: {
    notes: {
      base: 'notes',
      saisie: 'saisie'
    },
    message: {
      base: 'notifications'
    },
    statistique: {
      base: 'statistiques'
    },
    visites: {
      base: 'visites',
      visiteurs: 'visiteurs'
    },

    staticPage:{
      home: 'accueil',
    },

    Enseignant: {
      Base: 'dossierEnseignant',
      links:{
        Liste: 'enseignant/list',
        Ajout: 'enseignant/ajout',
      },
      espaceEnseigant: {
        base: 'espace-enseignant'
      }
    },


    Eleve: {
      Base: 'dossierEleve',
      links:{
        Liste: 'eleve/list',
        Ajout: 'eleve/ajout',
      },
      espaceEleve: {
        base: 'espace-eleve',
        conexion: 'connexion',
        fraisScolaire: 'frais-scolaire',
        InfoEcole:'info-ecole'
      }
    },


    Comptabilite: {
      Base: 'comptabilite',
      links:{
        PayementDroitScolaire: 'frais/list',
        EtatDePayement: 'eleve/etat-paiement',
        ConnnsultationDesCaises: 'historiqueCaisse',
        ConnnsultationDesComptes: 'consultationCompte',
        ClotureDesCaisses: 'ClotureCaisseHistorique',
        ClotureJournee: 'cloturejourneecomptable',
        historiqueVersementCaisse: 'historique-versements-caisses',
        historiqueRetraitsCaisse: 'historique-retraits-caisses',
        transfertIntercaisseEtBancaire: {
          base: 'transfert-intercaisse-et-bancaire',
          intercaisse: 'intercaisse',
          versementBancaire: 'versement-bancaire',
          retraitsBancaire: 'retrait-bancaire'
        },
        retraitCaisseEspece: 'retrait-caisse/espece'
      }
    },


    ResultatScolaire: {
      Base: 'resultatScolaire',
    },

    Planning: {
      Base: 'planning',
    },

    Impression: {
      Base: 'impression',
      links:{
        ImpressionnnnDocumentEleve: 'impressions/documents-eleves',
        ImpressionnnnDocumentEnseignant: 'impression-carte-enseignant',
        ImpressionnnnDocumentAgent: 'impression-carte-agent',
        ImpressionReleveNote:"/impression-releve-note"
      }
    },


    parametres : {

        config:'configuration/',

        localisation:{

            departement: "/departement",
            arrondissement: "/arrondissement",
            quartier: "/quartier",
            ville: "/ville",
            nationnalite: "/nationalite",
            zone : "/zone/list",
            
        },
    
        carriere :{
           
            grade: "/grade",
            echelon: "/echelon",
            categorie: "/categorie",
            specialite: "/specialite",
        },

        parcours:{

            branche: "branches",
            niveau: "niveaux",
            classe: "/classe/list",
            cycle: "/cycle",
            site: "/site",
        },

        ecole:{

            etablissement: "/etablissement",
            etablissements: "etablissements",
            groupeMatiere: "/graoupeMatiere",
            typeSalle: "/typesalle",
            salle: "/salle",
            moyenne: "moyennes",
            centreexamen: "centreexamen",
            ecole : "/ecole/list",

        },

        eleves:{

            statuseleve: "statuseleve",
        },

        PlanComptable:{

            notes: "plancomptable",
            liasse: "liasse",
            caisse: "caisse",
            fonctionAgent: "fonction",
         
        },

        ConfigurationNotes:{

            notes: "notes",
        },

        profession:{
          professionAgents: "/profession/liste",
      },


        Divers:{

        qualite: "config/qualite",
        langue: "config/langue",
        annee: "config/annee",
        etatsanitaire: "config/etatsanitaire",
        diplome:"/diplome",
        etablissements:"/etablissement-tous/liste"

        },
    
    },

    services: {
      epay: 'paiement-mobile',
      validationSchool: 'validation-ecole'
    }

  },

};

