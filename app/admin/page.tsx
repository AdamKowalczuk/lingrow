import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import React from 'react';

import { isAdmin } from '@/lib/admin';

import AdminApp from './admin';

export const metadata: Metadata = {
  title: 'Panel administracyjny',
  description:
    'Panel administracyjny platformy Lingrow - zarządzanie kursami, lekcjami i użytkownikami.',
  robots: {
    index: false,
    follow: false,
  },
};

const AdminPage = async () => {
  if (!isAdmin()) {
    redirect('/');
  }

  return <AdminApp />;
};

export default AdminPage;
