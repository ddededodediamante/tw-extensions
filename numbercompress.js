(function (Scratch) {
  class dde_numcompress_ext {
    compressionLevel = 4;

    getInfo() {
      return {
        id: "ddenumbercompress",
        name: "Number Compress",
        color1: "#3d4052",
        blocks: [
          {
            opcode: "setcompresslvl",
            blockType: Scratch.BlockType.COMMAND,
            text: "set compression level to [lvlsMenu]",
            arguments: {
              lvlsMenu: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "compressLvls",
                defaultValue: "4",
              },
            },
          },
          {
            opcode: "compressnum",
            blockType: Scratch.BlockType.REPORTER,
            text: "compress [number]",
            arguments: {
              number: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1093123874,
              },
            },
          },
          {
            opcode: "decompressnum",
            blockType: Scratch.BlockType.REPORTER,
            text: "decompress [compressed]",
            arguments: {
              compressed: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "compressed",
              },
            },
          },
        ],
        menus: {
          compressLvls: {
            acceptReporters: false,
            items: [
              {
                text: "2 (lowest)",
                value: "2",
              },
              "3",
              {
                text: "4 (maximum)",
                value: "4",
              },
            ],
          },
        },
      };
    }
    setcompresslvl(args) {
      const level = args.lvlsMenu;
      this.compressionLevel = level;
      console.log(level);
    }
    compressnum(args) {
      const decompressed = args.number.toString();
      const compressedArray = [];
      const compressLevel = this.compressionLevel;

      for (let i = 0; i < decompressed.length; i += compressLevel) {
        const sliceEnd = Math.min(i + compressLevel, decompressed.length);
        const sliced = decompressed.slice(i, sliceEnd);

        if (!sliced.startsWith("0")) {
          compressedArray.push(String.fromCharCode(parseInt(sliced)));
        } else {
          let countZeros = sliced.match(/^0*/)[0].length;
          compressedArray.push(String.fromCharCode(9999 + countZeros));

          const remaining = sliced.slice(countZeros);
          if (remaining !== "") {
            compressedArray.push(String.fromCharCode(parseInt(remaining)));
          }
        }
      }

      return compressedArray.join("");
    }

    decompressnum(args) {
      const compressed = args.compressed;
      const decompressedArray = [];

      for (let i = 0; i < compressed.length; i++) {
        const charCode = compressed.charCodeAt(i);

        if (charCode > 9999) {
          decompressedArray.push("0".repeat(charCode - 9999));
        } else {
          decompressedArray.push(charCode.toString());
        }
      }

      return decompressedArray.join("");
    }
  }
  Scratch.extensions.register(new dde_numcompress_ext());
})(Scratch);
