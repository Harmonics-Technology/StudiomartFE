export const getDeviceFromUserAgent = (userAgent: any) => {
  if (userAgent.match(/Mobile/i)) {
    return "Mobile device";
  } else if (userAgent.match(/iPad/i)) {
    return "iPad";
  } else if (userAgent.match(/Android/i)) {
    return "Android device";
  } else if (userAgent.match(/iPhone/i)) {
    return "iPhone";
  } else if (userAgent.match(/Macintosh/i)) {
    return "Macintosh computer";
  } else if (userAgent.match(/Windows/i)) {
    return "Windows computer";
  } else {
    return "Unknown device";
  }
};
