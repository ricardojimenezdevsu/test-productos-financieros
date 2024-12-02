import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialProductFormComponent } from './financial-product-form.component';

describe('FinancialProductFormComponent', () => {
  let component: FinancialProductFormComponent;
  let fixture: ComponentFixture<FinancialProductFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinancialProductFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancialProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
