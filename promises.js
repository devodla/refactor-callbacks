// @author: Huillca, Reynaldo
/**
 * Deve criar arquivo se não existe e adicionar texto
 * Deve adicionar informações a arquivo existente se existir
 */

const { existsSync, appendFile, writeFile } = require('fs')
const { promisify } = require('util')

const writeFileAsync = promisify(writeFile)
const appendFileAsync = promisify(appendFile)

const readline = require('readline')
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// precisa manter o `this` de `terminal`
// question não segue o padrão de callbacks (error, res)
// portanto, não é possivel converter usando promisify
// const questionAsync = promisify(terminal.question.bind(terminal))

// simulando o que o promisify deve fazer, mas ingorando o primeiro parametro
// agora, o primeiro parametro será considerado como sucesso!
const functionToPromise = (func, ...args) => {
  return new Promise(resolve => func(...args, resolve))
}

const questionFunc = terminal.question.bind(terminal)
const questionAsync = msg => functionToPromise(questionFunc, `${msg}\n`)

(async function main() {
  try {
    // await writeFileAsync('./teste', 'testando!!')
    // console.log('resposta', await questionAsync('Qual é seu nome?\n'))
    const filename = await questionAsync('Qual é o arquivo que deseja trabalhar?')
    const text = await questionAsync('Escreva algo para incluir')
    const fileExists = existsSync(filename)
    if (fileExists) {
      await appendFileAsync(filename, `\n${text}`)
      console.log(`${text} adicionado à ${filename}`)
      return;
    }
    await writeFileAsync(filename, text)
  } catch (error) {
    console.error('deu ruim!!', error)
  } finally {
    console.log('texto adicionado com sucesso!')
    terminal.close()
  }
})()
