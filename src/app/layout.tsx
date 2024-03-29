import type { Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import styles from './Layout.module.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'
import { firstLevelMenu } from '@/helpers/helpers'
import { notFound } from 'next/navigation'
import { API } from '@/helpers/api'

const font = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'OwlTop'
	// openGraph: {
	// 	url: process.env.NEXT_PUBLIC_DOMAIN,
	// 	locale: 'ru_RU'
	// }
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const { menu, firstCategory } = await getMenu()

	return (
		<html lang='ru'>
			<body className={font.className}>
				<div className={styles.wrapper}>
					<Header
						className={styles.header}
						menu={menu}
						firstCategory={firstCategory}
					/>
					<Sidebar
						className={styles.sidebar}
						menu={menu}
						firstCategory={firstCategory}
					/>
					<div className={styles.body} tabIndex={0}>
						{children}
					</div>
					<Footer className={styles.footer} />
				</div>
			</body>
		</html>
	)
}

export async function getMenu() {
	const firstCategory = 0

	try {
		const res = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory
		})

		return {
			menu: res.data,
			firstCategory
		}
	} catch (err) {
		notFound()
	}
}

export const getStaticPaths: () => Promise<{
	paths: []
	fallback: boolean
}> = async () => {
	let paths: string[] = []

	for (const m of firstLevelMenu) {
		const res = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: m.id
		})
		paths = paths.concat(
			res.data.flatMap(s => s.pages.map(p => `/${s.route}/${p.alias}`))
		)
	}

	return {
		paths,
		fallback: true
	}
}
