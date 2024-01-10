'use client'

import { ProductProps } from './Product.props'
import styles from './Product.module.css'
import cn from 'classnames'
import { Card } from '@/components/Card/Card'
import { Rating } from '@/components/Rating/Rating'
import { Tag } from '@/components/Tag/Tag'
import { Button } from '@/components/Button/Button'
import { Htag } from '@/components/Htag/Htag'
import { countRegex, decOfNum } from '@/helpers/helpers'
import { Divider } from '@/components/Divider/Divider'
import { Ptag } from '@/components/Ptag/Ptag'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Review } from '@/components/Review/Review'
import { ReviewForm } from '@/components/ReviewForm/ReviewForm'

export const Product = ({
	product,
	className,
	...props
}: ProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false)

	const reviewRef = useRef<HTMLDivElement>(null)

	const scrollToReview = () => {
		setIsReviewOpened(true)
		reviewRef.current?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		})
	}

	return (
		<div className={className} {...props}>
			<Card className={cn(className, styles.product, {})} {...props}>
				<div className={styles.logo}>
					<Image
						src={'https://courses-top.ru' + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<Htag tag={'h3'} className={styles.title}>
					{product.title}
				</Htag>
				<div className={styles.price}>
					{countRegex(product.price)}
					{product.oldPrice && (
						<Tag color={'green'} className={styles.oldPrice}>
							{countRegex(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{countRegex(product.credit)}
					<span className={styles.month}>/мес</span>
				</div>
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
				<div className={styles.creditTitle}>в кредит</div>
				<div className={styles.rateTitle}>
					<a href='#ref' onClick={scrollToReview}>
						{product.reviewCount}{' '}
						{decOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
					</a>
				</div>
				<Divider className={styles.hr} />
				<Ptag className={styles.description}>{product.description}</Ptag>
				<div className={styles.feature}>
					{product.characteristics.map(c => (
						<div className={styles.characteristics} key={c.name}>
							<span className={styles.characteristicsName}>{c.name}</span>
							<span className={styles.characteristicsDots}></span>
							<span className={styles.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && (
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							{product.advantages}
						</div>
					)}

					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.advTitle}>Недостатки</div>
							{product.disadvantages}
						</div>
					)}
				</div>
				<Divider className={cn(styles.hr, styles.hr2)} />
				<div className={styles.actions}>
					<Button appearance={'primary'}>Узнать подробнее</Button>
					<Button
						appearance={'ghost'}
						arrow={isReviewOpened ? 'down' : 'right'}
						className={styles.reviewButton}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card
				color={'blue'}
				className={cn(styles.reviews, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened
				})}
				ref={reviewRef}
			>
				{product.reviews.map(r => (
					<div key={r._id}>
						<Review review={r} />
						<Divider />
					</div>
				))}
				<ReviewForm productId={product._id} />
			</Card>
		</div>
	)
}
