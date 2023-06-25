'use client';

import { getProviders, signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signupUrlParams?: Record<string, string> | null;
};

type Providers = Record<string, Provider>;

export default function AuthProviders() {
  const [provider, setProvider] = useState<Providers | null>(null);

  useEffect(() => {
    const getProvidersData = async () => {
      const res = await getProviders();

      setProvider(() => res);
    };

    getProvidersData();
  }, []);

  if (provider) {
    return (
      <>
        {Object.values(provider).map((provider: Provider) => (
          <div key={provider.id}>
            <a href={provider.signinUrl}>
              <button onClick={() => signIn(provider?.id)}>{provider.name}</button>
            </a>
          </div>
        ))}
      </>
    );
  }
}
