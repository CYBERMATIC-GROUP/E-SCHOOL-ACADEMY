
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EleveService } from 'src/app/services/eleve.service';
import { GlobalService } from 'src/app/services/global.service';
import { UpdateDocumentPersonnaliser } from 'src/app/models/documentpersonnaliser.model';
import { MatDialog } from '@angular/material/dialog';
import { QuillEditorComponent } from 'ngx-quill';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-personnalisation-certificat',
  templateUrl: './personnalisation-certificat.component.html',
  styleUrls: ['./personnalisation-certificat.component.scss']
})

export class PersonnalisationCertificatComponent {
  typecertificat!: number;
  typepersonne!: number;
  Titre!: string;
  TitrePage:string = ""
  content!:string;
  isLoading!:boolean
  isloadingpage!:boolean
  balises: string[] = []; 
  quill: any;
  cursorPosition: number = 0;
  cursorPositionBefore!: number;
  doubleClickedWord: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    private eleveService: EleveService,
    private dialog: MatDialog
  ) {}

  @ViewChild('quillEditor') quillEditor?: QuillEditorComponent;

  ngOnInit(): void {
    const typecertificat = this.route.snapshot.params['typecertificat'];
    const typepersonne = this.route.snapshot.params['typepersonne'];
    this.typecertificat = typecertificat;
    this.typepersonne = typepersonne;
    this.readMessagebytypecertificatandpersonne();
    this.getDocumentPersonnaliser();  
    this.getBalises()
  }

getBalises() {
  this.isloadingpage = true;
  this.eleveService.getbalises().subscribe((data) => {
    this.isloadingpage = false;
    this.balises = data.map((item: { NomBalise: string; }) => item.NomBalise);
  });
}

onContentChange(newContent: string) {
  this.content = newContent;
  console.log(this.content);
}

selectBalise(value: string) {
  if (this.doubleClickedWord) {
    const indexToRemove = this.cursorPosition;
    const lengthToRemove = this.doubleClickedWord.length;
    this.quill.deleteText(indexToRemove, lengthToRemove, 'user');
    this.quill.insertText(indexToRemove, value, 'user');
    const newIndex = indexToRemove + value.length;
    this.quill.setSelection(newIndex, 0, 'user');

  } else {
    this.quill.insertText(this.cursorPosition, value, 'user');
    const newIndex = this.cursorPosition + value.length;
    this.quill.setSelection(newIndex, 0, 'user');
  }
}
private setupDoubleClickListener(): void {
  if (this.quill) {
    this.quill.container.addEventListener('dblclick', (event: { target: HTMLElement; }) => {
      const target = event.target as HTMLElement;
      const selection = this.quill.getSelection();
      if (selection && selection.length > 0) {
        this.cursorPosition = selection.index;
        this.doubleClickedWord = this.quill.getText(this.cursorPosition, selection.length);
        console.log(this.doubleClickedWord);
      }
    });
  }
}

onEditorCreated(quill: any) {
  this.quill = quill;
  this.setupDoubleClickListener()
}

onEditorInput() {
  if (this.quill) {
    const selection = this.quill.getSelection();
    if (selection) {  
      const cursorPosition = selection.index;
      this.cursorPosition = cursorPosition   
      console.log(this.cursorPosition);
       
    }
  }
}

  readMessagebytypecertificatandpersonne() {
    //garcons
    if (this.typepersonne == 1 && this.typecertificat == 1) {
      this.Titre = 'Personnaliser le texte des certificats de Scolarité pour les garçons';
    }
    if (this.typepersonne == 1 && this.typecertificat == 2) {
      this.Titre = 'Personnaliser le texte des certificats de Fréquentation pour les garçons';
    }
    if (this.typepersonne == 1 && this.typecertificat == 3) {
      this.Titre = "Personnaliser le texte des certificats de d'Inscription pour les garçons";
    }
    //filles
    if (this.typepersonne == 2 && this.typecertificat == 1) {
      this.Titre = 'Personnaliser le texte des certificats de Scolarité pour les filles';
    }
    if (this.typepersonne == 2 && this.typecertificat == 2) {
      this.Titre = 'Personnaliser le texte des certificats de Fréquentation pour les filles';
    }
    if (this.typepersonne == 2 && this.typecertificat == 3) {
      this.Titre = "Personnaliser le texte des certificats de d'Inscription pour les filles";
    }
    //garcons et filles
    if (this.typepersonne == 0 && this.typecertificat == 1) {
      this.Titre = "Personnaliser le texte des certificats de Scolarité pour les garçons et filles";
    }
    if (this.typepersonne == 0 && this.typecertificat == 2) {
      this.Titre = "Personnaliser le texte des certificats de Fréquentation pour les garçons et filles";
    }
    if (this.typepersonne == 0 && this.typecertificat == 3) {
      this.Titre = "Personnaliser le texte des certificats d'Inscription pour les garçons et filles";
    }
  }

  getDocumentPersonnaliser() {  
    this.isloadingpage = true  
    this.eleveService
      .getDocumentPersonnaliser(
        this.typecertificat,
        this.typepersonne,
        1
      )
      .subscribe((data) => {
        this.isloadingpage = false
        this.content = data.body.Contenu;
        this.TitrePage = data.body.Titre        
      });
  }

  UpdateData(){
    const ObjectUpdatesend : UpdateDocumentPersonnaliser = {
      Contenu: this.content,
      Titre: this.TitrePage,
      NomPametre:this.typecertificat,
      nGenre: this.typepersonne,
      bEnHTML: 1
    } 
    this.isLoading = true
    this.eleveService.updateDocumentPersonnaliser(ObjectUpdatesend).pipe(
      tap(data => {
        console.log(data);
        this.isLoading = false
        this.globalService.toastShow("Modification effectuée avec succès","Modification")
      }),
      finalize(() => {
        this.isLoading = false
      })
    ).subscribe()
  }
}
