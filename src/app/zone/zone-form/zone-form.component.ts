import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { Zone } from 'src/app/models/zone.model';
import { ZoneService } from 'src/app/services/zone.service';
import { MatDialog } from '@angular/material/dialog';
import { Departement } from 'src/app/models/departement.model';
import { DepartementService } from 'src/app/services/departement.service';
import { Arrondissement } from 'src/app/models/arrondissement.model';
import { ArrondissementService } from 'src/app/services/arrondissement.service';
import { QuartierService } from 'src/app/services/quartier.service';
import { GlobalService } from 'src/app/services/global.service';
import { finalize, tap } from 'rxjs';


@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent {

  @Input() action !: "create" | "edit" | "view"

  IDZone!: number
  CodeZone!: string
  NomZone!: string
  IDDEPARTEMENT!: number
  IDARRONDISSEMENT!: number
  NomArron!: string
  NomDepartement!: string
  isLoading!: boolean;

  ArrondissementList!:Arrondissement[]
  DeppartementList!:Departement[]

  isFormValid(): any {
    return this.CodeZone && this.NomZone;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    public dialog: MatDialog,
    private zoneService:ZoneService,
    private departementService:DepartementService,
    private arrondissementService:ArrondissementService,
    private quartier :QuartierService,
    private globalService:GlobalService
  ) {}
  
  ngOnInit(): void {
  
  
    if (this.IDZone) {
      
      this.initForUpdate(this.IDZone)
   }
    console.log(this.IDZone);
    console.log(this.action)
  
    this.loadArrondissement()
    this.loadDepartement()
  }
  
  

  onSelectionChange(event : any){
    console.log(event.target.value)
    this.quartier.Recuperations(this.IDDEPARTEMENT).subscribe((data)=>{
      console.log(data)
      this.ArrondissementList= data.body
    },
    (error) =>{
      console.log(error)
    }
    )
  }

  loadDepartement() {
    this.departementService
      .get().subscribe(
        (data) => {
          console.log(data);
          this.DeppartementList = data;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  loadArrondissement() {
    this.arrondissementService
      .get(0).subscribe(
        (data) => {
          console.log(data);
          this.ArrondissementList = data.body;
        },
        (error) => {
          console.log(error);
        }
      );
  }
  initForUpdate(zoneID: number) {
    this.zoneService.getOne(zoneID).subscribe((data) => {
      console.log(data);
  
      this.CodeZone = data.CodeZone
      this.NomZone = data.NomZone
      this.IDDEPARTEMENT = data.IDDEPARTEMENT
      this.IDARRONDISSEMENT = data.IDARRONDISSEMENT

    });
  }
  
  onSubmitForm(form: NgForm) {
  
    const zone: Zone = form.value;
    zone.IDZone = this.IDZone
    console.log(zone)

    if (this.action === 'edit') {
      this.zoneService.update(zone).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Zone modifié.", "Modification")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    } else {
    
      this.zoneService.create(zone).pipe(
        tap(data => {
          this.dialog.closeAll()
          this.globalService.toastShow("Nouvelle Zone Ajouté.", "Ajout")
        }),
        finalize(() => {
          this.isLoading = false
        })
      ).subscribe()
    }
  }

}
