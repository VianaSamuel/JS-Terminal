//IMPORTACOES//
const fs = require('fs');                // interagir com o sistema de arquivos do computador
const readline = require('readline');    // definir entrada e saida

//CONFIG. ENTRADA E SAIDA//
const rl = readline.createInterface({
    input: process.stdin,       // cria interface de leitura
    output: process.stdout,     // cria interface de escrita
    prompt: '> '                // configura a exibicao do prompt
});

//VARIAVEIS AUXILIARES//
let currentDir = process.cwd(); // diretorio atual

//PROMPT//
rl.prompt();                // exibe o prompt e aguarda por comandos
rl.on('line', (line) => {   // listener
    const [cmd, ...args] = line.trim().split(' ');  // declara array com comando e array de argumentos

    switch(cmd) {
        case 'cd':
            if (args.length === 0) {
                console.log('Argumento de diretorio ausente.');
            } else {
                const targetDir = args[0];          // diretorio desejado
                try {
                    process.chdir(targetDir);       // vai ate o diretorio
                    currentDir = process.cwd();     // atualiza o diretorio atual
                } catch(err) {                      // tratamento de erros
                    console.log(`cd: ${currentDir}\${targetDir}: Diretorio nao encontrado.`);
                }
            }
        break;

        case 'ls':
            fs.readdir(currentDir, (err, files) => {    // le conteudo do diretorio atual
                if (err) {                              // tratamento de erros
                    console.log(`ls: ${err}`);
                } else {
                    console.log(files.join('\t'));      // exibe arquivos
                }
            })
        break;

        case 'mkdir':
            if (args.length === 0) {
                console.log('Argumento de diretorio ausente.');
            } else {
                const newDir = args[0];         // pasta a ser criada
                fs.mkdir(newDir, (err) => {     // cria a pasta
                    if (err) {                  // tratamento de erros
                        console.log(`mkdir: ${err}`);
                    }
                })
            }
        break;

        case 'rm':
            if (args.length === 0 || args[0] === '-rf' && args.length < 2) {
                console.log('Argumento de arquivo ou diretorio ausente.');
            } else if (args[0] === '-rf') {                             // tratamento de diretorio
                const rmTarget = args[1];                               // diretorio a ser removido
                fs.rm(rmTarget, { recursive: true }, (err) => {         // remove o diretorio recursivamente
                    if (err) {                                          // tratamento de erros
                      console.log(`rm: ${err}`);
                    }
                });
            } else {                                // tratamento de arquivo
                const rmTarget = args[0];           // arquivo a ser removido
                fs.unlink(rmTarget, (err) => {      // remove o arquivo dos arquivos do sistema
                    if (err) {                      // tratamento de erros
                        console.log(`rm: ${err}`);
                    }
                })
            }
        break;

        case 'touch':
            if (args.length === 0) {
                console.log('Argumento de arquivo ausente.');
            } else {
                const tchFile = args[0];                // arquivo a ser modificado/criado
                fs.open(tchFile, 'a', (err, fd) => {    // modifica o arquivo se ele existe, senão, o cria... 'a' -> append & 'fd' -> file descriptor
                    if (err) {                          // tratamento de erros durante a abertura
                        console.log(`touch: ${err}`);
                    } else {
                        fs.close(fd, (err) => {         // atualiza e fecha o arquivo
                            if (err) {                  // tratamento de erros durante o fechamento
                                console.log(`touch: ${err}`);
                            }
                        })
                    }
                })
            }
        break;

        default:
            console.log(`Comando nao encontrado: ${cmd}`);  // tratamento de comandos
        break;
    }

    rl.prompt(); // convoca o terminal novamente

}).on('close', () => {  // tratamento quando o terminal for fechado (CTRL+C)
    console.log('Encerrando o terminal...');
    process.exit(0);
});