import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauEmlpoiDuTempsComponent } from './tableau-emlpoi-du-temps.component';

describe('TableauEmlpoiDuTempsComponent', () => {
  let component: TableauEmlpoiDuTempsComponent;
  let fixture: ComponentFixture<TableauEmlpoiDuTempsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableauEmlpoiDuTempsComponent]
    });
    fixture = TestBed.createComponent(TableauEmlpoiDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
