import { SidebarProps } from './Sidebar.props'
import { Menu } from '@/layout/Menu/Menu'

export const Sidebar = ({ menu, ...props }: SidebarProps): JSX.Element => {
	return (
		<div {...props}>
			<Menu menu={menu} />
		</div>
	)
}
