'use client'

import { SidebarProps } from './Sidebar.props'
import { Menu } from '@/layout/Menu/Menu'

export const Sidebar = ({ ...props }: SidebarProps): JSX.Element => {
	return (
		<div {...props}>
			<Menu />
		</div>
	)
}
