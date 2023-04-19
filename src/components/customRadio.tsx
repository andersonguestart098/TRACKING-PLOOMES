import React from 'react'
import style from "@styles/financeiroForm.module.css"
import { ChangeHandler } from 'react-hook-form'

interface itemI {
    value: string
    visualValue: string
    checked?: boolean
}

type Props = {
    labelText: string
    register: any
    items: itemI[]
    onchange?(e: any): any 
}

const CustomRadio = (props: Props) => {
    const {register, items, labelText, onchange} = props
  return (
    <div>
        <br />
        <label 
            className={style.label}
            >{labelText}</label><br /><br />
        {items.map((item: itemI) => {
            return (
                <>
                    <input 
                        key={item.value}
                        {...register}
                        className={style.input} 
                        onChange={(e) => props.onchange?.(e) ?? {}}  
                        type="radio" 
                        value={item.value} 
                        checked={item.checked}
                        required />
                    <label 
                    style={{fontSize: "small"}}
                    id="option">{item.visualValue}</label><br />
                </>
            )
        })}
    </div>
  )
}

export default CustomRadio