export interface header{
    CODE_ECOLE: string;
    ANNEE: string;
    IDENTIFIANT: string;
    CLE_API: string;
    UTILISATEUER_LOGIN: string;
    UTILISATEUER_TOKEN: string;
    ACTION: 1 | 2;
    TYPE_UTILISATEUR: number;
    DATE_COMPTABLE?: string
}
