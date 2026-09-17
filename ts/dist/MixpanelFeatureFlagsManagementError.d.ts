import { Context } from './Context';
declare class MixpanelFeatureFlagsManagementError extends Error {
    isMixpanelFeatureFlagsManagementError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { MixpanelFeatureFlagsManagementError };
