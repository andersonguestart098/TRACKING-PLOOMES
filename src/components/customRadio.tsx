import React from 'react'
import style from "@styles/financeiroForm.module.css"

interface itemI {
    value: string
    visualValue: string
}

type Props = {
    labelText: string
    register: any
    items: itemI[]
}

const CustomRadio = ({register, items, labelText}: Props) => {
  return (
    <div>
        <br />
        <label className={style.label}>{labelText}</label><br /><br />
        {items.map((item: itemI) => {
            return (
                <>
                    <input className={style.input} {...register} type="radio" name={labelText} value={item.value} required />
                    <label style={{fontSize: "small"}} id="option">{item.visualValue}</label><br />
                </>
            )
        })}
    </div>
  )
}

export default CustomRadio