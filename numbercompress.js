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
                defaultValue: 1093874
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
      const decompressed = (args.number).toString();
      let compressed = '';

      for (let i = 0; i < decompressed.length; i += 4) {
        const chunk = decompressed.slice(i, i + 4);
        compressed += String.fromCharCode(parseInt(chunk, 10) + 1);
      }
      return compressed;
    }
    decompressnum(args) {
      const compressed = (args.compressed).toString();
      let decompressed = '';

      for (let i = 0; i < compressed.length; i++) {
        const chunk = (compressed.charCodeAt(i) - 1).toString().padStart(4, '0');
        decompressed += chunk;
      }
      return decompressed;
    }
  }
  Scratch.extensions.register(new dde_numcompress_ext());
})(Scratch);
