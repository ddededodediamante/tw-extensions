(function(Scratch) {
  class dde_numcompress_ext {
    getInfo() {
      return {
        id: 'ddenumbercompress',
        name: 'Number Compress',
        blocks: [
          {
            opcode: 'compressnum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'compress [number]',
            arguments: {
              number: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1093123874
              }
            }
          },
          {
            opcode: 'decompressnum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'decompress [compressed]',
            arguments: {
              compressed: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'compressed'
              }
            }
          }
	]
      };
    }
    compressnum(args) {
      const decompressed = args.number.toString();
      let compressed = '';
      const indexBeforeAny = str => str.lastIndexOf('0', str.search(/[^0]/));
       const charCodeZero = String.fromCharCode(0);

      for (let i = 0; i < decompressed.length; i += 3) {
	const sliceEnd = i + 3 <= decompressed.length ? i + 3 : decompressed.length;
        const sliced = decompressed.slice(i, sliceEnd);
        const num = Number(sliced);
	if (num == sliced && num > 0) {
	  compressed += String.fromCharCode(num);
	} else {
	  let sliceIBA = indexBeforeAny(sliced);
	  if (sliceIBA === -1) { 
	    sliceIBA = sliced.length;
	  }
	  const zeros = sliced.slice(0, sliceIBA);
	  const afterZero = sliced.slice(sliceIBA);
	  compressed += charCodeZero.repeat(zeros.length);
	  if (afterZero != '') {
            compressed += String.fromCharCode(afterZero);
	  }
	}
      }
      return compressed;
    }
    decompressnum(args) {
      const compressed = args.compressed;
      let decompressed = '';
      const charCodeZero = String.fromCharCode(0);
	    
      for (let i = 0; i < compressed.length; i++) {
	const char = compressed.charAt(i);
	console.log(char)
	if (char === charCodeZero) {
	  decompressed += '0';
	} else {
	  decompressed += compressed.charCodeAt(i);
	}
      }

      return decompressed;
    }
  }
  Scratch.extensions.register(new dde_numcompress_ext());
})(Scratch);
