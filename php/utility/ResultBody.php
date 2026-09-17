<?php
declare(strict_types=1);

// MixpanelFeatureFlagsManagement SDK utility: result_body

class MixpanelFeatureFlagsManagementResultBody
{
    public static function call(MixpanelFeatureFlagsManagementContext $ctx): ?MixpanelFeatureFlagsManagementResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
