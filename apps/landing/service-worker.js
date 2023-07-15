/* eslint-disable no-restricted-globals */

const installEvent = () => {
  self.addEventListener("install", () => {});
};
installEvent();

const xmlhttp = new XMLHttpRequest();
let baseUrl = "";
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    baseUrl =
      process.env.NEXT_PUBLIC_API_BASEURL + "api/notification/subscribe";
  }
};
let envSuffix = "";
if (!window.location.hostname.includes("localhost")) {
  envSuffix = ".production";
  //disable
}
xmlhttp.open("GET", `/config${envSuffix}.json`, false);
xmlhttp.send();

const urlB64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const activateEvent = () => {
  self.addEventListener("activate", async () => {
    // This will be called only once when the service worker is activated.
    try {
      const applicationServerKey = urlB64ToUint8Array(
        "BJeL8FRs64C6TJbF4C6p9tUmSOqsx8D10GG_UrNCo-xGiFkOMlmju0GZb1WdEQSN2MEOxW943TsiGDrVkIhQ1ok"
      );
      const options = { applicationServerKey, userVisibleOnly: true };

      const subscription = await self.registration.pushManager.subscribe(
        options
      );

      const sub = JSON.stringify(subscription);

      const requestOption = { subscription: sub };
      const value = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestOption),
      });
      if (value.status === 200) {
      }
    } catch (err) {}
  });
};
activateEvent();

self.addEventListener("push", function (event) {
  if (event.data) {
    var data = event.data.text();
    var result = JSON.parse(data);

    showLocalNotification(result.Title, result.Body, self.registration);
  } else {
  }
});

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    // here you can add more properties like icon, image, vibrate, etc.
    icon: `/images/icon.jpg`,
  };
  swRegistration.showNotification(title, options);
};
