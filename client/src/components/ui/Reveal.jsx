import { useInView } from "../../hooks/useInView";

/**
 * Scroll-reveal wrapper (fade + slide). Keep it as a wrapper around cards
 * rather than on the card itself so reveal transitions never fight hover
 * transitions. `delay` (ms) staggers siblings.
 */
const Reveal = ({
  as = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}) => {
  const Tag = as;
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
