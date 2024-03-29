import { Helmet } from 'react-helmet-async';

import { ProductProvider } from 'src/contexts/product-Context';

import { ProductsView } from 'src/sections/products/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    
      <ProductProvider>
        <Helmet>
          <title> Products | NalaBeauty </title>
        </Helmet>
        <ProductsView />
      </ProductProvider>
   
  );
}
