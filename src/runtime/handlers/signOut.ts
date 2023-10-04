import { H3Event, EventHandlerRequest } from "h3";
import { AuthHandlerConfig } from "../../types";

export default (event: H3Event<EventHandlerRequest>, options: AuthHandlerConfig): any => {
    deleteCookie(event, options.cookie.name);
};
