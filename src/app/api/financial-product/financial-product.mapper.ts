import { FinancialProduct } from '../../financial-products/financial-product.model';
import { ApiFinancialProduct } from './api-financial-product.model';

export function toFinancialProduct(
  product: ApiFinancialProduct
): FinancialProduct {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    releaseDate: product.date_release,
    revisionDate: product.date_revision,
    logo: product.logo,
  };
}
export function toFinancialProducts(
  financialProducts: ApiFinancialProduct[]
): FinancialProduct[] {
  return financialProducts.map(toFinancialProduct);
}

export function toApiFinancialProduct(
  financialProduct: FinancialProduct
): ApiFinancialProduct {
  return {
    id: financialProduct.id,
    name: financialProduct.name,
    description: financialProduct.description,
    date_release: financialProduct.releaseDate,
    date_revision: financialProduct.revisionDate,
    logo: financialProduct.logo,
  };
}
