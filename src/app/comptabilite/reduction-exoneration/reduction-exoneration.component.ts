import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReductionExoService } from '../services/reduction-exo.service';
import { reductionExoneration } from '../models/reduction-exo.model';
import { Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalService } from 'src/app/services/global.service';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
  selector: 'app-reduction-exoneration',
  templateUrl: './reduction-exoneration.component.html',
  styleUrls: ['./reduction-exoneration.component.scss']
})
export class ReductionExonerationComponent implements OnInit {

  isSubmitLoad!: boolean;
  reductionExoByfraisData$!: Observable<reductionExoneration[]>;
  @Input() IDELEVE!: number;
  @Output() modifiedElementReductionEmitted = new EventEmitter<reductionExoneration[]>();

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
    public globalService: GlobalService
  ){}

  ngOnInit(): void {
      this.reductionExoByfraisData$ = this.reductionExoService.getFraisGestion(this.IDELEVE)

      this.reductionExoByfraisData$.subscribe(data => {
        if(data){
          console.log(data);
          this.dataSource = new MatTableDataSource<reductionExoneration>(data);
        }
      })

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

      const rowAmountInit = Number(this.dataSource.data[index]['Montant']);
      const reductionAmount =  Number(this.dataSource.data[index]['MontantReduction'])
      const majorationAmount = Number(this.dataSource.data[index]['MontantMajoration'])
      const montanApayer = (rowAmountInit - reductionAmount) - majorationAmount;
      
      this.dataSource.data[index]['Montant_A_Payer'] = this.dataSource.data[index]['bExonere'] ? 0 : montanApayer;

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

  onInputMajoration(element: reductionExoneration, event: any, keyModified: string){
    const val = event.target.value;
    const index = this.dataSource.data.indexOf(element)

    if(index >= 0){
      
      this.dataSource.data[index][keyModified] = val;

      const rowAmountInit = Number(this.dataSource.data[index]['Montant']);
      const majorationAmount = Number(this.dataSource.data[index]['MontantMajoration'])
      const montanApayer = rowAmountInit + majorationAmount;
      
      this.dataSource.data[index]['Montant_A_Payer'] = this.dataSource.data[index]['bExonere'] ? 0 : montanApayer;

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
    this.changeAllCols("MontantMajoration", event.target.value);
  }

  onInputGlobalReduction(event: any){
    this.changeAllCols("MontantReduction", event.target.value)
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
    for (let i = 0; i < this.modifiedElement.length; i++) {
      this.isSubmitLoad = true
      const element = this.modifiedElement[i];
      this.reductionExoService.editFrais(element).subscribe(data => {
        this.globalService.toastShow("Frais " + element.CodeProduit + " mis à jour !", "Modification frais " + element.CodeProduit);
        this.isSubmitLoad = false;
      })
    }
  }
}
