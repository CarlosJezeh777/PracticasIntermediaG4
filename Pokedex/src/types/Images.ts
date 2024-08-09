export class Image {
  public id: number
  public name: string
  public files: Map<string, string>

  constructor(id: number, name: string, file: Map<string, string>) {
    this.id = id
    this.name = name
    this.files = this.filterFiles(file)
  }

  private filterFiles(file: Map<string, string>): Map<string, string> {
    // Filtrar los archivos que no sean de tipo string
    const filteredFile = new Map<string, string>()
    for (const [key, value] of file) {
      if (typeof value === 'string') {
        filteredFile.set(key, value)
      }
    }
    return filteredFile
  }

  public getFile(id: string): string {
    return this.files.get(id) || ''
  }
}
