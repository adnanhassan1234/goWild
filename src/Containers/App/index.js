import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import ClientRoutes from "Routes";
import "Style/global.scss";

const App = () => {
  return (
    <>
      <ClientRoutes />
      <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
    </>
  );
};

export default App;
