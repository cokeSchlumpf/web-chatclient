import 'whatwg-fetch';

/* eslint-disable */
export default self.fetch.bind(self);
export const Headers = self.Headers;
export const Request = self.Request;
export const Response = self.Response;
/* eslint-enable */