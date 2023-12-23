import axios from 'axios'
import styles from './Menu.module.css'
import {
	FirstLevelMenuItem,
	MenuItem,
	PageItem
} from '../../../interfaces/menu.interface'
import CoursesIcon from './icons/courses.svg'
import BooksIcon from './icons/books.svg'
import ProductIcon from './icons/product.svg'
import SevicesIcon from './icons/services.svg'

import { TopLevelCategory } from '../../../interfaces/page.interface'
import cn from 'classnames'

const firstCategory = 0

const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <SevicesIcon />,
		id: TopLevelCategory.Services
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />,
		id: TopLevelCategory.Books
	},
	{
		route: 'products',
		name: 'Товары',
		icon: <ProductIcon />,
		id: TopLevelCategory.Products
	}
]

export const Menu = async () => {
	// const { menu, setMenu, firstCategory } = useContext(AppContext)

	const { menu, firstCategory, page }: MenuProps = await getData()

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route}>
						<a href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id === firstCategory
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</a>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => (
					<div key={m._id.secondCategory}>
						<div className={styles.secondLevel}>
							{m._id.secondCategory}
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockOpened]: m.isOpened
								})}
							>
								{buildThirdLevel(m.pages, menuItem.route)}
							</div>
						</div>
					</div>
				))}
			</div>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map(p => (
			<a
				key={p._id}
				href={`/${route}/${p.alias}`}
				className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: false
				})}
			>
				{p.category}
			</a>
		))
	}

	return <div className={styles.menu}>{buildFirstLevel()}</div>
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

export async function getData() {
	const firstCategory = 0

	const res = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',
		{ firstCategory }
	)

	return {
		menu: res.data,
		firstCategory
	}
}

interface MenuProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}
