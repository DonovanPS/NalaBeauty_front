/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import { Snackbar } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { getProducts } from 'src/services/product-service';
import { useProductContext } from 'src/contexts/product-Context';

import Toast from 'src/components/toast/toast';

import NewProduct from '../product-new';
import ProductCard from '../product-card';
import ProductSort from '../product-sort';
import ProductFilters from '../product-filters';
import NewCategory from '../product-new-category';
import ProductCartWidget from '../product-cart-widget';


  

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  const [openNewProduct, setOpenNewProduct] = useState(false);
  const [openNewCategory, setOpenNewCategory] = useState(false);
  const [editData, setEditData] = useState(null);
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Mensaje por defecto');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { reload } = useProductContext();

  const handleOpenNewProduct = (product) => {
    setEditData({ isOpen: true, data: product });
    setOpenNewProduct(true);
  };

  const handleCloseNewProduct = () => {
    setEditData(null);
    setOpenNewProduct(false);
  };

  const handleOpenNewCategory = () => {
    setOpenNewCategory(true);
  };

  const handleCloseNewCategory = () => {
    setOpenNewCategory(false);
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then(data => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setSnackbarMessage('Error al cargar los productos');
        setSnackbarSeverity('error');
        showAlert();
      });
  }, [reload]);



  const showAlert = () => {
    setOpenSnackbar(true);
  };


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

          <NewCategory
            openFilter={openNewCategory}
            onOpenFilter={handleOpenNewCategory}
            onCloseFilter={handleCloseNewCategory}
          />

          {/* 
<ProductFilters
  openFilter={openFilter}
  onOpenFilter={handleOpenFilter}
  onCloseFilter={handleCloseFilter}
/>



          <ProductSort />
      */}
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product._id} xs={12} sm={6} md={3}>
            <ProductCard
              product={product}
              onOpenFilter={() => handleOpenNewProduct(product)}
              onCloseFilter={handleCloseNewProduct}
            />
          </Grid>
        ))}
      </Grid>


      <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Toast
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Snackbar>

      <ProductCartWidget />
    </Container>
  );
}
