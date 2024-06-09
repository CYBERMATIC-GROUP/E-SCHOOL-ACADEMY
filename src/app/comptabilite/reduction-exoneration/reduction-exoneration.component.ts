import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReductionExoService } from '../services/reduction-exo.service';
import { TabProduitsExonere, reductionExoneration } from '../models/reduction-exo.model';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-reduction-exoneration',
  templateUrl: './reduction-exoneration.component.html',
  styleUrls: ['./reduction-exoneration.component.scss']
})
export class ReductionExonerationComponent implements OnInit {

  isSubmitLoad!: boolean;

  reductionExoByfraisData$!: Observable<any>;
  @Input() IDELEVE!: number;
  @Output() modifiedElementReductionEmitted = new EventEmitter<reductionExoneration[]>();

  @Input()  TauxReductionFraisScolaires: string = ''
  @Input()   MontantReductionFraisScolaires: string = ''
  @Input()  TauxMajorationFraisScolaires: string = ''
  @Input()  MontantMajorationFraisScolaires: string = ''
  @Input()  MontantReductionFraisOccasionnels: string = ''
  @Input()  TauxReductionFraisOccasionnels: string = ''

  tableFraisScolaire!:TabProduitsExonere

  displayedColumns: string[] = [
    'CodeProduit',
    'Libelle',
    'Montant',
    'MontantReduction',
    'MontantMajoration',
    'bExonere',
    'Montant_A_Payer'
  ];
  dataSource!: any;
  selection = new SelectionModel<reductionExoneration>(true, []);
  modifiedElement: reductionExoneration[] = []

