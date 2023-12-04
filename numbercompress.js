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
	    
      for (let i = 0; i < decompressed.length; i += 4) {
	const sliceEnd = i + 4 <= decompressed.length ? i + 4 : decompressed.length;
        const sliced = decompressed.slice(i, sliceEnd);
	if (!sliced.startsWith('0')) {
	  compressed += String.fromCharCode(parseInt(sliced));
	} else {
	  let countZeros = sliced.match(/^0*/)[0].length;
          for (let j = sliceEnd; j < decompressed.length && decompressed[j] === '0'; j++) {
            countZeros++;
          }
	  compressed += String.fromCharCode(9999 + countZeros);
		
	  const remaining = sliced.slice(countZeros);
          if (remaining !== '') {
	    compressed += String.fromCharCode(parseInt(remaining)); 
          }

	  i += countZeros - 1;
	}
      }
	    
      return compressed;
    }
    decompressnum(args) {
      const compressed = args.compressed;
      let decompressed = '';
	    
      for (let i = 0; i < compressed.length; i++) {
	const charCode = compressed.charCodeAt(i)
	if (charCode > 9999) { 
          decompressed += '0'.repeat(charCode - 9999);
        } else {
	  decompressed += charCode.toString();
	}
      }

      return decompressed;
    }
  }
  Scratch.extensions.register(new dde_numcompress_ext());
})(Scratch);
