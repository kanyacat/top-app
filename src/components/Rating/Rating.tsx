'use client' // This is a client component 👈🏽

import { RatingProps } from './Rating.props'
import {
	ForwardedRef,
	forwardRef,
	KeyboardEvent,
	useEffect,
	useRef,
	useState
} from 'react'
import StarIcon from './star.svg'
import cn from 'classnames'
import styles from './Rating.module.css'

export const Rating = forwardRef(
	(
		{
			isEditable = false,
			rating,
			setRating,
			tabIndex,
			error,
			...props
		}: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const computeFocus = (r: number, i: number): number => {
			if (!isEditable) {
				return -1
			}

			if (!rating && i === 0) {
				return tabIndex ?? 0
			}

			if (rating === i + 1) {
				return tabIndex ?? 0
			}

			return -1
		}

		useEffect(() => {
			constructRating(rating)
		}, [rating, tabIndex])

		const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		)

		const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

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
						tabIndex={computeFocus(rating, i)}
						onKeyDown={handleKey}
						ref={r => ratingArrayRef.current?.push(r)}
					>
						<StarIcon />
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

		const handleKey = (event: KeyboardEvent<HTMLSpanElement>) => {
			if (!isEditable || !setRating) {
				return
			}
			if (event.code === 'ArrowRight' || event.code === 'ArrowUp') {
				if (!rating) {
					event.preventDefault()
					setRating(1)
				} else {
					event.preventDefault()
					setRating(rating < 5 ? rating + 1 : 5)
				}
				ratingArrayRef.current[rating]?.focus()
			}

			if (event.code === 'ArrowLeft' || event.code === 'ArrowDown')
				setRating(rating > 1 ? rating - 1 : 1)
			ratingArrayRef.current[rating - 1]?.focus()
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
