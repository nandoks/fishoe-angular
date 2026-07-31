import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinateMapComponent } from './coordinate-map.component';

describe('CoordinateMapComponent', () => {
  let component: CoordinateMapComponent;
  let fixture: ComponentFixture<CoordinateMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinateMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinateMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
