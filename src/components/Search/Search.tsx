'use client'

import { SearchProps } from './Search.props'
import styles from './Search.module.css'
import cn from 'classnames'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/Button/Button'
import { useState } from 'react'
import SearchIcon from '@/helpers/icons/search.svg'
import { useRouter } from 'next/navigation'

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('')
	const router = useRouter()
	const goToSearch = () => {
		router.push(`/search?q=${search}`)
		setSearch('')
	}

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			goToSearch()
			setSearch('')
		}
	}

	return (
		<div className={cn(className, styles.search, {})} {...props}>
			<Input
				className={styles.input}
				placeholder={'Поиск...'}
				value={search}
				onChange={e => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				className={styles.button}
				appearance={'primary'}
				onClick={goToSearch}
			>
				<SearchIcon />
			</Button>
		</div>
	)
}
