import { Branche } from "src/app/models/branche.model"
import { Classe } from "src/app/models/classe.model"
import { Cycle } from "src/app/models/cycle.model"
import { Departement } from "src/app/models/departement.model"
import { Etablissement } from "src/app/models/etablissement.model"
import { EtablissementList } from "src/app/models/etablissementList.model"
import { EtatSanitaire } from "src/app/models/etatSanitaire.model"
import { Nationalite } from "src/app/models/nationalite.model"
import { Niveau } from "src/app/models/niveau.model"
import { Profession } from "src/app/models/profession.model"
import { Qualiteens } from "src/app/models/qualiteens.model"
import { Site } from "src/app/models/site.model"
import { StatusEleve } from "src/app/models/statuseleve.model"

export interface paramComboEleve {
    BRANCHE: Branche[]
    NIVEAU: Niveau[]
    CLASSES: Classe[]
    SITE: Site[]
    CYCLES: Cycle[]
    LANGUE: any[]
    NATIONALITE: Nationalite[]
    PROFESSION: Profession[]
    //SITUATION_SOCIALE: []
    STATUTELEVE: StatusEleve[]
    QUALITEENS: Qualiteens[]
    ETABLISSEMENT: EtablissementList[]
    DEPARTEMENT: Departement[]
    ETAT_SANITAIRE: EtatSanitaire[]
  }