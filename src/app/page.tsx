import styles from './page.module.css'
import { Htag } from '@/components/Htag/Htag'
import { Ptag } from '@/components/Ptag/Ptag'

export default async function Home() {
	return (
		<>
			<div className={styles.root}>
				<Htag tag={'h1'}> Добро пожаловать на наш сайт!</Htag>
				Добро пожаловать на наш сайт, ваш партнер в саморазвитии и обучении!
				Этот сайт предоставляет вам широкий выбор образовательных курсов и
				возможность раскрыть ваш потенциал. Мы предлагаем: 1. Развитие навыков
				2. Повышение профессиональной квалификации 3. Изучение новых сфер
				деятельности 4. Самосовершенствование 5. Приобретение новых знаний и
				умений 6. Развитие личности 7. Поддержку в обучении и развитии
				Используйте сайдбар слева, чтобы выбрать курсы, которые помогут вам
				стать лучше и достичь новых высот. Давайте вместе двигаться вперед и
				развиваться!
				<Htag tag={'h2'}> OWLtop это:</Htag>
				<ul>
					<li>
						<Ptag size={'m'}>
							широкий выбор курсов для образования и развития
						</Ptag>
					</li>
					<li>
						получение новых навыков, расширение знаний и достижение новых высот{' '}
					</li>
					<li>курсы как для начинающих, так и для опытных профессионалов </li>
				</ul>
				Используйте сайдбар слева, чтобы найти нужный вам курс и начать обучение
				прямо сейчас!
			</div>
			АНАЛИТИКА БИЗНЕС ДИЗАЙН ИГРЫ КРАСОТА И ЗДОРОВЬЕ МАРКЕТИНГ ПРОГРАММИРОВАНИЕ
			ПРОЧЕЕ СОЗДАНИЕ КОНТЕНТА УПРАВЛЕНИЕ ЯЗЫКИ
		</>
	)
}

// export default withLayout(Home)
