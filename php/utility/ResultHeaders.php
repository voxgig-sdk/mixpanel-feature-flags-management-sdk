<?php
declare(strict_types=1);

// MixpanelFeatureFlagsManagement SDK utility: result_headers

class MixpanelFeatureFlagsManagementResultHeaders
{
    public static function call(MixpanelFeatureFlagsManagementContext $ctx): ?MixpanelFeatureFlagsManagementResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
