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
      let hexString = '';

      for (let i = 0; i < decompressed.length; i++) {
        hexString += decompressed.charCodeAt(i).toString(16);
      }

      let compressed = '';

      for (let i = 0; i < hexString.length; i += 4) {
        const chunk = hexString.slice(i, i + 4).padStart(4, '0');
        compressed += String.fromCharCode(parseInt(chunk, 16) + 1);
      }

      return compressed;
    }

    decompressnum(args) {
      const compressed = (args.compressed).toString();
      let hexString = '';

      for (let i = 0; i < compressed.length; i++) {
        const chunk = (compressed.charCodeAt(i) - 1).toString(16).padStart(4, '0');
        hexString += chunk;
      }

      let decompressed = '';

      for (let i = 0; i < hexString.length; i += 2) {
        const byte = hexString.slice(i, i + 2);
        decompressed += String.fromCharCode(parseInt(byte, 16));
      }

      return decompressed;
    }
  }
  Scratch.extensions.register(new dde_numcompress_ext());
})(Scratch);
