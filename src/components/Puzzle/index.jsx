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
    arr.push(i)
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
    
    
    
    arr.forEach(() => {

      resultado.push(...arrayMem.splice(randomNumber(arrayMem.length),1));
      })

      arrayMem = [...resultado]
      resultado.forEach((element) =>{
        
        invercoes += arrayMem.reduce((acumulador, valorAtual)=>{
          
          if (element !== arr[arr.length-1]){
            if ((element)>(valorAtual)){
              console.log("inversao")
              return acumulador+1;
            }else{
              return acumulador;
            }
          }else{
              return acumulador
          }
        }, 0)
        arrayMem.shift()
      })

      if((Math.sqrt(arr.length)%2)!==0){
        if((invercoes%2)!==0){
          console.log("invercoes impares")
        }else{
          condition = false;
        }
      }else{
        if((invercoes%2)===0){
          condition = false;
        }else{
          console.log("invercoes impares")
        }
      }
  }
  console.log(resultado, invercoes);
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
            <div className="quadro" key={element} data-numero={`${index}`} style={{backgroundImage: `url("/gamephotos/Imagens/${foto}/${element}.png")`, boxShadow: `0px 0px 5px 2px white`}}></div>
          )
        }else{
          return(
            <div className="quadro" key={element} data-numero={`${index}`} style={{backgroundImage: `url("/gamephotos/Imagens/${foto}/${element}.png")`}} 
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
      <div className='container-game-instrucoes'>
        <div className='container-instrucoes'><p>Para jogar: Click nas peças em volta da peça em destaque.</p>
        </div>
        <div className="container__game jogo" style={styleColunas}>{jogo}</div>
      </div>

      <div className='container-game-instrucoes'>
        <div className='container-instrucoes'><p>Para Trocar: Click na imagem completa.</p>
        </div>
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
      
    </div>
  )
}

export default Puzzle