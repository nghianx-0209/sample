'use client'

import { useState } from 'react'
import { Prefecture } from '@/types/prefecture'

export default function Checkbox({data, onClick}: CheckboxProps) {
  const [isChecked, setCheck] = useState(false)

  const onClickHandle = () => {
    setCheck(!isChecked)
    onClick(data, isChecked)
  }

  return (
    <div
      className={`${isChecked ? 'bg-sky-600 text-white' : 'bg-slate-100 text-black'} w-fit cursor-default p-2 rounded-xl mb-1 mr-1.5 flex items-center`}
      onClick={() => onClickHandle()}
    >
      { data.prefName }
    </div>
  )
}

type CheckboxProps = {
  data: Prefecture,
  onClick: Function
}
