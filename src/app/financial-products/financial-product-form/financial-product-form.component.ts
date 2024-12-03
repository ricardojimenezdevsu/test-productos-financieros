import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-financial-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './financial-product-form.component.html',
  styleUrl: './financial-product-form.component.css',
})
export class FinancialProductFormComponent implements OnInit {
  productForm = new FormGroup({
    // TODO: add async validation for duplicated name
    id: new FormControl('', {
      validators: [Validators.minLength(3), Validators.maxLength(10)],
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
    // TODO: add custom validator for current date
    releaseDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    revisionDate: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params && params['productId']) {
        // TODO: edit product fill form
      }
    });
  }
}
