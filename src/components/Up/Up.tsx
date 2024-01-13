import styles from './Up.module.css'
import UpIcon from '@/helpers/icons/arrow.svg'
import { useScrollY } from '@/helpers/hooks/useScrollY'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export const Up = (): JSX.Element => {
	const controls = useAnimation()
	const y = useScrollY()

	useEffect(() => {
		controls.start({ opacity: y / document.body.scrollHeight })
	}, [y, controls])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	return (
		<motion.button
			className={styles.up}
			onClick={scrollToTop}
			animate={controls}
			initial={{ opacity: 0 }}
		>
			<UpIcon />
		</motion.button>
	)
}
