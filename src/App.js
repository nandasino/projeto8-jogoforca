import palavras from './palavras';


export default function App() {
    const alfabeto = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    return (
        <div className='conteudo'>
            <div className='forca'>
                <img src='/assets/forca0.png'></img>
                <button>Escolher a palavra</button>
            </div>
            <div className='teclado'>{alfabeto.map((l)=><div className='botao'>{l}</div>)}</div>
            <div className='chute'><p>Já sei a palavra</p><input></input><button>Chutar</button></div>
        </div>
    );
}