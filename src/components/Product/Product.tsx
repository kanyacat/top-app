'use client'

import { ProductProps } from './Product.props'
import styles from './Product.module.css'
import cn from 'classnames'
import { Card } from '@/components/Card/Card'
import { Rating } from '@/components/Rating/Rating'
import { Tag } from '@/components/Tag/Tag'
import { Button } from '@/components/Button/Button'

export const Product = ({
	product,
	className,
	...props
}: ProductProps): JSX.Element => {
	return (
		<Card className={cn(className, styles.product, {})} {...props}>
			<div className={styles.logo}>
				<img
					src={'https://courses-top.ru' + product.image}
					alt={product.title}
				/>
			</div>
			<div className={styles.title}>{product.title}</div>
			<div className={styles.price}>{product.price}</div>
			<div className={styles.credit}>{product.credit}</div>
			<div className={styles.rate}>
				<Rating rating={product.reviewAvg ?? product.initialRating} />
			</div>
			<div className={styles.tags}>
				{product.categories.map(c => (
					<Tag key={c} color={'ghost'}>
						{c}
					</Tag>
				))}
			</div>
			<div className={styles.priceTitle}>цена</div>
			<div className={styles.creditTitle}>кредит</div>
			<div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
			<hr className={styles.hr} />
			<div className={styles.description}>{product.description}</div>
			<div className={styles.feature}>фичи</div>
			<div className={styles.advBlock}>
				<div className={styles.advantages}>
					Преимущества {product.advantages}
				</div>
				<div className={styles.disadvantages}>
					Недостатки {product.disadvantages}
				</div>
			</div>
			<hr className={styles.hr} />
			<div className={styles.actions}>
				<Button appearance={'primary'}>Узнать подробнее</Button>
				<Button appearance={'ghost'} arrow={'right'}>
					Читать отзывы
				</Button>
			</div>
		</Card>
	)
}
