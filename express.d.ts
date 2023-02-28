/** CSpace Express augmentations */

import 'express'
import 'cookie-session'
// import * as ExpressCore from 'express-serve-static-core';

interface CookieSessionObject extends CookieSessionInterfaces.CookieSessionObject {
    /**
     * The session user data.
     */
    user?: User | null | undefined;
}

// augment the express module
export module 'express' {
    interface Request {
        /**
         * Represents the session for the given request.
         */
        session?: CookieSessionObject | null | undefined;
    }
}
