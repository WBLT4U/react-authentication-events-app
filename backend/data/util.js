import { readFile, writeFile } from 'node:fs/promises';

export async function readData() {
  try {
    const data = await readFile('events.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return { events: [], users: [] }; // Return default structure if file doesn't exist
  }
}

export async function writeData(data) {
  try {
    await writeFile('events.json', JSON.stringify(data));
  } catch (error) {
    console.error('Error writing data:', error);
    throw error;
  }
}
