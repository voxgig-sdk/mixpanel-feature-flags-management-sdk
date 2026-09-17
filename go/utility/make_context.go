package utility

import "github.com/voxgig-sdk/mixpanel-feature-flags-management-sdk/go/core"

func makeContextUtil(ctxmap map[string]any, basectx *core.Context) *core.Context {
	return core.NewContext(ctxmap, basectx)
}
