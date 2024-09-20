import React, { Fragment } from 'react';
import Header from '../Components/Header/Header';
import Create from '../Components/Create/Create';
import { Toaster } from 'sonner';

const CreatePage = () => {
  return (
    <Fragment>
      <Toaster richColors position='top-center' />
      <Header />
      <Create/>
    </Fragment>
  );
};

export default CreatePage;
