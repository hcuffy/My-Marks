import i18next from 'i18next'
import { ENGLISH_LABELS, GERMAN_LABELS } from '../constants/menuLabels'

export const customTranslate = translate => i18next.t(translate)

const _ = require('lodash')

export const resolveLabel = (current, translated) =>
	_.isEmpty(current) ? translated : current

export const currentLanguage = () => i18next.language

export const customMenuTranslation = (locale, label) => {
	const primaryLang = locale.slice(0, 2)
	switch (primaryLang) {
	case 'en': {
		return ENGLISH_LABELS[label]
	}
	case 'de': {
		return GERMAN_LABELS[label]
	}
	default: {
		return ENGLISH_LABELS[label]
	}
	}
}
