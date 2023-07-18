import {useState } from 'react'

class Foto {
  constructor (nome, tamanho) {
    this.nome = nome;
    this.tamanho = tamanho;
  }
}

const pastaDeFotos = [new Foto("corvo-verde", 3), new Foto("sapo-vermelho", 4)]

let indexFotos = 0;
let mtxCorreta = gerarArray(pastaDeFotos[indexFotos].tamanho);
let mtxEmbaralhada = embaralhar(mtxCorreta);
let whiteIndex;

function gerarArray(size = pastaDeFotos[indexFotos].tamanho){
  const arr = [];
  for(let i=0; i<size*size; i++){
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


function Puzzle () {

    const [jogo, setJogo] = useState(organizaQuadros(mtxEmbaralhada, pastaDeFotos[0].nome));

    const [fotoEscolhida, setFoto] = useState(pastaDeFotos[0].nome);

    function organizaQuadros(arr, foto){
    
    return(
      arr.map((element, index) => {
        if(element === mtxCorreta[mtxCorreta.length-1]){
          whiteIndex = index;
          return(
            <div className="quadro" key={element} data-numero={`${index}`} style={{color:"red", backgroundColor: "white"}}></div>
          )
        }else{
          return(
            <div className="quadro" key={element} data-numero={`${index}`} style={{color:"red", backgroundImage: `url("/gamephotos/Imagens/${foto}/${element}.png")`}} 
            onClick={(event) => setJogo(mainGame(event))}></div>
          )
        }
      })
    )
  }

  function mainGame(event){
    
    let resultado = [...mtxEmbaralhada]
    let index = parseInt(event.target.dataset.numero)
    let linha = parseInt(index/pastaDeFotos[indexFotos].tamanho);
    
    const trocaElemento = () => {
      resultado[index] = mtxEmbaralhada[whiteIndex];
      resultado[whiteIndex] = mtxEmbaralhada[index];
    }
    
        if((linha === parseInt((whiteIndex)/pastaDeFotos[indexFotos].tamanho))){
          if((mtxEmbaralhada[index-1] === mtxEmbaralhada[whiteIndex]) || (mtxEmbaralhada[index+1] === mtxEmbaralhada[whiteIndex])){
            trocaElemento()
          }
        }else if((index-pastaDeFotos[indexFotos].tamanho === whiteIndex)||(index+pastaDeFotos[indexFotos].tamanho === whiteIndex)){
          trocaElemento()
        }
    
    mtxEmbaralhada = resultado;
    console.log(pastaDeFotos[indexFotos].nome);
    return(organizaQuadros(resultado, pastaDeFotos[indexFotos].nome))
  }

  const styleColunas = {"gridTemplateColumns": `repeat(${pastaDeFotos[indexFotos].tamanho}, auto)`}

  return(
    <div className="container">
      <div className="container__game jogo" style={styleColunas}>{jogo}</div>
      <div className="container__game resposta" style={{backgroundImage: `url("/gamephotos/Imagens/${fotoEscolhida}/foto.png")`}} onClick={ () =>{
        
        if(indexFotos<pastaDeFotos.length-1){
          indexFotos++;
          setFoto(() =>{
            console.log(indexFotos)
            mtxCorreta = gerarArray(pastaDeFotos[indexFotos].tamanho);
            mtxEmbaralhada = embaralhar(mtxCorreta);
            
            setJogo(organizaQuadros(mtxEmbaralhada, pastaDeFotos[indexFotos].nome));
  
            return (pastaDeFotos[indexFotos].nome);
          })
        }
        }}></div>
    </div>
  )
}

export default Puzzle