import { SidebarProps } from './Sidebar.props'
import { Menu } from '@/components/Menu/Menu'
import Logo from '@/helpers/icons/logo.svg'
import styles from './Sidebar.module.css'
import cn from 'classnames'
import Link from 'next/link'
import { Search } from '@/components/Search/Search'

export const Sidebar = ({
	menu,
	firstCategory,
	className,
	...props
}: SidebarProps): JSX.Element => {
	return (
		<div className={cn(className, styles.sidebar)} {...props}>
			<Link href={'/'}>
				<Logo className={styles.logo} />
			</Link>
			<div>
				<Search />
			</div>
			<Menu menu={menu} firstCategory={firstCategory} />
		</div>
	)
}
