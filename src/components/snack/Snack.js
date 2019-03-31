import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackContent from './SnackContent';

const Snack = ({ open, onClose, snack }) => (
    <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        onClose={onClose}
    >
        <SnackContent onClose={onClose} variant={snack.variant} message={snack.message} />
    </Snackbar>
);
export default Snack;
