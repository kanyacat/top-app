import type { GetStaticPropsContext, Metadata } from 'next'
import { Noto_Sans } from 'next/font/google'
import './globals.css'
import styles from './Layout.module.css'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'
import { firstLevelMenu } from '@/helpers/helpers'
import { ParsedUrlQuery } from 'querystring'
import { notFound } from 'next/navigation'
import { API } from '@/helpers/api'
import cn from 'classnames'
import { KeyboardEvent } from 'react'

const font = Noto_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Top app',
	description: 'помогите умоляю'
}

export default async function RootLayout({
	children
}: {
	children: React.ReactNode
}): JSX.Element {
	const { menu, firstCategory } = await getMenu()

	// const bodyRef = useRef<HTMLDivElement>(null)

	let displayed: boolean = true

	const skipConentAction = (key: KeyboardEvent) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault()
			// bodyRef.current?.focus()
		}
		displayed = false
	}

	return (
		<html lang='ru'>
			<body className={font.className}>
				<div className={styles.wrapper}>
					<a
						// onFocus={() => (displayed = true)}
						tabIndex={1}
						className={cn(styles.skipLink, {
							[styles.displayed]: displayed
						})}
						// onKeyDown={skipContentAction}
					>
						Сразу к содержанию
					</a>
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
					<div
						className={styles.body}
						// ref={bodyRef}
						tabIndex={0}
					>
						{children}
					</div>
					<Footer className={styles.footer} />
				</div>
			</body>
		</html>
	)
}

export async function getMenu(
	params: GetStaticPropsContext<ParsedUrlQuery> | undefined
) {
	let firstCategoryItem

	params !== undefined
		? (firstCategoryItem = firstLevelMenu.find(m => m.route === params.type))
		: (firstCategoryItem = 0)

	const firstCategory = firstCategoryItem !== 0 ? firstCategoryItem.id : 0

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
