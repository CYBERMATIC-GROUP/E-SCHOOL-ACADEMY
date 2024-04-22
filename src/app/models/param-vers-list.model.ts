import { Branche } from "./branche.model"
import { Nationalite } from "./nationalite.model"
import { Niveau } from "./niveau.model"
import { Profession } from "./profession.model"
import { Qualiteens } from "./qualiteens.model"
import { Site } from "./site.model"

export interface paramVersList {
    BRANCHE: Branche[]
    NIVEAU: Niveau[]
    CLASSES: any[]
    SITE: Site[]
    CYCLES: any[]
    LANGUE: any[]
    NATIONALITE: Nationalite[]
    PROFESSION: Profession[]
    SITUATION_SOCIALE: any[]
    STATUTELEVE: any[]
    QUALITEENS: Qualiteens[]
  }