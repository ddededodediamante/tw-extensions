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
	    
      for (let i = 0; i < decompressed.length; i += 5) {
	const sliceEnd = i + 5 <= decompressed.length ? i + 5 : decompressed.length;
        const sliced = decompressed.slice(i, sliceEnd);
	if (!sliced.startsWith('0')) {
	  compressed += String.fromCharCode(parseInt(sliced) + 5);
	} else {
	  const countZeros = sliced.match(/^0*/)[0].length;
	  compressed += String.fromCharCode(countZeros);
		
	  const remaining = sliced.slice(countZeros);
          if (remaining !== '') {
	    for (let z = 0; i < remaining.length; z++) {
	      compressed += String.fromCharCode(parseInt(remaining.charAt(z)) + 5); 
	    }
          }
	}
      }
	    
      return compressed;
    }
    decompressnum(args) {
      const compressed = args.compressed;
      let decompressed = '';
	    
      for (let i = 0; i < compressed.length; i++) {
	const charCode = compressed.charCodeAt(i)
	if (charCode < 6) { 
          decompressed += '0'.repeat(charCode);
        } else {
	  decompressed += (charCode - 5).toString();
	}
      }

      return decompressed;
    }
  }
  Scratch.extensions.register(new dde_numcompress_ext());
})(Scratch);
