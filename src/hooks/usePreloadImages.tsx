import { useEffect, useState } from 'react';

// Функция для предзагрузки изображений
const preloadImages = (srcs: string[]): Promise<void[]> => {
  return Promise.all(
    srcs.map(src => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
      });
    }),
  );
};

export const usePreloadImages = (images: string[]) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    preloadImages(images)
      .then(() => {
        setImagesLoaded(true);
        setError(null);
      })
      .catch(error => {
        console.error('Failed to preload images:', error);
        setError('Failed to load images');
        setImagesLoaded(true); // Все равно показываем контент даже если ошибка
      });
  }, [images]);

  return {
    imagesLoaded,
    error,
  };
};
