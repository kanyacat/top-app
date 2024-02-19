import React from 'react'
import axios from 'axios'
import {
	TopLevelCategory,
	TopPageModel
} from '../../../../interfaces/page.interface'
import { GetStaticPropsContext, Metadata } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { ProductModel } from '../../../../interfaces/product.interface'
import TopPageComponent from '@/page-components/TopPageComponent/TopPageComponent'
import { API } from '@/helpers/api'
import Head from 'next/head'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'

export default async function Course({ params }) {
	const { firstCategory, page, products }: CourseProps = await getData(params)

	return (
		<>
			{page && products && (
				<>
					<Head>
						<title>{page.metaTitle}</title>
						<meta name='description' content={page.metaDescription} />
					</Head>
					<TopPageComponent
						products={products}
						firstCategory={firstCategory}
						page={page}
					/>
				</>
			)}
		</>
	)
}

export async function getData(
	params: GetStaticPropsContext<ParsedUrlQuery> | undefined
) {
	const page = await axios.get<TopPageModel>(API.topPage.byAlias + params.alias)

	const products = await axios.post<ProductModel[]>(API.product.find, {
		category: page.data.category,
		limit: 10
	})

	return {
		firstCategory: 0,
		page: page.data,
		products: products.data
	}
}

interface CourseProps extends Record<string, unknown> {
	firstCategory?: TopLevelCategory
	page?: TopPageModel
	products?: ProductModel[]
}

export async function generateMetadata({
	params
}: {
	params: Params
}): Promise<Metadata> {
	const url = API.topPage.byAlias + params.alias

	// fetch data
	const page = await fetch(url).then(res => res.json())

	return {
		title: page.metaTitle,
		description: page.metaDescription
		// openGraph: {
		// 	title: page.title,
		// 	description: page.description,
		// 	type: 'article'
		// }
	}
}
