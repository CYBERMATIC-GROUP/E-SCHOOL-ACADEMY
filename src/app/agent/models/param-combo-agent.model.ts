import { Branche } from "src/app/models/branche.model"
import { Categorie } from "src/app/models/categorie.model"
import { Classe } from "src/app/models/classe.model"
import { Departement } from "src/app/models/departement.model"
import { Echelon } from "src/app/models/echelon.model"
import { Fonction } from "src/app/models/fonction.model"
import { Grade } from "src/app/models/grade.model"
import { Nationalite } from "src/app/models/nationalite.model"
import { Niveau } from "src/app/models/niveau.model"
import { Qualiteens } from "src/app/models/qualiteens.model"
import { Site } from "src/app/models/site.model"
import { Specialite } from "src/app/models/specialite.model"

export interface paramComboAgent{
    BRANCHE: Branche[]
    NIVEAU: Niveau[]
    CLASSES: Classe[]
    SITE: Site[]
    CATEGORIE: Categorie[]
    ECHELON: Echelon[]
    GRADE: Grade[]
    SPECIALITE: Specialite[]
    NATIONALITE: Nationalite[]
    QUALITEENS: Qualiteens[]
    DEPARTEMENT: Departement[]
    FONCTIONS: Fonction[]
}