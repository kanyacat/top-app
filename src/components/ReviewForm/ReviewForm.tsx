import { ReviewFormProps } from './ReviewForm.props'
import styles from './ReviewForm.module.css'
import cn from 'classnames'
import { Input } from '@/components/Input/Input'
import { Rating } from '@/components/Rating/Rating'
import { Textarea } from '@/components/Textarea/Textarea'
import { Button } from '@/components/Button/Button'
import CloseIcon from '@/helpers/icons/greenClose.svg'
import { Controller, useForm } from 'react-hook-form'
import { IReviewForm } from '@/components/ReviewForm/ReviewForm.interface'

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IReviewForm>()

	const onSubmit = (data: IReviewForm) => {
		console.log(data)
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
				/>
				<Input
					{...register('title', {
						required: { value: true, message: 'Заполните заголовок отзыва' }
					})}
					className={styles.title}
					placeholder={'Заголовок отзыва'}
					error={errors.title}
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
				/>
				<div className={styles.submit}>
					<Button appearance={'primary'} className={styles.button}>
						Отправить
					</Button>
					<span className={styles.info}>
						* Перед публикацией отзыв пройдет предварительную модерацию и
						проверку
					</span>
					<div className={styles.success}>
						<div className={styles.successTtitle}>Ваш отзыв отправлен.</div>
						<div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
						<CloseIcon className={styles.close} />
					</div>
				</div>
			</div>
		</form>
	)
}
