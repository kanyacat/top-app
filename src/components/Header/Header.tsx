'use client'

import { HeaderProps } from './Header.props'
import cn from 'classnames'
import styles from './Header.module.css'
import LogoIcon from '@/helpers/icons/logo.svg'
import { ButtonIcon } from '@/components/ButtonIcon/ButtonIcon'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { motion } from 'framer-motion'

export const Header = ({
	menu,
	firstCategory,
	className,
	...props
}: HeaderProps): JSX.Element => {
	const [isOpened, setIsOpened] = useState<boolean>(true)

	const router = usePathname()

	useEffect(() => {
		setIsOpened(false)
	}, [router])

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: {
				stiffness: 20
			}
		},
		closed: { opacity: 0, x: '100%' }
	}

	return (
		<header className={cn(className, styles.header)} {...props}>
			<LogoIcon />
			<ButtonIcon
				appearance={'white'}
				icon={'menu'}
				onClick={() => setIsOpened(!isOpened)}
			/>
			<motion.div
				className={styles.mobileMenu}
				animate={isOpened ? 'opened' : 'closed'}
				variants={variants}
				initial={'closed'}
			>
				<Sidebar menu={menu} firstCategory={firstCategory} />
				<ButtonIcon
					appearance={'white'}
					icon={'close'}
					className={styles.menuClose}
					onClick={() => setIsOpened(!isOpened)}
				/>
			</motion.div>
		</header>
	)
}
