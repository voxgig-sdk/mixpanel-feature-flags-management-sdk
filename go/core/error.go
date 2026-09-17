package core

type MixpanelFeatureFlagsManagementError struct {
	IsMixpanelFeatureFlagsManagementError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMixpanelFeatureFlagsManagementError(code string, msg string, ctx *Context) *MixpanelFeatureFlagsManagementError {
	return &MixpanelFeatureFlagsManagementError{
		IsMixpanelFeatureFlagsManagementError: true,
		Sdk:              "MixpanelFeatureFlagsManagement",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MixpanelFeatureFlagsManagementError) Error() string {
	return e.Msg
}
