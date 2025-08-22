import { setRequestLocale } from 'next-intl/server';

import { MobileHeader } from '@/components/mobile-header';
import { Sidebar } from '@/components/sidebar';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const MainLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);
  return (
    <>
      <MobileHeader />
      <Sidebar className="hidden lg:flex" />
      <main className="lg:pl-[256px]  h-full pt-[50px] lg:pt-0">
        <div className="mx-auto pt-6 h-full">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
