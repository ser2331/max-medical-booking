import React from 'react';

import { usePreloadImages } from '@/hooks/usePreloadImages.tsx';

import { Flex } from '@/components/ui/StyledComponents.tsx';
import { AppSpin } from '@/components/ui/AppSpin.tsx';

interface ImageLoaderProps {
  images: string[];
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
}

export const ImageLoader: React.FC<ImageLoaderProps> = ({ images, children, loadingComponent }) => {
  const { imagesLoaded } = usePreloadImages(images);

  if (!imagesLoaded) {
    if (loadingComponent) return loadingComponent;
    return (
      <Flex style={{ height: '100vh', width: '100%' }}>
        <AppSpin />
      </Flex>
    );
  }

  return <>{children}</>;
};
