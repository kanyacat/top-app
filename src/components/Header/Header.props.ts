import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { MenuItem } from '../../../interfaces/menu.interface'

export interface HeaderProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	menu: MenuItem[]
	firstCategory: number
}
