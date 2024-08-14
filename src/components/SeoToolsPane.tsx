import React, { useMemo, PropsWithChildren, Suspense } from 'react';
import { SeoToolsContext, SeoToolsContextValue } from '../context';
import type { SanityDocument } from '@sanity/types';
import { SeoToolsPaneEmptyView } from './SeoToolsPaneEmptyView';

const SeoToolsPaneView = React.lazy(() => import('./SeoToolsPaneView'));

type Props = PropsWithChildren<{
  options?: Partial<SeoToolsContextValue>;
  document?: {
    displayed?: SanityDocument;
  };
}>;

export const SeoToolsPane: React.FC<Props> = ({ options, document }) => {
  const contextValue = useMemo<SeoToolsContextValue>(
    () => ({
      fetch: true,
      select: () => ({}),
      render: (seo, data, serpPreview) => serpPreview,
      resolveProductionUrl: () => new URL('https://sanity.io'),
      ...options
    }),
    []
  );

  return (
    <SeoToolsContext.Provider value={contextValue}>
      <Suspense fallback={<div>Loading...</div>}>
        {document?.displayed?._rev && <SeoToolsPaneView document={document?.displayed} />}
      </Suspense>
      {!document?.displayed?._rev && <SeoToolsPaneEmptyView />}
    </SeoToolsContext.Provider>
  );
};
