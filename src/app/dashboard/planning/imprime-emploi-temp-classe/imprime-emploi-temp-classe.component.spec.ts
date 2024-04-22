import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprimeEmploiTempClasseComponent } from './imprime-emploi-temp-classe.component';

describe('ImprimeEmploiTempClasseComponent', () => {
  let component: ImprimeEmploiTempClasseComponent;
  let fixture: ComponentFixture<ImprimeEmploiTempClasseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImprimeEmploiTempClasseComponent]
    });
    fixture = TestBed.createComponent(ImprimeEmploiTempClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
