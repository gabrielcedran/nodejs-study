import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

yargs(hideBin(process.argv))
  .command('new <note>', 'Create a new note', yargs => {
    return yargs.positional('note', {
        type: 'string',
        description: 'the content of the note to create',
    })
  }, argv => {
    console.log(argv.note, argv.tags)
  }).option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .demandCommand(1)
  .parse()