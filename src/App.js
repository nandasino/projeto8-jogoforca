import { useState } from "react"
import palavras from './palavras';


export default function App() {
    function comparador() { 
        return Math.random() - 0.5; 
    }
    const [palavra, setPalavra] = useState([])
    function escolherPalavra(){
        const embalharado = palavras.sort(comparador);
        const novaPalavra= embalharado[0];
        const palavraEmArray= novaPalavra.split("");
        console.log(palavraEmArray);
        setPalavra(palavraEmArray);
    }

    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    return (
        <div className='conteudo'>
            <div className='forca'>
                <img src='/assets/forca0.png'></img>
                <button onClick={escolherPalavra}>Escolher a palavra</button>
                {palavra.map((p)=> "_ ")}
            </div>
            <div className='teclado'>{alfabeto.map((l,index)=><div className='botao'>{l}</div>)}</div>
            <div className='chute'><p>Já sei a palavra</p><input></input><button>Chutar</button></div>
        </div>
    );
}