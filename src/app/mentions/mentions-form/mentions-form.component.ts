import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Niveau } from 'src/app/models/niveau.model';
import { NiveauService } from 'src/app/services/niveau.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/services/global.service';
import { MentionService } from 'src/app/services/mention.service';
import { Mentions } from 'src/app/models/mentions.model';
import { ColorpickerComponent } from 'src/app/dashboard/parametre/personalisation-document/bulletin/colorpicker/colorpicker.component';

@Component({
  selector: 'app-mentions-form',
  templateUrl: './mentions-form.component.html',
  styleUrls: ['./mentions-form.component.scss'],
})
export class MentionsFormComponent {

  @Input() action!: 'create' | 'edit' | 'view';

  IDMENTIONS!: number;
  MoyenneMinimale!: number;
  TypeMention!: number;
  Mention!:string
  Couleur!: string;
  ColordefinitiveFondgroupMatiere!: string;

  isLoading!: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private mentionService: MentionService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    if (this.IDMENTIONS) {
      this.initForUpdate(this.IDMENTIONS);
    }
    console.log(this.IDMENTIONS);
    console.log(this.action);
  }
  initForUpdate(mentionID: number) {
    this.isLoading = true;
    this.mentionService.getOne(mentionID).subscribe((data) => {
      console.log(data);
      this.IDMENTIONS = data.IDMENTIONS;
      this.MoyenneMinimale = data.MoyenneMinimale;
      this.TypeMention = data.TypeMention
      this.Couleur = data.Couleur;
      this.Mention = data.Mention
      this.ColordefinitiveFondgroupMatiere = this.Couleur
      this.isLoading = false;
    });
  }
  openColorPickerDialogGroupeMatiere() {
    const dialog = this.dialog.open(ColorpickerComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.ColordefinitiveFondgroupMatiere =
        dialog.componentInstance.colorSelected;
      }
    });
  }

  onSubmitForm(form: NgForm) {
    const mentions: Mentions = form.value;
    mentions.IDMENTIONS = this.IDMENTIONS;
    mentions.Couleur = this.ColordefinitiveFondgroupMatiere;
    console.log(mentions);
    this.isLoading = true;
    if (this.action === 'edit') {
      this.mentionService
        .update(mentions)
        .pipe(
          tap((res) => {
            console.log(res);
            this.globalService.toastShow(
              'mention modifiée avec succès.',
              'Modification:'
            );
            this.globalService.reloadComponent('/mentions');
            this.dialog.closeAll();
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    } else {
      this.mentionService
        .create(mentions)
        .pipe(
          tap((res) => {
            console.log(res);
            this.globalService.toastShow(
              'mention ajoutée avec succès.',
              'Ajout:'
            );
            this.globalService.reloadComponent('/mentions');
            this.dialog.closeAll();
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe();
    }
  }
}
