import PropTypes from 'prop-types'

const Layout = ({ children }) => {
	return (
		<div style={{ padding: '64px 5px 64px 280px'}}>
			<div
				style={{
					maxWidth: '1032px',
					width: '100%',
					margin: '0 auto',
				}}
			>
				{children}
			</div>
		</div>
	)
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Layout
