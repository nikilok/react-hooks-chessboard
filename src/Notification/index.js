import React, { useRef } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import NotificationContext from "../context/NotificationContext";

function Notification({ children }) {
  const notificationDOMRef = useRef(null);

  function notify(config) {
    notificationDOMRef.current.addNotification({
      title: config.title.toUpperCase() || "",
      message: config.message || "",
      type: config.type || "success",
      insert: config.insert || "top",
      container: config.position || "top-center",
      animationIn: config.animationIn || ["animated", "fadeIn"],
      animationOut: config.animationOut || ["animated", "fadeOut"],
      dismiss: { duration: config.duration || 5000 },
      dismissable: { click: true }
    });
  }

  return (
    <React.Fragment>
      <ReactNotification ref={notificationDOMRef} />
      <NotificationContext.Provider value={notify}>
        {children}
      </NotificationContext.Provider>
    </React.Fragment>
  );
}

export default Notification;
