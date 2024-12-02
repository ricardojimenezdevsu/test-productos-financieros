import {
  toApiFinancialProduct,
  toFinancialProducts,
} from './financial-product.mapper';

describe('FinancialProductMapper', () => {
  it('should map api financial product model to app financial product model', () => {
    const response = {
      id: 'test',
      name: 'test name',
      description: 'test description',
      date_release: new Date(),
      date_revision: new Date(),
      logo: 'logo',
    };
    const result = toFinancialProducts([response]);
    expect(result).toEqual([
      {
        id: response.id,
        name: response.name,
        description: response.description,
        releaseDate: response.date_release,
        revisionDate: response.date_revision,
        logo: response.logo,
      },
    ]);
  });

  it('should map app financial product model to api financial product model', () => {
    const createProductPayload = {
      id: 'test2',
      name: 'test name',
      description: 'test description',
      releaseDate: new Date(),
      revisionDate: new Date(),
      logo: 'logo',
    };
    const result = toApiFinancialProduct(createProductPayload);
    expect(result).toEqual({
      id: createProductPayload.id,
      name: createProductPayload.name,
      description: createProductPayload.description,
      date_release: createProductPayload.releaseDate,
      date_revision: createProductPayload.revisionDate,
      logo: createProductPayload.logo,
    });
  });
});
