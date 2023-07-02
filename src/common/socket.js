import io from "socket.io-client";
import * as url from "../config.json"

/* Initalize the Web Socket connection to the game server */
const socket = io(url.serviceUrl);
export default socket;
