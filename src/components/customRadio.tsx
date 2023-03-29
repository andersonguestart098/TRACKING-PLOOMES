import React from 'react'
import style from "@styles/financeiroForm.module.css"
import { ChangeHandler } from 'react-hook-form'

interface itemI {
    value: string
    visualValue: string
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
                        {...register}
                        className={style.input} 
                        onChange={(e) => props.onchange?.(e) ?? {}}  
                        type="radio" 
                        value={item.value} 
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