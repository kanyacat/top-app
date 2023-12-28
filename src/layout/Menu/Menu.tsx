'use client'

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
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import Link from 'next/link'
import { useState } from 'react'

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

export const Menu = menu => {
	const path = usePathname()
	const [menuState, setMenuState] = useState<MenuItem[]>(menu.menu)

	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu)
	}

	const openSecondLevel = (secondCategory: string) => {
		setMenu(
			menu.menu.map(m => {
				if (m._id.secondCategory === secondCategory) {
					m.isOpened = !m.isOpened
				}
				return m
			})
		)
	}

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(m => (
					<div key={m.route}>
						<Link href={`/${m.route}`}>
							<div
								className={cn(styles.firstLevel, {
									[styles.firstLevelActive]: m.id === firstCategory
								})}
							>
								{m.icon}
								<span>{m.name}</span>
							</div>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</div>
				))}
			</>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.menu.map(m => {
					{
						if (m.pages.map(p => p.alias).includes(path.split('/')[2])) {
							m.isOpened = true
						}
					}
					return (
						<div
							key={m._id.secondCategory}
							onClick={() => openSecondLevel(m._id.secondCategory)}
						>
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
					)
				})}
			</div>
		)
	}

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map(p => (
			<Link
				href={`/${route}/${p.alias}`}
				key={p._id}
				className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]: `/${route}/${p.alias}` === path
				})}
			>
				{p.category}
			</Link>
		))
	}

	return <div className={styles.menu}>{buildFirstLevel()}</div>
}

interface MenuProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}

export default Menu
