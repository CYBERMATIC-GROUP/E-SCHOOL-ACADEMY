import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmploiDuTempsComponent } from './table-emploi-du-temps.component';

describe('TableEmploiDuTempsComponent', () => {
  let component: TableEmploiDuTempsComponent;
  let fixture: ComponentFixture<TableEmploiDuTempsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableEmploiDuTempsComponent]
    });
    fixture = TestBed.createComponent(TableEmploiDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
