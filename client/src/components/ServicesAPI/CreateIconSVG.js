import React from "react";
import SvgIcon from '@material-ui/core/SvgIcon';

import { ReactComponent as imageSvgVector } from "../../icons/imageSvgVector.svg";
import { ReactComponent as noSignal } from "../../icons/noSignal.svg";
import { ReactComponent as logo } from "../../logo.svg";


export function IconNoSignal(props) {
	return (
		<SvgIcon {...props} component={noSignal} viewBox="0 0 56.008221 56.314415">
		</SvgIcon>
	);
}

export function IconImageSvgVector(props) {
	return (
		<SvgIcon {...props} component={imageSvgVector} viewBox="0 0 60 60">
		</SvgIcon>
	);
}

export function IconLogo(props) {
	return (
		<SvgIcon {...props} component={logo} viewBox="0 0 800.000000 916.000000" />
	);
	
}

export default function MyIconSVG() {
	return null;

}




