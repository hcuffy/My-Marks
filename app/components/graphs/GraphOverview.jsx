import React from 'react'
import { withNamespaces } from 'react-i18next'
import css from './styles/graphs.css'
import GraphDropdown from './GraphDropdown'
import Chart from './Chart'

const GraphOverview = ({ t }) => (
	<div>
		<h4 className={css.center_header}>{t('graph.overview')}</h4>

		<GraphDropdown t={t} />

		<div className={css.chart_div}>
			<Chart t={t} />
		</div>
	</div>
)

export default withNamespaces()(GraphOverview)