import { Alert, Snackbar } from '@mui/material';
import React from 'react';


const Snackbarcomp = ({message,type,isOpen,setOpen}) => {

 

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }

        setOpen(false);
      };

    return (
      <div>
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={type}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
};

export default Snackbarcomp;