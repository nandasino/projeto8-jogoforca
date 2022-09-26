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
    const [chute, setChute]= useState("");
    const [string,setString]= useState("");

    function escolherPalavra(){
        setVida(0);
        setPalavra([]);
        setImagem(imagens[0]);
        setTentativas([]);
        setLetrasCertas([]);
        setArrayCertas([]);
        setResultado([]);
        setString("");
        const embalharado = palavras.sort(comparador);
        const novaPalavra= embalharado[0];
        setString(novaPalavra);
        const palavraAcento = novaPalavra.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        const palavraEmArray= palavraAcento.split("");
        setPalavra(palavraEmArray);
    }
    function tentarLetra(letra){
        setTentativas([...tentativas,letra]);
        if(palavra.includes(letra)){
            for(let i=0; i< palavra.length; i++){
                if(letra=== palavra[i]){
                   setLetrasCertas([...letrasCertas,letra]);
                   arrayCertas.push(letra);
                   console.log(arrayCertas);
                   if(arrayCertas.length===palavra.length||vida===6){
                    setResultado(string.split(""));
                   }
                }
            }
        }
        else{
            setVida(vida+1);
            setImagem(imagens[vida+1]);
        }
    }
    function fimDeJogo(letra){
        if(vida>=6){
            setResultado(string.split(""));
        }
        if (palavra.length === 0){
            alert("escolha uma palavra");
        }
        if (tentativas.includes(letra)){
            return;
        }
    }
    function chutar(){
        if(chute=== string){
            setResultado(string);
        }
        if(chute !== string){
            setResultado(string);
            setVida(6);
            setImagem(imagens[6]);
        }
    }
    function fazNada(){
        return;
    }
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    return (
        <div className='conteudo'>
            <div className='forca'>
                <div className="imagem">
                    <img data-identifier="game-image" src= {imagem}></img>
                </div>
                <div className="escolher-dica">
                    <button data-identifier="choose-word" onClick={escolherPalavra}>Escolher palavra</button>
                    <div className="dica">
                        <div data-identifier="word" className={resultado.length===0? "aparece": "some"}>{palavra.map((l)=>(letrasCertas.includes(l)? l: "_ "))}</div>
                        <div className={vida<6? "verde": "vermelho"}>{resultado}</div>
                    </div>
                </div>
            </div>
            <div className='teclado'>
                {alfabeto.map((l,index)=>
                <div data-identifier="letter" onClick={ vida<6 && palavra.length !== 0 && !tentativas.includes(l) && resultado.length ===0
                ? ()=> tentarLetra(l): ()=>fimDeJogo(l) } 
                key={index} className={ `botao ${vida<6 && palavra.length !== 0 && !tentativas.includes(l) && resultado.length ===0 ? "azul": "cinza"}`}
                >{l}</div>)}
            </div>
            <div className='chute'><p>Já sei a palavra</p><input data-identifier="type-guess" placeholder="" value={chute} onChange={e => setChute(e.target.value)} /><button data-identifier="guess-button" onClick={resultado.length===0? chutar: fazNada}>Chutar</button></div>
        </div>
    );
}
