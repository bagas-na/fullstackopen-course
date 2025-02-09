import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW":
      return `anecdote "${action.payload.content}" created.`;
    case "VOTE":
      return `anecdote "${action.payload.content}" voted.`;
    case "RESET":
      return "";
    case "NEW_ERROR":
      return 'Anecdote too short. Must have length of 5 characters or more';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotificationContext);
  return counterAndDispatch[1];
};

// eslint-disable-next-line react/prop-types
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, "");

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
