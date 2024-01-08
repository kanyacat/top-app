import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ProductReview } from '../../../interfaces/product.interface'

export interface ReviewProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	review: ProductReview
}
