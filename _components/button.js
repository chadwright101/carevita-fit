import Link from "next/link";
import Image from "next/image";
import { useFormStatus } from "react-dom";

const Button = ({
  children,
  form,
  cssClasses,
  url,
  onClick,
  formNext,
  disabled,
}) => {
  const { pending } = useFormStatus();

  if (form) {
    return (
      <button
        className={`button button--arrow ${cssClasses}`}
        type="submit"
        disabled={pending}
      >
        {pending ? (
          <div className="spinner"></div>
        ) : (
          <>
            {children}
            <Image
              src="/icons/arrow_forward.svg"
              alt="Arrow icon"
              width={20}
              height={20}
            ></Image>
          </>
        )}
      </button>
    );
  } else if (formNext) {
    return (
      <button
        disabled={disabled}
        className={`button button--arrow ${cssClasses}`}
        onClick={onClick}
      >
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
      <Link href={url} className={`button button--normal ${cssClasses}`}>
        <button type="button">{children || "View More"}</button>
      </Link>
    );
  }
};

export default Button;
