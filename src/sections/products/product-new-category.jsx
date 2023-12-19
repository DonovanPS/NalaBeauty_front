import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import { TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// eslint-disable-next-line spaced-comment
import { createCategory } from 'src/services/category-service';
// import { createProduct } from 'src/services/product-service';
import { useProductContext } from 'src/contexts/product-Context';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';


// ----------------------------------------------------------------------

export default function NewCategory({ openFilter, onOpenFilter, onCloseFilter, editData }) {
    // eslint-disable-next-line no-unused-vars
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [isFormValid, setIsFormValid] = useState(true);
    const [validationErrors, setValidationErrors] = useState({});
    // eslint-disable-next-line no-unused-vars
    const { reloadData } = useProductContext();


    const renderName = (
        <Stack spacing={1}>
            <Typography variant="subtitle2">Nombre categoria</Typography>
            <TextField
                value={name}
                label="Nombre de la categoria"
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


    const categoryProduct = () => {
        const data = {
            name,
            description,
        };


        const fieldsToValidate = {
            name: 'Nombre categoria',
            description: 'Descripción',

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

        createCategory(data).then((res) => {
            if (res.state === true) {
                reloadData();
                onCloseFilter();
                setName('');
                setDescription('');
                setValidationErrors({});
                setIsFormValid(true);
            };
        });
    };

    useEffect(() => {
        // Validar el formulario
        const isNameValid = name.trim() !== '';
        const isDescriptionValid = description.trim() !== '';


        setIsFormValid(
            isNameValid && isDescriptionValid
        );
    }, [name, description]);



    return (
        <>
            <Button
                disableRipple
                color="inherit"
                endIcon={<Iconify icon="ic:round-filter-list" />}
                onClick={onOpenFilter}
            >
                Nueva categoria&nbsp;
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
                        Categoria
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
                        onClick={categoryProduct}
                    >
                        Guardar
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}

NewCategory.propTypes = {
    openFilter: PropTypes.bool,
    onOpenFilter: PropTypes.func,
    onCloseFilter: PropTypes.func,
    editData: PropTypes.object,
};