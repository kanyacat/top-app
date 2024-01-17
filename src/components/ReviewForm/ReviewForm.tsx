import { ReviewFormProps } from './ReviewForm.props'
import styles from './ReviewForm.module.css'
import cn from 'classnames'
import { Input } from '@/components/Input/Input'
import { Rating } from '@/components/Rating/Rating'
import { Textarea } from '@/components/Textarea/Textarea'
import { Button } from '@/components/Button/Button'
import CloseIcon from '@/helpers/icons/greenClose.svg'
import { Controller, useForm } from 'react-hook-form'
import {
	IReviewForm,
	IReviewSentResponse
} from '@/components/ReviewForm/ReviewForm.interface'
import axios from 'axios'
import { API } from '@/helpers/api'
import { useState } from 'react'

export const ReviewForm = ({
	productId,
	isOpened,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IReviewForm>()

	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [error, setError] = useState<string>('')

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{ ...formData, productId }
			)
			if (data.message) {
				setIsSuccess(true)
				reset()
			}
		} catch (err) {
			setError(`${err.message}`)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className={cn(styles.reviewForm, className)} {...props}>
				<Input
					{...register('name', {
						required: { value: true, message: 'Заполните имя' }
					})}
					placeholder={'Имя'}
					error={errors.name}
					tabIndex={isOpened ? 0 : 1}
				/>
				<Input
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок отзыва' }
					})}
					className={styles.title}
					placeholder={'Заголовок отзыва'}
					error={errors.title}
					tabIndex={isOpened ? 0 : 1}
				/>
				<div className={styles.rating}>
					<span>Оценка:</span>
					<Controller
						control={control}
						name={'rating'}
						rules={{ required: { value: true, message: 'Укажите оценку' } }}
						render={({ field }) => (
							<Rating
								isEditable
								setRating={field.onChange}
								ref={field.ref}
								rating={field.value}
								error={errors.rating}
								tabIndex={isOpened ? 0 : 1}
							/>
						)}
					/>
				</div>
				<Textarea
					{...register('description', {
						required: { value: true, message: 'Заполните текст отзыва' }
					})}
					className={styles.description}
					placeholder={'Текст отзыва'}
					error={errors.description}
					tabIndex={isOpened ? 0 : 1}
				/>
				<div className={styles.submit}>
					<Button
						appearance={'primary'}
						className={styles.button}
						tabIndex={isOpened ? 0 : 1}
					>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и
						проверку
					</span>
					{isSuccess && (
						<div className={cn(styles.panel, styles.success)}>
							<div className={styles.successTtitle}>Ваш отзыв отправлен.</div>
							<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
							<CloseIcon
								className={styles.close}
								onClick={() => setIsSuccess(false)}
							/>
						</div>
					)}
					{error && (
						<div className={cn(styles.panel, styles.error)}>
							Что-то пошло не так, попробуйте обновить страницу и попробовать
							еще раз.
							<CloseIcon
								className={cn(styles.errorClose, styles.close)}
								onClick={() => setError('')}
							/>
						</div>
					)}
				</div>
			</div>
		</form>
	)
}
