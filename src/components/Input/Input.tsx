import { InputProps } from './Input.props'
import React, { ForwardedRef, forwardRef } from 'react'
import cn from 'classnames'
import styles from './Input.module.css'

export const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		return (
			<div className={cn(styles.inputWrapper, className)}>
				<input
					ref={ref}
					className={cn(styles.input, {
						[styles.error]: error
					})}
					{...props}
				/>
				{error && <span className={styles.errorMessage}>{error.message}</span>}
			</div>
		)
	}
)
