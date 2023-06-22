//IMPORTACOES//
const fs = require('fs')                // interagir com o sistema de arquivos do computador
const readline = require('readline')    // definir entrada e saida


//CONFIG. ENTRADA E SAIDA//
const rl = readline.createInterface({
    input: process.stdin,               // cria interface de leitura
    output: process.stdout,             // cria interface de escrita
    prompt: '> '                        // configura a exibicao do prompt
});


//VARIAVEIS AUXILIARES//
let currentDir = process.cwd()          // diretorio atual


//PROMPT//
rl.prompt()                             // exibe o prompt e aguarda por comandos
rl.on('line', (line) => {               // listener
    const [command, ...args] = line.trim().split(' ')   // comando -> command & argumentos -> args[]

    switch(command) {
        case 'cd':
            if (args.length === 0) {
                console.log('Favor, fornecer argumentos.')
            } else {
                const targetDir = args[0]               // diretorio desejado
                try {
                    process.chdir(targetDir)            // vai ate o diretorio
                    currentDir = process.cwd()          // atualiza o diretorio atual
                } catch(err) {
                    console.log('cd: Diretorio nao encontrado.')
                }
            }
        break;

        case 'ls':
            fs.readdir(currentDir, (err, files) => {    // le conteudo do diretorio atual
                if (err) {
                    console.log('ls: Erro!')           // se ocorrer erro, exibe a mensagem
                } else {
                    console.log(files.join('\t'))       // senao, exibe arquivos
                }
            })
        break;

        case 'mkdir':
            if (args.length === 0) {
                console.log('Favor, fornecer argumentos.')
            } else {
                const newDir = args[0]                  // pasta a ser criada
                fs.mkdir(newDir, (err) => {             // cria a pasta
                    if (err) {
                        console.log('mkdir: Erro!')    // se ocorrer erro, exibe a mensagem
                    }
                })
            }
        break;

        case 'rm':
            if (args.length === 0) {
                console.log('Favor, fornecer argumentos.')
            } else {
                const rmTarget = args[0]                // arquivo a ser removido
                fs.unlink(rmTarget, (err) => {          // remove o arquivo dos arquivos do sistema
                    if (err) {
                        console.log('rm: Erro!')       // se ocorrer erro, exibe a mensagem
                    }
                })
            }
        break

        case 'touch':
            if (args.length === 0) {
                console.log('Favor, fornecer argumentos.')
            } else {
                const tchFile = args[0];                // arquivo a ser modificado/criado
                fs.open(tchFile, 'a', (err, fd) => {    // modifica o arquivo se ele existe, senão o cria... 'a' -> append & 'fd' -> file descriptor
                    if (err) {                          // verifica  erros durante a abertura
                        console.log('touch: Erro!')
                    } else {
                        fs.close(fd, (err) => {         // atualiza e fecha o arquivo
                            if (err) {                  // verifica erros durante o fechamento
                                console.log('touch: Erro!')
                            } else {
                                console.log('Arquivo criado ou modificado com sucesso.')
                            }
                        })
                    }
                })
            }
        break
    }
})