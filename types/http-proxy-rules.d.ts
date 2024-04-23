import { IncomingMessage } from 'http';

declare module 'http-proxy-rules' {
    // eslint-disable-next-line @typescript-eslint/no-extraneous-class
    class HttpProxyRules {
        constructor({ rules }: { rules: Record<string, string> });

        public match(req: IncomingMessage): string | null;
    }

    export = HttpProxyRules;
}
