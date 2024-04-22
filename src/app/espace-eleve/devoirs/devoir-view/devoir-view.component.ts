import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { DevoirEnseignant } from 'src/app/models/devoirs.model';
import { EnseignantService } from 'src/app/services/enseignant.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-devoir-view',
  templateUrl: './devoir-view.component.html',
  styleUrls: ['./devoir-view.component.scss']
})
export class DevoirViewComponent implements OnInit {
  devoir$!: Observable<DevoirEnseignant>
  Sujet!: string;
  quillEditorOptions!: any
  isUpload!: boolean;
  quillModules = {
    toolbar: [
    ],
  };

  constructor(
    private enseignantService: EnseignantService,
    private route: ActivatedRoute,
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.devoir$ = this.enseignantService.getOneDevoirsEnseignants(id).pipe(
      tap(res => {
        this.Sujet = res.Sujet;
        console.log(res);
        
      })
    )

    this.quillEditorOptions = {
      modules: {
        toolbar: false,
      },
      readOnly: true,
      theme: 'bubble',
    };
  }

  onOpenPdf(pdf: string){
    console.log(pdf);
    
    this.globalService.printFile(pdf, "Devoirs")
  }
}
