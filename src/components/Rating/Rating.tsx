'use client' // This is a client component 👈🏽

import { RatingProps } from './Rating.props'
import {
	ForwardedRef,
	forwardRef,
	KeyboardEvent,
	useEffect,
	useState
} from 'react'
import StarIcon from './star.svg'
import cn from 'classnames'
import styles from './Rating.module.css'

export const Rating = forwardRef(
	(
		{ isEditable = false, rating, setRating, error, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		useEffect(() => {
			constructRating(rating)
		}, [rating])

		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		)

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
				return (
					<span
						className={cn(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable
						})}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onClick(i + 1)}
					>
						<StarIcon
							tabIndex={isEditable ? 0 : -1}
							onKeyDown={(e: KeyboardEvent<SVGElement>) => {
								isEditable && handleSpace(i + 1, e)
							}}
						/>
					</span>
				)
			})

			setRatingArray(updatedArray)
		}

		const changeDisplay = (rate: number) => {
			if (isEditable) constructRating(rate)
		}

		const onClick = (rate: number) => {
			if (isEditable && setRating) setRating(rate)
		}

		const handleSpace = (rate: number, event: KeyboardEvent<SVGElement>) => {
			if (event.code === 'Space' && setRating) setRating(rate)
		}

		return (
			<div
				{...props}
				ref={ref}
				className={cn(styles.wrapperRating, {
					[styles.error]: error
				})}
			>
				{ratingArray.map((r, i) => (
					<span key={i}>{r}</span>
				))}
				{error && <span className={styles.errorMessage}>{error.message}</span>}
			</div>
		)
	}
)
