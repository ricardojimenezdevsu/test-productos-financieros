import { Component, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, Subject, takeUntil } from 'rxjs';
import { BpService } from '../../api/bp.service';
import { FinancialProduct } from '../financial-product.model';
import { InputComponent } from '../../ui-components/input/input.component';

@Component({
  selector: 'app-financial-product-form',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './financial-product-form.component.html',
  styleUrl: './financial-product-form.component.css',
})
export class FinancialProductFormComponent implements OnInit {
  productForm = new FormGroup({
    id: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ],
      asyncValidators: [this.validateUniqueId()],
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ],
      nonNullable: true,
    }),
    description: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ],
      nonNullable: true,
    }),
    logo: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    releaseDate: new FormControl('', {
      validators: [Validators.required, this.validateDateString()],
      nonNullable: true,
    }),
    revisionDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  isEditing = signal(false);

  get id() {
    return this.productForm.controls.id;
  }
  get name() {
    return this.productForm.controls.name;
  }
  get description() {
    return this.productForm.controls.description;
  }
  get logo() {
    return this.productForm.controls.logo;
  }
  get releaseDate() {
    return this.productForm.controls.releaseDate;
  }
  get revisionDate() {
    return this.productForm.controls.revisionDate;
  }
  private _financialProductDetail?: FinancialProduct;
  private _terminator$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bpService: BpService
  ) {}

  ngOnInit(): void {
    this.productForm.controls.revisionDate.disable();
    this.route.params.subscribe((params) => {
      if (params && params['productId']) {
        this.isEditing.set(true);
        this.bpService
          .getFinancialProduct(params['productId'])
          .pipe(takeUntil(this._terminator$))
          .subscribe({
            next: (productDetail) => {
              this._financialProductDetail = productDetail;
              this.productForm.controls.id.disable();
              this.productForm.controls.id.removeAsyncValidators([
                this.validateUniqueId(),
              ]);
              this._resetFormValue();
            },
            error: () => {
              this.router.navigate(['/products']);
            },
          });
      }
    });

    this.productForm.controls.releaseDate.valueChanges
      .pipe(takeUntil(this._terminator$))
      .subscribe((date) => {
        if (date.length == 10) {
          const revisionDate = new Date(date);
          revisionDate.setFullYear(
            revisionDate.getFullYear() + 1,
            revisionDate.getMonth(),
            revisionDate.getDate() + 1
          );
          this.productForm.controls.revisionDate.patchValue(
            this.getIsoDate(revisionDate)
          );
        }
      });
  }
  private _resetFormValue() {
    this.productForm.reset({
      id: this._financialProductDetail?.id,
      description: this._financialProductDetail?.description,
      name: this._financialProductDetail?.name,
      logo: this._financialProductDetail?.logo,
      releaseDate: this._financialProductDetail
        ? this.getIsoDate(this._financialProductDetail.releaseDate)
        : '',
      revisionDate: this._financialProductDetail
        ? this.getIsoDate(this._financialProductDetail.revisionDate)
        : '',
    });
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      Object.values(this.productForm.controls).forEach((control) => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return;
    }
    const payload: FinancialProduct = {
      ...this.productForm.getRawValue(),
      releaseDate: new Date(this.productForm.controls.releaseDate.value),
      revisionDate: new Date(this.productForm.controls.revisionDate.value),
    };
    const request = this.isEditing()
      ? this.bpService.updateFinancialProduct(payload.id, payload)
      : this.bpService.createFinancialProduct(payload);
    request
      .pipe(takeUntil(this._terminator$))
      .subscribe(() => this.router.navigate(['/products']));
  }

  onCancel() {
    this._resetFormValue();
  }

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

  validateDateString() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
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
