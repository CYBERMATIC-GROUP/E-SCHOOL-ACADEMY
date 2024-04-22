export class CreateCopmteParent{
    IDCOMPTE_UTILISATEUR!:number
    Nom!: string;
    Prenom!: string;
    email!: string;
    Mobile!: string;
    Mobile2!: string;
    Password!: string;
    Annee1Annee2!: string;
    CODE_ECOLE!: string;
}

export class ValidateCompte{
    Mobile!: string;
    Code!: string;
}

