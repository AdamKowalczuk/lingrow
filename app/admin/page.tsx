import { redirect } from 'next/navigation';
import React from 'react';

import { isAdmin } from '@/lib/admin';

import App from './app';

const AdminPage = async () => {
  if (!isAdmin()) {
    redirect('/');
  }

  return <App />;
};

export default AdminPage;
