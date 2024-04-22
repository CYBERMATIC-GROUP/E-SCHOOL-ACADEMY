export class Matiere {
    IDMATIERE!: number
    IndBulletin!: number
    Fr_CodeMatiere!: string
    Fr_NomMatiere!: string
    JourSansCours!: number
    EstUnGroupement!: boolean
    MatieresDuGroupement!: string
    //get
    Fr_Nom! :string
    Fr_Prenom!: string
  }

  export class MatiereByNiveauBrancheClasse {
    nGroupeMatiere!: number
    IDMATIERE!: number
    Matiere!: string
    Enseignant!: string
    EnseigneeOui!: boolean
    EnseigneePeriode1!: boolean
    EnseigneePeriode2!: boolean
    EnseigneePeriode3!: boolean
    Essentielle!: boolean
    EnseigneeEnGroupe!: boolean
    Coefficient!: number
    NbCredits!: number
    MoyenneMinValidation!: number
    NoteMax!: number
  }
  