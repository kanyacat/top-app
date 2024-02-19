import styles from './page.module.css'
import { Htag } from '@/components/Htag/Htag'
import { Card } from '@/components/Card/Card'
import AdvantagesIcon from '@/helpers/icons/advantages.svg'
import { Ptag } from '@/components/Ptag/Ptag'

const text = [
	'Развитие навыков',
	'Повышение профессиональной квалификации',
	'Изучение новых сфер деятельности',
	'Самосовершенствование',
	'Приобретение новых знаний и умений',
	'Развитие личности',
	'Поддержку в обучении и развитии'
]

export default async function Home() {
	return (
		<>
			<Card className={styles.card}>
				<div className={styles.root}>
					<Htag tag={'h1'} className={styles.title}>
						Добро пожаловать на OWLtop!
					</Htag>
					<Ptag size={'m'} className={styles.p}>
						Здесь вы найдете широкий выбор образовательных программ для
						саморазвития и профессионального роста. Наш ассортимент включает
						различные курсы от ведущих экспертов в различных областях, которые
						помогут вам раскрыть ваш потенциал и достичь новых целей.
					</Ptag>
					<Ptag size={'m'} className={styles.p}>
						Ищете возможность улучшить свои навыки или изучить новую сферу
						деятельности? На нашем сайте вы найдете все необходимое для обучения
						и развития.
					</Ptag>
					<Ptag size={'m'} className={styles.p}>
						Предлагаем вам уникальную возможность обучаться онлайн в удобное для
						вас время, поэтому начинайте сейчас и двигайтесь к успеху вместе с
						нами!
					</Ptag>
					<Htag className={styles.listTitle} tag={'h2'}>
						OWLtop это:
					</Htag>
					<ul className={styles.list}>
						{text.map(t => (
							<li key={t} className={styles.text}>
								<AdvantagesIcon className={styles.icon} /> {t}
							</li>
						))}
					</ul>
					Используйте меню, чтобы найти нужный вам курс и начать обучение прямо
					сейчас!
				</div>
			</Card>
		</>
	)
}

// export default withLayout(Home)
