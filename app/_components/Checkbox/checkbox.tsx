'use client'

import { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { Prefecture } from '@/types/prefecture'

const Checkbox = forwardRef(({data, onClick, disable}: CheckboxProps, _ref) => {
  const [isChecked, setCheck] = useState(false)

  const onClickHandle = () => {
    if (disable) {
      return
    }
    setCheck(!isChecked)
    onClick(data, isChecked)
  }

  useImperativeHandle(_ref, () => ({
    reset: () => setCheck(false)
  }))

  return (
    <div
      className={`${isChecked ? 'bg-sky-600 text-white' : 'bg-slate-100 text-black'} w-fit cursor-default p-2 rounded-xl mb-1 mr-1.5 flex items-center`}
      onClick={() => onClickHandle()}
    >
      { data.prefName }
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox

type CheckboxProps = {
  data: Prefecture,
  onClick: Function,
  disable: Boolean
}
