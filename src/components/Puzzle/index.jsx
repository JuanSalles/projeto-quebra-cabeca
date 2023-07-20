import {useState } from 'react'

class Foto {
  constructor (nome, tamanho) {
    this.nome = nome;
    this.tamanho = tamanho;
  }
}

const pastaDeFotos = [new Foto("corvo-verde", 3), new Foto("sapo-vermelho", 4), new Foto("corvo-azul", 5)];

let whiteIndex;
let indexFotos = 0;
let invercoes;
let mtxCorreta = gerarArray(pastaDeFotos[indexFotos].tamanho);
let mtxEmbaralhada = embaralhar(mtxCorreta);
let yourTaps = 0;
let vitoria = false;

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
      resultado.forEach((element, index) =>{
        
        invercoes += arrayMem.reduce((acumulador, valorAtual)=>{
          
          if (element !== arr[arr.length-1]){
            if ((element)>(valorAtual)){
              console.log("inversao")
              return acumulador+1;
            }else{
              return acumulador;
            }
          }else{
              whiteIndex = index;
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
      }else if(((parseInt(whiteIndex/pastaDeFotos[indexFotos].tamanho))%2)!==0){
          if((invercoes%2)===0){
            condition = false;
          }
      }else if((invercoes%2)!==0){
        condition = false;
      }
      
  }
  console.log(resultado, invercoes);
  return resultado;
}


function Puzzle () {

  const [jogo, setJogo] = useState(organizaQuadros(mtxEmbaralhada, pastaDeFotos[0].nome));

  const [fotoEscolhida, setFoto] = useState(pastaDeFotos[0].nome);

  const [ajuda, setAjuda] = useState (() => "");

  function organizaQuadros(arr, foto){
      let proporcao = window.screen.width*0.82;
      let styleQuadrosBrancos = {
        width: `${proporcao/(pastaDeFotos[indexFotos].tamanho)}px`,
        height: `${proporcao/(pastaDeFotos[indexFotos].tamanho)}px`,
        maxWidth: "110px",
        maxHeight:"110px"
      }
      return(
      arr.map((element, index) => {
        if(element === mtxCorreta[mtxCorreta.length-1]){
          whiteIndex = index;
          console.log(whiteIndex);
          return(
            <div className="quadro branco" key={element} data-numero={`${index}`} style={styleQuadrosBrancos}></div>
          )
        }else{
          return(
            <div className="quadro" key={element} data-numero={`${index}`} style={{backgroundImage: `url("/gamephotos/Imagens/${foto}/${element}.png")`, ...styleQuadrosBrancos}} 
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
            yourTaps++
          }
        }else if((index-pastaDeFotos[indexFotos].tamanho === whiteIndex)||(index+pastaDeFotos[indexFotos].tamanho === whiteIndex)){
          trocaElemento()
          yourTaps++
        }
    
    mtxEmbaralhada = resultado;
    
    vitoria = resultado.length === mtxCorreta.length && resultado.every((value, index) => value === mtxCorreta[index])

    setAjuda(()=>{
      if(vitoria){
        let audio = new Audio("/audios/sabre.mp3")
        audio.play();
        return(
          <div className='ajudaDoJogo'>
          <p>Agradecer a força, voce deve!</p>
          <img src="/emote/yoda.png"/>
          </div>
        )
      }else{
        return ""
      }
    })
    
    console.log(pastaDeFotos[indexFotos].nome);
    return(organizaQuadros(resultado, pastaDeFotos[indexFotos].nome))
  }

  const styleColunas = {
    "gridTemplateColumns": `repeat(${pastaDeFotos[indexFotos].tamanho}, auto)`,
  }

   
  return(
    <div className='container-jogo' style={{width: window.screen.width*0.82}}>
      <div className="container-puzzle">
        <p>{pastaDeFotos[indexFotos].tamanho}X{pastaDeFotos[indexFotos].tamanho}</p>
        <div className="container__game" style={styleColunas}>{jogo}</div>
      </div>
        <button type="button" className='botao-ajuda' onClick={() => 
          setAjuda(() => {

            if (ajuda === ""){
              return(
                <div className='ajudaDoJogo'>
                <p>Mover as peças pelo espaço vazio, você deve!</p>
                <img src="/emote/yoda.png"/>
                </div>
              )
            }else{
              return ""
            }
              
          })
          }>HELP</button>

        <span className='container__ajudaDoJogo'>{ajuda}</span>
      
      <div className='container__scores'>
          <div className='scores'>
          <h2>SCORES</h2>
          <p>Min: {`${invercoes}`}</p>
          <p>Your taps: {`${yourTaps}`}</p>
          </div>
      </div>


      <div className='titulo-escolhas'>
          <p>CHOSE YOUR IA PIC</p>
      </div>
      <div className='container-escolhas'>
        {pastaDeFotos.map((element, index)=>{

          return(
            <div key={`seletor-${element.nome}`} className='botao-escolha' style={{backgroundImage:`url("/gamephotos/Imagens/${element.nome}/foto.png")`}} id={`escolha-${element.nome}`} onClick={(event) => {
              setFoto(() =>{
                vitoria = false;

                yourTaps = 0;
                
                mtxCorreta = gerarArray(pastaDeFotos[index].tamanho);
                mtxEmbaralhada = embaralhar(mtxCorreta);

                indexFotos = index;
                
                setJogo(organizaQuadros(mtxEmbaralhada, pastaDeFotos[index].nome));
      
                return (pastaDeFotos[index].nome);
              })
            }}></div>
          )

        })}
      </div>
      
    
    </div>
  )
}

export default Puzzle