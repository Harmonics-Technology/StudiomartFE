import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NotificationService, OpenAPI } from "src/services";
import { getDeviceFromUserAgent } from "ui";

export const UserContext = createContext<any>(null);
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>();
  const [userStudios, setUserStudios] = useState<any>();
  const [currentStudioId, setCurrentStudioId] = useState<any>();

  const [notifys, setNotifiys] = useState<any>();
  const [device, setDevice] = useState("");
  const router = useRouter();
  const token = OpenAPI.TOKEN;
  const logout = (tokenValue: any, path?: any) => {
    tokenValue.map((x: any) => Cookies.remove(x));
    router.push(path || "/login");
  };
  const studio = Cookies.get("currentStudioId");
  const loggedInUser = Cookies.get("vendor");

  const getUserNotification = async () => {
    const userId = JSON.parse(loggedInUser as string).id;
    const offset = (router.query.offset as unknown as number) || 0;
    const limit = (router.query.limit as unknown as number) || 10;
    const isRead = false;
    if (!token) {
      return;
    }
    try {
      const notifications = await NotificationService.getUserNotification({
        userId,
        offset,
        limit,
        isRead,
      });
      if (notifications.status) {
        // Cookies.set("notify", JSON.stringify(notifications.data?.value));
        setNotifiys(notifications.data);

        return;
      }
      toast.error(notifications.message as string, {
        className: "loginToast",
      });
    } catch (error: any) {
      toast.error(error?.body?.message || error?.message, {
        className: "loginToast",
      });
    }
  };
  useEffect(() => {
    const userStudio = localStorage.getItem("vendorStudios");
    if (loggedInUser !== undefined && userStudio) {
      setUser(JSON.parse(loggedInUser));
      setUserStudios(JSON.parse(userStudio as string));
      setCurrentStudioId(studio);
      getUserNotification();
      // if (studio !== undefined) {
      //   setCurrentStudioId(studio);
      // } else {
      //   setCurrentStudioId(JSON.parse(userStudio as string)[0].id);
      // }
    }
    setDevice(getDeviceFromUserAgent(window.navigator.userAgent));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = {
    user,
    setUser,
    logout,
    userStudios,
    currentStudioId,
    setCurrentStudioId,
    notifys,
    device,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
