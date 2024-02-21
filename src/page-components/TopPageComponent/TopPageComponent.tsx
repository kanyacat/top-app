'use client'

import React, { useReducer } from 'react'
import { Htag } from '@/components/Htag/Htag'
import { Tag } from '@/components/Tag/Tag'
import styles from './TopPageComponent.module.css'
import { TopPageComponentProps } from '@/page-components/TopPageComponent/TopPage.props'
import { HhData } from '@/components/HhData/HhData'
import { TopLevelCategory } from '../../../interfaces/page.interface'
import { Advantages } from '@/components/Advantages/Advantages'
import { Sort } from '@/components/Sort/Sort'
import { SortEnum } from '@/components/Sort/Sort.props'
import { sortReducer } from '@/components/Sort/sort.reducer'
import { Product } from '@/components/Product/Product'
import { useScrollY } from '@/helpers/hooks/useScrollY'
import { Up } from '@/components/Up/Up'

const TopPageComponent = ({
	page,
	products,
	firstCategory
}: TopPageComponentProps) => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		sortReducer,
		{
			products,
			sort: SortEnum.Rating
		}
	)

	const y = useScrollY()

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort })
	}

	return (
		<div className={styles.wrapper}>
			<Up />
			<div className={styles.title}>
				<Htag tag={'h1'}>{page.title}</Htag>
				{products && (
					<Tag color={'grey'} size={'m'}>
						{products.length}
					</Tag>
				)}
				<span>
					<Sort sort={sort} setSort={setSort} />
				</span>
			</div>
			<div>
				{sortedProducts &&
					sortedProducts.map(p => <Product layout key={p._id} product={p} />)}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag={'h2'} className={styles.vacancy}>
					Вакансии - {page.category}
				</Htag>
				{products && (
					<Tag color={'red'} size={'s'}>
						hh.ru
					</Tag>
				)}
			</div>
			{firstCategory === TopLevelCategory.Courses && page.hh && (
				<HhData {...page.hh} />
			)}
			{page.advantages && page.advantages.length > 1 && (
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
