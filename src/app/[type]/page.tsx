import React from 'react'
import { GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { firstLevelMenu } from '@/helpers/helpers'

export default async function Page({ params }) {
	const { firstCategory } = await getData(params)
	return <div>Category: {firstCategory}</div>
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

	return {
		firstCategory: firstCategoryItem.id
	}
}
