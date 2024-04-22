import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConfigEmploiComponent } from './table-config-emploi.component';

describe('TableConfigEmploiComponent', () => {
  let component: TableConfigEmploiComponent;
  let fixture: ComponentFixture<TableConfigEmploiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableConfigEmploiComponent]
    });
    fixture = TestBed.createComponent(TableConfigEmploiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
