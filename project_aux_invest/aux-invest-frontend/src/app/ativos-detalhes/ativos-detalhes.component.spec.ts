import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivosDetalhesComponent } from './ativos-detalhes.component';

describe('AtivosDetalhesComponent', () => {
  let component: AtivosDetalhesComponent;
  let fixture: ComponentFixture<AtivosDetalhesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtivosDetalhesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivosDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
