import { FeatureFlagEntity } from './entity/FeatureFlagEntity';
import { ListFeatureFlagEntity } from './entity/ListFeatureFlagEntity';
import { WorkspaceEntity } from './entity/WorkspaceEntity';
export type * from './MixpanelFeatureFlagsManagementTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { MixpanelFeatureFlagsManagementEntityBase } from './MixpanelFeatureFlagsManagementEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class MixpanelFeatureFlagsManagementSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    FeatureFlag(entopts?: Record<string, any>): FeatureFlagEntity;
    ListFeatureFlag(entopts?: Record<string, any>): ListFeatureFlagEntity;
    Workspace(entopts?: Record<string, any>): WorkspaceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): MixpanelFeatureFlagsManagementSDK;
    tester(testopts?: any, sdkopts?: any): MixpanelFeatureFlagsManagementSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof MixpanelFeatureFlagsManagementSDK;
export { stdutil, config, BaseFeature, MixpanelFeatureFlagsManagementEntityBase, MixpanelFeatureFlagsManagementSDK, SDK, };
