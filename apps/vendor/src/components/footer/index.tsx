import CookieConsent from "@components/layout/CookieConsent";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const Footer: React.FC = () => {
  const [isConsented, setIsConsented] = useState<boolean>(false);
  //

  const onAccept = () => {
    //
    Cookies.set("consent", "true");
  };

  const onDecline = () => {
    //
    Cookies.set("consent", "false");
    // Cookies.remove("vendorStudios");
    // Cookies.remove("currentStudioId");
  };
  useEffect(() => {
    const cookies = Cookies.get("consent");
    if (cookies !== undefined) {
      setIsConsented((cookies as any) === "true");
    }
  }, []);
  return (
    <>
      <CookieConsent
        message="This website uses cookies to improve your experience. By using our website, you agree to our use of cookies."
        acceptLabel="Accept"
        declineLabel="Decline"
        onAccept={onAccept}
        onDecline={onDecline}
        setIsConsented={setIsConsented}
        isConsented={isConsented}
      />
    </>
  );
};
