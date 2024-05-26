import { Component } from '@angular/core';
import { paramClassement } from '../models/classement.model';
import { ClassementService } from '../services/classement.service';

@Component({
  selector: 'app-statistique-by-discipline',
  templateUrl: './statistique-by-discipline.component.html',
  styleUrls: ['./statistique-by-discipline.component.scss'],
})
export class StatistiqueByDisciplineComponent {
  object!: paramClassement;
  tabStateParDiscipline: any;
  tabStatesecondeTable : any
  isloading!: boolean;
  isloadingsecond!: boolean

  constructor(private classementService: ClassementService) {}

  ngOnInit(): void {
    this.getResultatsScolaireStatistiqueDisciplineOrdreMerite();
    this.getRESULTATSSCOLAIRESGetStatistiques();
  }

  getResultatsScolaireStatistiqueDisciplineOrdreMerite() {
    const jsonString = localStorage.getItem('objetSend');
    if (jsonString) {
      this.isloading = true;
      this.object = JSON.parse(jsonString);
      console.log(this.object);
      this.classementService
        .getResultatScolaireStatistiqueDisciplineOrdreMerite(this.object)
        .subscribe((data) => {
          this.tabStateParDiscipline = data.body.tabStateParDiscipline;
          console.log(this.tabStateParDiscipline);
          this.isloading = false;
        });
    }
  }

  getRESULTATSSCOLAIRESGetStatistiques() {
    const elementJSON = localStorage.getItem('objetSend');
    if (elementJSON) {
      this.isloadingsecond = true;
      this.object = JSON.parse(elementJSON);
      console.log(this.object);
      this.classementService
        .getRESULTATS_SCOLAIRES_Get_Statistiques(this.object)
        .subscribe((data) => {
          console.log(data);
          
          this.tabStatesecondeTable = data.body.tabTableauDisciplineOrdreMerite;
          console.log(this.tabStatesecondeTable);
                    // this.printEtat_TableauDisciplineOrdreMerite(
          //   data.body.Resultat.Etat_TableauDisciplineOrdreMerite
          // );
          this.isloadingsecond = false;
        });
    }
  }

  printEtat_tabStateParDiscipline(data: any) {
    console.log(data);
    var anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = 'Liste Des eleves ';
    document.body.appendChild(anchor);
    //  anchor.click();
    let pdfWindow = window.open('', '_blank', 'Liste eleves');
    pdfWindow
      ? pdfWindow!.document.write(
          "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
            encodeURI(data) +
            "'></iframe></body>"
        )
      : null;
  }

  printEtat_TableauDisciplineOrdreMerite(data: any) {
    console.log(data);
    var anchor = document.createElement('a');
    anchor.href = data;
    anchor.download = 'Liste Des eleves ';
    document.body.appendChild(anchor);
    //  anchor.click();
    let pdfWindow = window.open('', '_blank', 'Liste eleves');
    pdfWindow
      ? pdfWindow!.document.write(
          "<body style='margin:0;padding:0'><iframe width='100%' height='100%' style='padding:0;margin:0' src='" +
            encodeURI(data) +
            "'></iframe></body>"
        )
      : null;
  }

  getElevesSup15CountForMatiere(matiere: any): number {
    if (matiere['>=15']) {
      return parseInt(matiere['>=15'], 10);
    }
    return 0;
  }

  getKeysForRange(start: number, end: number): string[] {
    const keys = [];
    for (let i = end; i >= start; i--) {
      // Reverse the order
      const key = i < 10 ? `0${i}` : `${i}`;
      keys.push(key);
    }
    return keys;
  }

  // Method to get the range keys from the first item (assuming all items have the same keys structure)
  getRangeKeys(): string[] {
    if (this.tabStateParDiscipline && this.tabStateParDiscipline.length > 0) {
      return this.getKeysForRange(0, 14);
    }
    return [];
  }

  getRangeKeyssecondeTable(): string[] {
    if (this.tabStatesecondeTable && this.tabStatesecondeTable.length > 0) {
      return this.getKeysForRange(0, 14);
    }
    return [];
  }
}
