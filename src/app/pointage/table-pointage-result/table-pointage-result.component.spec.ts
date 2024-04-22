import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePointageResultComponent } from './table-pointage-result.component';

describe('TablePointageResultComponent', () => {
  let component: TablePointageResultComponent;
  let fixture: ComponentFixture<TablePointageResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablePointageResultComponent]
    });
    fixture = TestBed.createComponent(TablePointageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
