'use client'

import styles from './Menu.module.css'
import {
	FirstLevelMenuItem,
	MenuItem,
	PageItem
} from '../../../interfaces/menu.interface'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import Link from 'next/link'
import { KeyboardEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { firstLevelMenu } from '@/helpers/helpers'

export const Menu = ({ menu, firstCategory }: MenuProps) => {
	const path = usePathname()

	const [menuState, setMenuState] = useState<MenuItem[]>(menu)

	const variants = {
		visible: {
			transition: {
				when: 'beforeChildren',
				staggerChildren: 0.1
			}
		},
		hidden: { marginBottom: 0 }
	}

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 'auto',
			marginBottom: 10
		},
		hidden: { opacity: 0, height: 0, marginBottom: 0 }
	}

	const setMenu = (newMenu: MenuItem[]) => {
		setMenuState(newMenu)
	}

	const openSecondLevel = (secondCategory: string) => {
		setMenu(
			menu.map(m => {
				if (m._id.secondCategory === secondCategory) {
					m.isOpened = !m.isOpened
				}
				return m
			})
		)
	}

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === 'Space' || key.code === 'Enter') {
			key.preventDefault()
			openSecondLevel(secondCategory)
		}
	}

	const buildFirstLevel = () => {
		return (
			<>
				<div key={firstLevelMenu[0].route}>
					<div
						className={cn(styles.firstLevel, {
							[styles.firstLevelActive]: firstCategory === 0
						})}
					>
						{firstLevelMenu[0].icon}
						<span>{firstLevelMenu[0].name}</span>
					</div>
					{firstLevelMenu[0].id === firstCategory &&
						buildSecondLevel(firstLevelMenu[0])}
				</div>
			</>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map(m => {
					{
						if (m.pages.map(p => p.alias).includes(path.split('/')[2])) {
							m.isOpened = true
						}
					}
					return (
						<div key={m._id.secondCategory}>
							<div
								tabIndex={0}
								className={styles.secondLevel}
								onKeyDown={(key: KeyboardEvent) =>
									openSecondLevelKey(key, m._id.secondCategory)
								}
								onClick={() => openSecondLevel(m._id.secondCategory)}
							>
								{m._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={m.isOpened ? 'visible' : 'hidden'}
								animate={m.isOpened ? 'visible' : 'hidden'}
								className={cn(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
							</motion.div>
						</div>
					)
				})}
			</div>
		)
	}

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	) => {
		return pages.map(p => (
			<motion.div key={p._id} variants={variantsChildren}>
				<Link
					tabIndex={isOpened ? 0 : -1}
					href={`/${route}/${p.alias}`}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]: `/${route}/${p.alias}` === path
					})}
				>
					{p.category}
				</Link>
			</motion.div>
		))
	}

	return <div className={styles.menu}>{buildFirstLevel()}</div>
}

interface MenuProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}

export default Menu
