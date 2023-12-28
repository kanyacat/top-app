import React from 'react'
import axios from 'axios'
import { MenuItem } from '../../../../interfaces/menu.interface'
import { TopPageModel } from '../../../../interfaces/page.interface'
import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { ProductModel } from '../../../../interfaces/product.interface'

const firstCategory = 0

export default async function Course({ params }) {
	const { menu, firstCategory, page, products }: CourseProps = await getData(
		params
	)

	return <div>{products.length}</div>
}

export const getStaticPaths: () => Promise<{
	paths: []
	fallback: boolean
}> = async () => {
	const res = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',
		{ firstCategory }
	)

	const paths = res.data.flatMap(m => m.pages.map(p => '/courses/' + p.course))

	return {
		paths: [...paths],
		fallback: true
	}
}

export async function getData(
	params: GetStaticPropsContext<ParsedUrlQuery> | undefined
) {
	if (!params) {
		return {
			notFound: true
		}
	}

	const res = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',
		{ firstCategory }
	)

	const page = await axios.get<TopPageModel>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/byAlias/' + params.course
	)

	const products = await axios.post<ProductModel[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/product/find',
		{
			category: page.data.category,
			limit: 10
		}
	)

	return {
		menu: res.data,
		firstCategory,
		page: page.data,
		products: products.data
	}
}

interface CourseProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
	page: TopPageModel
	products: ProductModel[]
}
