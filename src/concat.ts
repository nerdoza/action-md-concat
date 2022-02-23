import { readdir, mkdir } from 'fs/promises'
import { createWriteStream, createReadStream } from 'fs'
import { dirname, join } from 'path'
import MultiStream from 'multistream'
import string2fileStream from 'string-to-file-stream'

export default async function ConcatFiles (srcDir: string, destFile: string, limit: string | undefined = undefined, reverse: boolean = false, separator: string = `\n`): Promise < void > {
  const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : undefined
  let files = (await readdir(srcDir)).filter(file => file.endsWith('.md')).sort()
  if (reverse) {
    files = files.reverse()
  }
  const filesToConcat = files.slice(0, limitNumber)

  const destDir = dirname(destFile)
  await mkdir(destDir, { recursive: true })

  const destFileStream = createWriteStream(destFile)
  const filesToConcatStreams = filesToConcat.map(file => createReadStream(join(srcDir, file)))
  let filesToConcatStreamsLength = filesToConcatStreams.length

  do {
    const newLineStream = string2fileStream(separator)
    filesToConcatStreams.splice(filesToConcatStreamsLength, 0, newLineStream)
  } while (filesToConcatStreamsLength-- > 1)

  await new Promise(resolve => {
    // @ts-ignore
    new MultiStream(filesToConcatStreams).on('end', resolve).pipe(destFileStream)
  })
}
