import { LayoutProps } from './Layout.props'
import { Sidebar } from '@/layout/Sidebar/Sidebar'
import { Footer } from '@/layout/Footer/Footer'
import { Header } from '@/layout/Header/Header'
import { FunctionComponent } from 'react'

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<>
			<Header />
			<main>
				<Sidebar />
				<div>{children}</div>
			</main>
			<Footer />
		</>
	)
}

export const withLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		)
	}
}
