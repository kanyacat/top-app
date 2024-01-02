import { FirstLevelMenuItem } from '../../interfaces/menu.interface'
import { TopLevelCategory } from '../../interfaces/page.interface'
import CoursesIcon from './icons/courses.svg'
import BooksIcon from './icons/books.svg'
import ProductIcon from './icons/product.svg'
import ServicesIcon from './icons/services.svg'

export const firstLevelMenu: FirstLevelMenuItem[] = [
	{
		route: 'courses',
		name: 'Курсы',
		icon: <CoursesIcon />,
		id: TopLevelCategory.Courses
	},
	{
		route: 'services',
		name: 'Сервисы',
		icon: <ServicesIcon />,
		id: TopLevelCategory.Services
	},
	{
		route: 'books',
		name: 'Книги',
		icon: <BooksIcon />,
		id: TopLevelCategory.Books
	},
	{
		route: 'products',
		name: 'Товары',
		icon: <ProductIcon />,
		id: TopLevelCategory.Products
	}
]

export const countRegex = (price: number, currency: string = '₽'): string => {
	return price
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
		.concat(` ${currency}`)
}
