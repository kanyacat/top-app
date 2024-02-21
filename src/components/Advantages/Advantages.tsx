import { AdvantagesProps } from './Advantages.props'
import styles from './Advantages.module.css'
import AdvantagesIcon from '@/helpers/icons/advantages.svg'
import React from 'react'
import { Htag } from '@/components/Htag/Htag'
import { Ptag } from '@/components/Ptag/Ptag'

export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
	return (
		<>
			{advantages.length > 1 && (
				<>
					{advantages.map(a => (
						<div key={a._id} className={styles.advantage}>
							<AdvantagesIcon />
							<Htag className={styles.title} tag={'h3'}>
								{a.title}
							</Htag>
							<hr className={styles.vline} />
							<Ptag size={'l'}>{a.description}</Ptag>
						</div>
					))}
				</>
			)}
		</>
	)
}
