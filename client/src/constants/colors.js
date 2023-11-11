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
		return {
			...styles,
			backgroundColor: isDisabled ? undefined : isSelected ? Color.primary : isFocused ? Color.light : undefined,
			color: isDisabled ? '#ccc' : isSelected ? 'white' : Color.primary,
			cursor: isDisabled ? 'not-allowed' : 'default',

			':active': {
				...styles[':active'],
				backgroundColor: !isDisabled ? (isSelected ? Color.primary : Color.light) : undefined,
			},
		};
	},
	input: (styles) => ({ ...styles }),
	placeholder: (styles) => ({ ...styles, color: 'black' }),
	singleValue: (styles) => ({ ...styles, color: 'black' }),
};
