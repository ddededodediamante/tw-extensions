(function(Scratch) {
  //Made by ddededodediamante
  const rightIcon = 'https://turbowarp.org/static/blocks-media/rotate-right.svg';
  const leftIcon = 'https://turbowarp.org/static/blocks-media/rotate-left.svg';
  const motion = Scratch.vm.runtime.ext_scratch3_motion;
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Extension must run unsandboxed!');
  }
  function spritebyname(name) {
    return Scratch.vm.runtime.getSpriteTargetByName(name);
  }
  class extension {
    getInfo() {
      return {
        id: 'spriteblock',
        name: 'Sprite controls',
        blocks: [
          {
            opcode: 'logsprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'log target and util'
          },
          {
            opcode: 'movestepsprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move[spritemenu][amount]steps',
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites',
              }
            }
          },
          {
            opcode: 'changexory',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change[spritemenu][menu]by[amount]',
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              menu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'xy',
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites',
              }
            }
          },
          {
            opcode: 'setxory',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set[spritemenu][menu]to[amount]',
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              menu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'xy',
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites',
              }
            }
          },
          {
            opcode: 'changexy',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change[spritemenu]x[x]y[y]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites',
              }
            }
          },
          {
            opcode: 'setxy',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set[spritemenu]to x[x]y[y]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites',
              }
            }
          },
          {
            opcode: 'changesizesprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change[spritemenu]size by[size]%',
            arguments: {
              size: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites',
              }
            }
          },
          {
            opcode: 'setsizesprite',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set[spritemenu]size to[size]%',
            arguments: {
              size: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites',
              }
            }
          },
          {
            opcode: 'turnspriteright',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn[spritemenu] [image] [amount]degrees',
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 15
              },
              image: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: rightIcon
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites'
              }
            }
          },
          {
            opcode: 'turnspriteleft',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn[spritemenu] [image] [amount]degrees',
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 15
              },
              image: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: leftIcon
              },
              spritemenu: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sprites'
              }
            }
          },
        ],
        menus: {
          sprites: {
            acceptReporters: true,
            items: 'allsprites'
          },
          xy: {
            acceptReporters: true,
            items: ['x','y']
          }
        }
      };
    }
    allsprites() {
      const array = [];
      const targets = Scratch.vm.runtime.targets;
      if (targets.length < 2) { return ['No sprites.']; }
      for (let i = 1; i < targets.length; i++) {
        const sprite = targets[i];
        if (sprite.isOriginal) {
          const name = sprite.getName();
          array.push({ text: name, value: name });
        }
      }
      return array;
    }
    logsprite(args, util) {
      console.log(util.target, util);
    }
    movestepsprite(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const amount = Scratch.Cast.toNumber(args.amount)
      motion._moveSteps(amount, target)
    }
    changexory(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const amount = Scratch.Cast.toNumber(args.amount)
      if (args.menu == 'x') {
        target.setXY(target.x+amount, target.y)
      } else if (args.menu == 'y') {
        target.setXY(target.x, target.y+amount)
      }
    }
    setxory(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const amount = Scratch.Cast.toNumber(args.amount)
      if (args.menu == 'x') {
        target.setXY(amount, target.y)
      } else if (args.menu == 'y') {
        target.setXY(target.x, amount)
      }
    }
    changexy(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const amounts = [Scratch.Cast.toNumber(args.x),Scratch.Cast.toNumber(args.y)]
      target.setXY(target.x+amounts[0], target.y+amounts[1])
    }
    setxy(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const amounts = [Scratch.Cast.toNumber(args.x),Scratch.Cast.toNumber(args.y)]
      target.setXY(amounts[0], amounts[1])
    }
    setsizesprite(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const size = Scratch.Cast.toNumber(args.size)
      target.setSize(size)
    }
    changesizesprite(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const size = Scratch.Cast.toNumber(args.size)
      target.setSize(target.size+size)
    }
    turnspriteright(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const amount = Scratch.Cast.toNumber(args.amount)
      target.setDirection(target.direction+amount)
    }
    turnspriteleft(args, util) {
      const target = spritebyname(args.spritemenu)
      if (target == null) { return; }
      const amount = Scratch.Cast.toNumber(args.amount)
      target.setDirection(target.direction-amount)
    }
  }
  Scratch.extensions.register(new extension());
})(Scratch);
