import Link from "next/link";
import Image from "next/image";

const Button = ({ children, form, cssClasses, url, onClick, formNext }) => {
  if (form) {
    return (
      <button className={`button button-arrow ${cssClasses}`} type="submit">
        {children}
        <Image
          src="/icons/arrow_forward.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        ></Image>
      </button>
    );
  } else if (formNext) {
    return (
      <button className={`button button-arrow ${cssClasses}`} onClick={onClick}>
        Next
        <Image
          src="/icons/arrow_forward.svg"
          alt="Arrow icon"
          width={20}
          height={20}
        />
      </button>
    );
  } else {
    return (
      <Link href={url} className={`button button-normal ${cssClasses}`}>
        {children || "View More"}
      </Link>
    );
  }
};

export default Button;
