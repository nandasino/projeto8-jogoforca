import { useState } from "react"
import palavras from './palavras';


export default function App() {
    function comparador() { 
        return Math.random() - 0.5; 
    } 
    const imagens = ['/assets/forca0.png', '/assets/forca1.png', '/assets/forca2.png', '/assets/forca3.png', '/assets/forca4.png', '/assets/forca5.png', '/assets/forca6.png']
    const [vida,setVida] = useState(0);
    const [palavra, setPalavra] = useState([]);
    const [imagem, setImagem] = useState(imagens[0]);
    const [tentativas, setTentativas]= useState([]);
    const [letrasCertas, setLetrasCertas]= useState([]);
    const[arrayCertas, setArrayCertas]= useState([]);
    const [resultado, setResultado]= useState([]);

    function escolherPalavra(){
        const embalharado = palavras.sort(comparador);
        const novaPalavra= embalharado[0];
        const palavraEmArray= novaPalavra.split("");
        setPalavra(palavraEmArray);
    }
    function tentarLetra(letra){
        setTentativas([...tentativas,letra]);
        console.log(palavra);
        if(palavra.includes(letra)){
            console.log("tem essa letra");
            for(let i=0; i< palavra.length; i++){
                if(letra=== palavra[i]){
                   setLetrasCertas([...letrasCertas,letra]);
                   arrayCertas.push(letra);
                   console.log(arrayCertas);
                   if(arrayCertas.length===palavra.length||vida===6){
                    setResultado(palavra);
                   }
                }
            }
        }
        else{
            console.log("não tem essa letra");
            setVida(vida+1);
            setImagem(imagens[vida+1]);
        }
    }
    function fimDeJogo(letra){
        if(vida>=6){
            setResultado(palavra);
        }
        if (palavra.length === 0){
            alert("escolha uma palavra");
        }
        if (tentativas.includes(letra)){
            return;
        }
    }
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    return (
        <div className='conteudo'>
            <div className='forca'>
                <img src= {imagem}></img>
                <p>Vidas usadas: {vida}</p>
                <button onClick={tentativas.length===0? escolherPalavra: ()=>alert("você não pode mais escolher uma palavra")}>Escolher a palavra</button>
                <div className={resultado.length===0? "aparece": "some"}>{palavra.map((l)=>(letrasCertas.includes(l)? l: "_ "))}</div>
                <div className={vida<6? "verde": "vermelho"}>{resultado}</div>
            </div>
            <div className='teclado'>
                {alfabeto.map((l)=>
                <div onClick={ vida<6 && palavra.length !== 0 && !tentativas.includes(l) && resultado.length ===0
                ? ()=> tentarLetra(l): ()=>fimDeJogo(l) } 
                className={ `botao ${vida<6 && palavra.length !== 0 && !tentativas.includes(l) && resultado.length ===0 ? "azul": "cinza"}`}
                >{l}</div>)}
            </div>
            <div className='chute'><p>Já sei a palavra</p><input></input><button>Chutar</button></div>
        </div>
    );
}
