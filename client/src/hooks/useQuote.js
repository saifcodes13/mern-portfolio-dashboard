import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Returns a function that takes the visitor to the quote form with a
 * service pre-selected. Mirrors the Services cards: scroll + `select-service`
 * event when the contact section is on the page, otherwise
 * /contact?service=...
 */
export function useQuote() {
  const navigate = useNavigate();

  return useCallback(
    (service) => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        if (service) {
          window.dispatchEvent(
            new CustomEvent("select-service", { detail: { service } })
          );
        }
      } else {
        navigate(
          service ? `/contact?service=${encodeURIComponent(service)}` : "/contact"
        );
      }
    },
    [navigate]
  );
}
