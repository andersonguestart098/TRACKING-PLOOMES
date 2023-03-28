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
    onchange?(e: any): any 
    visible?: boolean
}

const CustomRadio = (props: Props) => {
    const {register, items, labelText, onchange} = props
    if(props.visible == undefined) {
        props.visible = false
    }
  return (
    <div>
        <br />
        <label className={style.label}>{labelText}</label><br /><br />
        {items.map((item: itemI) => {
            return (
                <>
                    <input className={props.visible ? {} : style.input} {...register} type="radio" name={labelText} value={item.value} onChange={(e) => props.onchange?.(e) ?? {}} />
                    <label style={{fontSize: "small"}} id="option">{item.visualValue}</label><br />
                </>
            )
        })}
    </div>
  )
}

export default CustomRadio