import ImageContainer from "@/app/_components/image-container";

export const LoadingLogo = ({ section }) => (
  <div className={`${section}__slider-container__logo`}>
    <ImageContainer
      src="/carevita-fit-logo.jpg"
      alt="CareVita #fit logo"
      width={400}
      height={400}
    />
  </div>
);

export default LoadingLogo;
