import ImageContainer from "@/_components/image-container";

export const LoadingLogo = ({ section }) => (
  <div className={`${section}__slider-container__logo`}>
    <ImageContainer
      src="/images/carevita-fit-logo.webp"
      alt="CareVita #fit logo"
      width={400}
      height={400}
    />
  </div>
);

export default LoadingLogo;
