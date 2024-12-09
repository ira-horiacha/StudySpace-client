import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { LogIn, SignUp, Learnings, Dashboard, Grades, Planner } from './pages'
import { Sidebar, Layout } from './components'
import Classes from './pages/Classes/Classes'

const backgrounds = Array.from(
	{ length: 18 },
	(_, index) => `url(/images/bg/bg-${index + 1}.jpg)`
)

const App = () => {
	const location = useLocation()
	const [background, setBackground] = useState('')
	const [role, setRole] = useState(localStorage.getItem('role') || null)

	const changeBackground = () => {
		const randomIndex = Math.floor(Math.random() * backgrounds.length)
		setBackground(backgrounds[randomIndex])
	}

	useEffect(() => {
		changeBackground()
		const role = localStorage.getItem('role') || ''
		setRole(role)
	}, [location])

	const ShowSidebar = !['/logIn', '/signUp'].includes(location.pathname)

	return (
		<div
			style={{
				backgroundImage: background,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				minHeight: '100vh',
				transition: 'background-image 0.5s ease-in-out',
			}}
		>
			{ShowSidebar && <Sidebar role={role} />}
			<Routes>
				<Route path='/logIn' element={<LogIn />} />
				<Route path='/signUp' element={<SignUp />} />

				<Route
					path='/learnings'
					element={
						<Layout>
							<Learnings />
						</Layout>
					}
				/>

				<Route
					path='/dashboard'
					element={
						<Layout>
							<Dashboard role={role} />
						</Layout>
					}
				/>

				<Route
					path='/grades'
					element={
						<Layout>
							<Grades role={role} />
						</Layout>
					}
				/>

				<Route
					path='/planner'
					element={
						<Layout>
							<Planner />
						</Layout>
					}
				/>

				<Route
					path='/classes'
					element={
						<Layout>
							<Classes />
						</Layout>
					}
				/>
			</Routes>
		</div>
	)
}

const MainApp = () => (
	<Router>
		<App />
	</Router>
)

export default MainApp
