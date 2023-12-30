import { FooterProps } from './Footer.props'
import cn from 'classnames'
import styles from './Footer.module.css'
import { format } from 'date-fns'

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<div>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
			<a href='@/components/Footer/Footer' target={'_blank'}>
				Пользовательское соглашение
			</a>
			<a href='@/components/Footer/Footer' target={'_blank'}>
				Политика конфиденциальности
			</a>
		</footer>
	)
}
