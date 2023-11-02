import Link from "next/link";
import Image from "next/image";

const Button = (
  children,
  form,
  cssClasses,
  url,
  onClick,
  mobileHomesForm,
  desktopHomesForm,
  formBack,
  formNext,
  extendedTitle,
  location,
  arrowCssClasses,
  homeIconUrl,
  homeIconAlt
) => {
  if (form) {
    return (
      <button className={`${cssClasses}`} type="submit">
        {children}
        <Image
          src="/icons/arrow_forward-white.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        ></Image>
      </button>
    );
  } else if (formBack) {
    return (
      <button className={`${cssClasses}`} onClick={onClick}>
        {children}
      </button>
    );
  } else if (formNext) {
    return (
      <button className={`${cssClasses}`} onClick={onClick}>
        Next
        <Image
          src="/icons/arrow_forward-white.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        />
      </button>
    );
  } else if (mobileHomesForm) {
    return (
      <button className={`${cssClasses}`} onClick={onClick}>
        <div>
          <Image src={homeIconUrl} alt={homeIconAlt} width={50} height={50} />
          <span>
            {extendedTitle}
            <span>{location}</span>
          </span>
        </div>
        <Image
          src="/icons/arrow_forward-blue.svg"
          alt="Arrow icon"
          width={32}
          height={32}
        />
      </button>
    );
  } else if (desktopHomesForm) {
    return (
      <button onClick={onClick}>
        <div>
          <div className={`${cssClasses}`}>
            <Image
              src={homeIconUrl}
              alt={homeIconAlt}
              width={50}
              height={50}
              className="-translate-x-[4px]"
            />
            <div>
              <h4>{extendedTitle}</h4>
              <p>{location}</p>
            </div>
          </div>
          <Image
            src="/icons/arrow_drop_down.svg"
            alt="Arrow icon"
            width={23}
            height={23}
            className={`${arrowCssClasses}`}
          />
        </div>
      </button>
    );
  } else {
    return (
      <button className={`${cssClasses}`}>
        <Link href={url}>{children || "View More"}</Link>
      </button>
    );
  }
};

export default Button;
