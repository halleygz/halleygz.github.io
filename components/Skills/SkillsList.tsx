import { SkillListProps } from '@/types/ComponentProps'
import React from 'react'
import SkillsCard from './SkillsCard'

const SkillsList:React.FC<SkillListProps> = ({
    skills
}) => {
  return (
    <div className="flex flex-col gap-4 max-w-full md:max-w-3/4 md:ml-1 lg:ml-2">
      {skills.map((skill)=> (<SkillsCard setName={skill.setName} set={skill.set} key={skill.setName}/>))}
    </div>
  )
}

export default SkillsList
