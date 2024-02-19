'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Ptag } from '@/components/Ptag/Ptag'
import { Htag } from '@/components/Htag/Htag'
import styles from './page.module.scss'

const Page = () => {
	const searchParams = useSearchParams()

	return (
		<div>
			<Htag className={styles.error} tag={'h1'}>
				Ой! Ошибка!
			</Htag>
			<Ptag>
				К сожалению, Ваши результаты по запросу {searchParams} не были встроены
				в API.
			</Ptag>
		</div>
	)
}

export default Page
