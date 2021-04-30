import React from "react";
import "./style.css";



export default function Gamer({title,description,addWord}) {

return(
  <>
      <h2>{title}</h2>
      <p> {description} </p>
  </>
)

}