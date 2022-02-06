import * as esbuild from 'esbuild-wasm';
import { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef<any>();

	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const onClick = async () => {
    if (!ref.current) return;

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    }); // does transpiling.
    setCode(result.code);
  };

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm' // fetches from public directory.
    });
  }

  useEffect(() => {
    startService();
  }, [])

	return (
		<div>
			<textarea
				onChange={e => setInput(e.target.value)}
				value={input}
			></textarea>
			<div>
				<button onClick={onClick}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector('#root'));
