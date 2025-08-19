import { redirect } from 'next/navigation';
import React from 'react';

import { isAdmin } from '@/lib/admin';

import AdminApp from './admin';

const AdminPage = async () => {
  if (!isAdmin()) {
    redirect('/');
  }

  return <AdminApp />;
};

export default AdminPage;
