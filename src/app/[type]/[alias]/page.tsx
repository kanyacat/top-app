import React from 'react'
import axios from 'axios'
import {
	TopLevelCategory,
	TopPageModel
} from '../../../../interfaces/page.interface'
import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { ProductModel } from '../../../../interfaces/product.interface'
import { firstLevelMenu } from '@/helpers/helpers'
import TopPageComponent from '@/page-components/TopPageComponent/TopPageComponent'

export default async function Course({ params }) {
	const { firstCategory, page, products }: CourseProps = await getData(params)

	return (
		<TopPageComponent
			products={products}
			firstCategory={firstCategory}
			page={page}
		/>
	)
}

export async function getData(
	params: GetStaticPropsContext<ParsedUrlQuery> | undefined
) {
	if (!params) {
		return {
			notFound: true
		}
	}

	const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)
	if (!firstCategoryItem) {
		return {
			notFound: true
		}
	}

	const page = await axios.get<TopPageModel>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/byAlias/' + params.alias
	)

	const products = await axios.post<ProductModel[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/product/find',
		{
			category: page.data.category,
			limit: 10
		}
	)

	return {
		firstCategory: firstCategoryItem.id,
		page: page.data,
		products: products.data
	}
}

interface CourseProps extends Record<string, unknown> {
	firstCategory: TopLevelCategory
	page: TopPageModel
	products: ProductModel[]
}
