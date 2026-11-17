import { Link, useLocation } from "react-router-dom";

/**
 * The site's primary CTA target: #contact on the home page (the form is on
 * the page), /contact everywhere else.
 */
const QuoteLink = ({ children = "Get a Free Quote", className = "", onClick, ...rest }) => {
  const isHome = useLocation().pathname === "/";

  if (isHome) {
    return (
      <a href="#contact" className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link to="/contact" className={className} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
};

export default QuoteLink;
