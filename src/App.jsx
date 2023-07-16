import { useEffect, useState } from 'react'
import './App.css'

const colunas = 3;
const mtxCorreta = gerarArray(colunas);
let mtxEmbaralhada = embaralhar(mtxCorreta);
let whiteIndex;

function gerarArray(linhas){
  const arr = [];
  for(let i=0; i<linhas*linhas; i++){
    arr.push(String.fromCharCode(65+i))
  }
  return arr
}

function embaralhar (arr){

  let resultado;
  let arrayMem;
  let invercoes;
  let condition = true;

  const randomNumber = (max) =>{
    let result = Math.floor(Math.random() * max);
    return result
  }
  while(condition){

    resultado = [];
    arrayMem = [...arr];
    invercoes = 0;
    
    arr.forEach((element, index) => {

      resultado.push(...arrayMem.splice(randomNumber(arrayMem.length),1));

      if(element !== resultado[index]){
        invercoes++
        console.log(invercoes, arr.length-1)
      }
      if(index===arr.length-1){
        if((invercoes%2)!==0){
          condition = false;
        }    
      }
      
    })
  }
  

  return resultado;
}

function App() {

  const [jogo, setJogo] = useState(organizaQuadros(mtxEmbaralhada));

  function organizaQuadros(arr){
    
    
    return(
      arr.map((element, index) => {
        if(element === mtxCorreta[mtxCorreta.length-1]){
          whiteIndex = index;
          return(
            <div className="quadro" key={element} data-numero={`${index}`} style={{color:"red", backgroundColor: "white"}}></div>
          )
        }else{
          return(
            <div className="quadro" key={element} data-numero={`${index}`} style={{color:"red", backgroundImage: `url("/gamephotos/${element}.png")`}} 
            onClick={(event) => setJogo(mainGame(event))}></div>
          )
        }
      })
    )
  }

  function mainGame(event){
    
    let resultado = [...mtxEmbaralhada]
    let index = parseInt(event.target.dataset.numero)
    let linha = parseInt(index/colunas);
  
    const trocaElemento = () => {
      resultado[index] = mtxEmbaralhada[whiteIndex];
      resultado[whiteIndex] = mtxEmbaralhada[index];
    }
    
        if((linha === parseInt((whiteIndex)/colunas))){
          if((mtxEmbaralhada[index-1] === mtxEmbaralhada[whiteIndex]) || (mtxEmbaralhada[index+1] === mtxEmbaralhada[whiteIndex])){
            trocaElemento()
          }
        }else if((index-colunas === whiteIndex)||(index+colunas === whiteIndex)){
          trocaElemento()
        }
    
    mtxEmbaralhada = resultado;
    return(organizaQuadros(resultado))
  }

  const styleColunas = {"grid-template-columns": `repeat(${colunas}, auto)`}
  return (
    <>
    <div className="container">
      <div className="container__game jogo" style={styleColunas}>{jogo}</div>
      <div className="container__game resposta" style={{backgroundImage: `url("/gamephotos/foto.png")`}}></div>
    </div>
    </>
    
  )
}

export default App
