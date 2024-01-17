'use client'

import { SortEnum, SortProps } from './Sort.props'
import styles from './Sort.module.css'
import cn from 'classnames'
import SortIcon from '@/helpers/icons/sort.svg'

export const Sort = ({
	sort,
	setSort,
	className,
	...props
}: SortProps): JSX.Element => {
	return (
		<div className={cn(styles.sort, className)} {...props}>
			<button
				onClick={() => setSort(SortEnum.Rating)}
				className={cn({
					[styles.active]: sort === SortEnum.Rating
				})}
				tabIndex={0}
			>
				<SortIcon className={styles.sortIcon} /> По рейтингу
			</button>
			<button
				onClick={() => setSort(SortEnum.Price)}
				className={cn({
					[styles.active]: sort === SortEnum.Price
				})}
				tabIndex={0}
			>
				<SortIcon className={styles.sortIcon} /> По цене
			</button>
		</div>
	)
}
