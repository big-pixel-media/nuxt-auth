import { H3Event, EventHandlerRequest } from "h3";
import { AuthHandlerConfig } from "../../types";

export default (_: H3Event<EventHandlerRequest>, options: AuthHandlerConfig): any => {
    return options.providers.map((provider: any) => ({
        name: provider.name,
    }));
};
