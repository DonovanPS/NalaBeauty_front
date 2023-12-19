import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';

import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Toast = forwardRef(({ open, onClose, message, severity, sx, ...other }, ref) => (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        {...other}
      >
        <MuiAlert
          ref={ref}
          onClose={onClose}
          severity={severity}
          sx={{ width: '100%', ...sx }}
        >
          {message}
        </MuiAlert>
      </Snackbar>
    ));
  
  Toast.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['success', 'error', 'warning', 'info']).isRequired,
    sx: PropTypes.object,
  };
  
  export default Toast;