import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import close from '@/helpers/icons/primaryclose.svg'
import up from '@/helpers/icons/arrow.svg'
import menu from '@/helpers/icons/burger.svg'

export const icons = {
	up,
	close,
	menu
}

export type IconName = keyof typeof icons

export interface ButtonIconProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	icon: IconName
	appearance: 'primary' | 'white'
}
