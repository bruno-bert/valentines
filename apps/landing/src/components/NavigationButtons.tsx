import Image from "next/image";

interface NavigationButtonsProps {
  onPrevious: () => void;
  onNext: () => void;
  disablePrevious: boolean;
  disableNext: boolean;
  ariaPreviousLabel: string;
  ariaNextLabel: string;
  hideNext?: boolean;
  hidePrevious?: boolean;
}

export function NavigationButtons({
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
  ariaPreviousLabel,
  ariaNextLabel,
  hideNext,
  hidePrevious
}: NavigationButtonsProps) {
  return (
    <div className="romantic-navigation" aria-label="Navegacao dos slides">
      {!hidePrevious && (
        <button
          aria-label={ariaPreviousLabel}
          className="romantic-nav-button romantic-nav-button-left"
          disabled={disablePrevious}
          onClick={onPrevious}
          type="button"
        >
          <Image alt="" aria-hidden="true" height={30} src="/assets/icons/chevron-left.svg" width={30} />
        </button>
      )}
      {!hideNext && (
        <button
          aria-label={ariaNextLabel}
          className="romantic-nav-button romantic-nav-button-right"
          disabled={disableNext}
          onClick={onNext}
          type="button"
        >
          <Image alt="" aria-hidden="true" height={30} src="/assets/icons/chevron-right.svg" width={30} />
        </button>
      )}
    </div>
  );
}
