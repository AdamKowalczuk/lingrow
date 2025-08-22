import { setRequestLocale } from 'next-intl/server';

import { routing } from '@/i18n/routing';

import Footer from './footer';
import Header from './header';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const MarketingLayout = async ({ children, params }: Props) => {
  const { locale } = await params;

  setRequestLocale(locale);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MarketingLayout;
