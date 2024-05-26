import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatistiqueByDisciplineComponent } from './statistique-by-discipline.component';

describe('StatistiqueByDisciplineComponent', () => {
  let component: StatistiqueByDisciplineComponent;
  let fixture: ComponentFixture<StatistiqueByDisciplineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatistiqueByDisciplineComponent]
    });
    fixture = TestBed.createComponent(StatistiqueByDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
