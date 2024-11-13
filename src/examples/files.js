import fs from 'node:fs/promises'

const readPackageJson = async () => {
    const packageFilePath = new URL('../../package.json', import.meta.url).pathname; // now fs module need absolute paths. __dirname doesn't work anymore
    console.log(JSON.parse(await fs.readFile(packageFilePath, 'utf-8')));
}

const writeFile = async () => {
    const newFilePath = new URL('./demo.js', import.meta.url).pathname; 
    await fs.writeFile(newFilePath, `console.log('new file created by fs');`)
}

readPackageJson();
writeFile();