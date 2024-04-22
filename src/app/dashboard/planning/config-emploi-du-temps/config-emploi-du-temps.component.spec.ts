import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigEmploiDuTempsComponent } from './config-emploi-du-temps.component';

describe('ConfigEmploiDuTempsComponent', () => {
  let component: ConfigEmploiDuTempsComponent;
  let fixture: ComponentFixture<ConfigEmploiDuTempsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigEmploiDuTempsComponent]
    });
    fixture = TestBed.createComponent(ConfigEmploiDuTempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
