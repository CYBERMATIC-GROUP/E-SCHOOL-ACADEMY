import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Observable, tap } from 'rxjs';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-students-by-class',
  templateUrl: './students-by-class.component.html',
  styleUrls: ['./students-by-class.component.scss']
})
export class StudentsByClassComponent implements AfterViewInit, OnInit {
  @ViewChild('chartCanvasEleves') chartCanvasEleves!: ElementRef;
  @Input() title = 'Total élèves par classe';
  @Input() keyCount!: string;
  @Input() keyLabel!: string;
  @Input() keyGirl!: string;
  @Input() statsObj!: any;
  @Input() headTitle!: string;

  constructor(
    private classService: ClasseService
  ){}
  
  ngAfterViewInit() {
    const stat = this.statsObj;

    const data2 = {
      labels: stat.map((res:any) => res[this.keyLabel]),
      datasets: [{
          label: "Effectif total",
          data: stat.map((res: any) => res[this.keyCount]),
          backgroundColor: [
            'rgba(0, 0, 255, 1)',
          ],
          borderWidth: 0
        },
        {
          label: "Total filles",
          data: stat.map((res: any) => res['nNbreFemme']),
          backgroundColor: [
            'rgba(0, 255, 0, 1)',
          ],
          borderWidth: 0
        }
      ]
    };

    const stackedBar = new Chart(this.chartCanvasEleves.nativeElement.getContext('2d'), {
      type: 'bar',
      data: data2,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
      });
 
  }

  ngOnInit(): void {
    if(!this.statsObj){
      this.classService.getClassState().pipe(
        tap(res => {
          this.statsObj = res
          this.keyCount = 'nNbreEleve';
          this.keyLabel = 'CodeClasse';
          this.headTitle = 'Elèves par classe';
        })
      )
    }

  }
}

