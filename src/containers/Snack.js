import React, { useContext, useEffect, useState } from 'react';
import { SnackContext } from '../contexts/snacks';
import { Snack } from '../components/snack';

/* Having container would allow easier migration to other solution like Apollo or Redux.
 * However this does not seem right with hooks. :thinking_face: */
const SnackContainer = () => {
    const { snack, closeSnack } = useContext(SnackContext);
    const [localSnack, setLocalSnack] = useState({});
    useEffect(() => {
        if (snack) {
            setLocalSnack(snack);
        }
    });

    return <Snack open={!!snack} onClose={closeSnack} snack={snack || localSnack} />;
};
export default SnackContainer;
