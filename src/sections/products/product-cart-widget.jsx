import { useState } from 'react';

import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import { useProductContext } from 'src/contexts/product-Context';

import Iconify from 'src/components/iconify';

import BasicModal from './product-modal';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const { products } = useProductContext();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const totalItems = products.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <>
      <BasicModal open={open} handleClose={handleClose} />
      <StyledRoot onClick={handleOpen}>
        <Badge showZero badgeContent={totalItems} color="error" max={99}>
          <Iconify icon="eva:shopping-cart-fill" width={24} height={24} />
        </Badge>
      </StyledRoot>
    </>
  );
}
