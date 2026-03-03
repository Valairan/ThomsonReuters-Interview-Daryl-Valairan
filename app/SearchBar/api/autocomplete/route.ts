import { NextResponse } from "next/server";
import { Trie } from "../../trie";
import fs from 'fs';
import path from 'path';

const trie = new Trie();

const filePath = path.join(process.cwd(), 'wordlist.txt');

if (!fs.existsSync(filePath)) {
    throw new Error('Wordlist file not found at ' + filePath);
}
const data = fs.readFileSync(filePath, 'utf-8');

data.split(/\r?\n/).forEach(word => {
    if (word.trim())
         trie.insert(word.trim().toLowerCase());
});

console.log(trie.search("1"))


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase() || "";

    if (query.length < 1)
        return NextResponse.json([]);

    const results = trie.getWordsWithPrefix(query);
    console.log(query)
    console.log(results)
    return NextResponse.json(results);
}