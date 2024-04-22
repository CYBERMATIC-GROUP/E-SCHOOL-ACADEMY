import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, map, tap } from 'rxjs';
import { Compte } from 'src/app/models/compte.model';
import { GlobalService } from '../../services/global.service';
import { ProduitService } from './produit.service';
import { ProduitFrais } from './produit.model';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss']
})
export class ProduitFormComponent implements OnInit {
  pageTitle!: string;
  action!: 'voir' | 'modification' | 'creation';
  id!: number;
  produitForm!: FormGroup
  compteAssocies$!: Observable<Compte[]>
  isLaoding!: boolean

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    public globalService: GlobalService,
    private produitService: ProduitService,
    private router: Router
  ){}

  ngOnInit(): void {
      this.action = this.route.snapshot.params['action'];
      this.id = this.route.snapshot.params['id']

      if (this.action == 'voir'){
        this.pageTitle = 'Voir le produit'
      }
      else if(this.action == 'creation'){
        this.pageTitle = "Ajout d'un nouveau produit"
      }
      else if (this.action == 'modification'){
        this.pageTitle = "Modification d'un produit"
      }


      this.compteAssocies$ = this.route.data.pipe(
        map(data => data['compteAssocies'])
      )


      this.initForm()
  }

  initForm(){
    this.produitForm = this.formBuilder.group({
      IDPRODUIT: [null],
      CodeProduit: [null, Validators.required],
      LibelleProduit_Fr: [null, Validators.required],
      Occasionnel: [null, Validators.required],
      NumOrdre: [null],
      Montant: [null, Validators.required],
      ObligatoireInscription: [null],
      DateEcheance: [null],
      CompteAssocie: [null],
      NouveauxEleves: [null],
      ElevesInternes: [null],
      AnciensEleves: [null],
      AccepteReduction: [null],
      AccepteMajoration: [null],
      LiasseDebit: [null],
      LiasseCredit: [null],
      tabReductionsFratrie: [null],
      TauxTVA: [null],
      ObligatoirePourDocuments: [null],
      ElevesDemiPensionnaires: [null],
    })

    if ((this.action == "voir" || this.action == "modification") && this.id > 0){
      this.isLaoding = true
      this.produitService.getOne(this.id).pipe(
        tap(res => {
          console.log(res);
          this.produitForm.patchValue(res)
        }),
        finalize(() => {
          this.isLaoding = false
        })
      ).subscribe()
    }
  }

  onSubmit(){
    this.isLaoding = true;
    const produit: ProduitFrais = this.produitForm.value;

    if (this.action == "modification"){
      this.produitService.update(produit).pipe(
        tap(res => {
          this.globalService.toastShow("Produit ajouté avec succès", "Ajout", 'success')
        }),
        finalize(() => {
          this.isLaoding = false;
          this.router.navigate(['/produit-frais/liste'])
        })
      ).subscribe()
    }else{
      this.produitService.create(produit).pipe(
        tap(res => {
          this.globalService.toastShow("Produit créé avec succès", "Modification", 'success')
        }),
        finalize(() => {
          this.isLaoding = false;
          this.router.navigate(['/produit-frais/liste'])
        })
      ).subscribe()
    }
  }

  openDialofForAdd(){

  }
}
