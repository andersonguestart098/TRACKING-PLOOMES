import React from 'react'
import style from "@styles/pagina404.module.css"

type Props = {}

const index = (props: Props) => {
  return (
    <>
      <img src='https://media3.giphy.com/media/3o6gE4sYR8gxW6CLW8/giphy.gif?cid=ecf05e472hmy9d2dfftdyy2ksl83oy0qca7x3vs8k978qhfa&rid=giphy.gif&ct=g' className={style.background} />
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white"
      }}>
        <h1>PAGINA NÃO ENCONTRADA</h1>
      </div> 
    </>
  )
}

export default index