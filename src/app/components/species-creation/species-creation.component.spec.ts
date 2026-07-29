import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesCreationComponent } from './species-creation.component';

describe('SpeciesCreationComponent', () => {
  let component: SpeciesCreationComponent;
  let fixture: ComponentFixture<SpeciesCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
