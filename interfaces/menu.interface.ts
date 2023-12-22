export interface MenuItem {
	_id: IdItem
	pages: PageItem[]
}

export interface PageItem {
	alias: string
	title: string
	_id: string
	category: string
}

export interface IdItem {
	secondCategory: string
}
