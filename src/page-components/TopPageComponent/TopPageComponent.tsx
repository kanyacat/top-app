import React from 'react'
import { Htag } from '@/components/Htag/Htag'
import { Tag } from '@/components/Tag/Tag'
import styles from './TopPageComponent.module.css'
import { TopPageComponentProps } from '@/page-components/TopPageComponent/TopPage.props'
import { HhData } from '@/components/HhData/HhData'
import { TopLevelCategory } from '../../../interfaces/page.interface'
import { Advantages } from '@/components/Advantages/Advantages'

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
				<Htag tag={'h2'}>Вакансии - {page.category}</Htag>
				{products && (
					<Tag color={'red'} size={'s'}>
						hh.ru
					</Tag>
				)}
			</div>
			{firstCategory === TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}
			{page.advantages && page.advantages.length > 0 && (
				<div className={styles.advantages}>
					<Htag tag={'h2'} className={styles.advantagesTitle}>
						Преимущества
					</Htag>
					<Advantages advantages={page.advantages} />
				</div>
			)}
			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}
			<Htag tag={'h2'} className={styles.ability}>
				Получаемые навыки
			</Htag>
			{page.tags.map(t => (
				<Tag color={'primary'} key={t}>
					{t}
				</Tag>
			))}
		</div>
	)
}

export default TopPageComponent
