
import PropTypes from 'prop-types';

import { Stack, IconButton } from '@mui/material';

import { disableProduct } from 'src/services/product-service';
import { useProductContext } from 'src/contexts/product-Context';

import Iconify from 'src/components/iconify';

export default function RenderButton({ product, icon, action, setOpenFilter, color }) {
  const { handleAddToCart, reloadData } = useProductContext();

  const handleClick = () => {
    if (action === 'addToCart') {
    
      handleAddToCart(product);
    } else if (action === 'edit') {
      setOpenFilter(true, product);
    } else if (action === 'delete') {
      disableProduct(product._id)
        .then((response) => {
          reloadData();
        })
        .catch((error) => console.error('Error disabling product:', error));
    }
  };

  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      {action === 'addToCart' ? (
        <IconButton
          color={color}
          aria-label="add to shopping cart"
          onClick={handleClick}
          disabled={!product.state || product.stock <= 0}
        >
          <Iconify icon={icon} width={24} height={24} />
        </IconButton>
      ) : (
        <IconButton color={color} aria-label={action} onClick={handleClick}>
          <Iconify icon={icon} width={24} height={24} />
        </IconButton>
      )}
    </Stack>
  );
}

RenderButton.propTypes = {
  product: PropTypes.object,
  icon: PropTypes.string,
  action: PropTypes.string,
  setOpenFilter: PropTypes.func,
  color: PropTypes.string,
};
