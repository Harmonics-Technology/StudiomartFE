import CookieConsent from "@components/layout/CookieConsent";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const Footer: React.FC = () => {
  const [isConsented, setIsConsented] = useState<boolean>(false);
  //   console.log({ isConsented });

  const onAccept = () => {
    // console.log("User has accepted cookies");
    Cookies.set("consent", "true");
  };

  const onDecline = () => {
    // console.log("User has declined cookies");
    Cookies.set("consent", "false");
    // Cookies.remove("vendorStudios");
    // Cookies.remove("currentStudioId");
  };
  useEffect(() => {
    const cookies = Cookies.get("consent");
    if (cookies !== undefined) {
      setIsConsented((cookies as unknown as boolean) === true);
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
