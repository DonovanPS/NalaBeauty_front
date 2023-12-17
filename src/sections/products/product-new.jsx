import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Select, MenuItem, TextField, InputLabel, FormControl, FormHelperText } from '@mui/material';

import { createProduct } from 'src/services/product-service';
import { getCategories } from 'src/services/category-service';
import { useProductContext } from 'src/contexts/product-Context';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';


// ----------------------------------------------------------------------

export default function NewProduct({ openFilter, onOpenFilter, onCloseFilter, editData }) {
  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isFormValid, setIsFormValid] = useState(true);
  const [validationErrors, setValidationErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const { reloadData } = useProductContext();

  useEffect(() => {
    if (editData?.data) {
      setId(editData.data._id || '');
      setName(editData.data.name || '');
      setDescription(editData.data.description || '');
      setImage(editData.data.image || '');
      setPrice(editData.data.price || '');
      setStock(editData.data.stock || '');
      setCategory(editData.data.category || '');
    }

    getCategories() .then((response) => {
      setCategories(response.data); 
    })
    .catch((error) => console.error('Error fetching categories:', error));
  }, [editData]);


  const renderName = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Nombre</Typography>
      <TextField
        value={name}
        label="Nombre del producto"
        variant="outlined"
        onChange={(e) => {
          setName(e.target.value);
          setValidationErrors({ ...validationErrors, name: '' });
        }}
        error={!!validationErrors.name}
        helperText={validationErrors.name}
      />
    </Stack>
  );

  const renderDescription = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Descripción</Typography>
      <TextField
        value={description}
        label="Descripción"
        variant="outlined"
        onChange={(e) => {
          setDescription(e.target.value)
          setValidationErrors({ ...validationErrors, description: '' });
        }}
        error={!!validationErrors.description}
        helperText={validationErrors.description}
      />
    </Stack>
  );

  const renderImage = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Imagen</Typography>
      <TextField
        value={image}
        label="URL"
        variant="outlined"
        onChange={(e) => {
          setImage(e.target.value);
          setValidationErrors({ ...validationErrors, image: '' });
        }}
        error={!!validationErrors.image}
        helperText={validationErrors.image}

      />
    </Stack>
  );

  const renderPrice = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Precio</Typography>
      <TextField
        value={price}
        label="Precio"
        variant="outlined"
        type="number"
        onChange={(e) => {
          setPrice(e.target.value)
          setValidationErrors({ ...validationErrors, price: '' });
        }}
        error={!!validationErrors.price}
        helperText={validationErrors.price}

      />
    </Stack>
  );


  const renderStock = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Stock</Typography>
      <TextField
        value={stock}
        label="Stock"
        variant="outlined"
        type="number"
        onChange={(e) => {
          setStock(e.target.value)
          setValidationErrors({ ...validationErrors, stock: '' });
        }}
        error={!!validationErrors.stock}
        helperText={validationErrors.stock}

      />
    </Stack>
  );
  const renderCategory = (
    <Stack spacing={1}>
      <Typography variant="subtitle2">Categoría</Typography>
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-category">Seleccione Categoría</InputLabel>
        <Select
          value={category}
          label="Categoría"
          onChange={(e) => {
            setCategory(e.target.value);
            setValidationErrors({ ...validationErrors, category: '' });
          }}
          inputProps={{
            name: 'category',
            id: 'outlined-category',
          }}
          error={!!validationErrors.category}
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText style={{ color: 'red' }}>{validationErrors.category || ' '}</FormHelperText>
      </FormControl>
    </Stack>
  );
  

  const saveProduct = () => {
    const data = {
      name,
      description,
      image,
      stock,
      price,
      category,
    };


    const fieldsToValidate = {
      name: 'Nombre del producto',
      description: 'Descripción',
      image: 'Imagen',
      stock: 'Stock',
      price: 'Precio',
      category: 'Categoría',
    };

    const errors = {};
    const hasErrors = Object.keys(fieldsToValidate).some((field) => {
      if (!String(data[field]).trim()) {
        errors[field] = `El campo es obligatorio`;
        return true; 
      }
      return false;
    });

    if (hasErrors) {
      setValidationErrors(errors);
      setIsFormValid(false);
      return;
    }

    createProduct(data).then((response) => {
      if (response.state === true) {
        reloadData();
        onCloseFilter();
      }
    });

  };

  useEffect(() => {
    // Validar el formulario
    const isNameValid = name.trim() !== '';
    const isDescriptionValid = description.trim() !== '';
    const isImageValid = image.trim() !== '';
    const isStockValid = stock.trim() !== '';
    const isPriceValid = price.trim() !== '';
    const isCategoryValid = category.trim() !== '';

    setIsFormValid(
      isNameValid && isDescriptionValid && isPriceValid && isStockValid && isCategoryValid && isImageValid
    );
  }, [name, description, image, stock, price, category]);



  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={onOpenFilter}
      >
        Nuevo producto&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="h6" sx={{ ml: 1 }}>
            Nuevo producto
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>

            {renderName}
            {renderDescription}
            {renderImage}
            {renderStock}
            {renderPrice}
            {renderCategory}

          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="ic:round-clear-all" />}
            onClick={saveProduct}
          >
            Guardar
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

NewProduct.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
  editData: PropTypes.object,
};
