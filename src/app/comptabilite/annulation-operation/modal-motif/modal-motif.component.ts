import { Component,Input,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AnnulationoperationService } from 'src/app/services/annulationoperation.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { NgForm } from '@angular/forms';
import { AnnulationMouvement } from 'src/app/models/listemouvement.model';
import { AlertComponent } from 'src/app/core/alert/alert.component';

@Component({
  selector: 'app-modal-motif',
  templateUrl: './modal-motif.component.html',
  styleUrls: ['./modal-motif.component.scss']
})
export class ModalMotifComponent {

  RaisonAnnulation!:string
  isModalmodificationCall: boolean=false

  @Input() numeroMouvement!:number
  @Input() IDMOUVEMENT!:number


  
  form!: NgForm;

  constructor(
    private router:Router,
    public dialog: MatDialog,
    public _location:Location,
    private annulationOperationService:AnnulationoperationService
  ) { }

  ngOnInit(): void {
    console.log(this.IDMOUVEMENT)
   
 }


 onSubmitForm(form:NgForm){
  const raisonannulation: AnnulationMouvement = form.value;
  console.log(raisonannulation)
    this.annulationOperationService.AnnuleMouvement(this.IDMOUVEMENT,raisonannulation).subscribe((data)=>{
      console.log(data)
    })
   }
 }


