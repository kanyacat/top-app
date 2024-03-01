import React from 'react'
import styles from './not-found.module.css'
import { Htag } from '../components/Htag/Htag'

const Page = () => {
	return (
		<div className={styles.wrapper}>
			<Htag className={styles.title} tag={'h1'}>
				404
			</Htag>
			<Htag className={styles.subtitle} tag={'h2'}>
				Указанной страницы не существует!
			</Htag>
		</div>
	)
}

export default Page
