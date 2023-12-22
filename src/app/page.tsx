import styles from './page.module.css'
import { Htag } from '@/components/Htag/Htag'
import { Button } from '@/components/Button/Button'
import { Ptag } from '@/components/Ptag/Ptag'
import { Tag } from '@/components/Tag/Tag'
import { withLayout } from '@/layout/Layout'
import axios from 'axios'
import { MenuItem } from '../../interfaces/menu.interface'

async function Home() {
	// const [rating, setRating] = useState<number>(3)
	const { menu, firstCategory }: HomeProps = await getData()
	return (
		<>
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
				<Ptag size={'s'}>
					Напишу сразу в двух курсах, так как проходил оба. Java будет многим
					непросвещённым сложновата в изучении, но здесь перевес из-за
					лидирующего положения языка как самого популярного в программировании.
					Выбор мой пал на эту профессию еще и потому, что Java-разработчики
					получают самую большую зарплату. Хотя Python начинает догонять Java по
					многим моментам, но вот в крупном екоме разработке Джава все-таки
					остается главенствующей сейчас. Скажу так – полнота программы и
					интенсивность присуща обоим курсам GeekBrains. Хочу отметить, что с
					первого дня занятий вы приступаете к практике и получаете опыт
					коммерческой разработки уже в свое резюме. Скажу вам как прошедший это
					– реально помогло в трудоустройстве!
				</Ptag>

				<Ptag size={'m'}>
					Студенты освоят не только hard skills, необходимые для работы
					веб-дизайнером, но и soft skills — навыки, которые позволят эффективно
					взаимодействовать в команде с менеджерами, разработчиками и
					маркетологами. Выпускники факультета могут успешно конкурировать с
					веб-дизайнерами уровня middle.
				</Ptag>
				<Ptag size={'l'}>
					Выше указаны программы Adobe InDesign, Adobe Illustrator, Corel Draw и
					ими можно успешно пользоваться дома или в дороге. Современные ноутбуки
					хорошо справляются с нагрузкой, так зачем загонять специалиста в
					душный офис. В этой профессии важным считается вдохновение, поэтому
					дизайнеры ищут его в разных местах.
				</Ptag>
				<Tag size={'m'} color={'grey'} href={'/10'}>
					10
				</Tag>
				<Tag>ghost</Tag>
				<Tag color={'green'}>money</Tag>
				<Tag size={'m'} color={'red'}>
					hh.ru
				</Tag>
				<Tag size={'m'} color={'primary'} href={'/meow'}>
					meow!
				</Tag>
				{/*<Rating rating={rating} isEditable setRating={setRating} />*/}
			</div>
			<ul>
				{menu ? (
					menu.map(m => (
						<li key={m._id.secondCategory}>{m._id.secondCategory}</li>
					))
				) : (
					<></>
				)}
			</ul>
		</>
	)
}

export default withLayout(Home)

export async function getData() {
	const firstCategory = 0

	const res = await axios.post<MenuItem[]>(
		process.env.NEXT_PUBLIC_DOMAIN + 'api/top-page/find',
		{ firstCategory }
	)

	const paths = res.data.flatMap(m => m.pages.map(p => '/courses/' + p.alias))
	console.log(paths)

	return {
		menu: res.data,
		firstCategory
	}
}

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[]
	firstCategory: number
}
