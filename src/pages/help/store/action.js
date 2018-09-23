export const Types = {
	SET_HELP: 'set_help',
	SET_AGREEMENT: 'set_agreement'
};

// 同城在线验车
export const setHelp = (value) => ({ type: Types.SET_HELP, value: value });

// 协议
export const setAgreement = (value) => ({ type: Types.SET_AGREEMENT, value: value });
