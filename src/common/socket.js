import io from "socket.io-client";
import { serviceUrl } from "../config.json";

/* Initalize the Web Socket connection to the game server */
const socket = io(serviceUrl);
export default socket;
