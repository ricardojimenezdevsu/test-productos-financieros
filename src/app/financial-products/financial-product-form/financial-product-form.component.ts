import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { BpService } from '../../api/bp.service';

@Component({
  selector: 'app-financial-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './financial-product-form.component.html',
  styleUrl: './financial-product-form.component.css',
})
export class FinancialProductFormComponent implements OnInit {
  productForm = new FormGroup({
    id: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(10)],
      asyncValidators: [this.validateUniqueId()],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [Validators.minLength(5), Validators.maxLength(100)],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [Validators.minLength(10), Validators.maxLength(200)],
      nonNullable: true,
    }),
    logo: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    releaseDate: new FormControl('', {
      validators: [Validators.required, this.validateDate()],
      nonNullable: true,
    }),
    revisionDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bpService: BpService
  ) {}

  ngOnInit(): void {
    this.productForm.controls.revisionDate.disable();
    this.route.params.subscribe((params) => {
      if (params && params['productId']) {
        // TODO: edit product fill form
      }
    });
  }

  onCancel() {
    this.router.navigate(['/products']);
  }

  // TODO: editing id should not throw error
  validateUniqueId() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 3) {
        return of(null);
      }
      return this.bpService
        .validateFinancialProduct(control.value)
        .pipe(
          map((alreadyExists) => (alreadyExists ? { duplicated: true } : null))
        );
    };
  }

  validateDate() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value < this.getIsoDate(new Date())) {
        return { minDate: true };
      }
      return null;
    };
  }

  getIsoDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
