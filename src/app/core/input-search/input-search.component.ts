import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {
  formElt!: FormGroup;
  @Input() dataList$!: Observable<any[]>;
  @Input() labelInput!: string;
  @Input() defaultKeyText!: string; //key label default from datalist
  @Input() defaultKeyId!: number; //key id default from datalist
  @Input() validators!: any[];
  @Input() keyText!: string
  @Input() keyID!: string
  @Output() idEltEmitted = new EventEmitter<number>;
  @Output() labelEmitted = new EventEmitter<string>;
  @Output() isValidated = new EventEmitter<boolean>;
  @Input() openDialofForAdd!: Function

  constructor(
    public globalService: GlobalService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
      this.formElt = this.formBuilder.group({
          label: [this.defaultKeyText],
          id: [this.defaultKeyId, this.validators]
      });

      this.formElt.get('id')?.valueChanges.subscribe((value) => {
        this.idEltEmitted.emit(value)
      })

      this.formElt.get('label')?.valueChanges.subscribe((value) => {
        this.labelEmitted.emit(value)
      })

      this.formElt.valueChanges.subscribe((value) => {
        console.log(value)
      })
  }

}
