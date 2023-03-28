import { writeFileSync } from 'fs'
import { compileFromFile } from 'json-schema-to-typescript'

async function generate() {
	writeFileSync('./src/organizers/organizer.generated.ts', await compileFromFile('./src/organizers/organizer.json'))
  }

generate();