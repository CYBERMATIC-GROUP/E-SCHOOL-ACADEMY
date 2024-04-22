import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-select-date',
  templateUrl: './select-date.component.html',
  styleUrls: ['./select-date.component.scss']
})
export class SelectDateComponent implements OnInit {
  dateBegin!: string;
  dateEnd!: string;
  @Output() dateBeginEmit = new EventEmitter<string>();
  @Output() dateEndEmit = new EventEmitter<string>();
  @Input() intervalDays: number = 7;

  constructor(
    private globalService: GlobalService
  ){}

  ngOnInit(): void {
    this.setdateDebut();
    this.setdateFin()
  }

  setdateFin(){
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    this.dateEnd = `${year}-${month}-${day}`;
    this.dateEndEmit.emit(this.globalService.convertToValideDates(this.dateEnd))
  }

  setdateDebut(){
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - this.intervalDays * 24 * 60 * 60 * 1000);

    const year = sevenDaysAgo.getFullYear();
    const month = ('0' + (sevenDaysAgo.getMonth() + 1)).slice(-2);
    const day = ('0' + sevenDaysAgo.getDate()).slice(-2);

    this.dateBegin = `${year}-${month}-${day}`;
    this.dateBeginEmit.emit(this.globalService.convertToValideDates(this.dateBegin))
  }

  onChangeDate(event: any, type: 'begin' | 'end'){
    let dateSelected = event.target.value
    this.checkDateGreatThanToday(dateSelected)
    dateSelected = this.globalService.convertToValideDates(dateSelected)
    if (type == 'begin')
      this.dateBeginEmit.emit(dateSelected)
    else
      this.dateEndEmit.emit(dateSelected)
  }

  checkDateGreatThanToday(dateParam: string) {
    const selectedDate = new Date(dateParam);
    const currentDate = new Date();
    if (selectedDate.getTime() > currentDate.getTime()) {
      const content = "La date sélectionnée est ultérieure à la date d'aujourd'hui.";
      this.globalService.toastShow(content, "Attention", "error");
      this.dateBegin = this.globalService.getCurrentDateForInput();
      this.dateEnd = this.dateBegin;
    }
  }
}
