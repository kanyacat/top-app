import React from 'react'
import { Htag } from '@/components/Htag/Htag'
import { Tag } from '@/components/Tag/Tag'
import styles from './TopPageComponent.module.css'
import { TopPageComponentProps } from '@/page-components/TopPageComponent/TopPage.props'
import { HhData } from '@/components/HhData/HhData'
import { TopLevelCategory } from '../../../interfaces/page.interface'

const TopPageComponent = ({
	page,
	products,
	firstCategory
}: TopPageComponentProps) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag={'h1'}>{page.title}</Htag>
				{products && (
					<Tag color={'grey'} size={'m'}>
						{products.length}
					</Tag>
				)}
				<span>Сортировка</span>
			</div>
			<div>
				{products && products.map(p => <div key={p._id}>{p.title}</div>)}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag={'h2'}>{page.category}</Htag>
				{products && (
					<Tag color={'red'} size={'s'}>
						hh.ru
					</Tag>
				)}
			</div>
			{firstCategory === TopLevelCategory.Courses && <HhData {...page.hh} />}
		</div>
	)
}

export default TopPageComponent
