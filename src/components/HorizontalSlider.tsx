import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '@/components/ui/StyledComponents.tsx';
import { NavigationIcon } from '@/assets/icons/NavigationIcon.tsx';

const SliderContainer = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 100%;
`;

const SliderWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  gap: ${props => props.theme.spacing.sm};
  transition: transform 0.3s ease;
  cursor: grab;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;

  &:active {
    cursor: grabbing;
  }
`;

const Slide = styled.div`
  height: 100%;
  flex: 0 0 auto;
`;

const NavigationButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 0;
  ${props => (props.$direction === 'prev' ? 'left: 0;' : 'right: 0;')}
  transform: translateY(-50%);
  width: 32px;
  height: 100%;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;
  background: transparent;
  transform: rotate(${props => (props.$direction === 'prev' ? '180deg' : '0deg')});

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Dot = styled.div<{ $isActive: boolean }>`
  width: ${props => props.theme.spacing.xs};
  height: ${props => props.theme.spacing.xs};
  border: none;
  border-radius: 50%;
  background: ${props => (props.$isActive ? props.theme.colors.blue : props.theme.colors.grey3)};
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => (props.$isActive ? 1 : 0.6)};
`;

interface HorizontalSliderProps {
  children: React.ReactNode[];
  slideWidth?: number;
  gap?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  className?: string;
}

export const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  children,
  slideWidth = 140,
  gap = 12,
  showNavigation = true,
  showDots = true,
  className,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  // Фиксируем ширину контейнера при монтировании
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        setContainerWidth(width);
      }
    };

    // Обновляем ширину при монтировании
    updateContainerWidth();

    // Также обновляем при ресайзе
    window.addEventListener('resize', updateContainerWidth);

    return () => {
      window.removeEventListener('resize', updateContainerWidth);
    };
  }, []);

  const slidesToShow = Math.floor(containerWidth / (slideWidth + gap));
  const totalSlides = children.length;
  const maxIndex = Math.max(0, totalSlides - slidesToShow);

  useEffect(() => {
    setCurrentIndex(0);
  }, [totalSlides]);

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const newScrollLeft = index * (slideWidth + gap);
      sliderRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      setCurrentIndex(index);
    }
  };

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      scrollToIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging || !sliderRef.current) return;

    const x = e.pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Calculate new index based on scroll position
    if (sliderRef.current) {
      const newIndex = Math.round(sliderRef.current.scrollLeft / (slideWidth + gap));
      setCurrentIndex(Math.max(0, Math.min(newIndex, maxIndex)));
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging || !sliderRef.current) return;

    const x = e.touches[0].pageX - (sliderRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Обработчик клика по точкам
  const handleDotClick = (index: number) => {
    scrollToIndex(index);
  };

  return (
    <Flex style={{ position: 'relative' }}>
      <div style={{ width: '44px' }} />
      <SliderContainer
        ref={containerRef}
        className={`horizontal-slider ${className || ''}`}
        style={{ width: '100%' }}
      >
        {showNavigation && totalSlides > 1 && (
          <>
            <NavigationButton
              type="button"
              $direction="prev"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              aria-label="Предыдущий слайд"
            >
              <NavigationIcon />
            </NavigationButton>
            <NavigationButton
              type="button"
              $direction="next"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              aria-label="Следующий слайд"
            >
              <NavigationIcon />
            </NavigationButton>
          </>
        )}

        <SliderWrapper
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ gap: `${gap}px`, width: containerWidth }}
        >
          <Flex $gap={gap}>
            {children.map((child, index) => (
              <Slide
                key={index}
                style={{
                  width: `${slideWidth}px`,
                  // flexShrink: 0,
                }}
              >
                {child}
              </Slide>
            ))}
          </Flex>
        </SliderWrapper>

        {showDots && totalSlides > 1 && maxIndex > 0 && (
          <Flex $gap={2}>
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <Dot
                key={index}
                $isActive={index === currentIndex}
                onClick={() => handleDotClick(index)}
                aria-label={`Перейти к слайду ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </Flex>
        )}
      </SliderContainer>
      <div style={{ width: '44px' }} />
    </Flex>
  );
};
