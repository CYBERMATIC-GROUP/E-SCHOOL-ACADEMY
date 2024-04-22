import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Classe } from 'src/app/models/classe.model';
import { ClasseService } from 'src/app/services/classe.service';
import { GlobalService } from 'src/app/services/global.service';
import { EleveService } from 'src/app/services/eleve.service';
import { AlertComponent } from 'src/app/core/alert/alert.component';
import { NgForm } from '@angular/forms';
import { RadiationEleve } from 'src/app/models/radiationeleve.model';
import {MatSelectModule} from '@angular/material/select';
import { filter, finalize, map, tap } from 'rxjs';
import { Eleve } from 'src/app/models/eleve.model';
import { etatELeve } from 'src/environnements/constantes';


@Component({
  selector: 'app-radiation-eleve',
  templateUrl: './radiation-eleve.component.html',
  styleUrls: ['./radiation-eleve.component.scss'],
})
export class RadiationEleveComponent {

  dataSourceElevesByClass!: any;
  dataSourceEleveRadia!:any

  displayedColumns = [
    'CodeEleve',
    'Fr_Nom',
    'Fr_Prenom',
    'IDCLASSES',
    'cocher',
  ];

  displayedColumns1 = [
    'CodeEleve',
    'Fr_Nom',
    'Fr_Prenom',
    'IDCLASSES',
    'cocher'
  ];
  classList!: Classe[];
  isLoadingeleveByclass!: boolean;
  isloadingeleveradia!:boolean
  isloadingrepriseeleve!:boolean
  isloading!: boolean;
  IDCLASSES!: string;
  IDELEVE!: number;
  EtatELEVE: number = 0;
  IDELEVEReprise!: number ;
  idCliqueAuPrealable!:number
  dateDeRadiation!: string;
  Nom!: string;
  Fr_Nom!:string
  selectedClassID!: number;
  element: any;
  IDELEVE_FROM_PARAM!: number;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    public _location: Location,
    private classeService: ClasseService,
    public globalService: GlobalService,
    private eleveService: EleveService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.IDELEVE_FROM_PARAM = this.route.snapshot.params['IDELEVE'];
    this.loaclasse()
    this.eleve()
    this.eleveRadia()
    this.initialiserDateActuelle()
  }

  MotifRadiation: string = '';
  options = [
    'Changement d\'état',
    'Changement de classe',
    'Changement de bourse',
    'Changement de branche',
    'Changement d\'établissement',
    'Attestation de réussite',
    'Arrêt des études',
    'Expulsion',
  ];

  filterOptions() {
    return this.options.filter(option =>
      option.toLowerCase().includes(this.MotifRadiation.toLowerCase())
    );
  }

  resetAutocomplete() {
    this.MotifRadiation = '';
  }

  hovering: boolean = false;

  showMessage(value: boolean) {
  this.hovering = value;
}


  initialiserDateActuelle() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    this.dateDeRadiation = yyyy + '-' + mm + '-' + dd;
  }

  loaclasse() {
    this.classeService.get().subscribe(
      (data) => {
        console.log(data);
        this.classList = data;
      }
    );
  }

  eleve() {
    this.isLoadingeleveByclass = true;
    this.eleveService.getelevesByClasseSelected(0,this.IDCLASSES).pipe(
      map(res => res.body),
      map((data: Eleve[]) => {
        if(this.IDELEVE_FROM_PARAM && this.IDELEVE_FROM_PARAM > 0){
          const result = data.filter(elt => elt.IDELEVE == this.IDELEVE_FROM_PARAM)
          if(result.length > 0){
            this.checkLineEleve(result[0])
            return result
          }
        }
        return data;
      }),
      tap(data => {
        this.isLoadingeleveByclass = false;
        console.log(data);
        this.dataSourceElevesByClass = new MatTableDataSource(data);
      }),
      finalize(() => {
        this.isLoadingeleveByclass = false;
      })
    ).subscribe()
  }

  eleveRadia() {
    this.isloadingeleveradia = true;
    this.eleveService.getListEleveRadia().subscribe(
      (data) => {
        this.isloadingeleveradia = false;
        console.log(data);
        this.dataSourceEleveRadia = new MatTableDataSource(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  getClasse(classeID: string): string {
    const classe = this.classList.find((item) => item.IDCLASSES === classeID);
    return classe ? classe.CodeClasse : '';
  }

  onSelectionChange(event: any) {
    this.IDELEVE_FROM_PARAM = 0
    this.IDELEVE = 0
    this.IDCLASSES = event.target.value;
    this.eleve()
  }

  checkLineEleve(element: Eleve) {
    const eleveID = element.IDELEVE;
    this.IDELEVE = eleveID;
    this.Fr_Nom = element.Fr_Nom
  }

  checkLineEleveReprise(element: any) {
    console.log(element);
    const eleveID = element.IDELEVE;
    this.IDELEVEReprise = eleveID;
    this.Nom = element.Fr_Nom
    this.idCliqueAuPrealable = eleveID
    console.log(this.IDELEVEReprise);
    this.RepriseEleve()
  }


  RepriseEleve(){
      if(this.IDELEVEReprise > 0 ){
        const dialog = this.dialog.open(AlertComponent)
        dialog.componentInstance.content = "Voulez-vous reprendre l'élève " + this.Nom + " ?"

        dialog.afterClosed().subscribe((result)=>{
          this.isloadingrepriseeleve = true
          console.log(result)
          if(result){
            this.eleveService.RepriseEleve(this.IDELEVEReprise,1).subscribe((data)=>{
              console.log(data)
              this.isloadingrepriseeleve = false
              this.eleveRadia()
              this.eleve()
            })
          }
        })
      }else{
        const ref = this.dialog.open(AlertComponent);
        ref.componentInstance.content =
          'Veuillez selectionner un élève radié';
      }
  }


  applyFilter(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceEleveRadia.filter = value.trim().toLowerCase();
  }

  applyFilterEleve(filterValue: any) {
    const value = filterValue.target.value;
    this.dataSourceElevesByClass.filter = value.trim().toLowerCase();
  }


  DeleteDefinitive(){
    this.EtatELEVE = etatELeve.SUPPRESSION_DEFINITIVE
  }

  DeleteConservationDossier(){
    this.EtatELEVE = etatELeve.SUPPRESSION_AVEC_CONSERVATION
  }


  convertToValideDate(DateRadiation: string) {
    const year = DateRadiation.split('-')[0];
    const month = DateRadiation.split('-')[1];
    const day = DateRadiation.split('-')[2];
    const formattedDate = `${year}${day}${month}`;
    return formattedDate;
  }


  onSubmitForm(form: NgForm) {

    const Radiation: RadiationEleve = form.value;
    Radiation.dateDeRadiation = this.convertToValideDate(this.dateDeRadiation)

    if (this.IDELEVE > 0 && this.EtatELEVE != 0) {
      const dialog = this.dialog.open(AlertComponent);
      dialog.componentInstance.content = '<h2>Voulez-vous radié l\'élève ' + this.Fr_Nom + " ? </h2>";
      dialog.afterClosed().subscribe((result) => {
        if (result) {
          this.isloading = true;
          console.log(this.IDELEVE, this.EtatELEVE);
          this.eleveService
            .RadiationEleve(this.IDELEVE, this.EtatELEVE, Radiation)
            .subscribe((data) => {
              console.log(data);
              console.log(Radiation)
              this.isloading = false;
              this.eleve()
              this.eleveRadia()
              this.globalService.toastShow(
                'Votre operation a été effectué  avec succès',
                'Succès',
                'success'
              );
            });
        }
      });
    } else {
      const ref = this.dialog.open(AlertComponent, {maxWidth: "460px"});
      ref.componentInstance.content =
        '<h2>Veuillez selectionner un élève à radié et precisez la radiation avec ou sans conservation du dossier</h2>';
    }
  }
}
