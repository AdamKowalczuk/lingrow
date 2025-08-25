'use client';

import React from 'react';

type Props = {
  title: string;
  description: string;
};

const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="w-full rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
      <div className="space-y-3">
        <h3 className="text-2xl font-bold tracking-wide">{title}</h3>
        <p className="text-lg text-indigo-100 leading-relaxed">{description}</p>
      </div>
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
    </div>
  );
};

export default UnitBanner;
