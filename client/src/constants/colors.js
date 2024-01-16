'use-strict';

export const Color = {
	primary: '#001E38',
	secondary: '#E6782B',
	tertiary: '#1A1919',
	light: '#C0DDF6',
};

export const colorStyles = {
	control: (styles) => ({ ...styles, backgroundColor: 'white' }),
	option: (styles, { data, isDisabled, isFocused, isSelected }) => {
		let backgroundColor;
		let color;
		let cursor;

		if (isDisabled) {
			backgroundColor = undefined;
			color = '#ccc';
			cursor = 'not-allowed';
		} else if (isSelected) {
			backgroundColor = Color.primary;
			color = 'white';
			cursor = 'default';
		} else if (isFocused) {
			backgroundColor = Color.light;
			color = Color.primary;
			cursor = 'default';
		} else {
			backgroundColor = undefined;
			color = Color.primary;
			cursor = 'default';
		}

		let activeBackgroundColor;
		if (!isDisabled && isSelected) {
			activeBackgroundColor = Color.primary;
		} else if (!isDisabled) {
			activeBackgroundColor = Color.light;
		} else {
			activeBackgroundColor = undefined;
		}

		return {
			...styles,
			backgroundColor: backgroundColor,
			color: color,
			cursor: cursor,
			':active': {
				...styles[':active'],
				backgroundColor: activeBackgroundColor,
			},
		};
	},
	input: (styles) => ({ ...styles }),
	placeholder: (styles) => ({ ...styles, color: 'black' }),
	singleValue: (styles) => ({ ...styles, color: 'black' }),
};
