'use client';
import dynamic from 'next/dynamic';

const AdminApp = dynamic(() => import('./AdminApp'), {
  ssr: false,
});

export default AdminApp;
