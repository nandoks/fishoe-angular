import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('DetailComponent', () => {
  let component: DetailFormComponent;
  let fixture: ComponentFixture<DetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
