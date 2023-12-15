import styles from './page.module.css'
import { Htag } from '@/components/Htag/Htag'
import { Button } from '@/components/Button/Button'

export default function Home(): JSX.Element {
	return (
		<main>
			<div className={styles.root}>
				<Htag tag={'h1'}>Текст</Htag>
				<Htag tag={'h2'}>Текст</Htag>
				<Htag tag={'h3'}>Текст</Htag>
				<Button appearance={'primary'} arrow={'right'} className='fdsf'>
					жми
				</Button>
				<Button appearance={'ghost'} arrow={'down'}>
					жми
				</Button>
			</div>
		</main>
	)
}
