(function(Scratch) {
  class test_ext {
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
      const decompressed = (args.num).toString();
      let compressed = '';
      for (let i = 0; i < decompressed.length; i++) {
        compressed += String.fromCharCode(decompressed.charCodeAt(i) + 2);
      }
      return compressed;
    }
    decompressnum(args) {
      const compressed = (args.compressed).toString();
      let decompressed = '';
      for (let i = 0; i < compressed.length; i++) {
        decompressed += String.fromCharCode(compressed.charCodeAt(i) - 2);
      }
      return parseFloat(decompressed);
    }
  }
  Scratch.extensions.register(new test_ext());
})(Scratch);
