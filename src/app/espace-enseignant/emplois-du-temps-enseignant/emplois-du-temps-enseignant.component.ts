import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { responseEmploiDuTemps } from 'src/app/core/models/emploi-du-temps.models';

@Component({
  selector: 'app-emplois-du-temps-enseignant',
  templateUrl: './emplois-du-temps-enseignant.component.html',
  styleUrls: ['./emplois-du-temps-enseignant.component.scss']
})
export class EmploisDuTempsEnseignantComponent implements OnInit {
  @Input() asChildren!: boolean;
  @Input() dataSource!: responseEmploiDuTemps

  constructor(
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
      this.route.data.pipe(
        tap(res => {
          console.log(res)
          this.dataSource = res['resEmploisDuTemps']
          console.log(res['resEmploisDuTemps']);

        })
      ).subscribe()
  }
}
