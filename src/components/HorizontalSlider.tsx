import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Flex } from '@maxhub/max-ui';

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;

const SliderWrapper = styled.div`
  display: flex;
  overflow: auto;
  gap: ${props => props.theme.spacing.sm};
  transition: transform 0.3s ease;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Slide = styled.div`
  flex: 0 0 auto;
`;

const NavigationButton = styled.button<{ $direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${props => (props.$direction === 'prev' ? 'left: 0;' : 'right: 0;')}
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: ${props => props.theme.colors.mainBackgroundColor};
  box-shadow: ${props => props.theme.shadows.small};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.theme.colors.mainBackgroundColor};
    transform: translateY(-50%) scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border: 2px solid ${props => props.theme.colors.black};
    border-top: none;
    border-${props => (props.$direction === 'prev' ? 'right' : 'left')}: none;
    transform: rotate(${props => (props.$direction === 'prev' ? '45deg' : '-45deg')});
  }
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${props => props.theme.spacing.xs};
  margin-top: ${props => props.theme.spacing.sm};
`;

const Dot = styled.button<{ $isActive: boolean }>`
  width: 6px;
  height: 6px;
  border: none;
  border-radius: 50%;
  background: ${props => (props.$isActive ? props.theme.colors.black : props.theme.colors.black)};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.black};
    transform: scale(1.2);
  }
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
  gap = 8,
  showNavigation = true,
  showDots = true,
  className,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const slidesToShow = Math.floor((sliderRef.current?.offsetWidth || 0) / (slideWidth + gap));
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
    <SliderContainer className={`SLIDER ${className}`}>
      {showNavigation && (
        <>
          <NavigationButton
            type="button" // ← ДОБАВЛЕНО: явно указываем тип кнопки
            $direction="prev"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            aria-label="Предыдущий слайд"
          />
          <NavigationButton
            type="button"
            $direction="next"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            aria-label="Следующий слайд"
          />
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
        style={{ gap: `${gap}px` }}
      >
        <Flex>
          {children.map((child, index) => (
            <Slide key={index} style={{ width: `${slideWidth}px`, height: '100%' }}>
              {child}
            </Slide>
          ))}
        </Flex>
      </SliderWrapper>

      {showDots && totalSlides > 1 && (
        <DotsContainer>
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <Dot
              key={index}
              type="button"
              $isActive={index === currentIndex}
              onClick={() => handleDotClick(index)}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </DotsContainer>
      )}
    </SliderContainer>
  );
};
