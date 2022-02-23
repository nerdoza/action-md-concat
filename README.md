# GitHub Action Markdown Concatenation

This action performs a concatenation on markdown files within a directory.

## Usage
```yml
- name: Concat document files
  uses: bayssmekanique/action-md-concat@v1
  with:
    srcDir: ./docs
    destFile: ./fullDoc.md
```

## Inputs

### `srcDir`

**Required** Path to directory of md files to concatenate.

### `destFile`

**Required** Destination file path for concatenated file, including file name.

### `limit`

**Optional** Limit concatenation to specified number of files sorted by name. (Leave blank for no limit)

### `reverse`

**Optional** Reverse ordering of concatenation to descending. (Leave blank for ascending ordering)

### `separator`

**Optional** String to use between each concatenated file. (Default: `\n`)

## Copyright and License
© 2022 Zachary Cardoza under the [MIT license](LICENSE.md).