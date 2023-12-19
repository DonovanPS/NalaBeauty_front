import * as React from 'react';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Button, Snackbar, TextField } from '@mui/material';

import { createSale } from 'src/services/sales-service';
import { useProductContext } from 'src/contexts/product-Context';

import Toast from 'src/components/toast/toast';

import ProductItem from './product-card-item';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function BasicModal({ handleClose, open }) {
  const { products, setProducts } = useProductContext();
  const [customerName, setCustomerName] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(true);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Mensaje por defecto');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSave = () => {
    if (!customerName.trim()) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);

    const totalAmount = products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const productsToSave = products.map((product) => ({
      product: product._id,
      quantity: product.quantity,
    }));

    const data = {
      date: new Date(),
      client: customerName,
      products: productsToSave,
      totalAmount,
    };

    createSale(data).then((response) => {
      if (response.state === true) {
        setProducts([]);
        setCustomerName('');
        handleClose();

        setSnackbarMessage('Venta registrada correctamente');
        setSnackbarSeverity('success');
        showAlert();
      } else {
        setSnackbarMessage(`Error al registrar la venta: ${response.message}`);
        setSnackbarSeverity('error');
        showAlert();
      }
    });
  };

  const showAlert = () => {
    setOpenSnackbar(true);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Carrito
          </Typography>

          <TextField
            label="Nombre del Cliente"
            sx={{ marginTop: '16px', marginBottom: '16px' }}
            variant="outlined"
            size="small"
            fullWidth
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            error={!isFormValid}
            helperText={!isFormValid && 'Este campo es obligatorio'}
          />

          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}

          <Typography variant="body2" sx={{ marginTop: '16px' }}>
            Total: ${products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)}
          </Typography>

          <Button type="button" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Modal>
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
    </>
  );
}
BasicModal.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
