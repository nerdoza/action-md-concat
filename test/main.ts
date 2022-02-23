import { expect } from 'chai'
import ConcatFiles from '../src/concat'
import { join } from 'path'
import { rm, stat } from 'fs/promises'

const testResultDir = './test/__result__'
const testAllFilename = 'all.md'
const testExcludeFilename = 'exclude.md'
const testSeparatorFilename = 'separator.md'

describe('Concat File', function() {
  after(async () => {
    rm(testResultDir, { recursive: true }).catch(() => {})
  })

  it('can concat all files', async function() {
    const srcDir = './test/fixtures'
    const destFile = join(testResultDir, testAllFilename)

    await ConcatFiles(srcDir, destFile)

    const expectedFileStat = await stat(destFile)
    expect(expectedFileStat.size).to.be.greaterThanOrEqual(11784)
    expect(expectedFileStat.size).to.be.lessThanOrEqual(11785)
  })

  it('can concat 4 files', async function() {
    const srcDir = './test/fixtures'
    const destFile = join(testResultDir, testExcludeFilename)

    await ConcatFiles(srcDir, destFile, '4')

    const expectedFileStat = await stat(destFile)
    expect(expectedFileStat.size).to.be.greaterThanOrEqual(7649)
    expect(expectedFileStat.size).to.be.lessThanOrEqual(7650)
  })

  it('can concat with specified separator', async function() {
    const srcDir = './test/fixtures'
    const destFile = join(testResultDir, testSeparatorFilename)

    await ConcatFiles(srcDir, destFile, undefined, '\n#THIS IS A SEPARATOR\n\n\n')

    const expectedFileStat = await stat(destFile)
    expect(expectedFileStat.size).to.be.greaterThanOrEqual(11899)
    expect(expectedFileStat.size).to.be.lessThanOrEqual(11923)
  })

})
