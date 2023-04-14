import React from 'react';
import renderer from 'react-test-renderer';
import { ProductTitle, ProductCard } from '../../src/components/index';
import { product1 } from '../data/products';

describe('ProductTitle', () => {
  test('Debe mostrar el componente correctament con el titulo ', () => {
    const wrapper = renderer.create(
      <ProductTitle title="Custom Product" className="Custom classname" />
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });

  test('debe mostrar el componente con el nmombre del producto', () => {
    const wrapper = renderer.create(
      <ProductCard product={product1}>{() => <ProductTitle />}</ProductCard>
    );
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});
