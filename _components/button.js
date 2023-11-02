import Link from "next/link";
import Image from "next/image";

const Button = ({
  children,
  form,
  cssClasses,
  url,
  onClick,
  formBack,
  formNext,
}) => {
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
  } else {
    return (
      <Link href={url} className={`button ${cssClasses}`}>
        {children || "View More"}
      </Link>
    );
  }
};

export default Button;
