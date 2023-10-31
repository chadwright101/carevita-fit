const Heading = ({
  cssClasses,
  children,
  pageHeading,
  sectionHeading,
  subheading,
}) => {
  if (pageHeading) {
    return <h1 className={`${cssClasses}`}>{children}</h1>;
  } else if (sectionHeading) {
    return <h2 className={`${cssClasses}`}>{children}</h2>;
  } else if (subheading) {
    return <h3 className={`${cssClasses}`}>{children}</h3>;
  } else {
    return null;
  }
};

export default Heading;
