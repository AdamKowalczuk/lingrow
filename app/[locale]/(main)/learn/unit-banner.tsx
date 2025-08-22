'use client';

import React from 'react';

type Props = {
  title: string;
  description: string;
};

const UnitBanner = ({ title, description }: Props) => {
  return (
    <div className="w-full rounded-xl bg-indigo-500 p-5 text-white">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

export default UnitBanner;
