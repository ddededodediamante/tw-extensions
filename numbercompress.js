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
	    
      for (let i = 0; i < decompressed.length; i += 3) {
	const sliceEnd = i + 3 <= decompressed.length ? i + 3 : decompressed.length;
        const sliced = decompressed.slice(i, sliceEnd);
        const num = parseInt(sliced, 10);

        compressed += String.fromCharCode(num);
      }

      return compressed;
    }
    decompressnum(args) {
      const compressed = args.compressed;
      let decompressed = '';
	    
      for (let i = 0; i < compressed.length; i++) {
	const num = compressed.charCodeAt(i)
        if (i < compressed.length - 1 && compressed[i + 1] === '.') {
          decompressed += '.';
          i++;
        } else {
          decompressed += num.toString().padStart(3, '0');
        }
      }

      return decompressed;
    }
  }
  Scratch.extensions.register(new dde_numcompress_ext());
})(Scratch);
