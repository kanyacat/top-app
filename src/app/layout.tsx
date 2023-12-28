import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import styles from './Layout.module.css'
import { Header } from '@/layout/Header/Header'
import { Footer } from '@/layout/Footer/Footer'
import { Sidebar } from '@/layout/Sidebar/Sidebar'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'

const font = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Top app',
	description: 'помогите умоляю'
}

const firstCategory = 0

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}): JSX.Element {
	const { menu } = await getMenu()

	return (
		<html lang='ru'>
			<body className={font.className}>
				<div className={styles.wrapper}>
					<Header className={styles.header} />
					<Sidebar className={styles.sidebar} menu={menu} />
					<div className={styles.body}>{children}</div>
					<Footer className={styles.footer} />
				</div>
			</body>
		</html>
	)
}

export async function getMenu() {
	const res = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',
		{ firstCategory }
	)

	return {
		menu: res.data,
		firstCategory
	}
}

export const getStaticPaths: () => Promise<{
	paths: []
	fallback: boolean
}> = async () => {
	const res = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',
		{ firstCategory }
	)

	const paths = res.data.flatMap(m => m.pages.map(p => '/courses/' + p.course))

	return {
		paths: [...paths],
		fallback: true
	}
}