  constructor(
    private reductionExoService: ReductionExoService,
    public globalService: GlobalService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
  const  IDELEVE = this.route.snapshot.params['ideleve'];
  console.log(IDELEVE);
  
  this.IDELEVE = IDELEVE
    if (this.IDELEVE) {
      this.reductionExoByfraisData$ = this.reductionExoService.getFraisGestion(this.IDELEVE)
      this.reductionExoByfraisData$.subscribe(data => {
        console.log(data);
        this.TauxMajorationFraisScolaires = data.TauxMajorationFraisScolaires 
        this.TauxReductionFraisScolaires = data.TauxReductionFraisScolaires 
        this.MontantMajorationFraisScolaires = (data.MontantMajorationFraisScolaires)
        this.MontantReductionFraisScolaires = (data.MontantReductionFraisScolaires)
        if(data){
          this.dataSource = new MatTableDataSource<reductionExoneration>(data.tabProduitsExoneres);
        }
      })
    }else{
      console.log('ID INTROUVABLE');
      
    }
      //add element to selected element
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: reductionExoneration): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return ``;
  }

  onInput(element: reductionExoneration, event: any, keyModified: string){
    const val = event.target.value;
    const index = this.dataSource.data.indexOf(element)
    if(index >= 0){
      this.dataSource.data[index][keyModified] = val;
      this.dataSource.data[index].MontantMajoration = 0;
      this.UpdataTableFraisScolaire()
      // const rowAmountInit = Number(this.dataSource.data[index]['Montant']);
      // const reductionAmount =  Number(this.dataSource.data[index]['MontantReduction'])
      // const majorationAmount = Number(this.dataSource.data[index]['MontantMajoration'])
      // const montanApayer = (rowAmountInit - reductionAmount) - majorationAmount;
      // this.dataSource.data[index]['Montant_A_Payer'] = this.dataSource.data[index]['bExonere'] ? 0 : montanApayer;
      //found it if exist
      const indexModified = this.modifiedElement.indexOf(element)
      if(indexModified >= 0){
        this.modifiedElement[indexModified] = this.dataSource.data[index]
      }else{
        this.modifiedElement.push(this.dataSource.data[index])
      }
      this.modifiedElementReductionEmitted.emit(this.modifiedElement)
    }
  }


  formatPrix(prix: any, separateur: any = ' ', device: string = ''): string {
    let reverse: string[] = prix.toString().split('').reverse();
    let prixFormated: any = '';

    for (let i: number = 1; i <= reverse.length; i++) {
      prixFormated += reverse[i - 1];

      if (i % 3 === 0) {
        prixFormated += separateur;
      }
    }

    let formated = prixFormated.split('').reverse().join('');
    let decimal = ',00 ' + device;

    if (formated[0] == separateur) {
      formated = formated.substring(1);
    }
    return formated + decimal;
  }
  
  onInputMajoration(element: reductionExoneration, event: any, keyModified: string){
    const val = event.target.value;
    const index = this.dataSource.data.indexOf(element)
    console.log(val);
    console.log(element);

    if(index >= 0){
      this.dataSource.data[index][keyModified] = val;
      console.log( this.dataSource.data[index][keyModified]);
      this.dataSource.data[index].MontantReduction = 0;
      this.UpdataTableFraisScolaire()
      //  const rowAmountInit = Number(this.dataSource.data[index]['Montant']);
      //  const majorationAmount = Number(this.dataSource.data[index]['MontantMajoration'])
      //  const montanApayer = rowAmountInit + majorationAmount;
      //  this.dataSource.data[index]['Montant_A_Payer'] = this.dataSource.data[index]['bExonere'] ? 0 : montanApayer;
      //found it if exist
      const indexModified = this.modifiedElement.indexOf(element)
      if(indexModified >= 0){
        this.modifiedElement[indexModified] = this.dataSource.data[index]
        console.log(this.modifiedElement);
      }else{
        this.modifiedElement.push(this.dataSource.data[index])
      }
      this.modifiedElementReductionEmitted.emit(this.modifiedElement)
    }
  }

  onCheckout(event: MatCheckboxChange , element: reductionExoneration){
    const index = this.dataSource.data.indexOf(element)
    if(index >= 0){
      this.dataSource.data[index]['bExonere'] = event.checked;
      if(event.checked){
        this.dataSource.data[index]['Montant_A_Payer'] = 0
      }else{
        const rowAmountInit = Number(this.dataSource.data[index]['Montant']);
        const reductionAmount =  Number(this.dataSource.data[index]['MontantReduction'])
        const majorationAmount = Number(this.dataSource.data[index]['MontantMajoration'])
        const montanApayer = (rowAmountInit - reductionAmount) - majorationAmount;
        this.dataSource.data[index]['Montant_A_Payer'] = montanApayer
      }
    }

    const indexModified = this.modifiedElement.indexOf(element)
    if(indexModified >= 0){
      this.modifiedElement[indexModified] = this.dataSource.data[index]
    }else{
      this.modifiedElement.push(this.dataSource.data[index])
    }
    this.modifiedElementReductionEmitted.emit(this.modifiedElement)
  }


  onInputGlobalMajoration(event: any){
    console.log(event.target.value);
    this.MontantMajorationFraisScolaires = event.target.value
    this.TauxMajorationFraisScolaires = '0'
    this.UpdataTableFraisScolaire()
    // this.changeAllCols("MontantMajoration", event.target.value);
  }


  onInputGlobalTauxMajoration(event: any){
    console.log(event.target.value);
    this.TauxMajorationFraisScolaires = event.target.value
    this.MontantMajorationFraisScolaires = '0'
    this.UpdataTableFraisScolaire()
    // this.changeAllCols("MontantReduction", event.target.value)
  }

  onInputGlobalReduction(event: any){
    console.log(event.target.value);
    this.MontantReductionFraisScolaires = event.target.value
    this.TauxReductionFraisScolaires = '0'
    this.UpdataTableFraisScolaire()
    // this.changeAllCols("MontantReduction", event.target.value)
  }

  onInputGlobalTauxReduction(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.TauxReductionFraisScolaires = input.value;
    this.MontantReductionFraisScolaires = '0'; // Met à jour la valeur de MontantReductionFraisScolaires
  }



  UpdataTableFraisScolaire(){
    const table : TabProduitsExonere = {
      IDELEVE: this.IDELEVE,
      TauxReductionFraisScolaires:  this.TauxReductionFraisScolaires,
      MontantReductionFraisScolaires: this.MontantReductionFraisScolaires,
      TauxMajorationFraisScolaires:   this.TauxMajorationFraisScolaires,
      MontantMajorationFraisScolaires: this.MontantMajorationFraisScolaires,
      MontantReductionFraisOccasionnels: '',
      TauxReductionFraisOccasionnels: '',
      tabProduitsExoneres: this.dataSource.data
    }
    this.tableFraisScolaire = table
    console.log(this.tableFraisScolaire);
    
  }

  private changeAllCols(keyCol: string, amount: string){
    for (let i = 0; i < this.dataSource.data.length; i++) {
      const element = this.dataSource.data[i];
      this.dataSource.data[i][keyCol] = amount

      const rowAmountInit = Number(this.dataSource.data[i]['Montant']);
      const reductionAmount =  Number(this.dataSource.data[i]['MontantReduction'])
      const majorationAmount = Number(this.dataSource.data[i]['MontantMajoration'])
      const montanApayer = (rowAmountInit - reductionAmount) - majorationAmount;
      
      this.dataSource.data[i]['Montant_A_Payer'] = this.dataSource.data[i]['bExonere'] ? 0 : montanApayer;
    }
    this.modifiedElement = this.dataSource.data;
    this.modifiedElementReductionEmitted.emit(this.modifiedElement);
  }


  onSubmit(){
    this.isSubmitLoad = true;
    console.log(this.tableFraisScolaire);
        this.reductionExoService.editFrais(this.tableFraisScolaire).subscribe(data => {
         console.log(data);
         this.dataSource = new MatTableDataSource<reductionExoneration>(data.tabProduitsExoneres);
           this.globalService.toastShow("Frais mis à jour !", "Modification frais " );
           this.isSubmitLoad = false;
         })


    // for (let i = 0; i < this.modifiedElement.length; i++) {
    //   this.isSubmitLoad = true
    //   const element = this.modifiedElement[i];
    //   console.log(element);
    //    this.reductionExoService.editFrais(element).subscribe(data => {
    //      this.globalService.toastShow("Frais " + element.CodeProduit + " mis à jour !", "Modification frais " + element.CodeProduit);
    //      this.isSubmitLoad = false;
    //    })
    // }
  }
}
