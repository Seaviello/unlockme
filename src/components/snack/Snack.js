import React, { useContext, useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { SnackbarContent } from '../snackbarContent';
import { SnackContext } from '../../contexts/snacks';

const Snack = () => {
    const { snack, closeSnack } = useContext(SnackContext);
    const [localSnack, setLocalSnack] = useState({});
    useEffect(() => {
        if (snack) {
            setLocalSnack(snack);
        }
    });

    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={!!snack}
            onClose={closeSnack}
        >
            <SnackbarContent
                onClose={closeSnack}
                variant={snack ? snack.variant : localSnack.variant}
                message={snack ? snack.message : localSnack.message}
            />
        </Snackbar>
    );
};
export default Snack;
