import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { getProducts } from 'src/services/product-service';
import { useProductContext } from 'src/contexts/product-Context';

import NewProduct from '../product-new';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import ProductCartWidget from '../product-cart-widget';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [editData, setEditData] = useState(null);
  const { reload } = useProductContext();

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOpenNewProduct = (product) => {
    setEditData({ isOpen: true, data: product });
    setOpenNewProduct(true);
  };

  const handleCloseNewProduct = () => {
    setEditData(null);
    setOpenNewProduct(false);
  };



  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [reload]);


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

          <NewProduct
            openFilter={openNewProduct}
            onOpenFilter={handleOpenNewProduct}
            onCloseFilter={handleCloseNewProduct}
            editData={editData}
          />

          <ProductFilters
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />

          <ProductSort />
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard
              product={product}
              onOpenFilter={() => handleOpenFilter(product)}
              onCloseFilter={handleCloseFilter}
            />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />
    </Container>
  );
}
